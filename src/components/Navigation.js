import { useNavigate } from "react-router-dom";
import "../style/NavStyle.scss";
import { AppBar, Toolbar, Typography, Menu, MenuItem } from "@mui/material";
import TwitterIcon from "@mui/icons-material/Twitter";

export default function Navigation({ userObj }) {
  const navigate = useNavigate();

  return (
    <div className="appbar-container">
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h4"
            style={{ marginLeft: "5px", marginRight: "5px" }}
          >
            ourMiniBird
            <TwitterIcon style={{ fontSize: "40px" }} />
          </Typography>
        </Toolbar>
        <div className="menus">
          <p
            onClick={() => {
              navigate("/");
            }}
          >
            Main
          </p>
          <p
            onClick={() => {
              navigate("/profile");
            }}
          >
            My Profile
          </p>
        </div>
      </AppBar>

      {/* <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/profile">{userObj.displayName}님의 Profile</Link>
          </li>
        </ul>
      </nav> */}
    </div>
  );
}
