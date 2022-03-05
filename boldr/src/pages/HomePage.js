import React from "react";
import ProblemList from "../components/problems/ProblemList";
import { db } from "../firebase-config.js";
import { collection } from 'firebase/firestore';
import { convertCollectionToProblems } from '../FirebaseSupport.js';
import { useCollectionOnce } from 'react-firebase-hooks/firestore'
import { Form } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';

function HomePage() {
  const [data, loading, error] = useCollectionOnce(collection(db, 'problems'));
  let navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();
    navigate("/?=" + event.target.search.value);
  }

  return (
    <section>
      <Form onSubmit={handleSubmit}>
        <Form.Control type='text' placeholder='Search...' size='lg' name='search'/>
      </Form>
      <h1>Recent Activity</h1>
      {error && <p><strong>Error Loading Problems: {JSON.stringify(error)}</strong></p>}
      {loading && <p><span>Loading...</span></p>}
      {data && <ProblemList problems={convertCollectionToProblems(data)} />}
    </section>
  );
}

export default HomePage;
