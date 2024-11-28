import React, { useRef, useCallback } from 'react';
import PostCard from './PostCard.tsx';
import { useInfiniteQuery } from 'react-query';
import * as feedPostClientApi from '../../apis/feed.api.ts';

import { RiLoader3Line } from "react-icons/ri";
const FeedPosts: React.FC = () => {
    const observer = useRef<IntersectionObserver>(); //way to detect elements position relative to the root element or viewport(whatever tagged)
    const { data: postData, error, isLoading, isFetching, fetchNextPage, hasNextPage } = useInfiniteQuery(
        'feedPosts',
        ({ pageParam = 1 }) => feedPostClientApi.getFeedPosts({ pageParam }),
        {
            getNextPageParam: (lastPage, allPages) => {
                if (lastPage.data.length > 0) {
                    return allPages.length + 1;
                }

                return undefined;
            }
        });

    //GET Last posts elements reference and apply observer on it
    const lastPostCardRef = useCallback((node: HTMLDivElement) => {

        if (isLoading) return;

        if (observer.current) observer.current.disconnect();

        observer.current = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && hasNextPage && !isFetching) {
                fetchNextPage();
            }
        })

        if (node) observer.current.observe(node);
    }, [fetchNextPage, hasNextPage, isFetching, isLoading]);


    if (isLoading) return <RiLoader3Line className='text-tomato animate-spin text-4xl' />

    if (error) return <h1>Error on fetching posts.....</h1>;

    return (
        <div className='w-full sm:w-4/6 xl:w-2/5 h-full overflow-hidden overflow-x-hidden'>

            {postData?.pages.map((group, i) => (
                <React.Fragment key={i} >
                    {
                        group.data.map((postWithComments) => {
                            return <PostCard key={postWithComments.post._id} ref={lastPostCardRef} post={postWithComments} />
                        })
                    }
                </React.Fragment>
            ))}
            <div className='w-full h-28 flex justify-center items-start' >
                {hasNextPage && !isFetching && <RiLoader3Line className='text-tomato animate-spin text-4xl' />}
            </div>
        </div>
    )
}

export default FeedPosts
