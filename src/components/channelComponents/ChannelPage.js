import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { openMenu } from "../../utils/appSlice";
import ProfileHeader from "./ProfileHeader";
import PlayListContainer from "./PlayListContainer";
import useChannelInfo from "../../hooks/useChannelInfo";
import useChannelBanner from "../../hooks/useChannelBanner";
import usePlaylists from "../../hooks/usePlaylists";

const ChannelPage = () => {
  const [searchParam] = useSearchParams();
  const channelId = searchParam.get("c");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(openMenu());
  }, [dispatch]);

  const banner = useChannelBanner(channelId);
  const channelInfo = useChannelInfo(channelId);
  const { playlistInfo } = usePlaylists(channelId);

  console.log("banner.banner", banner.banner);

  return (
    <div className="col-span-12 mt-20 border border-gray-100 py-5 px-20 ">
      <div
        className="w-full h-[15rem] rounded-md"
        style={{
          backgroundImage:
            banner.banner !== ""
              ? `url(${banner.banner})`
              : "linear-gradient(#FAF0E4, #F5EFE7)",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center center",
          position: "relative",
        }}
      ></div>

      {channelInfo !== null && (
        <ProfileHeader info={channelInfo} channelId={channelId} />
      )}
      <div className="my-5 border border-b-gray-300  "></div>
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
