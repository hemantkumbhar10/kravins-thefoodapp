import React from "react";
import Carousel from "../ui/Carousel";
import PostOverlay from "./PostOverlay";
import { UserPostsData } from "../../types/BackendTypes";

interface GalleryProps {
  postImgs: string[];
  dropDownHandler: () => void;
  isDropped: boolean;
  user: UserPostsData['user'] | { username: string };
  avatarUrl: string;
  post_title: string;
}

const Gallery: React.FC<GalleryProps> = ({
  postImgs,
  dropDownHandler,
  isDropped,
  user,
  avatarUrl,
  post_title
}) => {

  return (
    <div className="w-full relative h-72 top-0 left-0 overflow-hidden">
      <div className="w-full relative flex h-full top-0 left-0 items-center">
        <Carousel postImgs={postImgs} isDropped={isDropped} />
      </div>
      <PostOverlay
        isDropped={isDropped}
        user_avatar={avatarUrl}
        username={user.username}
        dropDownHandler={dropDownHandler}
        post_title={post_title}
      />
    </div>
  );
};
export default Gallery;
