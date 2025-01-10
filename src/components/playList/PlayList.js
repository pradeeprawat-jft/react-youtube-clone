import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import useYouTubeVideoDetails from "../../hooks/useYouTubeVideoDetails";
import PlayListCard from "./PlayListCard";
import { openMenu } from "../../utils/appSlice";
import { Link } from "react-router-dom";

const PlayList = () => {
  const dispatch = useDispatch();
  const videoIdList = useSelector((store) => store.video.videoList);

  const { videoDetails, loading, error } = useYouTubeVideoDetails(videoIdList);

  useEffect(() => {
    dispatch(openMenu());
  }, [videoDetails, dispatch]);

  return (
    <div className="col-span-12 mt-20 px-14">
      <h1 className="text-md font-bold mb-9 px-3 py-6 shadow-md">
        My PlayList{" "}
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {loading && <p>loading......</p>}
        {error && <p>Error: {error}</p>}
        {videoDetails.map((video) => (
          <Link to={"/watch?v=" + video.id} key={video.id}>
            <PlayListCard key={video.id} video={video}></PlayListCard>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default PlayList;
