import React, { useState } from "react";

import { FaHeart, FaComment } from "react-icons/fa";

type PostOverlayPropsTypes = {
  isDropped: boolean;
  user_avatar: string;
  username: string;
  dropDownHandler: () => void;
  post_title: string;
};




const PostOverlay: React.FC<PostOverlayPropsTypes> = ({
  isDropped,
  username,
  user_avatar,
  dropDownHandler,
  post_title
}) => {
  const [isLiked, setIsLiked] = useState(false);

  return (
    <>
      <div
        className={`absolute flex items-center z-10 justify-between gap-2 ${!isDropped ? "right-1 top-4 flex-col" : "right-2 top-3 flex-row-reverse !items-start"}`}
      >
        <img
          className="w-10 h-10 rounded-full object-contain"
          src={user_avatar}
          alt={username}
        />

        <div className="flex flex-col justify-center items-center p-1">
          <FaHeart
            className={`text-2xl ${isLiked ? "text-tomato" : "text-white opacity-40"} md:hover:'text-tomato' hover:scale-105 transition-transform duration-200 ease-in`}
            role="button"
            aria-label="Like or Unlike"
            onClick={() => setIsLiked(!isLiked)}
          />
          <p
            className={`text-sm font-semibold ${isLiked ? "text-tomato" : "text-white"}`}
          >
            23
          </p>
        </div>
        <div className="flex flex-col justify-center items-center p-1">
          <FaComment
            className="text-2xl text-white"
            role="button"
            aria-label="Toggle comments"
          />
          <p className={`text-sm font-semibold text-tomato`}>10</p>
        </div>
      </div>
      <h2 className="absolute bottom-8 left-3 p-1 text-2xl font-bold text-white uppercase italic text-left break-all">
        {post_title}
      </h2>
      <div
        className="absolute bottom-1 left-4 w-2/4 cursor-pointer"
        onClick={dropDownHandler}
      >
        <p className={`text-white text-sm ${isDropped && "text-orange-700"}`}>
          See {!isDropped ? "more..." : "less"}
        </p>
      </div>
    </>
  );
};

export default PostOverlay;
