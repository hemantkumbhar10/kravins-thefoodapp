import React from "react";
import Carousel from "../ui/Carousel";
import PostOverlay from "./PostOverlay";
import { IUser } from "../../types/BackendTypes";

interface GalleryProps {
    postImgs: string[];
    isOpenComments: boolean;
    openCommentsHandler: () => void;
    dropDownHandler: () => void;
    isDropped: boolean;
    user: IUser;
    post_title: string;
    commentCount?: number;
}

const Gallery: React.FC<GalleryProps> = ({
    postImgs,
    openCommentsHandler,
    isOpenComments,
    dropDownHandler,
    isDropped,
    user,
    post_title,
    commentCount
}) => {

    return (
        <div className="w-full relative h-72 top-0 left-0 overflow-hidden select-none md:rounded-xl">
            <div className="w-full relative flex h-full top-0 left-0 items-center">
                <Carousel postImgs={postImgs} isDropped={isDropped} />
            </div>
            <PostOverlay
                isDropped={isDropped}
                user_avatar={user.avatar.url}
                isOpenComments={isOpenComments}
                openCommentsHandler={openCommentsHandler}
                username={user.username}
                dropDownHandler={dropDownHandler}
                post_title={post_title}
                commentCount={commentCount}
            />
        </div>
    );
};
export default Gallery;
