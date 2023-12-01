import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const SideBar = () => {
  const toggleMenu = useSelector((store) => store.app.isMenuOpen);

  const list = [
    "Home",
    "Shorts",
    "Subscriptions",
    "Music",
    "Trending",
    "History",
    "Your Channel",
  ];
  if (!toggleMenu) return null;
  return (
    <div className="col-span-2 mt-20">
      <ul className="p-3">
        {list.map((item) => (
          <Link to="/" key={item}>
            <li className="px-6 py-5 shadow-sm hover:bg-slate-50 cursor-pointer text-sm">
              {item}
            </li>
          </Link>
        ))}
      </ul>
      <h2 className="px-8 p-4 font-bold">Subscriptions</h2>
      <ul className="p-3">
        {list.map((item) => (
          <li
            key={item}
            className="px-6 py-5 shadow-sm hover:bg-slate-50 cursor-pointer text-sm"
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SideBar;
