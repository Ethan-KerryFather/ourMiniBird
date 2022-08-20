import { authService, dbService } from "../firebase";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { updateProfile } from "firebase/auth";

export default function Profile({ userObj, refreshUser }) {
  let navigate = useNavigate();

  const [displayName, setDisplayName] = useState("");

  const onChange = (event) => {
    event.preventDefault();
    const {
      target: { name, value },
    } = event;
    setDisplayName(value);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    if (displayName !== "") {
      await updateProfile(authService.currentUser, {
        displayName: displayName,
      }).then(() => {
        console.log("profile updated..!");
      });
      refreshUser();
      setDisplayName("");
      //음.. 이게 리렌더링을 일으켜야하는데?
    } else {
      window.alert("아무값이 입력되지 않았습니다.");
    }
  };

  const onLogOutClick = () => {
    authService.signOut();
    navigate("/");
    console.log("history pushed");
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="DisplayName"
          name="displayName"
          onChange={onChange}
          value={displayName}
        />
        <input type="submit" value="update Profile" />
      </form>
      <button onClick={onLogOutClick}>Log Out</button>
    </div>
  );
}

// const getMyNweets = async () => {
//   const nweetsRef = query(
//     collection(dbService, "nweets"),
//     where("creatorId", "==", userObj.uid),
//     orderBy("createAt", "asc")
//   );

//   const nweets = await getDocs(nweetsRef);
//   nweets.forEach((doc) => {
//     console.log(doc.id, doc.data());
//   });
// };

// useEffect(() => {
//   getMyNweets();
// }, []);
