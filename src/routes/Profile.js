import { authService, dbService } from "../firebase";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { updateProfile } from "firebase/auth";
import "../style/Profile.scss";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Typography from "@mui/material/Typography";
import LogoutIcon from "@mui/icons-material/Logout";
import CheckTwoToneIcon from "@mui/icons-material/CheckTwoTone";
import Swal from "sweetalert2";
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
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: `닉네임 변경완료 - ${displayName}`,
        showConfirmButton: false,
        timer: 2000,
      });
      refreshUser();
      setDisplayName("");
      //음.. 이게 리렌더링을 일으켜야하는데?
    } else {
      Swal.fire({
        icon: "error",
        title: "시스템 알림",
        text: "아무것도 입력되지 않았어요!",
        footer: "다시 한번 확인해보세요",
      });
    }
  };

  const onLogOutClick = () => {
    Swal.fire({
      title: "로그아웃",
      text: "정말 로그아웃하시겠어요?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "네",
      cancelButtonText: "아니요",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("로그아웃되었습니다!", "다음에 봐요", "success");
        authService.signOut();
        navigate("/");
        console.log("history pushed");
      }
    });
  };

  return (
    <div style={{ height: "100vh" }} className="profile-container">
      <div className="card-container">
        <Typography variant="h4">Hello pretty bird!</Typography>
        <AccountCircleIcon style={{ fontSize: "200px" }} />
        <div className="userInfo">
          <h3>bird Name: {userObj.displayName}</h3>
          <form onSubmit={onSubmit}>
            <input
              type="text"
              placeholder="닉네임 변경"
              name="displayName"
              onChange={onChange}
              value={displayName}
            />
            <CheckTwoToneIcon
              onClick={onSubmit}
              value="update Profile"
              style={{ fontSize: "20" }}
            />
          </form>
          <h3>bird uid: {userObj.uid}</h3>
        </div>
        <LogoutIcon
          onClick={onLogOutClick}
          style={{
            fontSize: "100px",
            marginTop: "5%",
            position: "relative",
            left: "40%",
          }}
        />
      </div>
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
