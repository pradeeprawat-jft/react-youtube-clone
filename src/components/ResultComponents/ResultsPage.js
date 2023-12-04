// ResultsPage.js
import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { YOUTUBE_API_KEY } from "../../utils/constants";
import VideoCard from "./VideoCard";

const ResultsPage = () => {
  const [videos, setVideos] = useState([]);

  const [searchParam] = useSearchParams();
  const searchQuery = searchParam.get("search_query");

  useEffect(() => {
    getDetails();
  }, [searchQuery]);

  const getDetails = async () => {
    try {
      const data = await fetch(
        `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=${searchQuery}&key=${YOUTUBE_API_KEY}`
      );
      const json = await data.json();

      if (json.items) {
        setVideos(json.items);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div className="container mx-auto mt-20">
      <h1 className="text-md font-bold mb-4 pt-6">
        Search Results for "{searchQuery}"
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {videos.map(
          (video) =>
            video.id.kind === "youtube#video" && (
              <Link to={"/watch?v=" + video.id.videoId} key={video.id.videoId}>
                <VideoCard key={video.id.videoId} video={video} />
              </Link>
            )
        )}
      </div>
    </div>
  );
};

export default ResultsPage;
