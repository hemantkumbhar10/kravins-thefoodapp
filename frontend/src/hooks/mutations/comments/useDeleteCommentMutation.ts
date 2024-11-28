import { useMutation, useQueryClient } from "react-query";
import { produce } from "immer";
import { deleteComment } from "../../../apis/comments.api";
import { QueryFeedPostsCache } from "../../../types/BackendTypes";
import { useAppContext } from "../../../contexts/useAppContext";
import { CommentItemPropType } from "../../../components/comments/CommentItem";

export const useDeleteCommentMutation = (singleComment:CommentItemPropType['comment'], rootCommentId:CommentItemPropType['rootCommentId']) =>{
    const queryClient = useQueryClient();
    const {showToast} = useAppContext();

    return useMutation(deleteComment, {
        onSuccess: (data) => {
            queryClient.
                setQueryData<QueryFeedPostsCache | undefined>(["feedPosts"], (
                    oldData
                ) => {
                    if (!oldData) return oldData;
                    const root_comment_to_be_updated = data[0];
                    return produce(oldData, draft => {
                        draft.pages = draft.pages.map(page => {
                            page.data = page.data.map(postData => {
                                if(!data[0] && postData.post._id === singleComment.post){
                                        postData.comments = postData.comments.filter(comment =>
                                            comment._id !== rootCommentId
                                        )
                                    }
                                if (data && data[0] && data[0].post && postData.post._id === data[0].post) {
                                    postData.comments = postData.comments.map(comment =>
                                        comment._id === rootCommentId ? root_comment_to_be_updated : comment
                                    );
                                } return postData;
                            });
                            return page;
                        });
                    });
                });
        },
        onError: () => {
            showToast({ message: 'Something went wrong!', type: 'ERROR' });
        },
    });
}
