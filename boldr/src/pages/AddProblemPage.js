import { React, useState } from "react";
import Card from "../components/ui/Card";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import gymPic from "../assets/gymPic.png";
import classes from "./AddProblemPage.module.css";

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
  const [problemName, setProblemName] = useState("Name");
  const [dropdownVal, setDropdownVal] = useState("V0");
  const [available, setAvailable] = useState(false);
  const [description, setDesicription] = useState("Description");

  const onAvailableChange = () => {
    setAvailable(!available);
    console.log("Available: " + available);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const submitObj = {
      problemName: problemName,
      difficulty: dropdownVal,
      available: available,
      description: description,
    };

    // Instead of loggin this is where we can send to the database
    console.log(submitObj);
  };
  return (
    <Card>
      <section className={classes.image}>
        <div className={classes.imageContainer}>
          <img className={classes.image} src={gymPic} alt="Gym Problem" />
          <button className={classes.imgButton}>Add Image</button>
        </div>
        <form className={classes.formContainer} onSubmit={handleSubmit}>
          <div>
            <input
              type="text"
              placeholder={problemName}
              onChange={(e) => setProblemName(e.target.value)}
            />
            <div className={classes.innerRight}>
              <DropdownButton
                // className={classes.dropdown}
                id="rating-button"
                title={dropdownVal}
                onSelect={(e) => setDropdownVal(e)}
                variant="secondary"
              >
                {dropdownOptions.map((item) => (
                  <Dropdown.Item
                    key={item}
                    // className={classes.DropdownItem}
                    eventKey={item}
                  >
                    {item}
                  </Dropdown.Item>
                ))}
              </DropdownButton>
              <label>
                Currently Available:
                <input
                  type="checkbox"
                  name="available"
                  checked={available}
                  onChange={onAvailableChange}
                />
              </label>
            </div>
          </div>
          <div className={classes.formleft}>
            <textarea
              placeholder={description}
              onChange={(e) => setDesicription(e.target.value)}
            />
            <input type="submit" />
          </div>
        </form>
      </section>
    </Card>
  );
}

export default AddProblemPage;
