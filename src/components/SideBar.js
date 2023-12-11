import React from "react";
import SidebarItem from "./SidebarItem";
import { useSelector } from "react-redux";
import useVideoCategories from "../hooks/useVideoCategories";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import HomeIcon from "@mui/icons-material/HomeOutlined";
import SubscriptionsIcon from "@mui/icons-material/SubscriptionsOutlined";
import PlaylistPlayIcon from "@mui/icons-material/PlaylistPlayOutlined";
import AccountBoxIcon from "@mui/icons-material/AccountBoxOutlined";
import HistoryIcon from "@mui/icons-material/HistoryOutlined";
import SmartDisplayIcon from "@mui/icons-material/SmartDisplayOutlined";
import WatchLaterIcon from "@mui/icons-material/WatchLaterOutlined";
import ContentCutIcon from "@mui/icons-material/ContentCutOutlined";
import ExpandMoreIcon from "@mui/icons-material/ExpandMoreOutlined";
import ThumbUpIcon from "@mui/icons-material/ThumbUpOutlined";
import TrendingUpIcon from "@mui/icons-material/TrendingUpOutlined";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBagOutlined";
import LibraryMusicOutlinedIcon from "@mui/icons-material/LibraryMusicOutlined";
import MovieCreationOutlinedIcon from "@mui/icons-material/MovieCreationOutlined";
import LiveTvOutlinedIcon from "@mui/icons-material/LiveTvOutlined";
import SportsEsportsOutlinedIcon from "@mui/icons-material/SportsEsportsOutlined";
import NewspaperOutlinedIcon from "@mui/icons-material/NewspaperOutlined";
import EmojiEventsOutlinedIcon from "@mui/icons-material/EmojiEventsOutlined";
import DiamondOutlinedIcon from "@mui/icons-material/DiamondOutlined";
import LightbulbOutlinedIcon from "@mui/icons-material/LightbulbOutlined";
import PodcastsOutlinedIcon from "@mui/icons-material/PodcastsOutlined";

const SideBar = () => {
  const toggleMenu = useSelector((store) => store.app.isMenuOpen);
  const { videoCategoriesList } = useVideoCategories();

  if (!toggleMenu || !videoCategoriesList) return null;

  return (
    <div className="col-span-1 mt-20 shadow-xl">
      <ul className="py-3 ps-4">
        <SidebarItem
          to="/"
          icon={
            <HomeIcon className="px-2 text-gray-700" sx={{ fontSize: 40 }} />
          }
          text="Home"
        />
        <SidebarItem
          to="/playlist"
          icon={
            <PlaylistPlayIcon
              className="px-2 text-gray-700"
              sx={{ fontSize: 40 }}
            />
          }
          text="Playlist"
        />
        <SidebarItem
          to="/"
          icon={
            <SubscriptionsIcon
              className="px-2 text-gray-700"
              sx={{ fontSize: 40 }}
            />
          }
          text="Subscriptions"
        />
      </ul>

      <hr className="mx-4"></hr>

      <ul className="py-3 ps-4">
        <h3 className="px-3 font-bold mb-2">
          You <ArrowForwardIosIcon className="px-2" sx={{ fontSize: 30 }} />
        </h3>
        <SidebarItem
          to="/"
          icon={
            <AccountBoxIcon
              className="px-2 text-gray-700"
              sx={{ fontSize: 40 }}
            />
          }
          text="Your channel"
        />
        <SidebarItem
          to="/playlist"
          icon={
            <HistoryIcon className="px-2 text-gray-700" sx={{ fontSize: 40 }} />
          }
          text="History"
        />
        <SidebarItem
          to="/"
          icon={
            <SmartDisplayIcon
              className="px-2 text-gray-700"
              sx={{ fontSize: 40 }}
            />
          }
          text="Your videos"
        />
        <SidebarItem
          to="/"
          icon={
            <WatchLaterIcon
              className="px-2 text-gray-700"
              sx={{ fontSize: 40 }}
            />
          }
          text="Watch later"
        />
        <SidebarItem
          to="/"
          icon={
            <ContentCutIcon
              className="px-2 text-gray-700"
              sx={{ fontSize: 40 }}
            />
          }
          text="Your clips"
        />
        <SidebarItem
          to="/"
          icon={
            <ThumbUpIcon className="px-2 text-gray-700" sx={{ fontSize: 40 }} />
          }
          text="Liked videos"
        />
        <SidebarItem
          to="/"
          icon={
            <ExpandMoreIcon
              className="px-2 text-gray-700"
              sx={{ fontSize: 40 }}
            />
          }
          text="Show more"
        />
      </ul>

      <hr className="mx-4"></hr>

      <ul className="py-3 ps-4">
        <h3 className="px-3 mb-2 font-bold">Explore</h3>
        <SidebarItem
          to="/"
          icon={
            <TrendingUpIcon
              className="px-2 text-gray-700"
              sx={{ fontSize: 40 }}
            />
          }
          text="Trending"
        />
        <SidebarItem
          to="/"
          icon={
            <ShoppingBagIcon
              className="px-2 text-gray-700"
              sx={{ fontSize: 40 }}
            />
          }
          text="Shopping"
        />
        <SidebarItem
          to="/"
          icon={
            <LibraryMusicOutlinedIcon
              className="px-2 text-gray-700"
              sx={{ fontSize: 40 }}
            />
          }
          text="Music"
        />
        <SidebarItem
          to="/"
          icon={
            <MovieCreationOutlinedIcon
              className="px-2 text-gray-700"
              sx={{ fontSize: 40 }}
            />
          }
          text="Movies"
        />
        <SidebarItem
          to="/"
          icon={
            <LiveTvOutlinedIcon
              className="px-2 text-gray-700"
              sx={{ fontSize: 40 }}
            />
          }
          text="Live"
        />
        <SidebarItem
          to="/"
          icon={
            <SportsEsportsOutlinedIcon
              className="px-2 text-gray-700"
              sx={{ fontSize: 40 }}
            />
          }
          text="Gaming"
        />
        <SidebarItem
          to="/"
          icon={
            <NewspaperOutlinedIcon
              className="px-2 text-gray-700"
              sx={{ fontSize: 40 }}
            />
          }
          text="News"
        />
        <SidebarItem
          to="/"
          icon={
            <EmojiEventsOutlinedIcon
              className="px-2 text-gray-700"
              sx={{ fontSize: 40 }}
            />
          }
          text="Sports"
        />
        <SidebarItem
          to="/"
          icon={
            <DiamondOutlinedIcon
              className="px-2 text-gray-700"
              sx={{ fontSize: 40 }}
            />
          }
          text="Fashion & beauty"
        />
        <SidebarItem
          to="/"
          icon={
            <LightbulbOutlinedIcon
              className="px-2 text-gray-700"
              sx={{ fontSize: 40 }}
            />
          }
          text="Learning"
        />
        <SidebarItem
          to="/"
          icon={
            <PodcastsOutlinedIcon
              className="px-2 text-gray-700"
              sx={{ fontSize: 40 }}
            />
          }
          text="Podcasts"
        />
      </ul>
    </div>
  );
};

export default SideBar;
