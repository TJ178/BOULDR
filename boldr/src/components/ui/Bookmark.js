import React, { useState } from "react";
import classes from "./Bookmark.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark as faBookmarkSolid } from "@fortawesome/free-solid-svg-icons";
import { faBookmark as faBookmarkRegular } from "@fortawesome/free-regular-svg-icons";
import { useAuth, userDataRef } from "../../contexts/AuthContext";
import { updateDoc, doc, collection } from 'firebase/firestore';
import { db } from '../../firebase-config.js';

function Bookmark(props) {
  // Might need to add to a different file that handles the
  // favorites setting to the backend not sure about this
  const { userData, userDataRef } = useAuth(); 

  const [display, setDisplay] = useState(props.initial);

  async function clickHandler(){
    if(userData){
      let newIsFavorited = !userData.favorites.includes(props.problemId)
      setDisplay(newIsFavorited)
      
      let newFavorites = userData.favorites;
      if(newIsFavorited){
        newFavorites.push(props.problemId)
      }else{
        newFavorites.splice(newFavorites.indexOf(props.problemId), 1)
      }
      console.log(newFavorites)
      await updateDoc(doc(collection(db, 'users'), userDataRef), {
        favorites: newFavorites
      });
    }
  }

  return (
    <div
      className={classes.bookmark}
      onClick={clickHandler}
    >
      {display ? (
        <FontAwesomeIcon icon={faBookmarkSolid} size="2x" />
      ) : (
        <FontAwesomeIcon icon={faBookmarkRegular} size="2x" className={classes.notfavorite} />
      )}
    </div>
  );
}

export default Bookmark;
