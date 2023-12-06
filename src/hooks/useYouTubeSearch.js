import { useState, useEffect } from "react";
import { YOUTUBE_API_KEY } from "../utils/constants";

const useYouTubeSearch = (searchQuery) => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const getDetails = async () => {
      try {
        const data = await fetch(
          `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=50&q=${searchQuery}&key=${YOUTUBE_API_KEY}`
        );
        const json = await data.json();

        if (json.items) {
          setVideos(json.items);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (searchQuery) {
      getDetails();
    }
  }, [searchQuery]);

  return videos;
};

export default useYouTubeSearch;
