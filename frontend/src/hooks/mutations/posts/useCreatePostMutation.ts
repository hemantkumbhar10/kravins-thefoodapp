import { useMutation} from "react-query";
import { useAppContext } from "../../../contexts/useAppContext";
import { createMyPost } from "../../../apis/myposts.api";

export const useCreatePostMutation = (navigate:(uri:string)=>void) =>{
    const {showToast} = useAppContext();

    return useMutation(createMyPost, {
        onSuccess: async () => {
            showToast({ message: 'Nom, Nom! Yummy post!', type: 'SUCCESS' });
            navigate('/');
        },
        onError: async () => {
            showToast({ message: 'Please try again!', type: 'ERROR' });
        },
    })
}
