const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const fs = require("fs");
const { PDFDocument, StandardFonts } = require("pdf-lib");

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(__dirname)); // Serve static files (like PDFs)

// MongoDB Connection
mongoose
  .connect("mongodb://localhost:27017/questionsDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error("Error connecting to MongoDB:", error));

// Define Question Schema
const questionSchema = new mongoose.Schema({
  question: { type: String, required: true },
  options: { type: [String], required: true },
});

const Question = mongoose.model("Question", questionSchema);

// Endpoint: Upload Questions
app.post("/upload-questions", async (req, res) => {
  const { questions } = req.body;

  if (!questions || !Array.isArray(questions)) {
    return res
      .status(400)
      .json({ message: "Invalid input. Provide an array of questions." });
  }

  try {
    await Question.deleteMany();
    await Question.insertMany(questions);
    res.status(200).json({ message: "Questions uploaded successfully!" });
  } catch (error) {
    console.error("Error uploading questions:", error);
    res.status(500).json({ message: "Failed to upload questions." });
  }
});

// Endpoint: Get Questions
app.get("/get-questions", async (req, res) => {
  try {
    const questions = await Question.find();
    res.status(200).json(questions);
  } catch (error) {
    console.error("Error fetching questions:", error);
    res.status(500).json({ message: "Failed to fetch questions." });
  }
});

// Endpoint: Submit Answers
app.post("/submit-answers", async (req, res) => {
  const { answers } = req.body;

  if (!answers || !Array.isArray(answers)) {
    return res
      .status(400)
      .json({ message: "Invalid input. Provide an array of answers." });
  }

  try {
    const pdfData = {
      title: "Submitted Answers",
      content: answers
        .map((a, i) => `Q${i + 1}: ${a.questionId} \nAnswer: ${a.answer}`)
        .join("\n\n"),
    };

    const pdfResponse = await generatePDF(pdfData);

    res.status(200).json({
      message: "Answers submitted successfully!",
      pdfUrl: pdfResponse.pdfUrl,
    });
  } catch (error) {
    console.error("Error generating PDF:", error);
    res.status(500).json({ message: "Failed to submit answers." });
  }
});

// Function: Generate PDF
const generatePDF = async ({ title, content }) => {
  try {
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([600, 400]);
    const { width, height } = page.getSize();
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

    page.drawText(title, { x: 50, y: height - 50, size: 18, font });
    page.drawText(content, { x: 50, y: height - 80, size: 12, font });

    const pdfBytes = await pdfDoc.save();
    const pdfPath = `${__dirname}/generated-pdf.pdf`;
    fs.writeFileSync(pdfPath, pdfBytes);

    return { pdfUrl: "/generated-pdf.pdf" };
  } catch (error) {
    throw new Error("Error generating PDF: " + error.message);
  }
};

// Start the Server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
