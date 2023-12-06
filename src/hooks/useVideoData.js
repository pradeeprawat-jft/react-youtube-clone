import { useEffect, useState } from "react";
import { YOUTUBE_API_KEY } from "../utils/constants";

const useVideoData = (videoId) => {
  const [snippet, setSnippet] = useState({
    title: "",
    channelTitle: "",
    publishedAt: "",
    description: "",
    tags: [],
  });
  const [statistics, setStatistics] = useState({
    viewCount: 0,
    likeCount: 0,
    dislikeCount: 0,
    commentCount: 0,
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}&key=${YOUTUBE_API_KEY}`
        );

        if (!response.ok) {
          throw new Error(
            `Failed to fetch video data. Status: ${response.status}`
          );
        }

        const json = await response.json();
        const videoData = json.items[0];

        setSnippet(videoData.snippet || {});
        setStatistics(videoData.statistics || {});
      } catch (error) {
        setError(error);
      }
    };

    fetchData();
  }, [videoId]);

  return { snippet, statistics, error };
};

export default useVideoData;
