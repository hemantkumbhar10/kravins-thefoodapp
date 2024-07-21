import { useQuery } from "react-query";
import * as personalPostsApis from '../../apis/myposts.api';
import PostCard from '../posts/PostCard';
import { useAppSelector } from "../../store/dispatchHooks";

const AllMyPosts = () => {


    const { data: myPosts } = useQuery('allMyPosts', personalPostsApis.getAllMyPost);

    console.log(myPosts);
    const { email, firstname, lastname, username, _id, friends, user_avatar } = useAppSelector(state => state.userprofile);




    const userData = {
        email, username, firstname, lastname, _id, friends
    }



    return (<>
        <div className='flex flex-col justify-start p-2 md:p-5 mb-5 w-60 md:w-[30rem] overflow-hidden h-[80vh]'>
            <div className=" overflow-y-scroll">
                {
                    myPosts?.map((post) => {
                        const postData = {
                            avatarUrl: user_avatar,
                            user: userData,
                            post
                        }
                        return (
                            <PostCard key={post._id} post={postData} />
                        )
                    })
                }
            </div>
        </div>
    </>)
}




export default AllMyPosts;
