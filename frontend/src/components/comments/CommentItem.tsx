import { useState } from "react";
import { Link } from 'react-router-dom';
import CommentHeader from './CommentHeader';
import { RiExpandUpDownFill } from "react-icons/ri";
import { FeedPosts, IUserCommentsResponse, UserPostsData } from "../../types/BackendTypes";
import Comments from './Comments';
import { QueryClientProvider, useMutation, useQueryClient } from "react-query";
import { useAppContext } from "../../contexts/useAppContext";
import { createReply, updateComment, UpdateCommentData } from '../../apis/comments.api';


//rootCommentId is send back when update query
//which in response sends back all commetns again related to that rootCommentId
type CommentItemPropType = {
    comment: IUserCommentsResponse,
    rootCommentId?: string;
}


const CommentItem = ({ comment, rootCommentId }: CommentItemPropType) => {

    const [singleComment, setSingleComment] = useState(comment)
    const [text, setText] = useState("");
    const [isExpanded, setIsExpanded] = useState(false);

    const [isOpenCommentInput, setIsOpenCommentInput] = useState(false);
    const queryClient = useQueryClient();
    const { showToast } = useAppContext();
    const expandRepliesHandler = () => {
        setIsExpanded(!isExpanded);
    }

    const { mutate: addReplyMutate } = useMutation(createReply, {
        onSuccess: (data) => {
            setText("");
            setIsOpenCommentInput(false);
            setSingleComment(data[0]);
            setIsExpanded(true);
            queryClient.invalidateQueries("feedPosts")
        },
        onError: () => {
            showToast({ message: 'Something went wrong!', type: 'ERROR' });
        },
    })

    const commentSubmitHandler = () => {
        const data = {
            post: comment.post,
            replyText: text,
            parentComment: comment._id,

        }
        console.log(data);
        addReplyMutate(data);
    };

    const setCommentText = (text: string) => {
        setText(text);
    }


    //TODO:: Recurrsively fetch rjght comment and update it
    //TODO: sennd the rootCommentId to backend and fetcch data only of it and update query cache in here of feedposts
    const { mutate: updateCommentMutation } = useMutation(updateComment, {
        onSuccess: (data) => {
            queryClient.setQueryData("feedPosts", (oldData) => {
                console.log(oldData.pages[oldData.pages.length-1]);
                //wholy fuck
                //tf ami i doing
                //fucking build whole godamn api again
                const post_to_be_updated = oldData.pages[oldData.pages.length-1].data.find((data) => (data.comments.post === data[0].post) );
                let root_comment_to_be_updated = post_to_be_updated.comments.find((comment: IUserCommentsResponse) => comment._id === rootCommentId);

                root_comment_to_be_updated = data[0];
                const updatedPost = { ...oldData }

                Object.assign(updatedPost, oldData.map((post: UserPostsData) => {
                    if (post.post._id === data[0].post) {
                        post.comments.map((comment: any) => comment._id === rootCommentId ? root_comment_to_be_updated : comment)
                    }
                }))
                return {
                    data: updatedPost
                }
            })
        },
        onError: () => {
            showToast({ message: 'Something went wrong!', type: 'ERROR' });
        },
    })


    const updateCommentHandler = (text: string) => {
        const data: UpdateCommentData = {
            post: singleComment.post,
            commentId: singleComment._id,
            rootCommentId: rootCommentId,
            text,
        }
        updateCommentMutation(data);
    }


    return <>
        <div className="flex relative flex-col gap-1 w-auto mb-4 ">
            {singleComment.parentComment && <div className='absolute left-[-13px] h-28 w-6 rounded-bl-2xl border-b border-l border-gray-300 top-[-6rem]'></div>}
            <div className="flex relative flex-row">
                <div className="flex flex-col">
                    <Link to="/" className="z-10"><img className="w-8 h-8 rounded-full object-contain" src={singleComment.authorAvatar} alt={singleComment.author.username + " avatar"} role="button" aria-label="User avatar" /></Link>
                </div>
                <CommentHeader comment={singleComment} replyText={text} setReplyValue={setCommentText} submitReplyHandler={commentSubmitHandler} setIsOpenCommentInput={setIsOpenCommentInput} isOpenCommentInput={isOpenCommentInput} updateCommentHandler={updateCommentHandler} />
                {(singleComment.replies.length > 0) &&
                    <>
                        <div className={`${!isExpanded ? 'h-[80%]' : 'h-full'} absolute w-[1px] bg-gray-300 top-2 left-[15px] flex justify-center`}>
                            <div className='text-sm  h-2 mt-[3.8rem] left-[9px] bottom-0 bg-gray-200 cursor-pointer z-10' onClick={expandRepliesHandler} role='button' aria-label="Toggle Expand comment replies"><RiExpandUpDownFill /></div>
                        </div>
                    </>
                }

            </div>
            {singleComment.replies &&
                <div className={`${!isExpanded && 'hidden'} ${(singleComment.replies.length < 1) && 'hidden'} ml-4 pl-3 relative mt-3 `}>
                    {(singleComment.replies.length > 1) && <div className='absolute left-[-1px]  h-full w-[1px] bg-gray-300'></div>}
                    <Comments comments={singleComment.replies} />
                </div>
            }
        </div>


    </>
}


export default CommentItem;
