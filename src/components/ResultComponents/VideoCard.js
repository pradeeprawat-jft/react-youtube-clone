import React from "react";
import { Link } from "react-router-dom";
import useDateFormatter from "../../hooks/useDateFormatter";

const VideoCard = ({ video }) => {
  const dateFormatter = useDateFormatter(video.snippet.publishedAt);

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md">
      <img
        src={video.snippet.thumbnails.medium.url}
        alt={video.snippet.title}
        className="w-full h-40 object-cover rounded-t-xl"
      />
      <div className="p-4 min-h-[14.2rem]  max-h-[14.2rem]">
        <h2 className="text-md font-semibold mb-2   line-clamp-1 ">
          {video.snippet.title}
        </h2>
        <p className="text-gray-600">{dateFormatter}</p>
        <span className="flex items-center my-3">
          <p className="me-3 px-3 py-1 text-white font-bold rounded-full bg-gray-500">
            {video.snippet.channelTitle.slice(0, 1)}
          </p>
          <p className="text-gray-600 me-5">{video.snippet.channelTitle}</p>
        </span>
        <p className="text-gray-600   line-clamp-2  ">
          {video.snippet.description}
        </p>
      </div>
    </div>
  );
};

export default VideoCard;
