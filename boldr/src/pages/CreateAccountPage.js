import React, { useRef, useState, useEffect } from "react";
import ClimbingBackground from "../components/background/ClimbingBackground";
import logo from "../assets/BOULDR_Logo_Lg.png";
import { Form, FloatingLabel, Button, Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import classes from "./CreateAccountPage.module.css";
import { useAuth } from "../contexts/AuthContext.js";

import { useDownloadURL } from "react-firebase-hooks/storage";
import { ref, uploadBytes } from "firebase/storage";
import { setDoc, doc, collection } from "firebase/firestore";
import { storage, db } from "../firebase-config.js";

import { updateProfile } from "firebase/auth";
import usr from "../assets/usr.png";

import { Navigate } from "react-router-dom";

export default function CreateAccountPage() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const nameRef = useRef();

  const [fileRef, setFileRef] = useState("");
  const [fileName, setFileName] = useState("chumBucket.jpg");
  const [image, loadingImage, imageError] = useDownloadURL(
    ref(storage, "media/" + fileName)
  );
  const [imageUploaded, setImageUploaded] = useState(false);

  const { signup, currentUser } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [staff, setStaff] = useState(false);
  const [gym, setGym] = useState("");
  const navigate = useNavigate();

  const onFileChange = async (e) => {
    const file = e.target.files[0];
    const storageRef = ref(storage, "media/" + file.name);
    setFileRef(storageRef);
    setFileName(file.name);
    uploadBytes(storageRef, file).then((snapshot) => {
      setImageUploaded(true);
    });
  };

  const updateStaff = (e) => {
    console.log(e.target.checked);
    setStaff(e.target.checked);
  };

  async function handleSubmit(e) {
    e.preventDefault();
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match");
    }
    try {
      setError("");
      setLoading(true);
      let user;
      await signup(emailRef.current.value, passwordRef.current.value).then(
        (userCredential) => {
          user = userCredential.user;
          const photo = fileRef
            ? fileRef.toString()
            : "gs://boldr-f2e1c.appspot.com/media/usr.png";
          console.log(photo);
          updateProfile(user, {
            displayName: e.target[1].value,
            photoURL: photo,
          });
        }
      );

      await setDoc(doc(collection(db, "users"), user.uid), {
        favorites: [],
        ratedProblems: {},
        isStaff: Boolean(staff),
        homeGym: String(gym),
      });
      navigate("/");
    } catch (error) {
      setError("Failed to create an account: " + error.message);
      console.error(error);
    }
    setLoading(false);
  }

  useEffect(() => {
    return () => setLoading(false);
  }, []);

  return (
    <>
      {currentUser ? <Navigate to="/" /> : null}
      <ClimbingBackground>
        <div className={classes.contents}>
		<Link to="/" className={classes.logo_link}>
		  <img
            src={logo}
            alt="BOULDR"
			className={classes.logo}
          />
		</Link>
          <h4> Join a community of climbers! </h4>
          {imageUploaded && !loadingImage && (
            <img className={classes.profile} src={image} alt="" />
          )}
          {(!imageUploaded || loadingImage) && (
            <img className={classes.profile} src={usr} alt="" />
          )}
          {error && <Alert variant="danger"> {error} </Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formFile" className="mb-2">
              <Form.Label>Profile Picture</Form.Label>
              <Form.Control type="file" onChange={onFileChange} />
            </Form.Group>
            <FloatingLabel label="Name" id="name" className="mb-2">
              <Form.Control placeholder="Name" ref={nameRef} required />
            </FloatingLabel>
            <FloatingLabel label="Email" id="email" className="mb-2">
              <Form.Control
                placeholder="Email"
                type="email"
                ref={emailRef}
                required
              />
            </FloatingLabel>
            <FloatingLabel label="Password" id="password" className="mb-2">
              <Form.Control
                placeholder="Password"
                type="password"
                ref={passwordRef}
                required
              />
            </FloatingLabel>
            <FloatingLabel
              label="Confirm Password"
              id="password-confirm"
              className="mb-2"
            >
              <Form.Control
                placeholder="Confirm Password"
                type="password"
                ref={passwordConfirmRef}
                required
              />
            </FloatingLabel>
            <Form.Group id="home-gym" className="mb-3">
              <Form.Control
                as="select"
                value={gym}
                onChange={(e) => {
                  console.log("e.target.value", e.target.value);
                  setGym(e.target.value);
                }}
              >
                <option>Choose your home gym:</option>
                <option value="Cliffs of Id">Gym 1</option>
                <option value="Wooden">Gym 2</option>
                <option value="Rockcreation">Gym 3</option>
              </Form.Control>
            </Form.Group>
            <Form.Group id="staff">
              <Form.Check
                type="checkbox"
                name="staff"
                id="staff"
                label="Check this box if you're a gym staff member"
                onChange={updateStaff}
                value={staff}
                style={{ textAlign: "left" }}
              />
            </Form.Group>
            <Button
              disabled={loading}
              type="submit"
              style={{
                justfiySelf: "center",
                marginTop: "10px",
                width: "100%",
              }}
            >
              Sign Up
            </Button>
          </Form>

          <div className="fs-5 mt-2">
            Already have an account? <Link to="../login">Log In</Link>
          </div>
        </div>
      </ClimbingBackground>
    </>
  );
}
