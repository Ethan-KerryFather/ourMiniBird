import { initializeApp } from "firebase/app";
import { getRemoteConfig } from "firebase/remote-config";

const firebaseConfig = {
  apiKey: "AIzaSyDp9COu9HF1L0YreVruiNFD3C-eJyki9OI",
  authDomain: "ntwitter-31a7e.firebaseapp.com",
  projectId: "ntwitter-31a7e",
  storageBucket: "ntwitter-31a7e.appspot.com",
  messagingSenderId: "860338304504",
  appId: "1:860338304504:web:f79443924575561ec3520d",
};

export default initializeApp(firebaseConfig);
