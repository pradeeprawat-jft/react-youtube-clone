// SideBar.js

import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import useVideoCategories from "../hooks/useVideoCategories";

const SideBar = () => {
  const toggleMenu = useSelector((store) => store.app.isMenuOpen);
  const { videoCategoriesList } = useVideoCategories();

  if (!toggleMenu || !videoCategoriesList) return null;

  return (
    <div className="col-span-1 mt-16 shadow-xl">
      {/* <div className="col-span-1 mt-16 shadow-xl fixed bg-white z-50"> */}
      <ul className="py-3 ps-3 ">
        {videoCategoriesList.map((item) => (
          <Link to="/" key={item.id}>
            <li
              className="px-6 py-7 border-b border-gray-200 hover:bg-gray-100 cursor-pointer text-sm transition duration-300 ease-in-out"
              style={{ fontFamily: "auto" }}
            >
              {item.snippet.title}
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default SideBar;
