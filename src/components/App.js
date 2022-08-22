import AppRouter from "./Router";
import { useEffect, useState } from "react";
import { authService } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(authService.currentUser);
  const [userObj, setUserObj] = useState(null);

  const refreshUser = () => {
    setUserObj(authService.currentUser);
    const user = authService.currentUser;
    setUserObj({
      uid: user.uid,
      displayName: user.displayName,
      updateProfile: (args) => user.updateProfile(args),
    });
  };

  useEffect(() => {
    onAuthStateChanged(authService, (user) => {
      if (user) {
        // 현재 로그인 된 유저가 있다면
        // indexDB에 있다면
        console.log(
          `**USER INFO**\nUSER_UID :  ${user.uid}\nUSER_EMAIL :  ${user.email}`
        );
        setIsLoggedIn(user.email);
        setUserObj({
          uid: user.uid,
          displayName: user.displayName,
          updateProfile: (args) => user.updateProfile(args),
        });
      } else {
        // 현재 로그인 된 유저가 없다면
        console.log("there is no user that log-ined");
        setIsLoggedIn(false);
      }
      setInit(true);
    });
  }, []);
  return (
    <div style={{ position: "relative" }}>
      <div style={{ position: "relative", overflow: "scroll" }}>
        {init ? (
          <AppRouter
            isLoggedIn={isLoggedIn}
            userObj={userObj}
            refreshUser={refreshUser}
          />
        ) : (
          <p>initializing...</p>
        )}
      </div>
      <footer style={{ position: "absolute", bottom: "0" }}>
        &copy;{new Date().getFullYear()} ourMiniBird
      </footer>
    </div>
  );
}

export default App;
