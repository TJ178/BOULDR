import React from "react";
import classes from "./ProblemItem.module.css";
import Card from "../ui/Card";

function ProblemItem(props) {
  return (
    <li className={classes.item}>
      <Card>
        <div className={classes.image}>
          <img src={props.image} alt={props.title} />
        </div>
        <div className={classes.content}>
          <h2>{props.title}</h2>
          <h3>{props.gym}</h3>
          <p>{props.description}</p>
        </div>
      </Card>
    </li>
  );
}

export default ProblemItem;
