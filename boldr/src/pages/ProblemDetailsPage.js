import React from "react";
import ProblemDetails from "../components/problems/ProblemDetails";
import { useParams } from 'react-router-dom';
import {getAllProblems, fallbackProbs, getProblemFromID} from '../FirebaseSupport.js';

class ProblemDetailsPageComponent extends React.Component{
  constructor(props) {
    super(props);

    let params = props.params;
    this.state = ({
      data: fallbackProbs,
      problemId: params.problemId
    });
    console.log(params.problemId);
  }

  componentDidMount(){
    getProblemFromID(this, this.state.problemId);
  }

  render(){

    return (
      <>
        <ProblemDetails prob={this.state.data} id={this.state.problemId} />
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
  
}


function ProblemDetailsPage(props) {
  let params = useParams();
  console.log(params);
  return <ProblemDetailsPageComponent  {...props} params={params} />
}

export default ProblemDetailsPage;
