import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import Auth from "../routes/Auth";
import Home from "../routes/Home";

export default function AppRouter({ isLoggedIn }) {
  // 구조분해할당

  return (
    <Router>
      <Routes>
        {isLoggedIn ? (
          <Route exact path="/" element={<Home />} />
        ) : (
          <Route exact path="/" element={<Auth />} />
        )}
      </Routes>
    </Router>
  );
}
