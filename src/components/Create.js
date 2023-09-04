import PropTypes from "prop-types";
import { useState } from "react";
import { Link } from "react-router-dom";
import { FaTrashAlt } from "react-icons/fa";
import { FaPencilAlt } from "react-icons/fa";

const Create = (props) => {
  const [questions, setQuestions] = useState([""]); // Initial questions array
  const [newQuestion, setNewQuestion] = useState("");

  const handleQuestionChange = (index, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index] = value;
    setQuestions(updatedQuestions);
  };

  const addQuestion = () => {
    setQuestions([...questions, ""]);
  };

  const removeQuestion = (index) => {
    const updatedQuestions = [...questions];
    updatedQuestions.splice(index, 1);
    setQuestions(updatedQuestions);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    console.log(questions);

    const questionsObj = {
      questions: questions,
    };
    try {
      // Send a POST request to the JSON server to store the questions
      await fetch("http://localhost:5000/questions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(questionsObj),
      });

      // Clear the questions after submitting
      setQuestions([""]);
    } catch (error) {
      console.error("Error submitting questions: ", error);
    }
  };

  return (
    <div className="page-container">
      <div>
        <h1 className="title">Create a Questionnaire</h1>
        <button className="add-button" onClick={addQuestion}>
          Add Question
        </button>
      </div>
      <div className="add-form-container">
        <form onSubmit={onSubmit}>
          {questions.map((question, index) => (
            <div className="form-control" key={index}>
              <input
                type="text"
                value={question}
                onChange={(e) => handleQuestionChange(index, e.target.value)}
                placeholder="Enter your question"
                className="form-create"
              />
              <FaPencilAlt
                style={{ color: "black", cursor: "pointer" }}
                className="icons"
                // onClick={toggleEditing}
              />
              <FaTrashAlt
                style={{ color: "black", cursor: "pointer" }}
                className="icons"
                onClick={() => removeQuestion(index)}
              />
            </div>
          ))}
          <input type="submit" value="Submit" className="submit-btn" />
          <h1 className="content-list">List of Questions</h1>{" "}
        </form>
      </div>
    </div>
  );
};

Create.propTypes = {};

export default Create;
