import { useState } from "react";
import Card from "../components/ui/Card";
import classes from "./AddProblemPage.module.css";
import { Form, FloatingLabel, Button, Alert } from "react-bootstrap";
import { db, storage } from "../firebase-config.js";
import { ref, uploadBytes } from "firebase/storage";
import { useDownloadURL } from "react-firebase-hooks/storage";
import { collection, addDoc } from "firebase/firestore";
import placeholder from "../assets/placeholder_image.png";
import BackButton from "../components/ui/BackButton";
import { useNavigate } from "react-router-dom";

// Should create a globals file for this
const dropdownOptions = [
  "V0",
  "V1",
  "V2",
  "V3",
  "V4",
  "V5",
  "V6",
  "V7",
  "V8",
  "V9",
  "V10",
];

function AddProblemPage(props) {
  const [fileRef, setFileRef] = useState("");
  const [fileName, setFileName] = useState("chumBucket.jpg");
  const [image, loading, error] = useDownloadURL(
    ref(storage, "media/" + fileName)
  );
  const [imageUploaded, setImageUploaded] = useState(false);
  const [isAvailable, setAvailable] = useState(false);
  const [alert, setAlert] = useState(false);
  const navigate = useNavigate();

  const changeAvailable = () => {
    setAvailable(!isAvailable);
  };
  const onFileChange = async (e) => {
    const file = e.target.files[0];
    const storageRef = ref(storage, "media/" + file.name);
    setFileRef(storageRef);
    setFileName(file.name);
    uploadBytes(storageRef, file).then((snapshot) => {
      setImageUploaded(true);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(imageUploaded){
      const submitObj = {
        name: e.target.formProblemName.value,
        gymname: e.target.formProblemGym.value,
        img: fileRef.toString(),
        available: isAvailable,
        vrating: parseInt(e.target.formProblemDifficulty.value.substring(1)),
        description: e.target.formProblemDescription.value,
      };
      // Add a new document with a generated id.
      await addDoc(collection(db, "problems"), submitObj);
      navigate("/");
    }else{
      setAlert(true);
    }
  };

  return (
    <>
    <Card>
      <div className={classes.image}>
        <BackButton style={{position: "absolute",inset: "2%", textAlign: "center", zIndex: "2"}} />
        <Form onSubmit={handleSubmit}>
          {imageUploaded && !loading && (
            <img
              className={classes.image}
              src={image}
              alt="Gym Problem"
            />
          )}
          {!imageUploaded && (
            <img
              className={classes.image}
              src={placeholder}
              alt="Gym Problem"
            />
          )}
          <Form.Group controlId="formFile" className="mb-3">
            <Form.Control type="file" size="sm" onChange={onFileChange} />
          </Form.Group>
        </Form>
      </div>
      <div className={classes.card}>
        <Form onSubmit={handleSubmit}>
          <section className={classes.flexbox}>
            <div className={classes.otherbox}>
                <Form.Group controlId="formProblemName">
                  <Form.Control type="text" placeholder="Problem Name" required/>
                </Form.Group>

                <Form.Group controlId="formProblemGym">
                  <Form.Control type="text" placeholder="Gym Name" required/>
                </Form.Group>
                <div className={classes.flexbox}>
                  <Form.Group controlId="formProblemDifficulty">
                    <Form.Select defaultValue={"V0"}>
                      {dropdownOptions.map((item) => (
                        <option key={item}>{item}</option>
                      ))}
                    </Form.Select>
                  </Form.Group>  

                  <Form.Group controlId="formProblemAvailable">
                    <Form.Check
                      type="checkbox"
                      onChange={changeAvailable}
                      label="Available"
                    />
                  </Form.Group>
                </div>

              </div>

              <div className={classes.descbox}>
                <FloatingLabel className="mb-3" label="Problem Description" controlId="formProblemDescription">
                  <Form.Control as="textarea" style={{height: "8em",resize: "none"}} />
                </FloatingLabel>
              </div>
            </section>

            <div className={classes.flexbox}>
              <Button
                className="justify-content-center"
                variant="primary"
                type="submit"
              >
                Submit
              </Button>
            </div>
          </Form>
        </div>
      </Card>
      {alert && (
        <Alert variant="danger">An image is required!</Alert>
      )}
    </>
  );
}

export default AddProblemPage;
