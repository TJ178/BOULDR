import React, {useRef, useState} from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import classes from "./CreateAccountPage.module.css";
import { useAuth } from '../contexts/AuthContext.js'

export default function CreateAccountPage() {
	const staffRef = useRef()
	const emailRef = useRef()
	const passwordRef = useRef()
	const passwordConfirmRef = useRef()
	const { signup } = useAuth()
	const [error, setError] = useState('')
	const [loading, setLoading] = useState(false)

	async function handleSubmit(e) {
		e.preventDefault()
		if (passwordRef.current.value !== passwordConfirmRef.current.value) {
			return setError('Passwords do not match')
		}
		try {
			setError('')
			setLoading(true)
			await signup(staffRef.current.value, emailRef.current.value, passwordRef.current.value)
		} catch {
			setError('Failed to create an account')
		}
		setLoading(false)
	}

	return (
		<>
			<Card>
				<Card.Body>
				     <h1 className = {classes.signup_header}> New Account </h1>	
					 {error && <Alert variant = "danger"> {error} </Alert>}
				<Form onSubmit={handleSubmit}>
					<Form.Group id = "staff">
						<Form.Label>Staff Account: </Form.Label>
						<Form.Check type = "checkbox" ref= {staffRef} />
					</Form.Group>
					<Form.Group id = "email">
						<Form.Label>Username (Email)</Form.Label>
						<Form.Control type = "username" ref = {emailRef} required />
					</Form.Group>
					<Form.Group id = "password">
						<Form.Label>Password</Form.Label>
						<Form.Control type = "password" ref = {passwordRef} required />
					</Form.Group>
					<Form.Group id = "password-confirm">
						<Form.Label>Password Confirmation</Form.Label>
						<Form.Control type = "password" ref = {passwordConfirmRef} required />
					</Form.Group>
					<Button disabled={loading} type="submit">
						Sign Up
					</Button>
				</Form>

				</Card.Body>
			</Card>
		</>
	)
}