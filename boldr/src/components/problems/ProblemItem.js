import React from "react";
import classes from "./ProblemItem.module.css";
import Card from "../ui/Card";
import Bookmark from "../ui/Bookmark";
import Button from 'react-bootstrap/Button';
import { Rating } from "react-simple-star-rating";
import { Link } from "react-router-dom";
import { Row, Col, Container } from "react-bootstrap";

import { useDownloadURL } from "react-firebase-hooks/storage";
import { ref } from "firebase/storage";
import { storage } from "../../firebase-config.js";

import loadingImg from "../../assets/loading.png";

import { useAuth } from "../../contexts/AuthContext";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";

function ProblemItem(props) {
  const [image, loading, error] = useDownloadURL(ref(storage, props.image));
  const { currentUser, userData } = useAuth();

  return (
    <li className={classes.item}>
      <Card>
        <Container fluid style={{ paddingLeft: 0, paddingRight: 0}}>
          <Row>
            <Col>
              <Link to={"/problem-details/" + props.id}>
                {loading && (
                  <img
                    className={classes.image}
                    src={loadingImg}
                    alt={props.title}
                  />
                )}
                {image && (
                  <img
                    className={classes.image}
                    src={image}
                    alt={props.title}
                  />
                )}
              </Link>
            </Col>
            <Col xs={5} style={{paddingLeft: 0}}>
              <div className={classes.info}>
                <div>
                  <div className={classes.topflex}>
                    <div className={classes.empty}/>
                    {currentUser && !userData.isStaff && <Bookmark problemId={props.id} initial={userData.favorites.includes(props.id)}/>}
                    {currentUser && userData.isStaff && <Link to={'/edit-problem/' + props.id}><Button><FontAwesomeIcon icon={faPenToSquare} /></Button></Link>}
                  </div>
                  <h1>{props.title}</h1>
                  <h3 className={classes.gym_name}>{props.gym}</h3>
                </div>
                <div className={classes.rating}>
                  {/* https://bestofreactjs.com/repo/prakhar1989-react-tags-react-tag-input */}
                  <Rating
                    initialValue={props.rating}
                    size={40}
                    transistion={true}
                    readonly={true}
                    // onClick={}
                  />
                </div>
                <div className={classes.difficulty}>
                  <h3>V-Rating:</h3>
                  <Button variant='secondary' disabled>
                    V{props.vrating}
                  </Button>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </Card>
    </li>
  );
}

export default ProblemItem;
