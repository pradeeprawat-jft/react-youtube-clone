import React from "react";
import { Link } from "react-router-dom";
import useVideoCategories from "../hooks/useVideoCategories";
import "./style/ButtonList.css";

const ButtonList = () => {
  const { videoCategoriesList } = useVideoCategories();

  return (
    <div id="content" className="mt-3">
      <ul className="flex justify-center gap-2 sm:justify-between items-center mb-3 py-1 px-2 sm:px-7 ">
        {videoCategoriesList.map((item) => (
          <Link
            key={item.id}
            to={"/results?search_query=" + item.snippet.title}
          >
            <div
              className="w-[11rem] text-center p-1 sm:p-4 shadow-md rounded-lg hover:shadow-lg cursor-pointer text-sm mx-1  "
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
