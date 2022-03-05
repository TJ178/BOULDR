import React, {useRef, useState} from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { Link, useNavigate } from 'react-router-dom';
import classes from "./CreateAccountPage.module.css";
import { useAuth } from '../contexts/AuthContext.js';

export default function CreateAccountPage() {
	const emailRef = useRef()
	const passwordRef = useRef()
	const { login, currentUser } = useAuth()
	const [error, setError] = useState('')
	const [loading, setLoading] = useState(false)
	const navigate = useNavigate();

	async function handleSubmit(e) {
		e.preventDefault()
		try {
			setError('')
			setLoading(true)
			await login(emailRef.current.value, passwordRef.current.value)
			navigate("/");

		} catch {
			setError('Failed to sign in')
		}
		setLoading(false)
	}

	return (
		<>
			<Card>
				<Card.Body>
				     <h1 className = {classes.signin_header}> Log In </h1>
					 {currentUser && currentUser.email}
					 {error && <Alert variant = "danger"> {error} </Alert>}
					<Form onSubmit={handleSubmit}>
					<Form.Group id = "email">
						<Form.Label>Username (Email)</Form.Label>
						<Form.Control type = "email" ref = {emailRef} required />
					</Form.Group>
					<Form.Group id = "password">
						<Form.Label>Password</Form.Label>
						<Form.Control type = "password" ref = {passwordRef} required />
					</Form.Group>
					<Button disabled={loading} className={classes.submit} type="submit">
						Log In
					</Button>

				</Form>

				</Card.Body>
			</Card>
			<div className="w-100 text-center mt-2">
       			Need an account? <Link to="/create-account">Sign Up</Link>
      		</div>
		</>
	)
}