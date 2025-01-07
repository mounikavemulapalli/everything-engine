// import React, { useState } from "react";
// import axios from "axios";

// const AdminPanel = () => {
//   const [file, setFile] = useState(null);

//   const handleFileChange = (e) => {
//     setFile(e.target.files[0]);
//   };

//   const handleUpload = async () => {
//     if (!file) {
//       alert("Please select a file.");
//       return;
//     }

//     const formData = new FormData();
//     formData.append("file", file);

//     try {
//       await axios.post("http://localhost:3000/upload-questions", formData, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       });
//       alert("Questions uploaded successfully!");
//     } catch (error) {
//       console.error("Error uploading file:", error);
//       alert("Failed to upload questions.");
//     }
//   };

//   return (
//     <div>
//       <h2>Admin Panel: Upload Questions</h2>
//       <input type='file' accept='.json' onChange={handleFileChange} />
//       <button onClick={handleUpload}>Upload Questions</button>
//     </div>
//   );
// };

// export default AdminPanel;
