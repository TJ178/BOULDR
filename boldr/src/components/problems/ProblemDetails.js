import React, { useState } from "react";
import classes from "./ProblemDetails.module.css";
import { Rating } from "react-simple-star-rating";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import { useParams } from 'react-router-dom';
import { useDownloadURL } from 'react-firebase-hooks/storage';
import { ref } from 'firebase/storage';
import {storage, db} from '../../firebase-config.js';
import loadingImg from '../../assets/loading.png'
import { doc, updateDoc, increment} from 'firebase/firestore';

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
  const [disableSubmit, setDisableSubmit] = useState(false);
  const [disableDropdown, setDisableDropdown] = useState(false);

  let params = useParams();
  const problemId = params.problemId;
  const problemDoc = doc(db, "problems", problemId);

  const updateStarRating = async (starVal) => {
    starVal = starVal/20;
    switch (starVal) {
      case 1: await updateDoc(problemDoc, {"allstars.1": increment(1)}); break;
      case 2: await updateDoc(problemDoc, {"allstars.2": increment(1)}); break;
      case 3: await updateDoc(problemDoc, {"allstars.3": increment(1)}); break;
      case 4: await updateDoc(problemDoc, {"allstars.4": increment(1)}); break;
      case 5: await updateDoc(problemDoc, {"allstars.5": increment(1)}); break;
      default: break;
    }
    setDisableSubmit(true);

  };

  const updateVRating = async (e) => {
    setDropdownVal(e);
    switch (e) {
      case "V0": await updateDoc(problemDoc, {"allvratings.V0": increment(1)}); break;
      case "V1": await updateDoc(problemDoc, {"allvratings.V1": increment(1)}); break;
      case "V2": await updateDoc(problemDoc, {"allvratings.V2": increment(1)}); break;
      case "V3": await updateDoc(problemDoc, {"allvratings.V3": increment(1)}); break;
      case "V4": await updateDoc(problemDoc, {"allvratings.V4": increment(1)}); break;
      case "V5": await updateDoc(problemDoc, {"allvratings.V5": increment(1)}); break;
      case "V6": await updateDoc(problemDoc, {"allvratings.V6": increment(1)}); break;
      case "V7": await updateDoc(problemDoc, {"allvratings.V7": increment(1)}); break;
      case "V8": await updateDoc(problemDoc, {"allvratings.V8": increment(1)}); break;
      case "V9": await updateDoc(problemDoc, {"allvratings.V9": increment(1)}); break;
      case "V10": await updateDoc(problemDoc, {"allvratings.V10": increment(1)}); break;
      default: console.log("default case"); break;
    }
    setDisableDropdown(true);
  }

  const handleStarClick = (e) => {
    //console.log("handleStarClick");
    setStarVal(e);
  };

  return (
    <>
      <div>
        {disableSubmit ? <Alert variant='success'>Successfully submitted star rating</Alert> : ""}
        {disableDropdown ? <Alert variant='success'>Successfully submitted V rating</Alert> : ""}
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
            <Button disabled = {disableSubmit} onClick={() => updateStarRating(starVal)}>Submit</Button>
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
              onSelect= {updateVRating}
              variant="secondary"
            >
              {dropdownOptions.map((item) => (
                <Dropdown.Item
                  key={item}
                  className={classes.DropdownItem}
                  eventKey={item}
                  disabled = {disableDropdown}
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
