import React from "react";
import ProblemList from "../components/problems/ProblemList";
import { db } from "../firebase-config.js";
import { collection } from 'firebase/firestore';
import { convertCollectionToProblems } from '../FirebaseSupport.js';
import { useCollectionOnce } from 'react-firebase-hooks/firestore'

function HomePage() {
  const [data, loading, error] = useCollectionOnce(collection(db, 'problems'));

  return (
    <section>
      <h1 style={{textAlign: "center"}}> Add the searchbar here </h1>
      <h1>Recent Activity</h1>
      {error && <p><strong>Error Loading Problems: {JSON.stringify(error)}</strong></p>}
      {loading && <p><span>Loading...</span></p>}
      {data && <ProblemList problems={convertCollectionToProblems(data)} />}
    </section>
  );
}

export default HomePage;
