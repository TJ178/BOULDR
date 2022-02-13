import React from "react";
//import firebase from "../firebase-config.js";
import ProblemList from "../components/problems/ProblemList";
import gymPic from "../assets/gymPic.png";
import { db, app, storage } from "../firebase-config.js";
import { collection, getDocs } from 'firebase/firestore';
import { ref, getDownloadURL } from 'firebase/storage';



const tempProbs = [
  {
    id: 1,
    image: gymPic,
    title: "A Silly Little Problem",
    isFavorite: false,
    gym: "Wooden",
    description: "Go touch rock",
  },
  {
    id: 2,
    image: gymPic,
    title: "Something is going up?",
    isFavorite: false,
    gym: "Cliffs of Id",
    description: "Go touch rock but at this gym",
  },
];

class HomePage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: tempProbs
    };
  }

  componentDidMount(){
    console.log('tempProbs:');
    console.log(tempProbs);
    getData().then(
      (value) => {
        value.forEach((problem) =>{
          getDownloadURL(ref(storage, problem['image'])).then(
            (value2) => {
              let temp = problem;
              temp['image'] = value2;
              this.setState({
                data: value
              });
              console.log("updated!");
              console.log(this.state.data);
            }, (error) => {
              console.error(error);
            }
          );
        });
      },
      (error) => {
        console.error(error);
        this.setState({
          data: tempProbs
        });
      }).finally((info) =>{
        console.log("done?")
      });
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


async function getData(){
  let tempData = [];
  const querySnapshot = await getDocs(collection(db, "problems"));
  querySnapshot.forEach((doc) => {
    let temp = {};
    temp['id'] = doc.id;
    temp['image'] = doc.get('img');
    temp['title'] = doc.get('name');
    temp['isFavorite'] = false;
    temp['gym'] = doc.get('gymname');
    temp['description'] = doc.get('description');
    temp['rating'] = doc.get('rating');
    tempData = tempData.concat(temp);
    console.log(doc.id, " => ", doc.data());
  });

  console.log('data:');
  console.log(tempData);
  return tempData;
}

function updateData(){
  getData().then(
    (value) => {
      return value;
    },
    (error) => {
      console.error(error);
    }).finally((info) =>{
      console.log("done?")
    });
    return tempProbs;
}

export default HomePage;
