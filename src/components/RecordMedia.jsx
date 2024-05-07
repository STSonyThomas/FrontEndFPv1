import { useReactMediaRecorder } from "react-media-recorder";

const RecordMedia = () => {
    const { status, startRecording, stopRecording, mediaBlobUrl } =
      useReactMediaRecorder({audio:true });
  
    return (
      <div>
        <p>{status}</p>
        <button onClick={startRecording}>Start Recording</button>
        <button onClick={stopRecording}>Stop Recording</button>
        <video src={mediaBlobUrl} controls autoPlay loop />
      </div>
    );
  };

  export default RecordMedia