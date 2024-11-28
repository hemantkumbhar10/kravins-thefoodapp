import { useMutation, useQueryClient } from "react-query";
import { createNewComment } from "../../../apis/comments.api";
import { useAppContext } from "../../../contexts/useAppContext";

export const useCreateCommentMutation = (setInputText:(text:string)=>void) => {
    const queryClient = useQueryClient();
    const { showToast } = useAppContext();

    return useMutation(createNewComment, {
        onSuccess: () => {
            setInputText("");
            queryClient.invalidateQueries("feedPosts")
        },
        onError: async () => {
            showToast({ message: 'Something went wrong!', type: 'ERROR' });
        },
    })
}
