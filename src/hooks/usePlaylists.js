import { useEffect, useState } from "react";
import { YOUTUBE_API_KEY } from "../utils/constants";
const usePlaylists = (channelId) => {
  const [playlistInfo, setPlaylistInfo] = useState([]);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchPlaylists = async () => {
      try {
        const response = await fetch(
          `https://youtube.googleapis.com/youtube/v3/playlists?part=snippet%2CcontentDetails&channelId=${channelId}&maxResults=25&key=${YOUTUBE_API_KEY}`
        );
        if (!response.ok) {
          throw new Error(
            `Failed to fetch playlists. Status: ${response.status}`
          );
        }
        const json = await response.json();
        setPlaylistInfo(json.items);
      } catch (error) {
        setError(error);
      }
    };
    fetchPlaylists();
  }, [channelId]);
  return { playlistInfo, error };
};
export default usePlaylists;
