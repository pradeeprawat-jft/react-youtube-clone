import React, { useState, useEffect } from "react";
import { YOUTUBE_API_KEY } from "../utils/constants";
import useDateFormatter from "../hooks/useDateFormatter";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

const Comment = ({ data }) => {
  const {
    authorDisplayName,
    textOriginal,
    likeCount,
    publishedAt,
    authorProfileImageUrl,
  } = data.snippet;
  const formattedDate = useDateFormatter(publishedAt);

  return (
    <div className="flex shadow-sm py-2 mb-3">
      <img
        src={
          authorProfileImageUrl
            ? authorProfileImageUrl
            : "https://img.freepik.com/premium-vector/user-profile-icon-flat-style-member-avatar-vector-illustration-isolated-background-human-permission-sign-business-concept_157943-15752.jpg"
        }
        alt="User profile"
        className="w-14 rounded-full h-[3.6rem]"
      />
      <div className="flex-grow px-3">
        <p className="font-bold pb-1">
          {authorDisplayName}
          <span className="font-light">
            {" "}
            | {formattedDate} |{" "}
            <FontAwesomeIcon
              icon={faHeart}
              className="text-red-600 ml-auto"
            ></FontAwesomeIcon>{" "}
            {likeCount}
          </span>
        </p>

        <p
          style={{
            fontFamily: "ui-monospace",
            color: "black",
            overflow: "hidden",
          }}
        >
          {textOriginal}
        </p>
      </div>
    </div>
  );
};

const CommentReplies = ({ replies }) => {
  if (!Array.isArray(replies.comments) || replies.comments.length === 0) {
    return null;
  }

  return (
    <div>
      {replies.comments.map((comments) => (
        <div key={comments.id} className=" ml-5 pl-5  border border-l-black">
          <Comment data={comments}></Comment>
        </div>
      ))}
    </div>
  );
};

const CommentList = ({ comments }) => {
  return (
    <div className="mt-10">
      {comments.map((comment) => (
        <div key={comment.id} className=" pl-5">
          <Comment data={comment.snippet.topLevelComment}></Comment>
          {comment.replies && (
            <CommentReplies replies={comment.replies}></CommentReplies>
          )}
        </div>
      ))}
    </div>
  );
};

const CommentsContainer = ({ commentsCount, videoId }) => {
  const [commentsData, setCommentsData] = useState([]);

  useEffect(() => {
    getComments();
  }, []);

  const getComments = async () => {
    const data = await fetch(
      `https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet%2Creplies&order=relevance&videoId=${videoId}&key=${YOUTUBE_API_KEY}`
    );
    const json = await data.json();
    setCommentsData(json.items);
    console.log(json.items);
  };
  return (
    <div>
      <h1 className="text-2xl pl-3 mb-4 font-serif">
        {commentsCount} Comments{" "}
      </h1>
      <hr></hr>
      <CommentList comments={commentsData}></CommentList>
    </div>
  );
};

export default CommentsContainer;
