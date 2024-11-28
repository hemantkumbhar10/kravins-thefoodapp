import { useMutation} from "react-query";
import { useAppContext } from "../../../contexts/useAppContext";
import { updateMyPost } from "../../../apis/myposts.api";

export const useUpdatePostMutation = (navigate:(uri:string)=>void) =>{
    const {showToast} = useAppContext();

    return useMutation(updateMyPost, {
        onSuccess: async () => {
            showToast({ message: 'Post Updated!', type: 'SUCCESS' });
            navigate('/');
        },
        onError: async () => {
            showToast({ message: 'Something went wrong!', type: 'ERROR' });
        },
    })
}
