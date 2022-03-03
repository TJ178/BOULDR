import React from "react";
//import firebase from "../firebase-config.js";
import ProblemList from "../components/problems/ProblemList";
import gymPic from "../assets/gymPic.png";
//import { db, app, storage } from "../firebase-config.js";
//import { collection, getDocs } from 'firebase/firestore';
//import { ref, getDownloadURL } from 'firebase/storage';
import {getAllProblems, fallbackProbs} from '../FirebaseSupport.js';

class HomePage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: fallbackProbs
    };
  }

  componentDidMount(){
    getAllProblems(this);
  }

  render(){
    return (
      <section>
        <h1 style={{textAlign: "center"}}> Add the searchbar here </h1>
        <h1>Recent Activity</h1>
        <ProblemList problems={this.state.data} />
      </section>
    );
  }
}

export default HomePage;
