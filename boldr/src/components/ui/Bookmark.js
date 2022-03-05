import React, { useState } from "react";
import classes from "./Bookmark.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark as faBookmarkSolid } from "@fortawesome/free-solid-svg-icons";
import { faBookmark as faBookmarkRegular } from "@fortawesome/free-regular-svg-icons";

function Bookmark(props) {
  // Might need to add to a different file that handles the
  // favorites setting to the backend not sure about this
  const [isFavorite, favoriteHandler] = useState(false);

  return (
    <div
      className={classes.bookmark}
      onClick={() => favoriteHandler(!isFavorite)}
    >
      {isFavorite ? (
        <FontAwesomeIcon icon={faBookmarkSolid} size="2x" />
      ) : (
        <FontAwesomeIcon icon={faBookmarkRegular} size="2x" className={classes.notfavorite} />
      )}
    </div>
  );
}

export default Bookmark;
