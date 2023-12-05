import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { YOUTUBE_API, YOUTUBE_API_KEY } from "../utils/constants";
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

const WatchPage = () => {
  const [snippet, setSnippet] = useState({
    title: "",
    channelTitle: "",
    publishedAt: "",
    description: "",
  });
  const [statistics, setStatistics] = useState({
    viewCount: 0,
    likeCount: 0,
    dislikeCount: 0,
    commentCount: 0,
  });
  const [searchParam] = useSearchParams();
  const videoId = searchParam.get("v");

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(closeMenu());
  }, []);

  useEffect(() => {
    getVideoById(videoId);
    getVideos();
  }, [videoId]);

  const [sideVideos, setSideVideos] = useState([]);

  const getVideos = async () => {
    const data = await fetch(YOUTUBE_API);
    const json = await data.json();
    setSideVideos(json.items);
  };

  const getVideoById = async (videoId) => {
    try {
      const response = await fetch(
        `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}&key=${YOUTUBE_API_KEY}`
      );
      if (!response.ok) {
        throw new Error(
          `Failed to fetch video data. Status: ${response.status}`
        );
      }
      const json = await response.json();
      const videoData = json.items[0];
      setSnippet(videoData.snippet || {});
      setStatistics(videoData.statistics || {});
    } catch (error) {
      console.error("Error fetching video data:", error);
    }
  };

  const formattedViewNumber = useNumberFormatter(statistics.viewCount);
  const formattedCommentNumber = useNumberFormatter(statistics.commentCount);
  const formattedLikeNumber = useNumberFormatter(statistics.likeCount);
  const formattedDate = useDateFormatter(snippet.publishedAt);

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
                  <span className="flex items-center">
                    <p className="me-3 px-3 py-1 text-white font-bold rounded-full bg-gray-500">
                      {snippet.channelTitle.slice(0, 1)}
                    </p>
                    <p className="text-gray-600 me-5">{snippet.channelTitle}</p>
                  </span>
                </Link>

                <p className="md:px-3 py-1 md:ms-2 bg-red-600 text-white rounded-md">
                  Subscribe
                </p>
              </div>
              <div className="flex gap-2">
                <span className="text-gray-200 font-bold px-2 py-1 bg-gray-600 rounded-md flex items-center justify-between">
                  {formattedLikeNumber}{" "}
                  <FontAwesomeIcon icon={faThumbsUp} className="px-2" />
                  |
                  <FontAwesomeIcon icon={faThumbsDown} className="px-2" />
                </span>
                <span className="text-gray-200 font-bold px-3 py-1 bg-gray-600 text-center rounded-md">
                  {formattedCommentNumber}{" "}
                  <FontAwesomeIcon icon={faComment} className="px-2" />
                </span>
                <span className="text-gray-200 font-bold px-3 py-1 bg-gray-600 text-center rounded-md">
                  <FontAwesomeIcon icon={faShare} className="px-2" />
                </span>
                <span className="text-gray-200 font-bold px-3 py-1 bg-gray-600 text-center rounded-md">
                  <FontAwesomeIcon icon={faDownload} className="px-2" />
                </span>
                <span className="text-gray-200 font-bold px-3 py-1 bg-gray-600 text-center rounded-md">
                  <FontAwesomeIcon icon={faScissors} className="px-2" />
                </span>
              </div>
            </div>
            <div className="p-4 shadow-md mx-4">
              <p className="mb-3 text-gray-500" style={{ fontFamily: "serif" }}>
                {/* {formattedViewNumber} Views {formattedDate} */}
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
          {sideVideos.map((video) => (
            <Link to={"/watch?v=" + video.id} key={video.id}>
              <SideBarVideo info={video}></SideBarVideo>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WatchPage;
