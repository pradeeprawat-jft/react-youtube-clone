import { useState, useEffect } from "react";
import { YOUTUBE_API_KEY } from "../utils/constants";

const useChannelInfo = (channelID) => {
  const [channelInfo, setChannelInfo] = useState(null);
  useEffect(() => {
    const getChannelInfo = async () => {
      try {
        const data = await fetch(
          `https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${channelID}&key=${YOUTUBE_API_KEY}`
        );
        const json = await data.json();
        setChannelInfo(json.items[0]);
      } catch (error) {
        console.error("Error fetching channel info:", error);
      }
    };
    getChannelInfo();
  }, [channelID]);
  return channelInfo;
};

export default useChannelInfo;
