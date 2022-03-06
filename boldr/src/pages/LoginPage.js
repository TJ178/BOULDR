import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { Link, useNavigate, Navigate } from "react-router-dom";
import classes from "./LoginPage.module.css";
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
      <div className={classes.flexbox}>
        <Card className="text-center" style={{ width: "80%" }}>
          <Card.Body>
            <Card.Title>Log In</Card.Title>
            {currentUser && currentUser.email}
            {error && <Alert variant="danger"> {error} </Alert>}
            <div className={classes.flexbox}>
              <Form onSubmit={handleSubmit} style={{ width: "60%" }}>
                <Form.Group id="email">
                  <Form.Label>Username (Email)</Form.Label>
                  <Form.Control type="email" ref={emailRef} required />
                </Form.Group>
                <Form.Group id="password">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" ref={passwordRef} required />
                </Form.Group>
                <Button disabled={loading} type="submit">
                  Log In
                </Button>
              </Form>
            </div>
            <div className="w-100 text-center mt-2">
              Need an account? <Link to="/create-account">Sign Up</Link>
            </div>
          </Card.Body>
        </Card>
      </div>
    </>
  );
}
