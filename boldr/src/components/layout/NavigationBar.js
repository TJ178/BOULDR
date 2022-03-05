import React from "react";
import { Link } from "react-router-dom";

import classes from "./NavigationBar.module.css";
import logo from "../../assets/BOULDR_Logo.png";
import usr from "../../assets/usr.png";
import { Button } from "react-bootstrap";

import { useAuth } from '../../contexts/AuthContext.js';

function NavigationBar(props) {
  const { currentUser } = useAuth();


  return (
    <header className={classes.header}>
      <div className={ classes.logo_spacing}>
        <Link to="/" className={classes.logo_link}>
          <img className={classes.logo} src={logo} alt="Logo" />
        </Link>
      </div>
      <nav>
        <ul>
          {currentUser ? (
            <li>
              <Link to="/profile">
                <img className={classes.profile} src={usr} alt="MissingUsr" />
              </Link>
            </li>
          ) : (
            <li>
              <Link to="/login"><Button vaiant="primary">Log In</Button></Link>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default NavigationBar;
