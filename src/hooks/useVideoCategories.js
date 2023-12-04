import { useState, useEffect } from "react";
import { YOUTUBE_API_KEY } from "../utils/constants";

const useVideoCategories = () => {
  const [videoCategoriesList, setVideoCategoriesList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVideoCategories = async () => {
      try {
        const response = await fetch(
          `https://youtube.googleapis.com/youtube/v3/videoCategories?part=snippet&regionCode=IN&key=${YOUTUBE_API_KEY}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch video categories");
        }

        const data = await response.json();
        setVideoCategoriesList(data.items);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchVideoCategories();
  }, []);

  return { videoCategoriesList, loading, error };
};

export default useVideoCategories;
