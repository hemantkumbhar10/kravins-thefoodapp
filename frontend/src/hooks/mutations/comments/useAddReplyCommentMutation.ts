import { useMutation, useQueryClient } from "react-query";
import { createReply } from "../../../apis/comments.api";
import { useAppContext } from "../../../contexts/useAppContext";
import { CommentItemPropType } from "../../../components/comments/CommentItem";


interface CreateReplyMutation {
    setText : (text:string) => void;
    setIsOpenCommentInput: (bool:boolean)=> void;
    setSingleComment: (comment: CommentItemPropType['comment'])=>void;
    setIsExpanded: (bool:boolean)=> void
}


export const useAddReplyCommentMutation = ({setText, setIsExpanded, setSingleComment, setIsOpenCommentInput}:CreateReplyMutation) => {
    const queryClient = useQueryClient();
    const { showToast } = useAppContext();

    return useMutation(createReply, {
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
}
