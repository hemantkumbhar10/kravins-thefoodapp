import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import CommentHeader from './CommentHeader';
import { RiExpandUpDownFill } from "react-icons/ri";
import { IUserCommentsResponse} from "../../types/BackendTypes";
import Comments from './Comments';
import { DeleteCommentData, UpdateCommentData } from '../../apis/comments.api';
import { useDeleteCommentMutation } from "../../hooks/mutations/comments/useDeleteCommentMutation";
import { useUpdateCommentMutation } from "../../hooks/mutations/comments/useUpdateCommentMutation";
import { useAddReplyCommentMutation } from "../../hooks/mutations/comments/useAddReplyCommentMutation";

//rootCommentId is send back when update query
//which in response sends back all commetns again related to that rootCommentId
export type CommentItemPropType = {
    comment: IUserCommentsResponse,
    rootCommentId?: string | null;
}

const CommentItem = ({ comment, rootCommentId }: CommentItemPropType) => {
    const [singleComment, setSingleComment] = useState(comment)
    const [text, setText] = useState("");
    const [isExpanded, setIsExpanded] = useState(false);
    const [isOpenCommentInput, setIsOpenCommentInput] = useState(false);

    const { mutate: addReplyMutate } = useAddReplyCommentMutation({setText, setIsExpanded, setIsOpenCommentInput, setSingleComment});
    const { mutate: updateCommentMutation } = useUpdateCommentMutation(rootCommentId);
    const { mutate: deleteCommentMutation } = useDeleteCommentMutation(singleComment, rootCommentId);

    //comment stateset again when update request made
    useEffect(() => {
        setSingleComment(comment);
    }, [comment]);

    const commentSubmitHandler = () => {
        const data = {
            post: comment.post,
            replyText: text,
            parentComment: comment._id,
        }
        //console.log(data);
        addReplyMutate(data);
    };

    const updateCommentHandler = (text: string) => {
        const data: UpdateCommentData = {
            post: singleComment.post,
            commentId: singleComment._id,
            rootCommentId: rootCommentId ? rootCommentId : undefined,
            text,
        }
        updateCommentMutation(data);
    }

    const deleteCommentHandler = () => {
        const data: DeleteCommentData = {
            commentId: singleComment._id,
            rootCommentId: rootCommentId ? rootCommentId : undefined,
        }
        deleteCommentMutation(data);
    }

    const expandRepliesHandler = () => {
        setIsExpanded(!isExpanded);
    }

    const setCommentText = (text: string) => {
        setText(text);
    }

    return <>
        <div className="flex relative flex-col gap-1 w-full mb-4 ">
            {singleComment.parentComment &&
                <div className='absolute left-[-13px] h-28 w-6 rounded-bl-2xl border-b border-l border-gray-300 top-[-6rem]'>
                </div>
            }
            <div className="flex relative flex-row ">
                <div className="flex flex-col">
                    <Link to="/" className="z-10">
                        <img
                            className="w-8 h-8 rounded-full object-contain"
                            src={singleComment.author.avatar.url}
                            alt={singleComment.author.username + " avatar"}
                            role="button"
                            aria-label={singleComment.author.username + " avatar"}
                        />
                    </Link>
                </div>
                <CommentHeader
                    comment={singleComment}
                    replyText={text}
                    setReplyValue={setCommentText}
                    submitReplyHandler={commentSubmitHandler}
                    setIsOpenCommentInput={setIsOpenCommentInput}
                    isOpenCommentInput={isOpenCommentInput}
                    updateCommentHandler={updateCommentHandler}
                    deleteCommentHandler={deleteCommentHandler}
                />
                {(singleComment.replies.length > 0) &&
                    <>
                        <div
                            className={`${!isExpanded ? 'h-[80%]' : 'h-full'} absolute w-[1px] bg-gray-300 top-2 left-[15px] flex justify-center`}
                        >
                            <div
                                className='text-sm  h-2 mt-[3.8rem] left-[9px] bottom-0 bg-gray-200 cursor-pointer z-10'
                                onClick={expandRepliesHandler}
                                role='button'
                                aria-label="Toggle Expand comment replies"
                            >
                                <RiExpandUpDownFill />
                            </div>
                        </div>
                    </>
                }
            </div>
            {singleComment.replies &&
                <div className={`${!isExpanded && 'hidden'} ${(singleComment.replies.length < 1) && 'hidden'} ml-4 pl-3 relative mt-3 `}>
                    {(singleComment.replies.length > 1) && <div className='absolute left-[-1px]  h-full w-[1px] bg-gray-300'></div>}
                    <Comments comments={singleComment.replies} rootCommentId={rootCommentId} />
                </div>
            }
        </div>
    </>
}
export default CommentItem;
