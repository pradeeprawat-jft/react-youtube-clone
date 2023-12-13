import { Link } from "react-router-dom";
import useDateFormatter from "../../hooks/useDateFormatter";
import useChannelInfo from "../../hooks/useChannelInfo";

const VideoCard = ({ video }) => {
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
              onError={(e) => {
                e.target.onerror = null;
                e.target.src =
                  "https://img.freepik.com/premium-vector/user-profile-icon-flat-style-member-avatar-vector-illustration-isolated-background-human-permission-sign-business-concept_157943-15752.jpg";
              }}
              alt="channel info"
              className="h-10 w-10 me-2 rounded-full border-4"
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

export const PlayListVideoCard = ({ video }) => {
  const { snippet } = video;
  const dateFormatter = useDateFormatter(snippet.publishedAt);
  const channelInfo = useChannelInfo(snippet.channelId);

  if (channelInfo === null) return;
  return (
    <div className="rounded-lg shadow-md flex  w-full min-w-[40rem]  bg-slate-100">
      <div className="col-span-4 bg-gray-700  border-4 border-gray-800 flex justify-center items-center p-0 m-0 rounded-md">
        <div className="bg-white border-4 border-gray-600 ">
          <div className="bg-white border-4 border-gray-500  ">
            <div className="bg-white border-4 border-gray-400 ">
              <img
                src={snippet.thumbnails.medium.url}
                alt={snippet.title}
                className="w-full h-full  object-cover border-4 border-gray-300"
              />
            </div>
          </div>
        </div>
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
              onError={(e) => {
                e.target.onerror = null;
                e.target.src =
                  "https://img.freepik.com/premium-vector/user-profile-icon-flat-style-member-avatar-vector-illustration-isolated-background-human-permission-sign-business-concept_157943-15752.jpg";
              }}
              alt="channel info"
              className="h-10 w-10 me-2 rounded-full border-4"
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
