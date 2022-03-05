import React, {useRef, useState, useEffect} from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { Link, useNavigate } from 'react-router-dom';
import classes from "./CreateAccountPage.module.css";
import { useAuth } from '../contexts/AuthContext.js';

import { useDownloadURL } from 'react-firebase-hooks/storage';
import { ref } from 'firebase/storage';
import { storage } from '../firebase-config.js'

import { updateProfile } from "firebase/auth";
import usr from '../assets/usr.png';

export default function CreateAccountPage() {
	const staffRef = useRef()
	const emailRef = useRef()
	const passwordRef = useRef()
	const passwordConfirmRef = useRef()
	const nameRef = useRef()
	const { signup, currentUser } = useAuth()
	const [error, setError] = useState("")
	const [loading, setLoading] = useState(false)
	const navigate = useNavigate();

	const [image, loadingImage, imageError] = [null, null, null]; //useDownloadURL(ref(storage, null));

	async function handleSubmit(e) {
		e.preventDefault()
		if (passwordRef.current.value !== passwordConfirmRef.current.value) {
			return setError('Passwords do not match')
		}
		try {
			setError('')
			setLoading(true)
			await signup(emailRef.current.value, passwordRef.current.value).then((userCredential) =>{
				const user = userCredential.user;
				console.log(user.uid);
				updateProfile(user, {
					displayName: nameRef,
					image: ""
				});
			});
			navigate("/");
		} catch (error){
			setError('Failed to create an account: ' + error.message)
			console.error(error)
		}
		setLoading(false)
	}

	useEffect(() => {
		return () => setLoading(false);
	  }, []);

	return (
		<>
			<Card>
				<Card.Body>
					<h1 className = {classes.signup_header}> New Account </h1>
					{image && <img className={classes.profile} src={image} alt="MissingUsr" />}
					{!image && <img className={classes.profile} src={usr} alt="MissingUsr" />}
					{error && <Alert variant = "danger"> {error} </Alert>}
					<Form onSubmit={handleSubmit}>
						<Form.Group controlId="formFile" className="mb-3">
							<Form.Label>Profile Picture</Form.Label>
							<Form.Control type="file" />
						</Form.Group>
						<Form.Group id = "name">
							<Form.Label>Name</Form.Label>
							<Form.Control type="text" ref={nameRef} required />
						</Form.Group>
						<Form.Group id = "email">
							<Form.Label>Username (Email)</Form.Label>
							<Form.Control type = "email" ref = {emailRef} required />
						</Form.Group>
						<Form.Group id = "password">
							<Form.Label>Password</Form.Label>
							<Form.Control type="password" ref = {passwordRef} required />
						</Form.Group>
						<Form.Group id = "password-confirm">
							<Form.Label>Password Confirmation</Form.Label>
							<Form.Control type="password" ref = {passwordConfirmRef} required />
						</Form.Group>
						<Form.Group id = "staff">
							<Form.Label>Check this box if you're a gym staff member: </Form.Label>
							<Form.Check type = "checkbox" ref= {staffRef} />
						</Form.Group>
						<Button disabled={loading} type="submit" style={{justfiySelf: "center", marginTop: "10px"}}>
							Sign Up
						</Button>
					</Form>
				</Card.Body>
			</Card>
			<div className="w-100 text-center mt-2">
				Already have an account? <Link to="../login">Log In</Link>
			</div>
		</>
	)
}