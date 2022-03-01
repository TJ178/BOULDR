import React, { useState } from "react";
import classes from "./ProblemDetails.module.css";
import { Rating } from "react-simple-star-rating";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import Button from 'react-bootstrap/Button';
import {db} from '../../firebase-config';
import { doc, updateDoc, increment} from 'firebase/firestore';

const dropdownOptions = [
  "V0",
  "V1",
  "V2",
  "V3",
  "V4",
  "V5",
  "V6",
  "V7",
  "V8",
  "V9",
  "V10",
];

function ProblemDetails(props) {
  const initialDifficulty = "V" + String(props.prob.difficulty);

  const [starVal, setStarVal] = useState(props.prob.rating);
  const [dropdownVal, setDropdownVal] = useState(initialDifficulty);
  const [subStarVal, setSubStarVal] = useState("");

  /*const starCollectionRef = collection(db, 'subStarVal');

  const createStar = async () => {
      await addDoc(starCollectionRef, {rating: subStarVal});
  };*/

  const updateStarRating = async (id, starVal) => {
    console.log("updateStarRating");
    const problemDoc = doc(db, "problems", id);
    starVal = starVal/20;
    switch (starVal) {
      case 1: await updateDoc(problemDoc, {"allstars.1": increment(1)}); break;
      case 2: await updateDoc(problemDoc, {"allstars.2": increment(1)}); break;
      case 3: await updateDoc(problemDoc, {"allstars.3": increment(1)}); break;
      case 4: await updateDoc(problemDoc, {"allstars.4": increment(1)}); break;
      case 5: await updateDoc(problemDoc, {"allstars.5": increment(1)}); break;
      default: break;
    }
  };

  const handleStarClick = (e) => {
    console.log("handleStarClick");
    setStarVal(e);
  };

  const handleDropdownSelect = (e) => {
    console.log(e + " " + dropdownVal);
    setDropdownVal(e);
  };

  const handleSubmitStar = (e) => {
    console.log(starVal + " " + e + " " + subStarVal);
    setSubStarVal(starVal);
  };

  return (
    <>
      <div>
        <img className={classes.image} src={props.prob.image} alt="Problem" />
      </div>
      <section className={classes.section}>
        <div className={classes.heading}>
          <div>
            <h2> {props.prob.title}</h2>
            <h3> {props.prob.gym} </h3>
          </div>
          <div className={classes.star}>
            <Rating
              onClick={handleStarClick}
              ratingValue={starVal}
              initialValue={starVal}
              size={30}
              transition={false}
            />
            <Button onClick={() => updateStarRating("B2LKX291ngI6oxgmjkT8", starVal)}>Submit</Button>
          </div>
        </div>
        <div className={classes.tags}>
          <p>this is where the tags should go</p>
          <Button  size="sm">Add tags</Button>
        </div>
        <div className={classes.difficulty}>
          <div className={classes.ourRating}>
            <h2> Our Rating:</h2>
            <Button variant='secondary' disabled
              >{initialDifficulty}
            </Button>
          </div>
          <div className={classes.userDifficulty}>
            <h2>Your rating:   </h2>
            <DropdownButton
              // alignRight
              className={classes.dropdown}
              id="rating-button"
              title={dropdownVal}
              onSelect= {handleDropdownSelect}
              variant="secondary"
            >
              {dropdownOptions.map((item) => (
                <Dropdown.Item
                  key={item}
                  className={classes.DropdownItem}
                  eventKey={item}
                >
                  {item}
                </Dropdown.Item>
              ))}
            </DropdownButton>
          </div>
        </div>
      </section>
      
    </>
  );
}

export default ProblemDetails;
