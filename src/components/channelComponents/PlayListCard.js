import useDateFormatter from "../../hooks/useDateFormatter";

const PlayListCard = ({ info }) => {
  console.log(info);
  const { snippet } = info;
  const { channelTitle, title, thumbnails } = snippet;
  const formattedDate = useDateFormatter(snippet.publishedAt);
  return (
    <div className="max-w-xs rounded overflow-hidden shadow-sm bg-white mb-7 ">
      <img
        className="w-full h-48 object-cover"
        src={
          thumbnails.medium
            ? thumbnails.medium.url
            : "https://i.ytimg.com/vi/ID_ptkFnwLc/mqdefault.jpg"
        }
        alt={title}
      />
      <div className="px-6 py-4 shadow-sm">
        <div className="font-bold text-md mb-1 line-clamp-2">{title}</div>
        <p className="text-gray-500 font-bold mb-1">{channelTitle}</p>
        <p className="text-gray-500 text-sm">{formattedDate}</p>
      </div>
    </div>
  );
};

export default PlayListCard;
