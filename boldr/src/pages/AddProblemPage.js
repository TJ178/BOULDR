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
    const submitObj = {
      problemName: e.target.formProblemName.value,
      gym: e.target.formProblemGym.value,
      image: fileRef.toString(),
      available: isAvailable,
      difficulty: e.target.formProblemDifficulty.value,
      description: e.target.formProblemDescription.value,
    };
    console.log(submitObj);
    // Add a new document with a generated id.
    await addDoc(collection(db, "problems"), submitObj);
  };

  return (
    <Card>
      <div className={classes.card}>
        <Form onSubmit={handleSubmit}>
          {imageUploaded && !loading && (
            <img
              className={classes.image}
              src={image}
              alt="Gym Problem Picture"
            />
          )}
          {!imageUploaded && <h3>Upload Problem Image:</h3>}
          <Form.Group controlId="formFile" className="mb-3">
            <Form.Control type="file" size="sm" onChange={onFileChange} />
          </Form.Group>
          <section className={classes.flexbox}>
            <div className={classes.otherbox}>

              <Form.Group controlId="formProblemName">
                <Form.Control type="text" placeholder="Problem Name" />
              </Form.Group>  

              <Form.Group controlId="formProblemGym">
                <Form.Control type="text" placeholder="Gym" />
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
              <Form.Group className="mb-3" controlId="formProblemDescription">
                <Form.Label>Problem Description</Form.Label>
                <Form.Control as="textarea" rows={3} />
              </Form.Group>
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
  );
}

export default AddProblemPage;
