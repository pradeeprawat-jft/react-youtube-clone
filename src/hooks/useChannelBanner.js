import { useEffect, useState } from "react";
import { YOUTUBE_API_KEY } from "../utils/constants";

const useChannelBanner = (channelId) => {
  const [banner, setBanner] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBanner = async () => {
      try {
        const response = await fetch(
          `https://www.googleapis.com/youtube/v3/channels?part=brandingSettings&id=${channelId}&key=${YOUTUBE_API_KEY}`
        );

        if (!response.ok) {
          throw new Error(
            `Failed to fetch channel banner. Status: ${response.status}`
          );
        }

        const json = await response.json();
        const bannerUrl =
          json.items[0]?.brandingSettings?.image?.bannerExternalUrl || "";

        setBanner(bannerUrl);
      } catch (error) {
        setError(error);
      }
    };

    fetchBanner();
  }, [channelId]);

  return { banner, error };
};

export default useChannelBanner;
