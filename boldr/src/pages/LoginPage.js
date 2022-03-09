import React, { useRef, useState } from "react";
import { Form, FloatingLabel, Button, Card, Alert } from "react-bootstrap";
import { Link, useNavigate, Navigate } from "react-router-dom";
import ClimbingBackground from "../components/background/ClimbingBackground";
import classes from "./LoginPage.module.css";
import background from "../assets/climbing_background.jpg";
import logo from "../assets/BOULDR_Logo_Lg.png";
import { useAuth } from "../contexts/AuthContext.js";

export default function CreateAccountPage() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login, currentUser } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setError("");
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      navigate("/");
    } catch {
      setError("Failed to sign in");
    }
    setLoading(false);
  }

  return (
    <>
      {currentUser ? <Navigate to="/" /> : null}
      <ClimbingBackground>
        <div className={classes.logincontents}>
          <Link to="/" className={classes.logo_link}>
            <img
                  src={logo}
                  alt="BOULDR"
            className={classes.logo}
                />
          </Link>
          <h4 style={{ paddingBottom: "1.25%" }}>Ready to climb?</h4>
          {currentUser && currentUser.email}
          {error && <Alert variant="danger"> {error} </Alert>}
          <div className={classes.flexbox}>
            <Form onSubmit={handleSubmit} style={{ width: "90%" }}>
              <FloatingLabel label="Email" id="email" className="mb-3">
                <Form.Control
                  type="email"
                  placeholder="Email Address"
                  ref={emailRef}
                  required
                />
              </FloatingLabel>
              <FloatingLabel label="Password" id="password" className="mb-3">
                <Form.Control
                  type="password"
                  placeholder="Password"
                  ref={passwordRef}
                  required
                />
              </FloatingLabel>
              <Button
                disabled={loading}
                type="submit"
                style={{ width: "100%" }}
              >
                Log In
              </Button>
            </Form>
          </div>
          <div className="fs-5 mt-2">
            Need an account? <Link to="/create-account">Sign Up</Link>
          </div>
        </div>
      </ClimbingBackground>
    </>
  );
}
