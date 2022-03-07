import React from "react";
import ProblemList from "../components/problems/ProblemList";
import classes from "./HomePage.module.css";
import { db } from "../firebase-config.js";
import { collection } from "firebase/firestore";
import {
  convertCollectionToProblems,
  searchProblems,
} from "../FirebaseSupport.js";
import { useCollectionOnce } from "react-firebase-hooks/firestore";
import { Form, Alert } from "react-bootstrap";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext.js";

function HomePage() {
  const { currentUser, userData } = useAuth();
  const [data, loading, error] = useCollectionOnce(collection(db, "problems"));
  let [searchParams, setSearchParams] = useSearchParams();

  async function handleSubmit(event) {
    event.preventDefault();
    setSearchParams({ keyword: event.target.search.value });
  }

  async function handleChange(event) {
    if (event.target.value === "") {
      setSearchParams({});
    } else {
      setSearchParams({ keyword: event.target.value });
    }
  }

  function isStaffsGym(prob) {
    if (currentUser && userData.isStaff) {
      return userData.homeGym === prob.gym;
    } else {
      return true;
    }
  }

  return (
    <section>
      {/* <Form onSubmit={handleSubmit}>
        <Form.Control type='text' placeholder={'Search...'} size='lg' name='search' 
                      defaultValue={searchParams ? searchParams.get('keyword') : ""} onChange={handleChange}/>
      </Form> */}
      <Form
        onSubmit={handleSubmit}
        style={{ display: "flex", justifyContent: "center" }}
      >
        <Form.Control
          className={classes.form_label}
          bsPrefix="form_label"
          type="text"
          placeholder={"Search..."}
          size="lg"
          name="search"
          defaultValue={searchParams ? searchParams.get("keyword") : ""}
          onChange={handleChange}
        />
      </Form>
      {currentUser && userData.isStaff && <Alert variant="info">Signed in as Staff: Only showing problems from {userData.homeGym}</Alert>}
      {error && (
        <p>
          <strong>Error Loading Problems: {JSON.stringify(error)}</strong>
        </p>
      )}
      {loading && (
        <p>
          <span>Loading...</span>
        </p>
      )}
      {data && !searchParams && (
        <ProblemList
          problems={convertCollectionToProblems(data).filter(isStaffsGym)}
        />
      )}
      {data && searchParams && (
        <ProblemList
          problems={searchProblems(
            searchParams.get("keyword"),
            ["title", "gym"],
            convertCollectionToProblems(data).filter(isStaffsGym)
          )}
        />
      )}
    </section>
  );
}

export default HomePage;
