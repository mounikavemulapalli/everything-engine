import React, { useState, useEffect } from "react";
import axios from "axios";

const UserPanel = () => {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const { data } = await axios.get("http://localhost:3000/get-questions");
        setQuestions(data);
      } catch (error) {
        console.error("Error fetching questions:", error);
        alert("Failed to fetch questions.");
      }
    };
    fetchQuestions();
  }, []);

  const handleAnswerChange = (questionId, option) => {
    setAnswers((prev) => ({ ...prev, [questionId]: option }));
  };

  const handleSubmit = async () => {
    try {
      await axios.post("http://localhost:3000/submit-answers", { answers });
      alert("Answers submitted successfully!");
    } catch (error) {
      console.error("Error submitting answers:", error);
      alert("Failed to submit answers.");
    }
  };

  return (
    <div>
      <h2>User Panel: Answer Questions</h2>
      {questions.length > 0 ? (
        questions.map((question) => (
          <div key={question.id}>
            <p>{question.text}</p>
            {question.options.map((option, idx) => (
              <label key={idx}>
                <input
                  type='radio'
                  name={question.id}
                  value={option}
                  checked={answers[question.id] === option}
                  onChange={() => handleAnswerChange(question.id, option)}
                />
                {option}
              </label>
            ))}
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
