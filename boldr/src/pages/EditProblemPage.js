import { useState, useEffect } from "react";
import Card from "../components/ui/Card";
import classes from "./AddProblemPage.module.css";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Button from "react-bootstrap/Button";
import { db, storage } from "../firebase-config.js";
import { ref, uploadBytes } from "firebase/storage";
import { useDownloadURL } from "react-firebase-hooks/storage";
import { collection, doc, updateDoc } from "firebase/firestore";
import placeholder from "../assets/placeholder_image.png";
import { convertDocumentToProblem } from "../FirebaseSupport.js";
import { useDocumentOnce } from "react-firebase-hooks/firestore";
import { useAuth } from "../contexts/AuthContext.js";
import { useParams } from "react-router-dom";
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

function EditProblemPage(props) {
  const [fileRef, setFileRef] = useState(ref(storage, "media/loading.png"));
  const [fileName, setFileName] = useState("loading.png");
  const [image, loading, error] = useDownloadURL(
    ref(storage, "media/" + fileName)
  );
  const [imageUploading, setImageUploading] = useState(false);
  const [imageUploaded, setImageUploaded] = useState(false);
  const [imageChanged, setImageChanged] = useState(false);
  const [isAvailable, setAvailable] = useState(false);
  const [isChecked, setChecked] = useState(false);

  const navigate = useNavigate();

  let params = useParams();
  const [data, prob_loading, _error] = useDocumentOnce(
    doc(db, "problems", params.problemId)
  );

  useEffect(() => {
    if (!imageUploading && !prob_loading && data) {
      setFileName(convertDocumentToProblem(data).image.split("/").slice(-1)[0]);
    }
    if (!prob_loading && data && !isChecked) {
      setAvailable(convertDocumentToProblem(data).available);
      setChecked(true);
    }
  });

  const changeAvailable = () => {
    setAvailable(!isAvailable);
  };

  const onFileChange = async (e) => {
    setImageUploading(true);
    const file = e.target.files[0];
    const storageRef = ref(storage, "media/" + file.name);
    setFileRef(storageRef);
    setFileName(file.name);
    setImageChanged(true);
    uploadBytes(storageRef, file).then((snapshot) => {
      setImageUploaded(true);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const img = imageChanged ? fileRef.toString() : convertDocumentToProblem(data).img
    const submitObj = {
      name: e.target.formProblemName.value,
      gymname: e.target.formProblemGym.value,
      img: img,
      available: isAvailable,
      vrating: parseInt(e.target.formProblemDifficulty.value.substring(1)),
      description: e.target.formProblemDescription.value,
    };
    // console.log(submitObj);
    // Add a new document with a generated id.
    await updateDoc(doc(db, "problems", params.problemId), submitObj);
    navigate("/")
  };

  return (
    <Card>
      <div className={classes.image}>
        <Form onSubmit={handleSubmit}>
          {!loading && (
            <img
              className={classes.image}
              src={image}
              alt="Gym Problem Picture"
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
                <Form.Control
                  defaultValue={
                    data ? convertDocumentToProblem(data).title : ""
                  }
                  type="text"
                  placeholder="Problem Name"
                />
              </Form.Group>

              <Form.Group controlId="formProblemGym">
                <Form.Control
                  defaultValue={data ? convertDocumentToProblem(data).gym : ""}
                  type="text"
                  placeholder="Gym Name"
                />
              </Form.Group>
              <div className={classes.flexbox}>
                <Form.Group controlId="formProblemDifficulty">
                  <Form.Select disabled={true}>
                    {dropdownOptions.map((item) => (
                      <option key={item}>{item}</option>
                    ))}
                  </Form.Select>
                </Form.Group>

                {data && (
                  <Form.Group controlId="formProblemAvailable">
                    <Form.Check
                      type="checkbox"
                      onChange={changeAvailable}
                      checked={isAvailable}
                      label="Available"
                    />
                  </Form.Group>
                )}
              </div>
            </div>

            <div className={classes.descbox}>
              <FloatingLabel
                className="mb-3"
                label="Problem Description"
                controlId="formProblemDescription"
              >
                <Form.Control
                  defaultValue={
                    data ? convertDocumentToProblem(data).description : ""
                  }
                  as="textarea"
                  style={{ height: "8em", resize: "none" }}
                />
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
  );
}

export default EditProblemPage;
