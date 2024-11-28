import { useQuery } from "react-query";
import * as personalPostsApis from '../../apis/myposts.api';
import PostCard from '../posts/PostCard';

const AllMyPosts = () => {


    const { data: myPosts } = useQuery('allMyPosts', personalPostsApis.getAllMyPost);


    return (<>
        <div className='flex flex-col justify-start p-2 md:p-5 mb-5 w-60 md:w-[30rem] overflow-hidden h-[80vh]'>
            <div className=" overflow-y-scroll">
                {
                    myPosts?.map((post) => {

                        return (
                            <PostCard key={post.post._id} post={post} />
                        )
                    })
                }
            </div>
        </div>
    </>)
}




export default AllMyPosts;
