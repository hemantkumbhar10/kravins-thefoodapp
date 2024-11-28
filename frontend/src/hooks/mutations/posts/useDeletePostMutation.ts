import { useMutation, useQueryClient } from "react-query";
import { useAppContext } from "../../../contexts/useAppContext";
import { deleteMyPost } from "../../../apis/myposts.api";

export const useDeletePostMutation = (modalCloseHandler:()=>void, navigate:(uri:string)=>void) =>{
    const queryClient = useQueryClient();
    const {showToast} = useAppContext();

    return useMutation(deleteMyPost, {
        onSuccess: async () => {
            showToast({ message: 'Post Deleted!', type: 'SUCCESS' });
            modalCloseHandler();
            await queryClient.invalidateQueries('feedPosts');
            navigate('/');
        },
        onError: async () => {
            showToast({ message: 'Something went wrong!', type: 'ERROR' });
        },
    })
}
