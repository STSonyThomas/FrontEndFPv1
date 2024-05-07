import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import RecordMedia from "./components/RecordMedia";
import VideoRecorder from "./components/VideoRecorder";
import ListVideo from "./components/ListVideo";
import Login from "./components/Login";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
// import WebcamCapture from './components/WebcamCapture.jsx'

const App = () => {
  let [recordOption, setRecordOption] = useState("video");

    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth,(user)=>{
            if(user){
                const uid=user.uid;
                console.log(user);
            }else{
                //user is signed out
            }
        })
    },[])

  const toggleRecordOption = (type) => {
    return () => {
      setRecordOption(type);
    };
  };
  const user = null;
  return (
    <div>
      {!user ? (
        <Login />
      ) : (
        <div>
          <div>{recordOption === "video" ? <VideoRecorder /> : null}</div>
          <div className="list_of_videos">
            <h2>Videos List</h2>
            <ListVideo />
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
