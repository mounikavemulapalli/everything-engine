import React, { useState } from "react";
import axios from "axios";

const UploadQuestions = () => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];

    if (selectedFile) {
      const fileType = selectedFile.type;

      if (fileType !== "application/json") {
        setMessage("Please upload a valid JSON file.");
        return;
      }

      setFile(selectedFile);
    } else {
      setFile(null); // Ensure the file state is cleared if no file is selected
    }
  };

  const handleSubmit = async () => {
    if (!file) {
      alert("Please select a file to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(
        "http://localhost:3000/upload-questions",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // Display success message in alert
      if (response.data && response.data.message) {
        alert(response.data.message);
      } else {
        alert("Questions uploaded successfully.");
      }
    } catch (error) {
      console.error(error);
      alert(
        error.response?.data?.message ||
          "Error uploading questions. Please try again."
      );
    }
  };

  return (
    <div>
      <h2>Upload Questions</h2>
      {/* Bind the value to an empty string if no file is selected */}
      <input type='file' accept='.json' onChange={handleFileChange} />
      <button onClick={handleSubmit}>Upload</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default UploadQuestions;
