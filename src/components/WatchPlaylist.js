import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import usePlaylistItems from "../hooks/usePlaylistItems";
import { Link } from "react-router-dom";
import { openMenu } from "../utils/appSlice";
import WatchPlaylistVideoCard from "./WatchPlaylistVideoCard";
import { useDispatch } from "react-redux";

const WatchPlaylist = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(openMenu());
  }, [dispatch]);

  const [searchParam] = useSearchParams();
  const playlistId = searchParam.get("p");
  const title = searchParam.get("title");
  const { playlistInfo } = usePlaylistItems(playlistId);

  if (playlistInfo.length === 0) return null;

  const { snippet } = playlistInfo[0];
  console.log(snippet);

  return (
    <div className="col-span-12 mt-20 grid grid-cols-12 gap-10 mx-5 ">
      <div className="col-span-12 md:col-span-7 lg:col-span-8">
        <div className="aspect-w-16 aspect-video">
          <iframe
            className="w-full h-full"
            src={`https://www.youtube.com/embed/${playlistInfo[0].snippet.resourceId.videoId}?si=YjSQqkmie7h7ig9Q&autoplay=1&mute=1&rel=0`}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
        </div>
        <div className="col-span-6 ">
          <div className="my-4 font-bold font-serif">
            <h4>{snippet.title}</h4>
          </div>
          <Link to={"/channel?c=" + snippet.channelId}>
            <span className="flex items-center ">
              <img
                src={snippet.thumbnails.default.url}
                className="h-12 w-12 me-2  rounded-full border-2 border-gray-300"
                alt="Channel Thumbnail"
              ></img>
              <div className="flex flex-col ml-3 ">
                <p
                  className="text-gray-600 font-bold me-5"
                  style={{ fontFamily: "serif" }}
                >
                  {snippet.channelTitle}
                </p>
              </div>
              <p className="md:px-3 py-2 md:ms-2 bg-red-600 text-white rounded-md">
                Subscribe
              </p>
            </span>
          </Link>
          <div className="col-span-6 my-2 shadow-lg">
            <pre className="p-3 text-gray-500" style={{ fontFamily: "serif" }}>
              {snippet.description}
            </pre>
          </div>
        </div>
      </div>
      <div className="col-span-12 md:col-span-5 lg:col-span-4 p-2 border border-neutral-400 h-[53rem] overflow-y-auto">
        <h1 className="text-md font-bold mb-4 p-2 border-b-4">{title}</h1>
        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-4">
          {playlistInfo.slice(1).map((video) => (
            <Link
              to={"/watch?v=" + video.snippet.resourceId.videoId}
              key={video.id}
            >
              <WatchPlaylistVideoCard
                video={video}
                plalistId={video.id}
              ></WatchPlaylistVideoCard>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WatchPlaylist;
