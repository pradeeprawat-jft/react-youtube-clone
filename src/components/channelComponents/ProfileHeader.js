import useNumberFormatter from "../../hooks/useFormatNumber";
import { faBell, faGreaterThan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ProfileHeader = ({ info }) => {
  const { snippet, statistics } = info;
  const { thumbnails, title, description, customUrl } = snippet;
  const { subscriberCount, videoCount } = statistics;
  const subscriber = useNumberFormatter(subscriberCount);

  return (
    <div className="mt-10 grid grid-flow-col p-2">
      <div className="col-span-2  flex justify-end pe-10 ">
        <img
          src={thumbnails.high.url}
          alt="youtube icon"
          className="w-[13rem] h-[13rem] rounded-full border border-black "
        />
      </div>
      <div className="col-span-10 p-4 ">
        <div className="">
          <h1
            className="py-2 font-bold text-2xl "
            style={{ fontFamily: "cursive" }}
          >
            {title}
          </h1>
          <h2
            className="py-2 "
            style={{
              fontSize: "16px",
              fontWeight: 300,
              fontFamily: "ui-monospace",
              color: "gray",
              textTransform: "lowercase",
            }}
          >
            {customUrl} • {subscriber} subscriber • {videoCount} videos
          </h2>
          <h6
            className="py-2 font-light"
            style={{
              fontWeight: 300,
              fontSize: "14px",
              fontFamily: "fantasy",
            }}
          >
            {description.slice(0, 70)}....
            <FontAwesomeIcon
              icon={faGreaterThan}
              className="ps-2 text-gray-500"
            />
          </h6>
          <button className="px-10 py-2 bg-red-600 rounded-lg my-2 text-white">
            Subscribe
            <FontAwesomeIcon
              icon={faBell}
              className="ps-2 text-white"
            ></FontAwesomeIcon>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
