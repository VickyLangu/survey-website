import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

const Questionnaire = () => {
  const [responses, setResponses] = useState(Array(4).fill("")); // Initial responses array
  const [questions, setQuestions] = useState([]); // State to store questions

  useEffect(() => {
    // Fetch questions from the database
    fetch("http://localhost:5000/questions")
      .then((response) => response.json())
      .then((data) => setQuestions(data))
      .catch((error) => console.error("Error fetching questions: ", error));
  }, []);

  const handleRadioChange = (index, value) => {
    const updatedResponses = [...responses];
    updatedResponses[index] = value;
    setResponses(updatedResponses);
  };

  const onSubmit = async (event) => {
    event.preventDefault();

    // Create an object with the responses
    const responseObj = {
      responses: responses,
    };

    try {
      // Send a POST request to the JSON server to store the responses
      await fetch("http://localhost:5000/responses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(responseObj),
      });

      // Clear the responses after submitting
      setResponses(Array(4).fill(""));
    } catch (error) {
      console.error("Error submitting responses: ", error);
    }
  };

  return (
    <div className="centered-container">
      <form className="questionnaire-form" onSubmit={onSubmit}>
        <div>
          <h1>Questionnaire</h1>
        </div>

        {/* Render questions from the database */}
        {questions.map((question, index) => (
          <div className="question-label" key={index}>
            <label htmlFor={`question${index + 1}-agree`}>
              {question.questions}
            </label>{" "}
            <h3>Agree</h3>
            <input
              type="radio"
              id={`question${index + 1}-agree`}
              name={`question${index + 1}`}
              value="Agree"
              checked={responses[index] === "Agree"}
              onChange={() => handleRadioChange(index, "Agree")}
              className="input"
            />
            <h3>Neutral</h3>
            <input
              type="radio"
              id={`question${index + 1}-neutral`}
              name={`question${index + 1}`}
              value="Neutral"
              checked={responses[index] === "Neutral"}
              onChange={() => handleRadioChange(index, "Neutral")}
              className="input"
            />
            <h3> Disagree</h3>
            <input
              type="radio"
              id={`question${index + 1}-disagree`}
              name={`question${index + 1}`}
              value="Disagree"
              checked={responses[index] === "Disagree"}
              onChange={() => handleRadioChange(index, "Disagree")}
              className="input"
            />
          </div>
        ))}

        <input type="submit" value="Submit" className="submit-btn" />
      </form>
    </div>
  );
};

export default Questionnaire;
