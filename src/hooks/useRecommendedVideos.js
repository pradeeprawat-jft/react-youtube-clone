import { useEffect, useState } from "react";
import { YOUTUBE_API_KEY } from "../utils/constants";

const useRecommendedVideos = (videoId) => {
  const [recommendedVideos, setRecommendedVideos] = useState([]);

  useEffect(() => {
    const getRecommendedVideos = async () => {
      try {
        const relatedVideosData = await fetch(
          `https://youtube.googleapis.com/youtube/v3/search?part=snippet&relatedToVideoId=${videoId}&type=video&key=${YOUTUBE_API_KEY}`
        );
        const relatedVideosJson = await relatedVideosData.json();

        const relatedVideoIds = relatedVideosJson.items.map(
          (item) => item.id.videoId
        );

        const recommendedVideosData = await fetch(
          `https://youtube.googleapis.com/youtube/v3/videos?part=snippet&id=${relatedVideoIds.join(
            ","
          )}&key=${YOUTUBE_API_KEY}`
        );

        const recommendedVideosJson = await recommendedVideosData.json();

        setRecommendedVideos(recommendedVideosJson.items);
      } catch (error) {
        console.error("Error fetching recommended videos:", error);
      }
    };
    if (videoId) {
      getRecommendedVideos();
    }
  }, [videoId]);

  return recommendedVideos;
};

export default useRecommendedVideos;
