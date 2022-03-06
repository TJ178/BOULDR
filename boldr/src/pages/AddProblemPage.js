import { useState } from "react";
import Card from "../components/ui/Card";
import classes from "./AddProblemPage.module.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { db, storage } from "../firebase-config.js";
import { ref, uploadBytes } from "firebase/storage";
import { useDownloadURL } from "react-firebase-hooks/storage";
import { collection, addDoc } from "firebase/firestore";

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

  const changeAvailable = () => {
    setAvailable(!isAvailable);
  }
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
    const submitObj = {
      name: e.target.formProblemName.value,
      gymname: e.target.formProblemGym.value,
      img: fileRef.toString(),
      available: isAvailable,
      vrating: parseInt(e.target.formProblemDifficulty.value.substring(1)),
      description: e.target.formProblemDescription.value,
    };
    console.log(submitObj)
    // Add a new document with a generated id.
    await addDoc(collection(db, "problems"), submitObj);
  };

  return (
    <Card>
      <section className={classes.image}>
        <Form onSubmit={handleSubmit}>
          {imageUploaded && !loading && (
            <img className={classes.image} src={image} alt="Gym Problem" />
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
            <Form.Check type="checkbox" onChange={changeAvailable} label="Available" />
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
