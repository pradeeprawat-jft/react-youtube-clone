import React from "react";
import SideBar from "./SideBar";
import { Outlet } from "react-router-dom";
import Head from "./Head";

const Body = () => {
  return (
    <div className="grid grid-flow-col grid-col-1 ">
      <Head></Head>
      <div className="grid grid-flow-col grid-cols-12 ">
        <SideBar></SideBar>
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default Body;
