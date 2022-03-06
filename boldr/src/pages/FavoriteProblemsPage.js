import { db } from "../firebase-config.js";
import { collection, doc } from "firebase/firestore";
import {
  useCollectionOnce,
  useDocumentOnce,
  useDocumentDataOnce,
} from "react-firebase-hooks/firestore";
import { convertCollectionToProblems } from "../FirebaseSupport.js";
import { useAuth } from "../contexts/AuthContext.js";
import ProblemList from "../components/problems/ProblemList";
import { Navigate } from "react-router-dom";

function FavoriteProblemsPage(props) {
  const { currentUser } = useAuth();
  const [problems, prob_loading, prob_error] = useCollectionOnce(
    collection(db, "problems")
  );

  let userDoc;
  if (currentUser) {
    // console.log(currentUser);
    if (currentUser.uid) {
      userDoc = doc(db, "users", currentUser.uid);
    } else {
      userDoc = doc(db, "users", "dummy");
    }
  } else {
    userDoc = doc(db, "users", "dummy");
  }

  const [usr, loading, error] = useDocumentDataOnce(userDoc);

  return (
    <>
      {currentUser ? null : <Navigate to="/" />}
      <section>
        {error && (
          <p>
            <strong>Error Loading Problems: {JSON.stringify(error)}</strong>
          </p>
        )}
        {loading && (
          <p>
            <span>Loading...</span>
          </p>
        )}
        {problems && (
          <>
            <ProblemList
              problems={convertCollectionToProblems(problems).filter((prob) => {
                console.log("USERS");
                console.log(usr);
                if (usr) {
                  return usr["favorites"].indexOf(prob.id) !== -1;
                } else {
                  return;
                }
              })}
            />
          </>
        )}
      </section>
    </>
  );
}

export default FavoriteProblemsPage;
