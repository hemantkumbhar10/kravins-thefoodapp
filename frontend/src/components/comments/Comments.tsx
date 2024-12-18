import React from 'react';
import CommentItem from './CommentItem';
import { memo } from 'react';
import { IUserCommentsResponse } from '../../types/BackendTypes';

type CommentPropsType = {
    comments: IUserCommentsResponse[];
    rootCommentId?: string | null;
}


const Comments = memo(({ comments, rootCommentId = null}: CommentPropsType) => {
    return <>
        <div className={`flex w-full relative flex-col justify-start items-start`}>
            {
                comments && comments.map((comment) => {
                    return <React.Fragment key={comment._id}>
                        <CommentItem comment={comment} key={comment._id} rootCommentId={rootCommentId === null ? comment._id : rootCommentId} />
                    </React.Fragment>
                })
            }
        </div>
    </>
})






export default Comments;
