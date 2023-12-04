import React from "react";
import useNumberFormatter from "../hooks/useFormatNumber";
import useDateFormatter from "../hooks/useDateFormatter";
import { Link } from "react-router-dom";

const SideBarVideo = ({ info }) => {
  const { snippet, statistics } = info;
  const { channelTitle, title, thumbnails, publishedAt } = snippet;
  const formattedNumber = useNumberFormatter(statistics.viewCount);
  const formattedDate = useDateFormatter(publishedAt);

  return (
    <div className="grid grid-cols-12 gap-1">
      <div className=" col-span-5 max-w-xs rounded overflow-hidden shadow-sm bg-white mb-7 ">
        <img
          className="w-full h-28 object-cover "
          src={thumbnails.high.url}
          alt={title}
        />
      </div>
      <div className=" col-span-7 px-1 py-2">
        <div className="font-bold text-md mb-1  line-clamp-2">{title}</div>
        <Link to={"/channel?c=" + snippet.channelId}>
          <p className="text-gray-700 text-base mb-1">{channelTitle}</p>
        </Link>
        <p className="text-gray-600 text-sm">
          {formattedNumber} views | {formattedDate}
        </p>
      </div>
    </div>
  );
};

export default SideBarVideo;
