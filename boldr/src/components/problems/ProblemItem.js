import React from "react";
import classes from "./ProblemItem.module.css";
import Card from "../ui/Card";
import Bookmark from "../ui/Bookmark";
import { Rating } from 'react-simple-star-rating'
import { Link } from "react-router-dom";
import { Row, Col, Container } from 'react-bootstrap';

function ProblemItem(props) {
  return (
    <li className={classes.item}>
      <Card>
        <Container fluid className={classes.noPadding}>
          <Row className={classes.noPadding}>
            <Col className={classes.noPadding}>
              <Link to={"/problem-details/" + props.id}>
                <img className={classes.image} src={props.image} alt={props.title} />
              </Link>
            </Col>
            <Col xs={5}>
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
                    initialValue={props.rating}
                    size={30}
                    transistion={true}
                    readonly={true}
                    // onClick={}
                  />
                </div>
                <div className={classes.difficulty}>
                  <h1>V{props.rating}</h1>
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
