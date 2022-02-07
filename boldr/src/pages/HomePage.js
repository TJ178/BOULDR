import React from "react";
import ProblemList from "../components/problems/ProblemList";
import gymPic from "../assets/gymPic.png";

function HomePage(props) {
  return (
    <section>
      <h1>All Problems</h1>
      <ProblemList problems={tempProbs} />
    </section>
  );
}

const tempProbs = [
  {
    id: 1,
    image: gymPic,
    title: "This is my Title",
    gym: "Name of Gym",
    description: "Go touch rock",
  },
  {
    id: 2,
    image: gymPic,
    title: "This is my Title2",
    gym: "Name of other Gym",
    description: "Go touch rock but at this gym",
  },
];

export default HomePage;
