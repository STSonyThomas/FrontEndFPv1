import { useState, useRef } from "react";
import {ref, uploadBytes} from 'firebase/storage';
import { storage } from "../firebase";
import { v4 } from "uuid";
import axios from "axios";

const mimeType = "video/webm";

const VideoRecorder = () => {
    const [permission, setPermission] = useState(false);
    const mediaRecorder = useRef(null);
    const liveVideoFeed = useRef(null);
    const [recordingStatus, setRecordingStatus] = useState("inactive");
    const [stream, setStream] = useState(null);
    const [videoChunks, setVideoChunks] = useState([]);
    const [recordedVideo, setRecordedVideo] = useState(null);
    const [loading, setLoading] = useState(false);
    const [posts, setPosts] = useState(null);

    // useEffect(() => {
    //     const loadPosts = async () => {
    //       setLoading(true);
    //       try {
    //         const response = await axios.get('http://localhost:5000/download-video/InterviewVideo704775c4-ca28-48cb-bc24-06f3b54c688d');
    //         setPosts(response.data);
    //         console.log(posts);
    //       } catch (error) {
    //         console.error('Error fetching data:', error);
    //       }
    //       setLoading(false);
    //     };
    
    //     loadPosts();
    //   }, []);
    const analyzeScore =  async ()=>{
        setLoading(true);
        axios.get("http://localhost:5000/download-video/InterviewVideo704775c4-ca28-48cb-bc24-06f3b54c688d")
        .then(response => {
          const data = response.data;
          // Access data from the JSON object
          const distractionScore = data.DistractionScore;
          // ... use the data in your front-end logic
          setPosts(distractionScore);
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });
              setLoading(false);
    }
    const getCameraPermission = async () => {
        setRecordedVideo(null);
        if ("MediaRecorder" in window) {
            try {
                const videoConstraints = {
                    audio: false,
                    video: true,
                };
                const audioConstraints = { audio: true };
                // create audio and video streams separately
                const audioStream = await navigator.mediaDevices.getUserMedia(
                    audioConstraints
                );
                const videoStream = await navigator.mediaDevices.getUserMedia(
                    videoConstraints
                );
                setPermission(true);
                //combine both audio and video streams
                const combinedStream = new MediaStream([
                    ...videoStream.getVideoTracks(),
                    ...audioStream.getAudioTracks(),
                ]);
                setStream(combinedStream);
                //set videostream to live feed player
                liveVideoFeed.current.srcObject = videoStream;
            } catch (err) {
                alert(err.message);
            }
        } else {
            alert("The MediaRecorder API is not supported in your browser.");
        }
    };

    const startRecording = async () => {
        setRecordingStatus("recording");
        const media = new MediaRecorder(stream, { mimeType });
        mediaRecorder.current = media;
        mediaRecorder.current.start();
        let localVideoChunks = [];
        mediaRecorder.current.ondataavailable = (event) => {
            if (typeof event.data === "undefined") return;
            if (event.data.size === 0) return;
            localVideoChunks.push(event.data);
        };
        setVideoChunks(localVideoChunks);
    };

    const stopRecording = () => {
        setPermission(false);
        setRecordingStatus("inactive");
        mediaRecorder.current.stop();
        mediaRecorder.current.onstop = () => {
            const videoBlob = new Blob(videoChunks, { type: mimeType });
            const videoUrl = URL.createObjectURL(videoBlob);
            setRecordedVideo(videoUrl);
            setVideoChunks([]);
            const videoRef = ref(storage,`videos/${"InterviewVideo"+v4()}`);
            uploadBytes(videoRef,videoBlob).then(()=>{
                alert("Video Uploaded Successfully for analysis pls wait while being anaylsed.")
            })
        };
    };

    return (
        <div>
			<h2>Video Recorder</h2>
			<main>
				<div className="video-controls">
					{!permission ? (
						<button onClick={getCameraPermission} type="button">
							Get Camera
						</button>
					) : null}
					{permission && recordingStatus === "inactive" ? (
						<button onClick={startRecording} type="button">
							Start Recording
						</button>
					) : null}
					{recordingStatus === "recording" ? (
						<button onClick={stopRecording} type="button">
							Stop Recording
						</button>
					) : null}
				</div>
			</main>

			<div className="video-player">
				{!recordedVideo ? (
					<video ref={liveVideoFeed} autoPlay className="live-player"></video>
				) : null}
				{recordedVideo ? (
					<div className="recorded-player">
						<video className="recorded" src={recordedVideo} controls></video>
						<a download href={recordedVideo}>
							Download Recording
						</a>
					</div>
				) : null}
			</div>
            <div>
            {recordedVideo && !posts? (
					<div className="recorded-player">
						<button onClick={analyzeScore} type="button">
                        Analyze    
                        </ button>
					</div>
				) : (
                    <div className="recorded-player">
                        <p>You are distracted {posts} of the time</p>
                        <p>You are smiling {posts} of the time</p>
                        <p>Filler Words:</p>
                        <p>Relevance to answers:</p>
                    </div>
                )}
            </div>
		</div>
	);
};
export default VideoRecorder;