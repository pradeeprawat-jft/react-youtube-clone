import React from "react";
import useDateFormatter from "../hooks/useDateFormatter";
import { Link } from "react-router-dom";

const SideBarVideo = ({ info }) => {
  const { title, publishedAt, thumbnails, channelTitle, channelId } = info;
  const formattedDate = useDateFormatter(publishedAt);

  return (
    <div className="grid grid-cols-12 gap-1 mb-7">
      <div className="col-span-5 max-w-xs rounded overflow-hidden shadow-sm bg-white ">
        <img
          className="w-full h-28 object-cover"
          src={thumbnails.high.url}
          alt={title}
        />
      </div>
      <div className="col-span-7 px-1 py-2">
        <div className="font-bold text-sm mb-1 line-clamp-2">{title}</div>
        <Link to={"/channel?c=" + channelId}>
          <p className="text-gray-700 text-base mb-1">{channelTitle}</p>
        </Link>
        <p className="text-gray-600 text-sm">{formattedDate}</p>
      </div>
    </div>
  );
};

export const PlaylistStyleSideBarVideo = ({ info }) => {
  const { title, publishedAt, thumbnails, channelTitle, channelId } = info;
  const formattedDate = useDateFormatter(publishedAt);

  return (
    <div className="grid grid-cols-12 gap-1  mb-7 p-1 bg-slate-200    rounded-sm ">
      <div className="col-span-5 max-w-xs rounded overflow-hidden bg-white border-b-4 border-l-2 border-gray-700 ">
        <div className="bg-white border-b-3 border-l-2 border-gray-600 ">
          <div className="bg-white border-b-4  border-l-2 border-gray-500  ">
            <div className="bg-white border-b-3  border-l-2 border-gray-400 ">
              <img
                className="w-full object-cover border-b-2  border-l-2 border-gray-300 "
                src={thumbnails.high.url}
                alt={title}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="col-span-7 px-1 py-2">
        <div className="font-bold text-sm mb-1 line-clamp-2">{title}</div>
        <Link to={"/channel?c=" + channelId}>
          <p className="text-gray-700 text-base mb-1">{channelTitle}</p>
        </Link>
        <p className="text-gray-600 text-sm">{formattedDate}</p>
      </div>
    </div>
  );
};

export default SideBarVideo;
