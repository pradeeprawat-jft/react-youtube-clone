import React, { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import PlaylistRemoveIcon from "@mui/icons-material/PlaylistRemove";
import DownloadIcon from "@mui/icons-material/Download";
import ContentCutIcon from "@mui/icons-material/ContentCut";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import ShareIcon from "@mui/icons-material/Share";
import useDateFormatter from "../hooks/useDateFormatter";
import useNumberFormatter from "../hooks/useFormatNumber";
import SideBarVideo from "./SideBarVideo";
import CommentsContainer from "./CommentsContainer";
import { useDispatch } from "react-redux";
import { closeMenu } from "../utils/appSlice";
import useChannelInfo from "../hooks/useChannelInfo";
import useYouTubeSearch from "../hooks/useYouTubeSearch";
import useVideoData from "../hooks/useVideoData";
import { PlaylistStyleSideBarVideo } from "./SideBarVideo";
import { addVideo, deleteVideo } from "../utils/videoSlice";

const WatchPage = () => {
  const [searchParam] = useSearchParams();
  const videoId = searchParam.get("v");
  const [videoAdded, setVideoAdded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(closeMenu());
    setVideoAdded(false);
  }, [videoId, dispatch]);

  const { snippet, statistics } = useVideoData(videoId);
  const [showDiscription, SetShowDiscription] = useState(false);
  const channelInfo = useChannelInfo(snippet.channelId);
  const subscriberCount = channelInfo
    ? channelInfo.statistics.subscriberCount
    : 0;

  const videos = useYouTubeSearch(snippet.tags ? snippet.tags[0] : "");

  const memoizedVideos = useMemo(() => videos, [videos]);
  const formattedViewNumber = useNumberFormatter(statistics.viewCount);
  const formattedSubscriberCount = useNumberFormatter(subscriberCount);
  const formattedLikeNumber = useNumberFormatter(statistics.likeCount);

  const formattedDate = useDateFormatter(snippet.publishedAt);

  if (!channelInfo) return null;

  const showFullDiscription = () => {
    SetShowDiscription(!showDiscription);
  };

  const addVideoToMyPlayList = () => {
    dispatch(addVideo(videoId));
    setVideoAdded(true);
  };

  const removeVideoFromMyPlayList = () => {
    dispatch(deleteVideo(videoId));
    setVideoAdded(false);
  };

  return (
    <div className="col-span-10 mt-20">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        <div className="md:col-span-9 border border-gray-200 p-4">
          <div className="aspect-w-16 aspect-video">
            <iframe
              className="w-full h-full"
              src={`https://www.youtube.com/embed/${videoId}?si=YjSQqkmie7h7ig9Q&autoplay=1&mute=1&rel=0`}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          </div>
          <div className="mt-4">
            <h1 className="uppercase font-bold mb-2 px-3">{snippet.title}</h1>
            <div className="flex flex-col md:flex-row items-center justify-between my-5 py-3 px-4">
              <div className="flex items-center mb-2 md:mb-0">
                <Link to={"/channel?c=" + snippet.channelId}>
                  <span className="flex items-center ">
                    <img
                      src={channelInfo.snippet.thumbnails.default.url}
                      className="h-12 w-13 me-2  rounded-full border-2 border-gray-300"
                      alt="Channel Thumbnail"
                    ></img>
                    <div className="flex flex-col ml-3 ">
                      <p
                        className="text-gray-600 font-bold me-5"
                        style={{ fontFamily: "serif" }}
                      >
                        {snippet.channelTitle}
                      </p>
                      <p
                        className="text-gray-400  me-5"
                        style={{ fontFamily: "serif", fontSize: "14px" }}
                      >
                        {formattedSubscriberCount} Subscribers
                      </p>
                    </div>
                  </span>
                </Link>

                <p className="md:px-3 py-2 md:ms-2 bg-red-600 text-white rounded-md">
                  Subscribe
                </p>
              </div>
              <div className="flex gap-4">
                <span className="text-gray-700 font-bold px-4 py-2 bg-gray-300 rounded-xl flex items-center justify-between  cursor-pointer ">
                  <ThumbUpIcon sx={{ fontSize: 35 }} className="px-2" />{" "}
                  <span className="me-2">{formattedLikeNumber}</span>
                  |
                  <ThumbDownIcon sx={{ fontSize: 35 }} className="px-2" />
                </span>
                <span className="text-gray-700 font-bold px-4 py-2 bg-gray-300 text-center rounded-xl  cursor-pointer ">
                  <ShareIcon sx={{ fontSize: 35 }} className="px-2" />{" "}
                  <span className="me-2">Share</span>
                </span>
                <span className="text-gray-700 font-bold px-4 py-2 bg-gray-300 text-center rounded-xl cursor-pointer ">
                  <DownloadIcon sx={{ fontSize: 35 }} className="px-2" />{" "}
                  <span className="me-2">Download</span>
                </span>
                <span className="text-gray-700 font-bold px-4 py-2 bg-gray-300 text-center rounded-xl cursor-pointer ">
                  <ContentCutIcon className="px-2" sx={{ fontSize: 35 }} />{" "}
                  <span className="me-2">Cut</span>
                </span>
                <span
                  className="text-gray-700 font-bold px-4 py-2 bg-gray-300 text-center rounded-xl cursor-pointer"
                  onClick={() =>
                    videoAdded
                      ? removeVideoFromMyPlayList()
                      : addVideoToMyPlayList()
                  }
                >
                  {videoAdded ? (
                    <>
                      <PlaylistRemoveIcon
                        className="px-2"
                        sx={{ fontSize: 35 }}
                      />
                      <span className="me-2">remove</span>
                    </>
                  ) : (
                    <>
                      <PlaylistAddIcon className="px-2" sx={{ fontSize: 35 }} />
                      <span className="me-2">Add</span>
                    </>
                  )}
                </span>
              </div>
            </div>
            <div className="p-2 shadow-md mx-4">
              <p className="mb-3 text-gray-500" style={{ fontFamily: "serif" }}>
                {formattedViewNumber} Views • {formattedDate}
              </p>
              {!showDiscription && (
                <div className="py-1 px-2">
                  <pre
                    className="line-clamp-4 overflow-hidden font-normal text-md "
                    style={{
                      fontFamily: "ui-monospace",
                      color: "#4a4a4a",
                    }}
                  >
                    {snippet.description}
                  </pre>
                  <button
                    className="text-blue-600 mt-2"
                    onClick={() => showFullDiscription()}
                  >
                    show more....
                  </button>
                </div>
              )}
              {showDiscription && (
                <div className="py-1 px-2 ">
                  <pre
                    className="overflow-hidden font-normal text-md "
                    style={{
                      fontFamily: "ui-monospace",
                      color: "#4a4a4a",
                    }}
                  >
                    {snippet.description}
                  </pre>
                  <button
                    className="text-blue-600 mt-2"
                    onClick={() => showFullDiscription()}
                  >
                    Show Less
                  </button>
                </div>
              )}
            </div>
          </div>
          <div className="mt-7">
            <CommentsContainer
              commentsCount={statistics.commentCount}
              videoId={videoId}
            ></CommentsContainer>
          </div>
        </div>
        <div className="md:col-span-3 border border-gray-200 p-4">
          {memoizedVideos.map((video) => (
            <>
              {video.id.kind === "youtube#video" && (
                <Link
                  to={`/watch?v=${video.id.videoId}`}
                  key={video.id.videoId}
                >
                  <SideBarVideo info={video.snippet}></SideBarVideo>
                </Link>
              )}
              {video.id.kind === "youtube#playlist" && (
                <Link
                  to={`/watch?v=${video.id.playlistId}`}
                  key={video.id.videoId}
                >
                  <PlaylistStyleSideBarVideo
                    info={video.snippet}
                  ></PlaylistStyleSideBarVideo>
                </Link>
              )}
            </>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WatchPage;
