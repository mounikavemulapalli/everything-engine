// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const AnswerQuestions = ({ engineName }) => {
//   const [questions, setQuestions] = useState([]);
//   const [answers, setAnswers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchQuestions = async () => {
//       try {
//         const { data } = await axios.get(
//           `http://localhost:3000/questions/${engineName}`
//         );
//         setQuestions(data);
//         setAnswers(new Array(data.length).fill(""));
//         setLoading(false);
//       } catch (err) {
//         setError("Error fetching questions");
//         setLoading(false);
//       }
//     };
//     fetchQuestions();
//   }, [engineName]);

//   const handleSubmit = async () => {
//     try {
//       const response = await axios.post(
//         "http://localhost:3000/submit-answers",
//         {
//           engineName,
//           answers,
//         }
//       );
//       alert("Answers submitted!");
//       console.log(response.data);
//     } catch (err) {
//       alert("Error submitting answers");
//       console.error(err);
//     }
//   };

//   if (loading) return <p>Loading questions...</p>;
//   if (error) return <p>{error}</p>;

//   return (
//     <div>
//       <h2>Answer Questions</h2>
//       {questions.map((q, idx) => (
//         <div key={idx}>
//           <p>{q}</p>
//           <input
//             type='text'
//             value={answers[idx]}
//             onChange={(e) => {
//               const newAnswers = [...answers];
//               newAnswers[idx] = e.target.value;
//               setAnswers(newAnswers);
//             }}
//           />
//         </div>
//       ))}
//       <button onClick={handleSubmit}>Submit</button>
//     </div>
//   );
// };

// export default AnswerQuestions;
import React, { useState, useEffect } from "react";
import axios from "axios";

const AnswerQuestions = ({ engineName }) => {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);

  // Fetch questions from the backend when the component mounts
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const { data } = await axios.get("http://localhost:3000/get-questions");
        setQuestions(data); // Set the questions fetched from the server
        setAnswers(new Array(data.length).fill("")); // Initialize answers array
      } catch (error) {
        console.error("Error fetching questions:", error);
        alert("Failed to fetch questions.");
      }
    };
    fetchQuestions();
  }, []);

  // Handle answer change
  const handleAnswerChange = (index, value) => {
    const updatedAnswers = [...answers];
    updatedAnswers[index] = value;
    setAnswers(updatedAnswers);
  };

  // Handle form submission
  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/submit-answers",
        {
          engineName,
          answers,
        }
      );
      alert("Answers submitted!");
      console.log(response.data);
    } catch (error) {
      console.error("Error submitting answers:", error);
      alert("Failed to submit answers.");
    }
  };

  return (
    <div>
      <h2>Answer Questions</h2>
      {questions.length > 0 ? (
        questions.map((q, idx) => (
          <div key={idx}>
            <p>{q.question}</p>{" "}
            {/* Assuming each question has a 'question' field */}
            <input
              type='text'
              value={answers[idx]}
              onChange={(e) => handleAnswerChange(idx, e.target.value)}
            />
          </div>
        ))
      ) : (
        <p>Loading questions...</p>
      )}
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default AnswerQuestions;
