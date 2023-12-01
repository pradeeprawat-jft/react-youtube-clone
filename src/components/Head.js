import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faSearch } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import { toggleMenu } from "../utils/appSlice";
import { useState } from "react";

const Head = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [recommnended, setRecommended] = useState([]);
  const [showrecommnended, setShowrecommnended] = useState(false);
  const dispatch = useDispatch();
  const toggleSideMenu = () => {
    dispatch(toggleMenu());
  };

  useEffect(() => {
    const timer = setTimeout(() => getRecommnendedSearchQuery(), 200);
    return () => {
      clearTimeout(timer);
    };
  }, [searchQuery]);

  const getRecommnendedSearchQuery = async () => {
    const data = await fetch(
      `http://suggestqueries.google.com/complete/search?client=firefox&ds=yt&q=${searchQuery}`
    );
    const json = await data.json();
    setRecommended(json[1]);
  };

  return (
    <div className="grid grid-flow-col items-center px-10 py-2 mb-5 shadow-md fixed top-0 w-full bg-white z-10">
      <div className="col-span-1 flex">
        <FontAwesomeIcon
          icon={faBars}
          className="h-5 me-3 text-gray-400 cursor-pointer hover:text-gray-500"
          onClick={toggleSideMenu}
        />
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/3/34/YouTube_logo_%282017%29.png"
          alt="youtube icon"
          className="w-22 h-5"
        />
      </div>
      <div className="col-span-10 px-10 relative">
        <div className="relative">
          <input
            type="text"
            className="focus:outline-none w-1/2 px-4 py-2 border border-gray-300 rounded-l-2xl"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setShowrecommnended(true)}
            onBlur={() => setShowrecommnended(false)}
          />
          <button className="p-2 px-7 bg-slate-100 border border-gray-300 rounded-r-2xl">
            <FontAwesomeIcon icon={faSearch} />
          </button>
        </div>
        {showrecommnended && (
          <div className="absolute left-10 mt-1 bg-white rounded-b-lg shadow-lg w-[43rem]">
            <ul>
              {recommnended.map((item) => (
                <li key={item} className="p-2 hover:bg-gray-100 cursor-pointer">
                  <FontAwesomeIcon icon={faSearch} className="pe-4" /> {item}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <div className="flex justify-center col-span-1">
        <img
          src="https://img.freepik.com/premium-vector/user-profile-icon-flat-style-member-avatar-vector-illustration-isolated-background-human-permission-sign-business-concept_157943-15752.jpg"
          alt=" User profile "
          className="w-14"
        />
      </div>
    </div>
  );
};

export default Head;
