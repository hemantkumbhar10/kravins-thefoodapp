import React, { useState, useRef, useEffect } from "react";
import Gallery from "./Gallery";
import { UserPostsData } from '../../types/BackendTypes';
import DropDownMenu from "../ui/DropDownMenu";
import { useAppSelector } from "../../store/dispatchHooks";
import { dateFormatter } from '../../utils/dates';
import Modal from '../ui/Modal';
import { useAppContext } from '../../contexts/useAppContext';
import { useNavigate } from 'react-router-dom';
import Comments from '../comments/Comments';
import CommentInput from '../comments/CommentInput'
import { useCreateCommentMutation } from "../../hooks/mutations/comments/useCreateCommentMutation";
import { useDeletePostMutation } from "../../hooks/mutations/posts/useDeletePostMutation";

type PostDataType = {
    post: UserPostsData
}
const PostCard = React.forwardRef<HTMLDivElement, PostDataType>((props, ref) => {
    const { avatarUrl, user, post, comments } = props.post;

    const [isDropped, setIsDropped] = useState(false);
    const [isOpenComments, setIsOpenComments] = useState(false);
    const [inputText, setInputText] = useState("");

    const navigate = useNavigate();
    const dialog = useRef<HTMLDialogElement>(null);
    const { username } = useAppSelector(state => state.userprofile);
    const { isLoggedIn } = useAppContext();

    useEffect(() => {
    }, [comments])

    const modalOpenHandler = () => {
        dialog.current?.showModal();
    }

    const modalCloseHandler = () => {
        dialog.current?.close();
    }

    const setText = (text: string) => {
        setInputText(text);
    }

    const { mutate: deletePostMutate } = useDeletePostMutation(modalCloseHandler, navigate);
    const { mutate: addCommentMutate } = useCreateCommentMutation(setInputText);

    const commentSubmitHandler = () => {
        const data = {
            post: post._id,
            text: inputText
        }
        addCommentMutate(data);
    };


    const openCommentsHandler = () => {
        setIsOpenComments(!isOpenComments);
    }

    const dropDownHandler = () => {
        setIsDropped(!isDropped);
        setIsOpenComments(false);
    };

    const handleDeletePostForm = () => {
        deletePostMutate(post._id);
        modalCloseHandler();

    }

    const { statusString } = dateFormatter(post.lastUpdated);

    const DeletePostButton = <button type="button" className="text-red-700 text-sm p-1 px-2" aria-label="Delete Post" onClick={modalOpenHandler}>Delete</button>

    return (
        <>
            <div ref={ref} className="w-full flex flex-col justify-center items-center py-3 transition-all ease-in-out">
                <Gallery
                    user={user}
                    postImgs={post.images}
                    isOpenComments={isOpenComments}
                    openCommentsHandler={openCommentsHandler}
                    dropDownHandler={dropDownHandler}
                    isDropped={isDropped}
                    avatarUrl={avatarUrl}
                    post_title={post.title}
                    commentCount={comments.length}
                />
                <div
                    className={`w-full ${isDropped ? "h-[30rem] p-3 pb-4 " : "h-0"} bg-gray-100 md:rounded-xl transition-[height, padding] duration-300 ease overflow-y-scroll`}
                >
                    <div className="flex flex-row w-full justify-between">
                        <div className="mb-2">
                            <a className="italic text-base font-semibold select-none">@{user.username}</a>
                            <p className="select-none text-xs">{statusString} </p>
                        </div>
                        {username === user.username &&
                            <DropDownMenu options={[{ value: `edit/${post._id}`, label: "Edit" },]} buttons={[DeletePostButton]} />}
                    </div>

                    {!isOpenComments ? <p className="text-black tracking-tighter text-justify mt-2">
                        {post.recipe}
                    </p> :
                        <>
                            {isLoggedIn && <div className='flex w-full relative flex-col justify-start items-start mb-3'>
                                <CommentInput onChangeValue={setText} textValue={inputText} submitHandler={commentSubmitHandler} />
                            </div>}
                            {comments[0] && <Comments comments={comments} />}
                        </>
                    }
                </div>
            </div>
            <Modal ref={dialog}>
                <div className="w-60 h-32 flex flex-col justify-start items-center px-8 select-none">
                    <h5 className="text-center pb-4">Are you sure you want to delete this post?</h5>
                    <button className="text-lg font-bold rounded-full  p-1 px-4 text-white bg-red-500" aria-label="Confirm to delete post" onClick={handleDeletePostForm}>Delete</button>
                </div>
            </Modal>
        </>
    );
});

export default PostCard;
