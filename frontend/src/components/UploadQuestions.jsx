// import React, { useState, useRef } from "react";
// import axios from "axios";

// function UploadQuestions() {
//   const [file, setFile] = useState(null);
//   const [error, setError] = useState("");
//   const fileInputRef = useRef(null);

//   const handleFileChange = (e) => {
//     setFile(e.target.files[0]);
//     setError("");
//   };

//   const handleUpload = () => {
//     if (!file) {
//       setError("Please select a file.");
//       return;
//     }

//     const formData = new FormData();
//     formData.append("file", file);

//     axios
//       .post("http://localhost:3000/upload-questions", formData)
//       .then((response) => {
//         console.log("Upload successful:", response.data);
//         fileInputRef.current.value = ""; // Reset the file input
//       })
//       .catch((error) => {
//         console.error("Error uploading questions:", error);
//         setError(error.response?.data || "Upload failed.");
//       });
//   };

//   return (
//     <div>
//       <input type='file' ref={fileInputRef} onChange={handleFileChange} />
//       <button onClick={handleUpload}>Upload Questions</button>
//       {error && <p style={{ color: "red" }}>{error}</p>}
//     </div>
//   );
// }

// export default UploadQuestions;
