import React from "react";
import ProblemDetails from "../components/problems/ProblemDetails";
import { useParams } from 'react-router-dom';
import { db } from "../firebase-config.js";
import { doc } from 'firebase/firestore';
import { useDocumentOnce } from 'react-firebase-hooks/firestore'
import { convertDocumentToProblem } from '../FirebaseSupport.js'

function ProblemDetailsPage(props){
  let params = useParams();
  const [data, loading, error] = useDocumentOnce(doc(db, 'problems', params.problemId));

  return (
    <>
      {error && <p><strong>Error Loading Problems: {JSON.stringify(error)}</strong></p>}
      {loading && <p><span>Loading...</span></p>}
      {data && <ProblemDetails prob={convertDocumentToProblem(data)} />}
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
