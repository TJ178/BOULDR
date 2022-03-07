import React from "react";
import { Link } from "react-router-dom";

import classes from "./NavigationBar.module.css";
import logo from "../../assets/BOULDR_Logo.png";
import usr from "../../assets/usr.png";
import { Button } from "react-bootstrap";

import { useAuth } from '../../contexts/AuthContext.js';

import { useDownloadURL } from 'react-firebase-hooks/storage';
import { ref } from 'firebase/storage';
import { storage } from '../../firebase-config.js'

function NavigationBar(props) {
  const { currentUser, userData } = useAuth();

  let photoRef;
  if(currentUser){
    if(currentUser.photoURL){
      photoRef = ref(storage, currentUser.photoURL)
    }else{
      photoRef = ref(storage, "gs://boldr-f2e1c.appspot.com/media/usr.png")
    }
  }else{
    photoRef = ref(storage, "gs://boldr-f2e1c.appspot.com/media/usr.png")
  }
  const [image, loading, error] = useDownloadURL(photoRef);

  return (
    <header className={classes.header}>
      <div className={ classes.logo_spacing}>
        <Link to="/" className={classes.logo_link}>
          <img className={classes.logo} src={logo} alt="Logo" />
        </Link>
      </div>
      <nav>
        <ul style={{marginBottom: "0px"}}>
          {currentUser && userData.isStaff && (
            <li>
            <Link to="/add-problem">
              <Button>Add Problem</Button>
            </Link>
          </li>
          )}
          {currentUser ? (
            <li>
              <Link to="/profile">
                {<img className={classes.profile} src={image} />}
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
