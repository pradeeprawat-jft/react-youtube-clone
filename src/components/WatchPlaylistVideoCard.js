import { Link } from "react-router-dom";
import useDateFormatter from "../hooks/useDateFormatter";
import useChannelInfo from "../hooks/useChannelInfo";

const WatchPlaylistVideoCard = ({ video }) => {
  const { snippet } = video;
  const dateFormatter = useDateFormatter(snippet.publishedAt);
  const channelInfo = useChannelInfo(snippet.channelId);

  if (channelInfo === null) return;
  return (
    <div className="bg-white rounded-lg shadow-md  w-full grid   grid-cols-12 ">
      <div className="col-span-12 md:col-span-12 lg:col-span-5 my-auto">
        <img
          src={snippet.thumbnails.medium.url}
          alt={snippet.title}
          className="w-full  object-cover"
        />
      </div>

      <div className=" p-2 min-h-[8rem] max-h-[8rem] col-span-12 md:col-span-12 lg:col-span-7 flex flex-col justify-center  ">
        <h2 className="text-sm font-semibold mb-1 line-clamp-2 ">
          {snippet.title}
        </h2>
        <p className="text-gray-600">{dateFormatter}</p>
        <Link to={"/channel?c=" + snippet.channelId}>
          <span className="flex items-center my-1">
            <p
              className="text-gray-600 font-bold me-5"
              style={{ fontFamily: "serif" }}
            >
              {snippet.channelTitle}
            </p>
          </span>
        </Link>
      </div>
    </div>
  );
};

export default WatchPlaylistVideoCard;
