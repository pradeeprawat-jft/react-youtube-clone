import { useEffect, useState } from "react";
import { YOUTUBE_API_KEY } from "../utils/constants";

const useCommentsData = (videoId) => {
  const [commentsData, setCommentsData] = useState(null);

  useEffect(() => {
    const getComments = async () => {
      try {
        const data = await fetch(
          `https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet%2Creplies&order=relevance&videoId=${videoId}&key=${YOUTUBE_API_KEY}`
        );
        const json = await data.json();
        setCommentsData(json.items);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };

    getComments();
  }, [videoId]);

  return commentsData;
};

export default useCommentsData;
