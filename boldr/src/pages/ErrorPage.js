import React from "react"
import { Link } from "react-router-dom"
import { Button } from 'react-bootstrap';

export default function ErrorPage() {

    return (
        <>
            <h1 style={{justifySelf: "center"}}>404</h1>
            <p>Not Found</p>
            <Link to="/"><Button>Go Home</Button></Link>
        </>
    )
}