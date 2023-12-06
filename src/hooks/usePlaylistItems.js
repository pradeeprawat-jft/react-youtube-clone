import { useEffect, useState } from "react";
import { YOUTUBE_API_KEY } from "../utils/constants";

const usePlaylistItems = (playlistId) => {
  const [playlistInfo, setPlaylistInfo] = useState([]);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchPlaylistItems = async () => {
      try {
        const response = await fetch(
          `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=8&playlistId=${playlistId}&key=${YOUTUBE_API_KEY}`
        );
        if (!response.ok) {
          throw new Error(
            `Failed to fetch playlist items. Status: ${response.status}`
          );
        }
        const json = await response.json();
        setPlaylistInfo(json.items);
      } catch (error) {
        setError(error);
      }
    };
    fetchPlaylistItems();
  }, [playlistId]);
  return { playlistInfo, error };
};

export default usePlaylistItems;
