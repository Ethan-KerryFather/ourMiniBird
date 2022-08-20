import { Link } from "react-router-dom";
import "../style/NavStyle.scss";

export default function Navigation({ userObj }) {
  return (
    <div className="nav-container">
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/profile">{userObj.displayName}님의 Profile</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
