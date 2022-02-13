import React from "react";
import classes from "./ProblemItem.module.css";
import Card from "../ui/Card";
import Bookmark from "../ui/Bookmark";
import { Rating } from 'react-simple-star-rating'
import { Link } from "react-router-dom";

function ProblemItem(props) {
  return (
    <li className={classes.item}>
      <Card>
        <Link to="/gym-page">
          {/* Need to find a way to pass props to the Gympage 
          through the Link component */}
          <img className={classes.image} src={props.image} alt={props.title} />
        </Link>
        <div className={classes.info}>
          <div className={classes.title_card}>
            <div>
              <h2>{props.title}</h2>
              <h3>{props.gym}</h3>
            </div>
            <Bookmark isFavorite={props.isFavorite} />
          </div>
          <div className={classes.tags}>
            <h3>This is where the tags should go</h3>
          </div>
          <div className={classes.rating}>
            {/* https://bestofreactjs.com/repo/prakhar1989-react-tags-react-tag-input */}
            {/* https://www.npmjs.com/package/react-simple-star-rating */}
            <Rating
              initialValue={3.5}
              size={30}
              transistion={true}
              // onClick={}
            />
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
