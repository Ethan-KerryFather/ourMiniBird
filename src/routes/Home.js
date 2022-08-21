import { collection, addDoc, onSnapshot } from "firebase/firestore";
import { useState, useEffect, useRef } from "react";
import { dbService, storageService } from "../firebase";
import Nweet from "../components/Ntweet";
import { v4 as uuidv4 } from "uuid";
import { ref, uploadString, getDownloadURL } from "firebase/storage";
import { TextareaAutosize } from "@mui/material";
import SendTwoToneIcon from "@mui/icons-material/SendTwoTone";
// DB에서 데이터를 읽거나 쓰려면 firebase.database.reference 인스턴스가 필요하다.
// 여기서 dbService 가 바로 그거!
import "../style/NavStyle.scss";

export default function Home({ userObj }) {
  const [nweet, setNweet] = useState("");
  const [nweets, setNweets] = useState([]);
  const [attachment, setAttachment] = useState("");

  useEffect(() => {
    console.log("user information : ", userObj);
    // onSnapshot은 실시간으로 데이터 변화를 감지한다.
    // 변화되는 것이 있으면 바로 객체를 업데이트 한 후 상태를 업데이트하여 렌더링을 트리거한다
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

  const onSubmit = async (event) => {
    event.preventDefault();

    let attachmentURL = "";
    if (attachment !== "") {
      const attachmentRef = ref(storageService, `${userObj.uid}/${uuidv4()}`);

      await uploadString(attachmentRef, attachment, "data_url");

      await getDownloadURL(attachmentRef)
        .then((url) => {
          // insert url into an <img> tag to 'download'
          console.log(url);
          attachmentURL = url;
        })
        .catch((error) => {
          console.log(`error occured..! ${error}`);
        });
    }
    // uploadString()은 UploadTask를 반환하는데 이는 프로미스로 사용하거나
    // 업로드 상태를 관리하고 모니터링하는데에 사용할 수 있다.

    try {
      const docRef = await addDoc(collection(dbService, "nweets"), {
        text: nweet,
        createAt: Date.now(),
        creatorId: userObj.uid,
        attachmentURL,
      });
    } catch (e) {}

    setNweet("");
    setAttachment("");
    onClearAttachment();
  };

  const onChange = (event) => {
    event.preventDefault();
    const {
      target: { value },
    } = event;

    setNweet(value);
  };

  const onFileChange = (event) => {
    console.log("files: ", event.target.files);
    const {
      target: { files },
    } = event;
    const theFile = files[0];
    const reader = new FileReader();

    reader.onloadend = (finishedEvent) => {
      console.log(finishedEvent);
      const {
        currentTarget: { result },
      } = finishedEvent;
      setAttachment(result);
    };
    reader.readAsDataURL(theFile);
  };

  const fileInput = useRef();

  const onClearAttachment = () => {
    fileInput.current.value = "";
  };

  return (
    <div style={{ marginTop: "5%", height: "100vh" }}>
      <div className="input-wrap">
        <form onSubmit={onSubmit}>
          <TextareaAutosize
            aria-label="minimum height"
            minRows={3}
            placeholder="트윗을 날려보세요!"
            style={{ width: "100%" }}
            value={nweet}
            onChange={onChange}
          />
          <br />
          <input
            type="file"
            accept="image/*"
            onChange={onFileChange}
            ref={fileInput}
          />
          <div className="send-btn">
            <SendTwoToneIcon onClick={onSubmit} style={{ fontSize: "40px" }} />
          </div>

          {attachment && (
            <img
              src={attachment}
              width="50px"
              height="50px"
              alt="이미지미리보기"
            />
          )}
        </form>
      </div>

      <div>
        {nweets.map((element) => {
          return (
            <Nweet
              key={element.id}
              nweetObj={element}
              isOwner={element.creatorId === userObj.uid}
            />
          );
        })}
      </div>
    </div>
  );
}
