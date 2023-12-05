import React from "react";
import { Link } from "react-router-dom";
import useVideoCategories from "../hooks/useVideoCategories";
import "./ButtonList.css";

const ButtonList = () => {
  const { videoCategoriesList } = useVideoCategories();

  return (
    <div id="content" className="mt-3">
      <ul className="flex justify-center gap-4 sm:justify-between items-center mb-3 py-1 px-2 sm:px-7 max-w-[20rem] ">
        {videoCategoriesList.map((item) => (
          <Link
            key={item.id}
            to={"/results?search_query=" + item.snippet.title}
          >
            <div
              className="w-[11rem] text-center p-1 sm:p-4 border border-gray-300 rounded-md hover:shadow-md cursor-pointer text-sm mx-1  "
              style={{ fontFamily: "auto" }}
            >
              {item.snippet.title}
            </div>
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default ButtonList;
