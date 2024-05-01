import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import RecordMedia from './components/RecordMedia'
import VideoRecorder from './components/VideoRecorder'
import ListVideo from './components/ListVideo'
// import WebcamCapture from './components/WebcamCapture.jsx'

const App = () => {
  let [recordOption, setRecordOption] = useState("video");
  const toggleRecordOption = (type) => {
      return () => {
          setRecordOption(type);
      };
  };
  return (
      <div>
          <h1>Interview Trainer</h1>
          <div>
              {recordOption === "video" ? <VideoRecorder /> : null}
          </div>
          <div className='list_of_videos'>
            <h2>Videos List</h2>
            <ListVideo/>
          </div>
      </div>
  );
};

export default App
