import useNumberFormatter from "../hooks/useFormatNumber";
import useDateFormatter from "../hooks/useDateFormatter";
import useDurationConverter from "../hooks/useDurationConverter";
import { Link } from "react-router-dom";

const VideoCard = ({ info }) => {
  const { snippet, contentDetails, statistics } = info;
  const { channelTitle, title, thumbnails } = snippet;
  const formattedNumber = useNumberFormatter(statistics.viewCount);
  const formattedDate = useDateFormatter(snippet.publishedAt);
  const { minutes, seconds } = useDurationConverter(contentDetails.duration);
  return (
    <div className="max-w-xs rounded overflow-hidden shadow-sm bg-white mb-7 relative">
      <div className="relative">
        <img
          className="w-full h-48 object-cover"
          src={thumbnails.medium.url}
          alt={title}
        />
        <p className="absolute bottom-1 right-1 bg-black text-white px-2 py-1 rounded">
          {minutes}:{seconds}
        </p>
      </div>

      <div className="px-6 py-4 shadow-sm">
        <div className="font-bold text-md mb-2 line-clamp-2">{title}</div>
        <Link to={"/chennel?c=" + snippet.channelId}>
          <p className="text-gray-500 font-bold mb-2">{channelTitle}</p>
        </Link>
        <p className="text-gray-500 text-sm">
          {formattedNumber} views • {formattedDate}
        </p>
      </div>
    </div>
  );
};

export default VideoCard;
