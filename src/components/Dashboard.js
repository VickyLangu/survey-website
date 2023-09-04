import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

const Dashboard = ({ responses }) => {
  const [responseData, setResponseData] = useState([]);
  const [questionData, setQuestionData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/responses")
      .then((response) => response.json())
      .then((data) => setResponseData(data))
      .catch((error) => console.error("Error fetching data: ", error));

    fetch("http://localhost:5000/questions") // Fetch questions data
      .then((response) => response.json())
      .then((data) => setQuestionData(data))
      .catch((error) => console.error("Error fetching question data: ", error));
  }, []);

  const countResponses = () => {
    const counts = {
      Agree: 0,
      Neutral: 0,
      Disagree: 0,
    };

    responseData.forEach((response) => {
      response.responses.forEach((value) => {
        if (value === "Agree") {
          counts.Agree += 1;
        } else if (value === "Neutral") {
          counts.Neutral += 1;
        } else if (value === "Disagree") {
          counts.Disagree += 1;
        }
      });
    });

    return counts;
  };

  const countQuestions = () => {
    return questionData.length; // Return the number of questions
  };

  const responseCounts = countResponses();
  const questionCounts = countQuestions();

  return (
    <div className="data-table">
      <h1 className="table-h1">Dashboard</h1>
      <table>
        {/* <thead>
          {/* <tr>
            <th>Response Type</th>
            <tr>
              <th>Number of Questions</th>
            </tr>
            {/* Add a new column for question counts 
          </tr> 
        </thead> */}
        <tbody>
          <tr className="row">
            <td>
              Agree <br /> {responseCounts.Agree}
            </td>

            {/* <td>{questionCounts.Agree}</td> Display question counts */}

            {/* <tr className="row"> */}
            <td>
              Neutral
              <br /> {responseCounts.Neutral}
            </td>

            {/* <td>{questionCounts.Neutral}</td> Display question counts */}
            {/* </tr>
          <tr className="row"> */}
            <td>
              Disagree <br /> {responseCounts.Disagree}
            </td>

            {/* <td>{questionCounts.Disagree}</td> Display question counts */}
          </tr>

          <tr className="row">
            {" "}
            <td>
              Questions <br /> {questionCounts}{" "}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;
