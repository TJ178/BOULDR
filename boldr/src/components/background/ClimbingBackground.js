import React from "react";
import classes from "./ClimbingBackground.module.css";
import background from "../../assets/climbing_background.jpg";

function ClimbingBackground(props) {
  return (
    <div
      className={classes.background}
      style={{ backgroundImage: `url(${background})` }}
    >
      <div className={classes.gradient}>{props.children}</div>
    </div>
  );
}

export default ClimbingBackground;
