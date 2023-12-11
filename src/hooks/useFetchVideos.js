import { useState, useEffect } from "react";
import { YOUTUBE_API } from "../utils/constants";

const useFetchVideos = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const getVideos = async () => {
      try {
        const data = await fetch(YOUTUBE_API);
        const json = await data.json();
        setVideos(json.items);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    getVideos();
  }, []);
  return { videos, loading, error };
};
export default useFetchVideos;
