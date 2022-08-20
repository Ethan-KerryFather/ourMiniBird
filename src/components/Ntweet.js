import { doc, deleteDoc, updateDoc } from "firebase/firestore";
import { dbService, storageService } from "../firebase";
import { useState } from "react";
import { ref, deleteObject } from "firebase/storage";
import MediaCard from "./Card";
import { Button } from "@mui/material";
import "../style/Tweet.scss";

const Nweet = ({ nweetObj, isOwner }) => {
  const [editing, setEditing] = useState(false);
  const [newNweet, setNewNweet] = useState(nweetObj.text);

  const toggleEditing = () => {
    setEditing((prev) => !prev);
  };

  const onSubmit = async (event) => {
    event.preventDefault();

    // document Reference
    // doc(dbService, 'nweets', nweetObj.id) 이걸 첫번째 인자로 줘도 된다.
    console.log(nweetObj.id, newNweet);

    // update하는 거라서 전개연산자로 풀어서 덮어쓰고 안그래도 된다.
    await updateDoc(doc(dbService, "nweets", nweetObj.id), {
      text: newNweet,
    });
    setEditing(false);
  };

  const onEditChange = (event) => {
    const {
      target: { value },
    } = event;

    setNewNweet(value);
  };

  const onDeleteClick = async () => {
    const ok = window.confirm("삭제하시겠습니까?");
    console.log(ok);
    if (ok) {
      // 삭제 버튼에서 예를 눌렀을때
      console.log(nweetObj.id);
      await deleteDoc(doc(dbService, "nweets", nweetObj.id));
      // 여기서 doc(데이터베이스 객체, 컬렉션 이름, doc아이디) 이다

      if (nweetObj.attachmentURL !== "") {
        const deleteRef = ref(storageService, nweetObj.attachmentURL);
        deleteObject(deleteRef);
      }
    } else {
      // 삭제 버튼에서 아니오를 눌렀을때
    }
  };

  return (
    <div>
      {editing ? (
        <>
          <hr />
          <p>수정하기</p>
          <form onSubmit={onSubmit}>
            <input value={newNweet} required onChange={onEditChange} />
            <br />
            <Button onClick={onSubmit}>Update Tweet</Button>
          </form>
          <Button onClick={toggleEditing}>Edit cancel</Button>
          <hr />
        </>
      ) : (
        <div className="tweet-container">
          <div style={{ margin: "10px" }} className="tweet-wrap">
            <MediaCard text={nweetObj.text} imgsrc={nweetObj.attachmentURL} />

            {isOwner ? (
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-around",
                }}
              >
                <Button
                  onClick={onDeleteClick}
                  color="error"
                  variant="outlined"
                  style={{ marginRight: "10px" }}
                >
                  Delete nweet
                </Button>
                <Button
                  onClick={toggleEditing}
                  color="success"
                  variant="outlined"
                  style={{ marginLeft: "10px" }}
                >
                  Edit nweet
                </Button>
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Nweet;
