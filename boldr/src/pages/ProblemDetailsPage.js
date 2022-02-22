import React from "react";
import ProblemDetails from "../components/problems/ProblemDetails";

function ProblemDetailsPage(props) {
  return (
    <>
      <ProblemDetails prob={props.prob} />
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

export default ProblemDetailsPage;
