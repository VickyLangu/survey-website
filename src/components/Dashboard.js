import { Link } from "react-router-dom";
import React from "react";
import PropTypes from "prop-types";

// const Dashboard = ({ responses }) => {
//   const countResponses = () => {
//     const counts = {
//       Agree: 0,
//       Neutral: 0,
//       Disagree: 0,
//     };

//     responses.forEach((response) => {

const Dashboard = ({ responses }) => {
  const [responseData, setResponseData] = React.useState([]);

  // Fetch the responses data from the JSON server
  React.useEffect(() => {
    fetch("http://localhost:3000/responses")
      .then((response) => response.json())
      .then((data) => setResponseData(data));
  }, []);

  // Calculate and display the data
  const countResponses = () => {
    const counts = {
      Agree: 0,
      Neutral: 0,
      Disagree: 0,
    };

    responseData.forEach((response) => {
      counts[response] += 1;
    });

    return counts;
  };

  const responseCounts = countResponses();

  return (
    <div>
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
