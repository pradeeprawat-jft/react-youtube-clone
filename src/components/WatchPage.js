import React, { useEffect, useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faComment,
  faDownload,
  faScissors,
  faThumbsDown,
  faThumbsUp,
  faShare,
} from "@fortawesome/free-solid-svg-icons";
import useDateFormatter from "../hooks/useDateFormatter";
import useNumberFormatter from "../hooks/useFormatNumber";
import SideBarVideo from "./SideBarVideo";
import CommentsContainer from "./CommentsContainer";
import { useDispatch } from "react-redux";
import { closeMenu } from "../utils/appSlice";
import useChannelInfo from "../hooks/useChannelInfo";
import useYouTubeSearch from "../hooks/useYouTubeSearch";
import useVideoData from "../hooks/useVideoData";
// import { PlaylistStyleSideBarVideo } from "./SideBarVideo";

const WatchPage = () => {
  const [searchParam] = useSearchParams();
  const videoId = searchParam.get("v");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(closeMenu());
  }, [dispatch]);

  const { snippet, statistics } = useVideoData(videoId);
  const channelInfo = useChannelInfo(snippet.channelId);
  const videos = useYouTubeSearch(snippet.tags[0]);
  const memoizedVideos = useMemo(() => videos, [videos]);
  const formattedViewNumber = useNumberFormatter(statistics.viewCount);
  const formattedCommentNumber = useNumberFormatter(statistics.commentCount);
  const formattedLikeNumber = useNumberFormatter(statistics.likeCount);
  const formattedDate = useDateFormatter(snippet.publishedAt);

  if (!channelInfo) return null;

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
            <h1 className="uppercase font-bold mb-2">{snippet.title}</h1>
            <div className="flex flex-col md:flex-row items-center justify-between my-5 py-3 px-4">
              <div className="flex items-center mb-2 md:mb-0">
                <Link to={"/channel?c=" + snippet.channelId}>
                  <span className="flex items-center ">
                    <img
                      src={channelInfo.snippet.thumbnails.default.url}
                      className="h-10 w-13 me-2  rounded-full"
                      alt="Channel Thumbnail"
                    ></img>
                    <p
                      className="text-gray-600 font-bold me-5"
                      style={{ fontFamily: "serif" }}
                    >
                      {snippet.channelTitle}
                    </p>
                  </span>
                </Link>

                <p className="md:px-3 py-1 md:ms-2 bg-red-600 text-white rounded-md">
                  Subscribe
                </p>
              </div>
              <div className="flex gap-2">
                <span className="text-gray-200 font-bold px-2 py-1 bg-gray-600 rounded-md flex items-center justify-between  cursor-pointer ">
                  {formattedLikeNumber}{" "}
                  <FontAwesomeIcon icon={faThumbsUp} className="px-2" />
                  |
                  <FontAwesomeIcon icon={faThumbsDown} className="px-2" />
                </span>
                <span className="text-gray-200 font-bold px-3 py-1 bg-gray-600 text-center rounded-md  cursor-pointer ">
                  {formattedCommentNumber}{" "}
                  <FontAwesomeIcon icon={faComment} className="px-2" />
                </span>
                <span className="text-gray-200 font-bold px-3 py-1 bg-gray-600 text-center rounded-md  cursor-pointer ">
                  <FontAwesomeIcon icon={faShare} className="px-2" />
                </span>
                <span className="text-gray-200 font-bold px-3 py-1 bg-gray-600 text-center rounded-md  cursor-pointer ">
                  <FontAwesomeIcon icon={faDownload} className="px-2" />
                </span>
                <span className="text-gray-200 font-bold px-3 py-1 bg-gray-600 text-center rounded-md">
                  <FontAwesomeIcon icon={faScissors} className="px-2" />
                </span>
              </div>
            </div>
            <div className="p-2 shadow-md mx-4">
              <p className="mb-3 text-gray-500" style={{ fontFamily: "serif" }}>
                {formattedViewNumber} Views • {formattedDate}
              </p>
              <div className="py-1">
                <pre
                  className="line-clamp-4 overflow-hidden font-normal text-md "
                  style={{
                    fontFamily: "ui-monospace",
                    color: "#4a4a4a",
                  }}
                >
                  {snippet.description}
                </pre>
              </div>
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
              {console.log(video)}
              {video.id.kind === "youtube#video" && (
                <Link
                  to={`/watch?v=${video.id.videoId}`}
                  key={video.id.videoId}
                >
                  <SideBarVideo info={video.snippet}></SideBarVideo>
                </Link>
              )}
              {/* {video.id.kind === "youtube#playlist" && (
                <Link
                  to={`/watch?v=${video.id.playlistId}`}
                  key={video.id.videoId}
                >
                  <PlaylistStyleSideBarVideo
                    info={video.snippet}
                  ></PlaylistStyleSideBarVideo>
                </Link>
              )} */}
            </>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WatchPage;
