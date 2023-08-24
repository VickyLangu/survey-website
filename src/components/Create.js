import PropTypes from "prop-types";
import { useState } from "react";
import { Link } from "react-router-dom";
import { FaTrashAlt } from "react-icons/fa";
import { FaPencilAlt } from "react-icons/fa";

const Create = (props) => {
  const questions = ["one", "two", "three", "four"];

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
    <div className="page-container">
      <div>
        <h1 className="title">Create a Questionnaire</h1>
        <button className="add-button">Add</button>
        <h1 className="content-list">List of Questions</h1>{" "}
      </div>
      <div className="add-form-container">
        <form className="add-form" onSubmit={onSubmit}>
          {questions.map((question, index) => (
            <div className="form-control">
              <label>
                The computer is the invention of the century{" "}
                <FaPencilAlt
                  style={{ color: "gray", cursor: "pointer" }}
                  className="icons"
                  // onClick={toggleEditing}
                />
                <FaTrashAlt
                  style={{ color: "gray", cursor: "pointer" }}
                  className="icons"
                  // onClick={() => onDelete(member.id)}
                />
              </label>
            </div>
          ))}
        </form>
      </div>
    </div>
  );
};

Create.propTypes = {};

export default Create;
