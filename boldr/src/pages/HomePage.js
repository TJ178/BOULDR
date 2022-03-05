import React from "react";
import ProblemList from "../components/problems/ProblemList";
import { db } from "../firebase-config.js";
import { collection } from 'firebase/firestore';
import { convertCollectionToProblems, searchProblems } from '../FirebaseSupport.js';
import { useCollectionOnce } from 'react-firebase-hooks/firestore'
import { Form } from "react-bootstrap";
import { useNavigate, useSearchParams } from 'react-router-dom';

function HomePage() {
  const [data, loading, error] = useCollectionOnce(collection(db, 'problems'));
  let [searchParams, setSearchParams] = useSearchParams();

  async function handleSubmit(event) {
    event.preventDefault();
    setSearchParams({keyword: event.target.search.value});
  }

  async function handleChange(event){
    if(event.target.value == ""){
      setSearchParams({});
    }else{
      setSearchParams({keyword: event.target.value});
    }
  }

  return (
    <section>
      <Form onSubmit={handleSubmit}>
        <Form.Control type='text' placeholder={'Search...'} size='lg' name='search' 
                      defaultValue={searchParams ? searchParams.get('keyword') : ""} onChange={handleChange}/>
      </Form>
      <h1>Recent Activity</h1>
      {error && <p><strong>Error Loading Problems: {JSON.stringify(error)}</strong></p>}
      {loading && <p><span>Loading...</span></p>}
      {data && !searchParams && <ProblemList problems={convertCollectionToProblems(data)} />}
      {data && searchParams && <ProblemList problems={searchProblems(searchParams.get('keyword'), 
                                                      ['title', 'gym'], convertCollectionToProblems(data))} />}
    </section>
  );
}

export default HomePage;
