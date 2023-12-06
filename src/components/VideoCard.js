import useNumberFormatter from "../hooks/useFormatNumber";
import useDateFormatter from "../hooks/useDateFormatter";
import useDurationConverter from "../hooks/useDurationConverter";
import { Link } from "react-router-dom";
import useChannelInfo from "../hooks/useChannelInfo";

const VideoCard = ({ info }) => {
  const { snippet, contentDetails, statistics } = info;
  const { channelTitle, title, thumbnails, channelId } = snippet;
  const formattedNumber = useNumberFormatter(statistics.viewCount);
  const formattedDate = useDateFormatter(snippet.publishedAt);
  const { minutes, seconds } = useDurationConverter(contentDetails.duration);

  const channelInfo = useChannelInfo(channelId);

  return (
    <div className="max-w-xs rounded overflow-hidden shadow-sm bg-white mb-4 relative">
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
      <div className="py-4 px-2 shadow-sm min-h-[8.8rem] flex flex-row">
        <div className="max-w-[3rem] min-w-[3rem]">
          <Link to={"/channel?c=" + channelId}>
            <span className="flex items-center ">
              {channelInfo && channelInfo.snippet && (
                <img
                  src={channelInfo.snippet.thumbnails.default.url}
                  className="h-10 w-13 me-2  rounded-full border-2"
                  alt={title}
                />
              )}
            </span>
          </Link>
        </div>
        <div className="flex flex-col">
          <div className="font-bold text-md mb-2 line-clamp-2">{title}</div>
          <p
            className="text-gray-600 font-bold py-2"
            style={{ fontFamily: "serif" }}
          >
            {channelTitle}
          </p>
          <p className="text-gray-500 text-sm">
            {formattedNumber} views • {formattedDate}
          </p>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
