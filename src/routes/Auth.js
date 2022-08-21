import { useState } from "react";
import { authService } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithPopup,
} from "firebase/auth";

export default function Auth() {
  //구조분해할당
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newAccount, setNewAccount] = useState(true);
  const [error, setError] = useState();
  const onChange = (event) => {
    const {
      target: { name, value },
    } = event;

    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    // submit 이벤트가 발생되면 새로고침이 되기 때문에 이를 방지하기 위해서
    try {
      let data;
      if (newAccount) {
        // 회원가입
        data = await createUserWithEmailAndPassword(
          authService,
          email,
          password
        );
      } else {
        // 로그인
        data = await signInWithEmailAndPassword(authService, email, password)
          .then((userCredential) => {
            // signed in
            const user = userCredential.user;
            console.log(`user is ${user}`);
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            setError(errorMessage);
          });
      }
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const toggleAccount = () => {
    setNewAccount((prev) => !prev);
  };

  const onSocialClick = async (event) => {
    // console.log(event.target.name);
    const {
      target: { name },
    } = event;
    // event :{ target : { name, value }} 이런 구조 맞나?
    let provider;
    if (name === "google") {
      provider = new GoogleAuthProvider();
    } else if (name === "github") {
      provider = new GithubAuthProvider();
    }

    signInWithPopup(authService, provider)
      .then((result) => {
        console.log(result);
        const user = result.user;
        console.log(user);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div style={{ height: "100vh" }}>
      <h2>Auth</h2>
      <form onSubmit={onSubmit}>
        <input
          type="email"
          placeholder="Email"
          required
          name="email"
          onChange={onChange}
        />
        <input
          type="password"
          placeholder="Password"
          required
          name="password"
          onChange={onChange}
        />
        <input type="submit" value={newAccount ? "Create Account" : "Log-in"} />
        {error}
      </form>

      <span
        onClick={() => {
          toggleAccount();
        }}
      >
        {newAccount ? "Sign In" : "Create Account"}
      </span>
      <div>
        <button onClick={onSocialClick} name="google">
          Continue with Google
        </button>
        <button onClick={onSocialClick} name="github">
          Continue with Github
        </button>
      </div>
    </div>
  );
}
