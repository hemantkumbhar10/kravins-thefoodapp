import React, { useState } from "react";
import Gallery from "./Gallery";
import { UserPostsData } from '../../types/BackendTypes';

type PostDataType = {
  post: UserPostsData
}

const PostCard = React.forwardRef<HTMLDivElement, PostDataType>((props, ref) => {
  const [isDropped, setIsDropped] = useState(false);


  const { avatarUrl, user, post } = props.post;

  const dropDownHandler = () => {
    setIsDropped(!isDropped);
  };



  return (
    <>
      <div ref={ref} className="w-full flex flex-col justify-center items-center py-3">
        <Gallery
          user={user}
          postImgs={post.images}
          dropDownHandler={dropDownHandler}
          isDropped={isDropped}
          avatarUrl={avatarUrl}
          post_title={post.title}
        />
        <div
          className={`w-full ${isDropped ? "h-96 p-3 pb-4 " : "h-0"} bg-gray-100 transition-[height, padding] duration-300 ease overflow-y-scroll`}
        >
          <a className="italic text-base font-semibold">@{user.username}</a>
          <p className="text-black tracking-tighter text-justify">
            {post.recipe}
          </p>
        </div>
      </div>
    </>
  );
});

export default PostCard;
