import Alert from 'react-bootstrap/Alert'
import React, { useState } from 'react';
import { useEffect } from 'react';



import "bootstrap/dist/css/bootstrap.css";


function LoginError() {
  
    return (
      <Alert variant="warning" >
        <Alert.Heading color = "red">Incorrect Email or Password</Alert.Heading>
      </Alert>
    );

}

export default LoginError