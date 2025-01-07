// const express = require("express");
// const cors = require("cors");
// const multer = require("multer");
// const fs = require("fs");
// const path = require("path");

// const app = express();
// const port = 3000;

// // Enable CORS
// app.use(cors());
// app.use(express.json()); // For parsing JSON bodies

// // Set up multer for file upload
// const upload = multer({ dest: "uploads/" }); // Save files to 'uploads' folder

// // Helper function to save questions to a JSON file
// const saveQuestionsToFile = (questions) => {
//   try {
//     fs.writeFileSync(
//       "questions.json",
//       JSON.stringify(questions, null, 2),
//       "utf-8"
//     );
//     console.log("Questions saved to questions.json");
//   } catch (error) {
//     console.error("Error saving questions:", error);
//   }
// };

// // Endpoint for uploading questions (from JSON file)
// app.post("/upload-questions", upload.single("file"), (req, res) => {
//   // Read the uploaded JSON file
//   const filePath = path.join(__dirname, "uploads", req.file.filename);

//   fs.readFile(filePath, "utf8", (err, data) => {
//     if (err) {
//       return res.status(500).send({ message: "Error reading file" });
//     }

//     try {
//       const parsedData = JSON.parse(data); // Parse the file content
//       // Process the parsed JSON data here
//       res.status(200).send({ message: "File uploaded successfully" });
//     } catch (err) {
//       res.status(400).send({ message: "Invalid JSON format" });
//     } finally {
//       // Optionally, delete the file after processing
//       fs.unlink(filePath, () => {});
//     }
//   });
// });

// // Endpoint to get the questions
// app.get("/get-questions", (req, res) => {
//   try {
//     const questions = JSON.parse(fs.readFileSync("./questions.json", "utf-8"));
//     res.json(questions);
//   } catch (error) {
//     console.error("Error fetching questions:", error);
//     res.status(500).send("Failed to fetch questions");
//   }
// });

// // Endpoint for submitting answers
// app.post("/submit-answers", (req, res) => {
//   try {
//     // Here, you can handle the submission logic for the answers
//     console.log("Answers submitted:", req.body); // Log the received answers

//     // Respond with a success message
//     res.status(200).send("Answers submitted successfully");
//   } catch (error) {
//     console.error("Error submitting answers:", error);
//     res.status(500).send("Failed to submit answers");
//   }
// });

// // Start the server
// app.listen(port, () => {
//   console.log(`Server running on http://localhost:${port}`);
// });
const express = require("express");
const cors = require("cors");
const multer = require("multer");
const fs = require("fs");
const path = require("path");

const app = express();
const port = 3000;

// Enable CORS
app.use(cors());
app.use(express.json()); // For parsing JSON bodies

// Set up multer for file upload
const upload = multer({ dest: "uploads/" }); // Save files to 'uploads' folder

// Helper function to save questions to a JSON file
const saveQuestionsToFile = (questions) => {
  try {
    fs.writeFileSync(
      "questions.json",
      JSON.stringify(questions, null, 2),
      "utf-8"
    );
    console.log("Questions saved to questions.json");
  } catch (error) {
    console.error("Error saving questions:", error);
  }
};

// Endpoint for uploading questions (from JSON file)
app.post("/upload-questions", upload.single("file"), (req, res) => {
  // Check if a file is uploaded
  if (!req.file) {
    return res.status(400).send({ message: "No file uploaded" });
  }

  // Read the uploaded JSON file
  const filePath = path.join(__dirname, "uploads", req.file.filename);

  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      return res.status(500).send({ message: "Error reading file" });
    }

    try {
      const parsedData = JSON.parse(data); // Parse the file content

      // Optionally, you can validate the structure of the parsedData here.
      if (!Array.isArray(parsedData) || parsedData.length === 0) {
        return res.status(400).send({ message: "Invalid JSON structure" });
      }

      // Save the parsed questions to a file
      saveQuestionsToFile(parsedData);

      // Respond with success message
      res
        .status(200)
        .send({ message: "File uploaded and questions saved successfully" });
    } catch (err) {
      res.status(400).send({ message: "Invalid JSON format" });
    } finally {
      // Optionally, delete the file after processing
      fs.unlink(filePath, () => {});
    }
  });
});

// Endpoint to get the questions
app.get("/get-questions", (req, res) => {
  try {
    const questions = JSON.parse(fs.readFileSync("./questions.json", "utf-8"));
    res.json(questions);
  } catch (error) {
    console.error("Error fetching questions:", error);
    res.status(500).send("Failed to fetch questions");
  }
});

// Endpoint for submitting answers
app.post("/submit-answers", (req, res) => {
  try {
    // Here, you can handle the submission logic for the answers
    console.log("Answers submitted:", req.body); // Log the received answers

    // Respond with a success message
    res.status(200).send("Answers submitted successfully");
  } catch (error) {
    console.error("Error submitting answers:", error);
    res.status(500).send("Failed to submit answers");
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
