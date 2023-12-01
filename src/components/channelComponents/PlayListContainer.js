import { useEffect, useState } from "react";
import { YOUTUBE_API_KEY } from "../../utils/constants";
import PlayListCard from "./PlayListCard";
import { Link } from "react-router-dom";

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
  return (
    <div className="flex flex-col flex-wrap ">
      <h1
        className="  text-2xl "
        style={{
          margin: "1rem 0 2rem 2rem",
          fontFamily: "ui-monospace",
        }}
      >
        {info.snippet.title}
      </h1>
     
      <div className="px-8 flex  flex-wrap   justify-start  gap-12 border-white border-b-black  p-3">
        {plauListInfo.length !== 0 &&
          plauListInfo.map((video) => (
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
