import {
  BrowserRouter as Router,
  Routes,
  Route,
  Switch,
} from "react-router-dom";
import ReactDOM from "react-dom/client";
import Header from "./components/Header";
import Dashboard from "./components/Dashboard";
import Create from "./components/Create";
import Questionnaire from "./components/Questionnaire";

const App = () => {
  const dashboard = () => {
    console.log();
  };
  const questions = () => {
    console.log();
  };
  const list = () => {
    console.log();
  };
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/questionnaire" element={<Questionnaire />} />
        <Route path="/create" element={<Create />} />
      </Routes>
    </Router>
  );
};

export default App;
