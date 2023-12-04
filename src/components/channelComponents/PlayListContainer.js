import { useEffect, useState } from "react";
import { YOUTUBE_API_KEY } from "../../utils/constants";
import PlayListCard from "./PlayListCard";
import { Link } from "react-router-dom";
import "./PlayListContainer.css";

const PlayListContainer = ({ info, plalistId }) => {
  const [plauListInfo, setPlaylistInfo] = useState([]);

  useEffect(() => {
    getPlayListItem();
  }, [plalistId, info]);

  const getPlayListItem = async () => {
    const data = await fetch(
      `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=8&playlistId=${plalistId}&key=${YOUTUBE_API_KEY}`
    );
    const json = await data.json();
    setPlaylistInfo(json.items);
  };

  if (plauListInfo.length === 0) return;

  return (
    <div className="flex flex-col flex-wrap " id="content">
      <h1
        className="
         font-serif
         text-xl
      "
        style={{
          margin: "1rem 0 1rem 2rem",
          fontFamily: "ui-monospace",
        }}
      >
        {info.snippet.title}
      </h1>

      <div className="flex justify-center gap-4 sm:justify-between mb-3 py-1 px-2 sm:px-7 max-w-[95rem] ">
        {plauListInfo.map((video) => (
          <Link
            to={"/watch?v=" + video.snippet.resourceId.videoId}
            key={video.id}
          >
            <PlayListCard info={video} plalistId={video.id}></PlayListCard>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default PlayListContainer;
