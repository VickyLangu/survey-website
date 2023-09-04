import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

const Dashboard = ({ responses }) => {
  const [responseData, setResponseData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/responses")
      .then((response) => response.json())
      .then((data) => setResponseData(data))
      .catch((error) => console.error("Error fetching data: ", error));
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

  const responseCounts = countResponses();

  return (
    <div className="data-table">
      <h1>Dashboard</h1>
      <table>
        <thead>
          <tr>
            <th>Response Type</th>
            <th>Count</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Agree</td>
            <td>{responseCounts.Agree}</td>
          </tr>
          <tr>
            <td>Neutral</td>
            <td>{responseCounts.Neutral}</td>
          </tr>
          <tr>
            <td>Disagree</td>
            <td>{responseCounts.Disagree}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;
