import PropTypes from "prop-types";
import EditQuestion from "./EditQuestion";
import { useState, useEffect } from "react";
import "./Edit.css";

const Create = (props) => {
  const [questions, setQuestions] = useState([]); // Initial questions array
  const [newQuestion, setNewQuestion] = useState("");
  const [editedQuestion, setEditedQuestion] = useState(null);

  const handleQuestionChange = (index, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index] = value;
    setQuestions(updatedQuestions);
    setEditedQuestion(null);
  };

  const addQuestion = () => {
    setQuestions([...questions, ""]);
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
            </div>
          ))}
          <input type="submit" value="Submit" className="submit-btn" />
        </form>
        <div className="questionnaire-form">
          <div>
            <h1 className="content-list">List of Questions</h1>
          </div>
          <EditQuestion />
        </div>
      </div>
    </div>
  );
};

Create.propTypes = {};

export default Create;
