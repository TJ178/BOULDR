import React from "react";
import { Link } from "react-router-dom";

import classes from "./Footer.module.css";
import logo from "../../assets/logo.png";

function Footer(props) {
  return (
    <footer className={classes.footer}>
      <div className={classes.logo_spacing}>
        <Link to="/">
          <img className={classes.logo} src={logo} alt="Logo" />
        </Link>
      </div>
      <div></div>
      <div></div>
    </footer>
  );
}

export default Footer;