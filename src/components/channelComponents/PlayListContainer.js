import PlayListCard from "./PlayListCard";
import { Link } from "react-router-dom";
import "./PlayListContainer.css";
import usePlaylistItems from "../../hooks/usePlaylistItems";

const PlayListContainer = ({ info, plalistId }) => {
  const { playlistInfo } = usePlaylistItems(plalistId);
  if (playlistInfo.length === 0) return;
  return (
    <div className="flex flex-col " id="content">
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

      <div className="flex  justify-start gap-4 sm:justify-between mb-3 py-1 px-2 sm:px-7 max-w-[95rem] ">
        {playlistInfo.map((video) => (
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
