import PropTypes from "prop-types";
import { useState } from "react";

const Questionnaire = () => {
  const [responses, setResponses] = useState(Array(4).fill("")); // Initial responses array

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

        {/* Question 1 */}
        <div className="question-label">
          <label htmlFor="question1-agree">
            The computer is the invention of the century
          </label>{" "}
          <h3>Agree</h3>
          <input
            type="radio"
            id="question1-agree"
            name="question1"
            value="Agree"
            checked={responses[0] === "Agree"}
            onChange={() => handleRadioChange(0, "Agree")}
            className="input"
          />
          <h3>Neutral</h3>
          <input
            type="radio"
            id="question1-neutral"
            name="question1"
            value="Neutral"
            checked={responses[0] === "Neutral"}
            onChange={() => handleRadioChange(0, "Neutral")}
            className="input"
          />
          <h3> Disagree</h3>
          <input
            type="radio"
            id="question1-disagree"
            name="question1"
            value="Disagree"
            checked={responses[0] === "Disagree"}
            onChange={() => handleRadioChange(0, "Disagree")}
            className="input"
          />
        </div>

        {/* Question 2 */}
        <div className="question-label">
          <label htmlFor="question2-agree">
            The computer is the invention of the century
          </label>{" "}
          <h3>Agree</h3>
          <input
            type="radio"
            id="question2-agree"
            name="question2"
            value="Agree"
            checked={responses[1] === "Agree"}
            onChange={() => handleRadioChange(1, "Agree")}
            className="input"
          />
          <h3>Neutral</h3>
          <input
            type="radio"
            id="question2-neutral"
            name="question2"
            value="Neutral"
            checked={responses[1] === "Neutral"}
            onChange={() => handleRadioChange(1, "Neutral")}
            className="input"
          />
          <h3> Disagree</h3>
          <input
            type="radio"
            id="question2-disagree"
            name="question2"
            value="Disagree"
            checked={responses[1] === "Disagree"}
            onChange={() => handleRadioChange(1, "Disagree")}
            className="input"
          />
        </div>
        {/* Question 3 */}
        <div className="question-label">
          <label htmlFor="question3-agree">
            The computer is the invention of the century
          </label>{" "}
          <h3>Agree</h3>
          <input
            type="radio"
            id="question3-agree"
            name="question3"
            value="Agree"
            checked={responses[2] === "Agree"}
            onChange={() => handleRadioChange(2, "Agree")}
            className="input"
          />
          <h3>Neutral</h3>
          <input
            type="radio"
            id="question3-neutral"
            name="question3"
            value="Neutral"
            checked={responses[2] === "Neutral"}
            onChange={() => handleRadioChange(2, "Neutral")}
            className="input"
          />
          <h3> Disagree</h3>
          <input
            type="radio"
            id="question3-disagree"
            name="question3"
            value="Disagree"
            checked={responses[2] === "Disagree"}
            onChange={() => handleRadioChange(2, "Disagree")}
            className="input"
          />
        </div>
        {/* Question 4 */}
        <div className="question-label">
          <label htmlFor="question1-agree">
            The computer is the invention of the century
          </label>{" "}
          <h3>Agree</h3>
          <input
            type="radio"
            id="question4-agree"
            name="question4"
            value="Agree"
            checked={responses[3] === "Agree"}
            onChange={() => handleRadioChange(3, "Agree")}
            className="input"
          />
          <h3>Neutral</h3>
          <input
            type="radio"
            id="question4-neutral"
            name="question4"
            value="Neutral"
            checked={responses[3] === "Neutral"}
            onChange={() => handleRadioChange(3, "Neutral")}
            className="input"
          />
          <h3> Disagree</h3>
          <input
            type="radio"
            id="question4-disagree"
            name="question4"
            value="Disagree"
            checked={responses[3] === "Disagree"}
            onChange={() => handleRadioChange(3, "Disagree")}
            className="input"
          />
        </div>

        <input type="submit" value="Submit" />
      </form>
    </div>
  );
};

export default Questionnaire;
