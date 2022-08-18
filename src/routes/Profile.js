import { authService } from "../firebase";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  let navigate = useNavigate();

  const onLogOutClick = () => {
    authService.signOut();
    navigate("/");
    console.log("history pushed");
  };

  return (
    <div>
      <button onClick={onLogOutClick}>Log Out</button>
    </div>
  );
}
