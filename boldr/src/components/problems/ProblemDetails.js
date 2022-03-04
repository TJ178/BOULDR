import React, { useState } from "react";
import classes from "./ProblemDetails.module.css";
import { Rating } from "react-simple-star-rating";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import Button from 'react-bootstrap/Button';

import { useDownloadURL } from 'react-firebase-hooks/storage';
import { ref } from 'firebase/storage';
import { storage } from '../../firebase-config.js';
import loadingImg from '../../assets/loading.png'


const dropdownOptions = [
  "V-",
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
  const [image, loading, error] = useDownloadURL(ref(storage, props.prob.image));

  const initialDifficulty = "V" + JSON.stringify(props.prob.vrating);

  const [starVal, setStarVal] = useState(props.prob.rating);
  const [dropdownVal, setDropdownVal] = useState(initialDifficulty);
  const [subStarVal, setSubStarVal] = useState("");

  const handleStarClick = (e) => {
    console.log(e + " " + starVal);
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
        {loading && <img className={classes.image} src={loadingImg} alt={props.prob.title} />}
        {image && <img className={classes.image} src={image} alt={props.prob.title} />}
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
            <Button onClick={handleSubmitStar}>Submit</Button>
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
              onSelect={handleDropdownSelect}
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
        <div class={classes.description}>
          {props.prob.description}
        </div>
      </section>
      
    </>
  );
}

export default ProblemDetails;
