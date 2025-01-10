import React, { useMemo } from "react";
import VideoCard from "./VideoCard";
import ButtonList from "./ButtonList";
import { Link } from "react-router-dom";
import useFetchVideos from "../hooks/useFetchVideos";
import { useDispatch } from "react-redux";
import { openMenu } from "../utils/appSlice";
const VideoContainer = () => {
  const dispatch = useDispatch();
  const { videos } = useFetchVideos();
  const memoizedVideos = useMemo(() => videos, [videos]);
  dispatch(openMenu());
  return (
    <div className="col-span-12 border border-gray-200 mt-20 z-0">
      <ButtonList></ButtonList>
      <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-5 px-8 ">
        {memoizedVideos.map((video) => (
          <Link to={"/watch?v=" + video.id} key={video.id}>
            <VideoCard info={video}></VideoCard>
          </Link>
        ))}
      </div>
    </div>
  );
};
export default VideoContainer;
