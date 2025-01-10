import React, { useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";
import VideoCard, { PlayListVideoCard } from "./VideoCard";
import useYouTubeSearch from "../../hooks/useYouTubeSearch";

const ResultsPage = () => {
  const [searchParam] = useSearchParams();
  const searchQuery = searchParam.get("search_query");
  const videos = useYouTubeSearch(searchQuery);

  const memoizedVideos = useMemo(() => videos, [videos]);

  return (
    <div className="col-span-12 mx-auto mt-20 px-14">
      <h1 className="text-md font-bold mb-9 pt-6">
        Search Results for "{searchQuery}"
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-10">
        {memoizedVideos.map((video) => (
          <div>
            {video.id.kind === "youtube#video" && (
              <Link to={"/watch?v=" + video.id.videoId} key={video.id.videoId}>
                <VideoCard
                  key={video.id.videoId}
                  video={video}
                  channelID={video.snippet.channelId}
                />
              </Link>
            )}
            {video.id.kind === "youtube#playlist" && (
              <Link
                to={`/videoPlaylist?p=${
                  video.id.playlistId
                }&title=${encodeURIComponent(video.snippet.title)}`}
                key={video.id.videoId}
              >
                <PlayListVideoCard
                  key={video.id.playlistId}
                  video={video}
                  channelID={video.snippet.channelId}
                />
              </Link>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResultsPage;
