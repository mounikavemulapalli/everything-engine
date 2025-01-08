import React, { useState, useEffect } from "react";
import axios from "axios";

function UserPanel() {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [pdfUrl, setPdfUrl] = useState(null); // Store the generated PDF URL

  useEffect(() => {
    // Fetch questions from the backend
    const fetchQuestions = async () => {
      try {
        const response = await axios.get("http://localhost:3000/get-questions");
        setQuestions(response.data);
        setLoading(false); // Set loading to false after fetching
      } catch (error) {
        console.error("Error fetching questions:", error);
        alert("Failed to fetch questions.");
        setLoading(false); // Stop loading if there’s an error
      }
    };

    fetchQuestions();
  }, []);

  // Handle answer change
  const handleAnswerChange = (questionIndex, answer) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionIndex]: answer,
    }));
  };

  // Submit answers
  const submitAnswers = async () => {
    setIsSubmitting(true); // Set submitting state to true

    // Check if all questions are answered
    const allQuestionsAnswered = questions.every((_, index) => answers[index]);
    if (!allQuestionsAnswered) {
      alert("Please answer all questions before submitting.");
      setIsSubmitting(false);
      return;
    }

    // Format answers for submission
    const formattedAnswers = Object.keys(answers).map((key) => ({
      questionId: questions[key]._id, // Ensure this matches the MongoDB _id field
      answer: answers[key], // The selected answer
    }));

    try {
      console.log("Formatted Answers:", formattedAnswers);

      const response = await axios.post(
        "http://localhost:3000/submit-answers",
        { answers: formattedAnswers }
      );

      alert("Answers submitted successfully!");
      console.log("Response:", response.data);

      // Store the generated PDF URL
      if (response.data.pdfUrl) {
        setPdfUrl(`http://localhost:3000${response.data.pdfUrl}`);
      }
    } catch (error) {
      console.error("Error submitting answers:", error);
      alert("Failed to submit answers.");
    } finally {
      setIsSubmitting(false); // Reset submitting state after completion
    }
  };

  if (loading) {
    return <p>Loading questions...</p>;
  }

  if (!questions.length) {
    return <p>No questions available at the moment.</p>;
  }

  return (
    <div>
      <h2>User Panel</h2>
      <form onSubmit={(e) => e.preventDefault()}>
        {questions.map((q, index) => (
          <div key={index}>
            <p>
              <strong>{q.question}</strong>
            </p>
            {q.options.map((option, i) => (
              <label key={i}>
                <input
                  type='radio'
                  name={`question-${index}`}
                  value={option}
                  onChange={() => handleAnswerChange(index, option)}
                  checked={answers[index] === option}
                />
                {option}
              </label>
            ))}
            <br />
          </div>
        ))}
        <button type='button' onClick={submitAnswers} disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Submit Answers"}
        </button>
      </form>

      {pdfUrl && (
        <div>
          <p>Your PDF has been generated:</p>
          <a href={pdfUrl} target='_blank' rel='noopener noreferrer'>
            Download PDF
          </a>
        </div>
      )}
    </div>
  );
}

export default UserPanel;
