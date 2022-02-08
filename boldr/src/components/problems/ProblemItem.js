import React from "react";
import classes from "./ProblemItem.module.css";
import Card from "../ui/Card";
import Bookmark from "../ui/Bookmark";
import { Link } from "react-router-dom";

function ProblemItem(props) {
  return (
    <li className={classes.item}>
      <Card>
        <Link to="/gym-page">
          <img className={classes.image} src={props.image} alt={props.title} />
        </Link>
        <div className={classes.info}>
          <div className={classes.title_card}>
            <div>
              <h2>{props.title}</h2>
              <h3>{props.gym}</h3>
            </div>
            <Bookmark />
          </div>
          <div className={classes.tags}>
            <h3>This is where the tags should go</h3>
          </div>
          <div className={classes.rating}>
            <h2>This is where the rating should go</h2>
          </div>
          <div className={classes.difficulty}>
            <h1>V0</h1>
          </div>
        </div>
      </Card>
    </li>
  );
}

export default ProblemItem;
