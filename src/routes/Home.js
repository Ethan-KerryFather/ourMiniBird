import {
  collection,
  addDoc,
  doc,
  onSnapshot,
  getDocs,
  orderBy,
} from "firebase/firestore";
import { useState, useEffect } from "react";
import { dbService } from "../firebase";
import Nweet from "../components/Ntweet";

// DB에서 데이터를 읽거나 쓰려면 firebase.database.reference 인스턴스가 필요하다.
// 여기서 dbService 가 바로 그거!

export default function Home({ userObj }) {
  useEffect(() => {
    console.log("user information : ", userObj);
    onSnapshot(collection(dbService, "nweets"), (snapshot) => {
      const newArray = snapshot.docs.map((element) => {
        return {
          id: element.id,
          ...element.data(),
        };
      });
      setNweets(newArray);
    });
  }, []);

  const [nweet, setNweet] = useState("");
  const [nweets, setNweets] = useState([]);

  const onSubmit = async (event) => {
    event.preventDefault();

    try {
      const docRef = await addDoc(collection(dbService, "nweets"), {
        text: nweet,
        createAt: Date.now(),
        creatorId: userObj.uid,
      });
      console.log("Document written with id: ", docRef.id);
    } catch (e) {
      console.error("error adding document:", e);
    }

    setNweet("");
  };

  const onChange = (event) => {
    event.preventDefault();
    const {
      target: { value },
    } = event;

    setNweet(value);
  };

  return (
    <div>
      <h1>home</h1>
      <form onSubmit={onSubmit}>
        <input
          placeholder="what's on your mind?"
          onChange={onChange}
          value={nweet}
          type="text"
          maxLength={120}
        />
      </form>
      <div>
        {nweets.map((element) => {
          return (
            <Nweet
              key={element.id}
              nweet={element}
              isOwner={element.creatorId === userObj.uid}
            />
          );
        })}
      </div>
    </div>
  );
}
