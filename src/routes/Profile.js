import { authService, dbService } from "../firebase";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";

export default function Profile({ userObj }) {
  let navigate = useNavigate();

  const onLogOutClick = () => {
    authService.signOut();
    navigate("/");
    console.log("history pushed");
  };

  const getMyNweets = async () => {
    const nweetsRef = query(
      collection(dbService, "nweets"),
      where("creatorId", "==", userObj.uid),
      orderBy("createAt", "asc")
    );

    const nweets = await getDocs(nweetsRef);
    nweets.forEach((doc) => {
      console.log(doc.id, doc.data());
    });
  };

  useEffect(() => {
    getMyNweets();
  }, []);

  return (
    <div>
      <button onClick={onLogOutClick}>Log Out</button>
    </div>
  );
}
