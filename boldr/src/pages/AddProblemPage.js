import { useState } from "react";
import Card from "../components/ui/Card";
import classes from "./AddProblemPage.module.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/button";
import { storage } from '../firebase-config.js'
import { ref, uploadBytes } from "firebase/storage";

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
  const [fileUrl, setFileUrl] = useState(null);
  const [fileRef, setFileRef] = useState("");
  const [imageUploaded, setImageUploaded] = useState(false);

  const onFileChange = async (e) => {
    const file = e.target.files[0];
    console.log(file);
    const storageRef = ref(storage, 'media/' + file.name);
    setFileRef(storageRef);
    uploadBytes(storageRef, file).then((snapshot) => {
      console.log('Uploaded a blob or file!');
      setImageUploaded(true);
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const submitObj = {
      problemName: e.target.formProblemName.value,
      gym: e.target.formProblemGym.value,
      image: fileRef,
      available: e.target.formProblemAvailable.value,
      difficulty: e.target.formProblemDifficulty.value,
      description: e.target.formProblemDescription.value,
    };

    // Instead of logging this is where we can send to the database
    console.log(submitObj);
  };

  return (
    <Card>
      <section className={classes.image}>
        <Form onSubmit={handleSubmit}>
          {imageUploaded && (
            <img className={classes.image} src={fileUrl} alt="Gym Problem" />
          )}

          <Form.Group controlId="formFile" className="mb-3">
            <Form.Control type="file" size="sm" onChange={onFileChange} />
          </Form.Group>

          <Form.Group controlId="formProblemName">
            <Form.Control type="text" placeholder="Problem Name" />
          </Form.Group>

          <Form.Group controlId="formProblemGym">
            <Form.Control type="text" placeholder="Gym" />
          </Form.Group>

          <Form.Group controlId="formProblemAvailable">
            <Form.Check type="checkbox" label="Is Available" />
          </Form.Group>

          <Form.Group controlId="formProblemDifficulty">
            <Form.Select defaultValue={"V0"}>
              {dropdownOptions.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formProblemDescription">
            <Form.Label>Problem Description</Form.Label>
            <Form.Control as="textarea" rows={3} />
          </Form.Group>

          <Button
            className="justify-content-center"
            variant="primary"
            type="submit"
          >
            Submit
          </Button>
        </Form>
      </section>
    </Card>
  );
}

export default AddProblemPage;
