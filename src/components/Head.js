import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faList,
  faSearch,
  faBell,
  faVideo,
} from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import { toggleMenu } from "../utils/appSlice";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Link } from "react-router-dom";
import { cachedResults } from "../utils/searchSlice";
import { useSelector } from "react-redux";

const Head = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [recommnended, setRecommended] = useState([]);
  const [showrecommnended, setShowrecommnended] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toggleSideMenu = () => {
    dispatch(toggleMenu());
  };

  const searchedCaches = useSelector((store) => store.search);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchedCaches[searchQuery]) {
        setRecommended(searchedCaches[searchQuery]);
      } else {
        getRecommnendedSearchQuery();
      }
    }, 200);
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
    dispatch(
      cachedResults({
        [searchQuery]: json[1],
      })
    );
  };

  const changePage = (item) => {
    setSearchQuery("");

    navigate(`/results?search_query=${item}`);
    setShowrecommnended(false);
  };

  return (
    <div className="grid grid-flow-col items-center px-8 py-2 mb-5 shadow-md fixed top-0 w-full bg-white z-10">
      <div className="col-span-1 flex justify-start">
        <FontAwesomeIcon
          icon={faBars}
          className="h-6 me-8 text-gray-400 cursor-pointer hover:text-gray-500"
          onClick={toggleSideMenu}
        />
        <Link to="/">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/3/34/YouTube_logo_%282017%29.png"
            alt="youtube icon"
            className="w-22 h-6"
          />
        </Link>
      </div>
      <div className="col-span-10 text-center px-10 relative">
        <div className="relative">
          <input
            type="text"
            className="focus:outline-none w-1/2 px-4 py-2 border border-gray-300 rounded-l-2xl"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setShowrecommnended(true)}
          />
          <button className="p-2 px-7 bg-slate-100 border border-gray-300 rounded-r-2xl">
            <FontAwesomeIcon icon={faSearch} />
          </button>
        </div>
        {showrecommnended && searchQuery !== "" && (
          <div className="absolute   left-[21.5rem]  mt-1 bg-white rounded-b-lg shadow-lg w-[43rem] text-start">
            <ul className="p-3">
              {recommnended.map((item, id) => (
                <li
                  className="px-5 py-2 hover:bg-gray-100 cursor-pointer text-mono "
                  onClick={() => changePage(item)}
                >
                  <FontAwesomeIcon icon={faSearch} className="pe-3" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <div className="flex justify-around col-span-1">
        <button className="rounded-lg my-2 text-2xl text-gray-400 ">
          <FontAwesomeIcon icon={faVideo} />
        </button>
        <button className="rounded-lg my-2 text-2xl text-gray-400 ">
          <FontAwesomeIcon icon={faBell}></FontAwesomeIcon>
        </button>
        <div className="flex flex-col relative">
          <img
            src="https://img.freepik.com/premium-vector/user-profile-icon-flat-style-member-avatar-vector-illustration-isolated-background-human-permission-sign-business-concept_157943-15752.jpg"
            alt=" User profile "
            className="w-14"
            onClick={() => setShowUserMenu(!showUserMenu)}
          />
          {showUserMenu && (
            <div
              className="absolute  right-0  mt-[4rem] bg-gray-200  rounded-b-sm shadow-lg w-[15rem] text-start"
              onBlur={() => setShowUserMenu(false)}
            >
              <ul className="p-2">
                <Link
                  to="/playlist"
                  onClick={() => {
                    setShowUserMenu(false);
                  }}
                >
                  <li className="px-5 py-2 hover:bg-gray-100 cursor-pointer text-mono text-gray-600  font-bold ">
                    <FontAwesomeIcon icon={faList} className="pe-3" />
                    <spna>PlayList</spna>
                  </li>
                </Link>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Head;
