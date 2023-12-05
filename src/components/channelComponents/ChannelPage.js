import React, { useEffect, useState } from "react";
import { YOUTUBE_API_KEY } from "../../utils/constants";
import { useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { openMenu } from "../../utils/appSlice";
import ProfileHeader from "./ProfileHeader";
import PlayListContainer from "./PlayListContainer";

const ChannelPage = () => {
  const [searchParam] = useSearchParams();
  const channelId = searchParam.get("c");
  const [channelInfo, setChannelInfo] = useState([]);
  const dispatch = useDispatch();
  const [banner, setBanner] = useState("");
  const [playlistInfo, setPlaylistInfo] = useState([]);

  useEffect(() => {
    dispatch(openMenu());
    getChannelInfo();
    getBanner();
    getPlayList();
  }, []);

  const getBanner = async () => {
    try {
      const data = await fetch(
        `https://www.googleapis.com/youtube/v3/channels?part=brandingSettings&id=${channelId}&key=${YOUTUBE_API_KEY}`
      );
      const json = await data.json();
      const bannerUrl =
        json.items[0]?.brandingSettings?.image?.bannerExternalUrl || "";
      setBanner(bannerUrl);
    } catch (error) {
      console.error("Error fetching banner:", error);
    }
  };

  const getChannelInfo = async () => {
    const data = await fetch(
      `https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${channelId}&key=${YOUTUBE_API_KEY}`
    );

    const json = await data.json();
    setChannelInfo(json.items[0]);
  };

  const getPlayList = async () => {
    const data = await fetch(
      `https://youtube.googleapis.com/youtube/v3/playlists?part=snippet%2CcontentDetails&channelId=${channelId}&maxResults=25&key=${YOUTUBE_API_KEY}`
    );
    const json = await data.json();
    setPlaylistInfo(json.items);
  };

  return (
    <div className="col-span-11 mt-20 border border-gray-100 py-5 px-20 ">
      <div
        className="w-full h-[15rem] rounded-md"
        style={{
          backgroundImage: banner ? `url(${banner})` : "none",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center center",
          position: "relative",
        }}
      ></div>
      {channelInfo.length !== 0 && (
        <ProfileHeader info={channelInfo} channelId={channelId} />
      )}
      <div className="my-5 border border-b-black  "></div>
      <div className="px-3 flex justify-between flex-wrap">
        {playlistInfo.length !== 0 &&
          playlistInfo.map((video) => (
            <PlayListContainer
              info={video}
              plalistId={video.id}
              key={video.id}
            ></PlayListContainer>
          ))}
      </div>
    </div>
  );
};

export default ChannelPage;
