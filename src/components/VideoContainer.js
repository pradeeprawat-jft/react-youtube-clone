import React from "react";
import VideoCard from "./VideoCard";
import ButtonList from "./ButtonList";
import { YOUTUBE_API } from "../utils/constants";
import { Link } from "react-router-dom";
import useFetchVideos from "../hooks/useFetchVideos";

const VideoContainer = () => {
  const { videos } = useFetchVideos(YOUTUBE_API);
  return (
    <div className="col-span-10 border border-gray-200 mt-20 z-0">
      <ButtonList></ButtonList>
      <div className=" px-8 flex justify-between flex-wrap">
        {videos.map((video) => (
          <Link to={"/watch?v=" + video.id} key={video.id}>
            <VideoCard info={video}></VideoCard>
          </Link>
        ))}
      </div>
    </div>
  );
};
export default VideoContainer;