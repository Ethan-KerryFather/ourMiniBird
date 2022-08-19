import { doc, deleteDoc, updateDoc } from "firebase/firestore";
import { dbService, storageService } from "../firebase";
import { useState } from "react";
import { ref, deleteObject } from "firebase/storage";

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
            <input type="submit" value="Update Nweet" />
          </form>
          <button onClick={toggleEditing}>edit cancel</button>
          <hr />
        </>
      ) : (
        <>
          <div style={{ border: "Solid", margin: "10px" }}>
            <h4>{nweetObj.text}</h4>
            {nweetObj.attachmentURL && (
              <img
                src={nweetObj.attachmentURL}
                width="150px"
                height="150px"
                alt="트윗이미지"
              />
            )}
            {isOwner ? (
              <div>
                <button onClick={onDeleteClick}>Delete nweet</button>
                <button onClick={toggleEditing}>Edit nweet</button>
              </div>
            ) : (
              <> ㄴ 작성자가 아니라 수정, 삭제 권한이 없습니다</>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Nweet;
