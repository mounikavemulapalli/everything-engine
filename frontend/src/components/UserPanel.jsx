// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const UserPanel = () => {
//   const [questions, setQuestions] = useState([]);
//   const [answers, setAnswers] = useState({});

//   // Fetch questions from the backend
//   useEffect(() => {
//     const fetchQuestions = async () => {
//       try {
//         const response = await axios.get("http://localhost:3000/get-questions");
//         if (Array.isArray(response.data)) {
//           setQuestions(response.data); // Set the fetched questions
//         } else {
//           console.error("Invalid response format:", response.data);
//         }
//       } catch (error) {
//         console.error("Error fetching questions:", error);
//       }
//     };

//     fetchQuestions();
//   }, []);

//   // Handle input changes for answering questions
//   const handleInputChange = (questionId, value) => {
//     setAnswers((prevAnswers) => ({
//       ...prevAnswers,
//       [questionId]: value,
//     }));
//   };

//   // Submit answers to the backend
//   const handleSubmit = async () => {
//     try {
//       const response = await axios.post(
//         "http://localhost:3000/submit-answers",
//         {
//           answers,
//         }
//       );
//       alert("Answers submitted successfully!");
//       console.log(response.data);
//     } catch (error) {
//       console.error("Error submitting answers:", error);
//     }
//   };

//   return (
//     <div>
//       <h2>User Panel</h2>
//       {questions.length > 0 ? (
//         questions.map((question, index) => (
//           <div key={index}>
//             <p>{question.text}</p>
//             {question.options ? (
//               question.options.map((option, optionIndex) => (
//                 <label key={optionIndex}>
//                   <input
//                     type='radio'
//                     name={`question-${index}`}
//                     value={option}
//                     onChange={(e) =>
//                       handleInputChange(question.id, e.target.value)
//                     }
//                   />
//                   {option}
//                 </label>
//               ))
//             ) : (
//               <input
//                 type='text'
//                 placeholder='Your answer'
//                 onChange={(e) => handleInputChange(question.id, e.target.value)}
//               />
//             )}
//           </div>
//         ))
//       ) : (
//         <p>No questions available.</p>
//       )}
//       <button onClick={handleSubmit}>Submit Answers</button>
//     </div>
//   );
// };

// export default UserPanel;
import React, { useState, useEffect } from "react";
import axios from "axios";

const UserPanel = () => {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});

  // Fetch questions from the backend
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get("http://localhost:3000/get-questions");
        if (Array.isArray(response.data)) {
          setQuestions(response.data); // Set the fetched questions
        } else {
          console.error("Invalid response format:", response.data);
        }
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };

    fetchQuestions();
  }, []);

  // Handle input changes for answering questions
  const handleInputChange = (questionId, value) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: value,
    }));
  };

  // Submit answers to the backend
  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/submit-answers",
        {
          answers,
        }
      );
      alert("Answers submitted successfully!");
      console.log(response.data);
    } catch (error) {
      console.error("Error submitting answers:", error);
    }
  };

  return (
    <div>
      <h2>User Panel</h2>
      {questions.length > 0 ? (
        questions.map((question, index) => (
          <div key={index}>
            <p>{question.text}</p>
            {question.options ? (
              question.options.map((option, optionIndex) => (
                <label key={optionIndex}>
                  <input
                    type='radio'
                    name={`question-${index}`}
                    value={option}
                    onChange={(e) =>
                      handleInputChange(question.id, e.target.value)
                    }
                  />
                  {option}
                </label>
              ))
            ) : (
              <input
                type='text'
                placeholder='Your answer'
                onChange={(e) => handleInputChange(question.id, e.target.value)}
              />
            )}
          </div>
        ))
      ) : (
        <p>No questions available.</p>
      )}
      <button onClick={handleSubmit}>Submit Answers</button>
    </div>
  );
};

export default UserPanel;
