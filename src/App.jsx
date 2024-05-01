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
          <h1>React Media Recorder</h1>
          <div className="button-flex">
              <button onClick={toggleRecordOption("video")}>
                Record Video
              </button>
          </div>
          <div>
              {recordOption === "video" ? <VideoRecorder /> : null}
          </div>
          <div className='list_of_videos'>
            <ListVideo/>
          </div>
      </div>
  );
};

export default App
