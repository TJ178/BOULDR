import React from "react";
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faFacebook } from "@fortawesome/free-brands-svg-icons";

import classes from "./Footer.module.css";
import logo from "../../assets/logo.png";

function Footer(props) {
  return (
    <footer className={classes.footer}>
      <div>
        <Link to="/">
          <img className={classes.logo} src={logo} alt="Logo" />
        </Link>
      </div>
      <div>BOLDR © 2022</div>
      <div className={classes.flexbox}>
        <FontAwesomeIcon className={classes.socials} icon={faTwitter} size="2x" />
        <FontAwesomeIcon className={classes.socials} icon={faInstagram} size="2x" />
        <FontAwesomeIcon className={classes.socials} icon={faFacebook} size="2x" />
      </div>
    </footer>
  );
}

export default Footer;
