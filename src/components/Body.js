import React from "react";
import SideBar from "./SideBar";
import { Outlet } from "react-router-dom";
import Head from "./Head";

const Body = () => {
  return (
    <div className="grid grid-flow-col grid-cols-10 ">
      <Head></Head>
      <SideBar></SideBar>
      <Outlet></Outlet>
    </div>
  );
};

export default Body;
