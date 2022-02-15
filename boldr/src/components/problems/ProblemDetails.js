import React from "react";
import classes from "./ProblemDetails.module.css";
import { Rating } from "react-simple-star-rating";

function ProblemDetails(props) {
  function handleStarClick(e) {
    return;
  }

  return (
    <>
      <div className={classes.image_content}>
        <img className={classes.image} src={props.prob.image} />
      </div>
      <section className={classes.section}>
        <div className={classes.heading}>
          <div>
            <h1> {props.prob.title}</h1>
            <h2> {props.prob.gym} </h2>
          </div>
          <div className={classes.star}>
            <Rating
              initialValue={props.prob.rating}
              size={25}
              transition={true}
              //   onClick={(e) => handleStarClick}
            />
          </div>
        </div>
        <div className={classes.tags}>
          <p>this is where the tags should go</p>
          <button>Add tags</button>
        </div>
        <div className={classes.difficulty}>
          <h1> V: {props.prob.difficulty}</h1>
          <div className={classes.userDifficulty}>
            <h1>Your rating:  </h1>
            <p>dropdown</p>
          </div>
        </div>
      </section>
      {/* Add the section below if we choose to implement comments
        Still needs CSS styling*/}
      {/* <section className={classes.section}>
          <h1>
              Comments:
          </h1>
          <h3>
              This is where the first comment should go in an unordered list
          </h3>
      </section> */}
    </>
  );
}

export default ProblemDetails;
