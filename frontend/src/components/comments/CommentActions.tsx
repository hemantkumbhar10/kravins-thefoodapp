import { useState, useRef } from "react";
import { FaHeart, FaComment } from "react-icons/fa";
import Modal from '../ui/Modal';
import DropDownMenu from '../ui/DropDownMenu';
import CommentInput from './CommentInput';
import { IUserCommentsResponse } from "../../types/BackendTypes";
import { useAppContext } from "../../contexts/useAppContext";
import { useAppSelector } from "../../store/dispatchHooks";

type CommentActionsPropTypes = {
    openCommentInputBoxHandler: () => void
    comment: IUserCommentsResponse;
    updateCommentHandler: (text: string) => void;
    deleteCommentHandler: () => void;
}

const CommentActions = ({ openCommentInputBoxHandler, comment, updateCommentHandler, deleteCommentHandler }: CommentActionsPropTypes) => {
    const [isLiked, setIsLiked] = useState(false);
    const [text, setText] = useState(comment.text);
    const editButtonDialog = useRef<HTMLDialogElement>(null);
    const deleteButtonDialog = useRef<HTMLDialogElement>(null);
    const { isLoggedIn } = useAppContext();
    const {username} = useAppSelector(state => state.userprofile.user);

    const editButtonModalOpenHandler = () => {
        editButtonDialog.current?.showModal();
    }
    const editButtonModalCloseHandler = () => {
        editButtonDialog.current?.close();
    }

    const deleteButtonModalOpenHandler = () => {
        deleteButtonDialog.current?.showModal();
    }

    const DeleteCommentButton = <button type="button" className="text-red-700 text-sm p-1 px-2" aria-label="Delete Post" onClick={deleteButtonModalOpenHandler}>Delete</button>
    const EditCommentButton = <button type="button" className="text-red-700 text-sm p-1 px-2" aria-label="Edit Post" onClick={editButtonModalOpenHandler} >Edit</button>

    const setUpdatedCommentText = (text: string) => {
        setText(text);
    }

    const modalUpdateCommentHandler = () => {
        updateCommentHandler(text);
        editButtonModalCloseHandler();
    }


    const deleteCommentButtonHandler = ()=>{
        //id of comment
        deleteCommentHandler();
        deleteButtonDialog.current?.close();
    }

    return <>
        <div className="w-full flex flex-row justify-between items-center">
            <div className="flex flex-row justify-center items-center gap-5">
                <div className="text-center">
                    <FaHeart
                        className={`text-2xl ${isLiked ? "text-tomato" : "text-gray-500 opacity-40"} mr-1 md:hover:'text-tomato' inline hover:scale-105 transition-transform duration-200 ease-in`}
                        role="button"
                        aria-label="Like or Unlike Comment"
                        onClick={() => setIsLiked(!isLiked)}
                    />
                    <span className="text-sm font-bold">12</span>
                </div>
                {isLoggedIn && <div className="text-center">
                    <FaComment
                        className="text-2xl text-gray-500 opacity-40"
                        role="button"
                        aria-label="Toggle comments"
                        onClick={openCommentInputBoxHandler}
                    />
                </div>}
            </div>
            { (isLoggedIn && comment.author.username === username ) &&
            <div>
                <DropDownMenu buttons={[EditCommentButton, DeleteCommentButton]} />
            </div>}
        </div>
        <Modal ref={editButtonDialog}>
            <div className=" flex flex-col justify-start items-center px-8 pb-4 select-none">
                <CommentInput onChangeValue={setUpdatedCommentText} textValue={text} submitHandler={modalUpdateCommentHandler} type="UPDATE" />
            </div>
        </Modal>
        <Modal ref={deleteButtonDialog}>
            <div className="w-60 h-32 flex flex-col justify-start items-center px-8 select-none">
                <h5 className="text-center pb-6 text-sm">Are you sure you want to delete this comment?</h5>
                <button className="text-md font-bold rounded-full  p-1 px-4 text-white bg-red-600 " aria-label="Confirm to delete post" onClick={deleteCommentButtonHandler}>Delete</button>
            </div>
        </Modal>
    </>

}
export default CommentActions;
