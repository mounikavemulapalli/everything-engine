const express = require("express");
const cors = require("cors");
const multer = require("multer");
const fs = require("fs");
const path = require("path");

const app = express();
const port = 3000; // Ensure the port matches the one in your React frontend

// Enable CORS
app.use(cors());

// Middleware to parse JSON request bodies
app.use(express.json());

// Set up file upload handling using multer
const upload = multer({ dest: "uploads/" });

// Serve static files (optional if you need to serve the file uploads directly)
app.use(express.static(path.join(__dirname, "uploads")));

// Dummy questions data (this should be fetched from a database or file)
let questions = [];

// Upload questions endpoint
app.post("/upload-questions", upload.single("file"), (req, res) => {
  if (!req.file) {
    return res.status(400).send("No file uploaded.");
  }

  // Read the uploaded JSON file and store it
  const filePath = path.join(__dirname, req.file.path);
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      return res.status(500).send("Error reading file.");
    }

    try {
      const uploadedQuestions = JSON.parse(data);
      questions = uploadedQuestions; // Store questions
      fs.unlinkSync(filePath); // Delete the uploaded file after processing
      res.send({ message: "Questions uploaded successfully!" });
    } catch (e) {
      return res.status(500).send("Invalid JSON format.");
    }
  });
});

// Fetch questions endpoint
app.get("/get-questions", (req, res) => {
  res.json(questions);
});

// Simple route to check if the backend is reachable
app.get("/", (req, res) => {
  res.send("Backend is reachable");
});

// Submit answers endpoint
app.post("/submit-answers", (req, res) => {
  const { answers } = req.body;
  if (!answers) {
    return res.status(400).send("Answers are required.");
  }

  console.log("Answers received:", answers);
  // Process the answers here (e.g., save them to a database, or generate a PDF)

  res.send({ message: "Answers submitted successfully!" });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
