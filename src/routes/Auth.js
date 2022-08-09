import { useState, useEffect } from "react";
import { authService } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

export default function Auth() {
  //구조분해할당
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newAccount, setNewAccount] = useState(true);

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
          });
      }
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
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
      </form>
      <div>
        <button>Continue with Google</button>
        <button>Continue with Github</button>
      </div>
    </div>
  );
}
