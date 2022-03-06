import React, { useState } from "react"
import { Card, Button, Alert } from "react-bootstrap"
import { useAuth } from "../contexts/AuthContext"
import { useNavigate } from "react-router-dom"
import { useDownloadURL } from 'react-firebase-hooks/storage';
import { ref } from 'firebase/storage';
import { db, storage } from '../firebase-config.js'
import { doc, collection } from 'firebase/firestore'
import classes from "./ProfilePage.module.css";

export default function ProfilePage() {
  const [error, setError] = useState("")
  const { currentUser, userData, logout } = useAuth()
  const navigate = useNavigate()
  const usersCollectionRef = doc(collection(db, "users"), currentUser.uid);


  let photoRef;
  if(currentUser){
    if(currentUser.photoURL){
      photoRef = ref(storage, currentUser.photoURL)
    }else{
      photoRef = ref(storage, "gs://boldr-f2e1c.appspot.com/media/usr.png")
    }
  }else{
    photoRef = ref(storage, "gs://boldr-f2e1c.appspot.com/media/usr.png")
  }
  const [image, loading, imageError] = useDownloadURL(photoRef);
  
  async function handleLogout() {
    setError("")

    try {
      await logout()
      navigate("/login")
    } catch {
      setError("Failed to log out")
    }
  }

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Profile</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <img className={classes.profile} src={image} />
          <br/>
          <strong>Email:</strong> {currentUser.email}
          <br/>
          <strong>Name: </strong> {currentUser.displayName}
          {currentUser && userData.isStaff && (
            <><br /><strong>You are a Staff Member</strong><br /><strong>Home Gym: </strong>{userData.homeGym}</>
          )}
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        <Button variant="link" onClick={handleLogout}>
          Log Out
        </Button>
      </div>
    </>
  )
}