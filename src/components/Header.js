import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  const pages = ["Dashboard", "Questionnaire", "Create"];

  return (
    <nav className="sidebar">
      <div>
        <h2 className="Logo">LOGO</h2>
      </div>
      <ul className="sidebar-nav">
        {pages.map((page) => (
          <li key={page} className="sidebar-item">
            <Link to={`/${page.toLowerCase()}`} className="sidebar-link">
              {page}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Header;
