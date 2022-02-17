import React from "react";
import ProblemList from "../components/problems/ProblemList";
import gymPic from "../assets/gymPic.png";

function HomePage(props) {
  return (
    <section>
      <h2 style={{textAlign: "center"}}> Add the searchbar here </h2>
      <h2>Recent Activity</h2>
      <ProblemList problems={tempProbs} />
    </section>
  );
}

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

export default HomePage;
