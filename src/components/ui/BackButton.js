import { useNavigate } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import Button from "react-bootstrap/Button";
import classes from "./BackButton.module.css";

function BackButton(props) {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  return (
    <Button className={classes.backbutton} onClick={goBack}>
        <FontAwesomeIcon className={classes.icon} icon={faArrowLeft} />
    </Button>
  );
}

export default BackButton;
