import React from "react";
import classes from "./ProblemDetails.module.css";
import { Rating } from "react-simple-star-rating";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";

function ProblemDetails(props) {
  function handleStarClick(e) {
    return console.log(e);
  }

  function handleDropdownSelect(e) {
    return console.log(e);
  }

  const initialDifficulty = "V" + String(props.prob.difficulty);
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
              onClick={(e) => handleStarClick(e)}
            />
          </div>
        </div>
        <div className={classes.tags}>
          <p>this is where the tags should go</p>
          <button>Add tags</button>
        </div>
        <div className={classes.difficulty}>
          <h1> Our Rating: {initialDifficulty}</h1>
          <div className={classes.userDifficulty}>
            <h1>Your rating: </h1>
            <DropdownButton
            
            //   className={classes.dropdown}
              id="rating-button"
              title={initialDifficulty}
              onSelect={(e) => handleDropdownSelect(e)}
              variant="secondary"
            >
              <Dropdown.Item eventKey="0">V0</Dropdown.Item>
              <Dropdown.Item eventKey="1">V1</Dropdown.Item>
              <Dropdown.Item eventKey="2">V2</Dropdown.Item>
              <Dropdown.Item eventKey="3">V3</Dropdown.Item>
              <Dropdown.Item eventKey="4">V4</Dropdown.Item>
              <Dropdown.Item eventKey="5">V5</Dropdown.Item>
              <Dropdown.Item eventKey="6">V6</Dropdown.Item>
              <Dropdown.Item eventKey="7">V7</Dropdown.Item>
              <Dropdown.Item eventKey="8">V8</Dropdown.Item>
              <Dropdown.Item eventKey="9">V9</Dropdown.Item>
              <Dropdown.Item eventKey="10">V10</Dropdown.Item>
            </DropdownButton>
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
