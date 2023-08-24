import PropTypes from "prop-types";
import { useState } from "react";

const Questionnaire = () => {
  const questions = [
    "The computer is the invention of the century",
    "The computer is the invention of the century",
    "The computer is the invention of the century",
    "The computer is the invention of the century",
    // ... more questions
  ];

  const [responses, setResponses] = useState(Array(questions.length).fill("")); // Initial responses array

  const handleRadioChange = (index, value) => {
    const updatedResponses = [...responses];
    updatedResponses[index] = value;
    setResponses(updatedResponses);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    console.log(responses); // Log the selected responses
  };

  return (
    <div className="centered-container">
      <form className="questionnaire-form" onSubmit={onSubmit}>
        <div>
          <h1>Questionnaire</h1>
        </div>
        {questions.map((question, index) => (
          <div key={index} className="question-label">
            <label>{question}</label> <h3>Agree</h3>
            <input
              type="radio"
              value="Agree"
              checked={responses[index] === "Agree"}
              onChange={() => handleRadioChange(index, "Agree")}
              className="input"
            />
            <h3>Neutral</h3>
            <input
              type="radio"
              value="Neutral"
              checked={responses[index] === "Neutral"}
              onChange={() => handleRadioChange(index, "Neutral")}
              className="input"
            />
            <h3> Disagree</h3>
            <input
              type="radio"
              value="Disagree"
              checked={responses[index] === "Disagree"}
              onChange={() => handleRadioChange(index, "Disagree")}
              className="input"
            />
          </div>
        ))}

        <input type="submit" value="Submit" className="submit-button" />
      </form>
    </div>
  );
};

export default Questionnaire;
