import { Link } from "react-router-dom";
import useDateFormatter from "../../hooks/useDateFormatter";
import useChannelInfo from "../../hooks/useChannelInfo";

const VideoCard = ({ video, channelID }) => {
  const { snippet } = video;
  const dateFormatter = useDateFormatter(snippet.publishedAt);
  const channelInfo = useChannelInfo(snippet.channelId);

  if (channelInfo === null) return;
  return (
    <div className="bg-white rounded-lg shadow-md flex  w-full min-w-[40rem] ">
      <div className="col-span-4">
        <img
          src={snippet.thumbnails.medium.url}
          alt={snippet.title}
          className="w-full h-full p-2  object-cover rounded-xl"
        />
      </div>

      <div className="p-4 min-h-[14.2rem]  max-h-[14.2rem] flex flex-col justify-center ">
        <h2 className="text-md font-semibold mb-2   line-clamp-2 ">
          {snippet.title}
        </h2>
        <p className="text-gray-600">{dateFormatter}</p>
        <Link to={"/channel?c=" + snippet.channelId}>
          <span className="flex items-center my-3">
            <img
              src={channelInfo.snippet.thumbnails.default.url}
              className="h-10 w-13 me-2  rounded-full"
            ></img>
            <p
              className="text-gray-600 font-bold me-5"
              style={{ fontFamily: "serif" }}
            >
              {snippet.channelTitle}
            </p>
          </span>
        </Link>
        <p
          className="text-gray-600 line-clamp-3 "
          style={{ fontFamily: "serif" }}
        >
          {snippet.description}
        </p>
      </div>
    </div>
  );
};

export default VideoCard;
