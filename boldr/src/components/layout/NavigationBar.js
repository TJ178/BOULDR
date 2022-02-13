import React from "react";
import { Link } from "react-router-dom";

import classes from "./NavigationBar.module.css";
import logo from "../../assets/logo.png";
import usr from "../../assets/usr.png";

function NavigationBar(props) {
  return (
    <header className={classes.header}>
      <div className={ classes.logo_spacing}>
        <Link to="/">
          <img className={classes.logo} src={logo} alt="Logo" />
        </Link>
      </div>
      <nav>
        <ul>
          <li>
            <Link to="/gym-page">Gym Page</Link>
          </li>
          <li>
            <Link to="/login">LoginPage</Link>
          </li>
          <li>
            <Link to="/profile">
              <img className={classes.profile} src={usr} alt="MissingUsr" />
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default NavigationBar;
