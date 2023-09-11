import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { FaTrashAlt, FaPencilAlt } from "react-icons/fa";
import "./Edit.css";

const EditQuestion = ({ onSave, onCancel }) => {
  const [editedQuestionIndex, setEditedQuestionIndex] = useState(null);
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/questions")
      .then((response) => response.json())
      .then((data) => setQuestions(data))
      .catch((error) => console.error("Error fetching questions: ", error));
  }, []);

  const removeQuestion = (indexToRemove) => {
    const questionToDelete = questions[indexToRemove];

    fetch(`http://localhost:5000/questions/${questionToDelete.id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to delete question on the server");
        }
        return response.json();
      })
      .then(() => {
        const updatedQuestions = [...questions];
        updatedQuestions.splice(indexToRemove, 1);
        setQuestions(updatedQuestions);
      })
      .catch((error) => {
        console.error("Error deleting question:", error);
      });
  };

  const handleInputChange = (index, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].questions[0] = value;
    setQuestions(updatedQuestions);
  };

  const handleEdit = (index) => {
    setEditedQuestionIndex(index);
  };

  const handleSave = (index) => {
    const updatedQuestion = questions[index];
    if (updatedQuestion) {
      fetch(`http://localhost:5000/questions/${updatedQuestion.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedQuestion),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to update question on the server");
          }
          return response.json();
        })
        .then(() => {
          setEditedQuestionIndex(null);
        })
        .catch((error) => {
          console.error("Error updating question:", error);
        });
    } else {
      console.error("Question not found at index", index);
    }
  };

  return (
    <div className="Edit">
      <ul className="edit-list">
        {questions.map((questionObj, index) => (
          <li key={index} className="Edit-input">
            {editedQuestionIndex === index ? (
              <div className="edit-input-container">
                <input
                  type="text"
                  value={questionObj.questions[0]}
                  onChange={(e) => handleInputChange(index, e.target.value)}
                  className="edit-input-field"
                />
                <button onClick={() => handleSave(index)}>Save</button>

                <button onClick={() => setEditedQuestionIndex(null)}>
                  Cancel
                </button>
              </div>
            ) : (
              <div>
                {questionObj.questions[0]}
                <FaPencilAlt
                  style={{ color: "black", cursor: "pointer" }}
                  className="icons"
                  onClick={() => handleEdit(index)}
                />
                <FaTrashAlt
                  style={{ color: "black", cursor: "pointer" }}
                  className="icons"
                  onClick={() => removeQuestion(index)}
                />
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

EditQuestion.propTypes = {
  onSave: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default EditQuestion;
