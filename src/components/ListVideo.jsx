import { getDownloadURL, listAll, ref } from "firebase/storage";
import { useEffect, useState } from "react";
import { storage } from "../firebase";

const ListVideo = ()=>{

    const VideoListRef = ref(storage,"videos/");
    const [videoList,setVideoList] = useState([]);
    useEffect(()=>{
        listAll(VideoListRef).then( (response) => {
            response.items.forEach((item)=>{
                getDownloadURL(item).then((url)=>{
                    setVideoList((prev)=>[...prev,url]);
                })
            })
        })
    },[]);

    console.log(videoList);


    return(
        <div>
            {videoList.map((url)=>{
                return(
                    <>
                    <video key={url} width="240" control className="video__list__interview">
                        <source src={url} type="video/webm"/>
                    </video>
                    </>
                )
            })}
        </div>
    )
};

export default ListVideo