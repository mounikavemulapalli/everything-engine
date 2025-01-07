import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

const AdminPanel = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState([]);
  const myRef = useRef(null);

  useEffect(() => {
    axios
      .get("http://localhost:3000/")
      .then(() => console.log("Backend is reachable"))
      .catch((error) => {
        console.error("Error reaching backend:", error);
        alert(`Backend server is not reachable: ${error.message}`);
      });
  }, []);

  // Handle file selection and validation
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.name.endsWith(".json")) {
      setFile(selectedFile);
    } else {
      alert("Please select a valid JSON file.");
      e.target.value = ""; // Clear the input
    }
  };

  // Handle file upload
  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    setLoading(true); // Start loading indicator

    try {
      const response = await axios.post(
        "http://localhost:3000/upload-questions",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      alert(response.data.message || "Questions uploaded successfully!");
      setFile(null); // Reset file input after successful upload
      fetchQuestions(); // Fetch uploaded questions
    } catch (error) {
      console.error("Error uploading questions:", error);

      if (error.response) {
        alert(
          `Error: ${error.response.data.message || error.response.statusText}`
        );
      } else {
        alert("Network error, please try again.");
      }
    } finally {
      setLoading(false); // Stop loading indicator
    }
  };

  // Fetch uploaded questions
  const fetchQuestions = async () => {
    try {
      const response = await axios.get("http://localhost:3000/get-questions");
      setQuestions(response.data);
    } catch (error) {
      console.error("Error fetching questions:", error);
      alert("Failed to fetch questions.");
    }
  };

  return (
    <div
      ref={myRef}
      style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}
    >
      <h2>Admin Panel: Upload Multiple-Choice Questions</h2>

      <input
        type='file'
        accept='.json'
        onChange={handleFileChange}
        style={{ marginBottom: "10px" }}
      />
      <button
        onClick={handleUpload}
        disabled={loading}
        style={{
          padding: "10px 20px",
          backgroundColor: loading ? "#ccc" : "#007BFF",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          cursor: loading ? "not-allowed" : "pointer",
          marginLeft: "10px",
        }}
      >
        {loading ? "Uploading..." : "Upload Questions"}
      </button>

      <button
        onClick={fetchQuestions}
        style={{
          padding: "10px 20px",
          backgroundColor: "#28A745",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          marginLeft: "10px",
        }}
      >
        Fetch Uploaded Questions
      </button>

      <div style={{ marginTop: "20px" }}>
        <h3>Uploaded Questions</h3>
        {questions.length > 0 ? (
          <ul style={{ listStyleType: "none", padding: 0 }}>
            {questions.map((q, index) => (
              <li key={index} style={{ marginBottom: "15px" }}>
                <strong>{q.text}</strong>
                <ul style={{ listStyleType: "disc", marginLeft: "20px" }}>
                  {q.options.map((option, idx) => (
                    <li key={idx}>{option}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        ) : (
          <p>No questions uploaded yet.</p>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;
