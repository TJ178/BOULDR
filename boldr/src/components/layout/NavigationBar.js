import React from "react";
import { Link } from "react-router-dom";

function NavigationBar(props) {
  return (
    <header>
      <div>here logo</div>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/gym-page">Gym Page</Link>
          </li>
          <li>
            <Link to="/login">LoginPage</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default NavigationBar;
