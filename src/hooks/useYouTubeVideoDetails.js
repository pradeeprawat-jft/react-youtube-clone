import { useState, useEffect } from "react";
import { YOUTUBE_API_KEY } from "../utils/constants";

const useYouTubeVideoDetails = (videoIds) => {
  const [videoDetails, setVideoDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVideoDetails = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(
          `https://youtube.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&id=${videoIds.join(
            ","
          )}&key=${YOUTUBE_API_KEY}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch video details");
        }

        const data = await response.json();
        setVideoDetails(data.items);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (videoIds.length > 0) {
      fetchVideoDetails();
    }
  }, [videoIds]);

  return { videoDetails, loading, error };
};

export default useYouTubeVideoDetails;
