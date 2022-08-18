import AppRouter from "./Router";
import { useEffect, useState } from "react";
import { authService } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(authService.currentUser);
  const [userObj, setUserObj] = useState(null);

  useEffect(() => {
    onAuthStateChanged(authService, (user) => {
      if (user) {
        // 현재 로그인 된 유저가 있다면
        // indexDB에 있다면
        console.log(
          `**USER INFO**\nUSER_UID :  ${user.uid}\nUSER_EMAIL :  ${user.email}`
        );
        setIsLoggedIn(user.email);
        setUserObj(user);
      } else {
        // 현재 로그인 된 유저가 없다면
        console.log("there is no user that log-ined");
        setIsLoggedIn(false);
      }
      setInit(true);
    });
  }, []);
  return (
    <div>
      {init ? (
        <AppRouter isLoggedIn={isLoggedIn} userObj={userObj} />
      ) : (
        <p>initializing...</p>
      )}

      <footer>&copy;{new Date().getFullYear()} Twitter-clone</footer>
    </div>
  );
}

export default App;
