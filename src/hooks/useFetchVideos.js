import { useState, useEffect } from 'react';

const useFetchVideos = (apiUrl) => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getVideos = async () => {
      try {
        const data = await fetch(apiUrl);
        const json = await data.json();
        setVideos(json.items);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    getVideos();
  }, [apiUrl]);

  return { videos, loading, error };
};

export default useFetchVideos;