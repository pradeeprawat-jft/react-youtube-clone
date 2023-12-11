import React from "react";
import { Link } from "react-router-dom";

const SidebarItem = ({ to, icon, text }) => (
  <Link to={to}>
    <li
      className="py-2 hover:bg-gray-100 cursor-pointer text-sm"
      style={{ fontFamily: "auto" }}
    >
      {icon} {text}
    </li>
  </Link>
);

export default SidebarItem;
