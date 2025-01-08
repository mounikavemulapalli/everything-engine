import React, { useState } from "react";
import axios from "axios";

function AdminPanel() {
  const [questions, setQuestions] = useState([]);
  const [uploadedQuestions, setUploadedQuestions] = useState([]);

  // Handle file upload
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const jsonData = JSON.parse(e.target.result);
        setQuestions(jsonData.questions); // Ensure the uploaded JSON contains "questions"
      } catch (error) {
        console.error("Error parsing JSON:", error);
        alert("Invalid JSON file.");
      }
    };

    reader.readAsText(file);
  };

  // Save questions to the backend
  const saveQuestions = async () => {
    if (questions.length === 0) {
      alert("No questions to upload.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:3000/upload-questions",
        { questions }
      );
      alert("Questions saved successfully!");
      console.log("Response:", response.data);
    } catch (error) {
      console.error("Error saving questions:", error.response || error);
      alert("Failed to save questions. See console for details.");
    }
  };

  // Fetch questions from the backend
  const fetchQuestions = async () => {
    try {
      const response = await axios.get("http://localhost:3000/get-questions");
      setUploadedQuestions(response.data);
    } catch (error) {
      console.error("Error fetching questions:", error);
      alert("Failed to fetch questions.");
    }
  };

  return (
    <div>
      <h2>Admin Panel</h2>
      <input type='file' onChange={handleFileUpload} />
      <button onClick={saveQuestions}>Save Questions</button>
      <button onClick={fetchQuestions}>Fetch Questions</button>

      <h3>Uploaded Questions:</h3>
      {uploadedQuestions.length > 0 ? (
        <ul>
          {uploadedQuestions.map((q, index) => (
            <li key={index}>
              <strong>Question:</strong> {q.question}
              <br />
              <strong>Options:</strong> {q.options.join(", ")}
            </li>
          ))}
        </ul>
      ) : (
        <p>No questions uploaded yet.</p>
      )}
    </div>
  );
}

export default AdminPanel;
