import React from "react";

const ButtonList = () => {
  const categories = [
    "All",
    "Mixes",
    "Music",
    "Live",
    "Computer Programming",
    "Gaming",
    "News",
    "Gadgets",
    "Comedy",
    "Watched",
  ];
  return (
    <div>
      <ul className="flex justify-between items-center mb-3  py-3 px-7">
        {categories.map((item) => (
          <li
            key={item}
            className="px-10 py-2 shadow-sm bg-gray-100 rounded-lg hover:bg-gray-50 cursor-pointer"
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ButtonList;
