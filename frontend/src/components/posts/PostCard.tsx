import React, { useState, useRef } from "react";
import Gallery from "./Gallery";
import { UserPostsData } from '../../types/BackendTypes';
import DropDownMenu from "../ui/DropDownMenu";
import { useAppSelector } from "../../store/dispatchHooks";
import { dateFormatter } from '../../utils/dates';
import { useMutation, useQueryClient } from "react-query";
import * as myPersonalPostApis from '../../apis/myposts.api';
import Modal from '../ui/Modal';
import { useAppContext } from '../../contexts/useAppContext';
import { useNavigate } from 'react-router-dom';
type PostDataType = {
  post: UserPostsData
}




const PostCard = React.forwardRef<HTMLDivElement, PostDataType>((props, ref) => {
  const [isDropped, setIsDropped] = useState(false);

  const { username } = useAppSelector(state => state.userprofile);
  const { avatarUrl, user, post } = props.post;

  const { showToast } = useAppContext();
  const navigate = useNavigate();
  const { statusString } = dateFormatter(post.lastUpdated);

  const dropDownHandler = () => {
    setIsDropped(!isDropped);
  };


  const modalCloseHandler = () => {
    dialog.current?.close();
  }

  const queryClient = useQueryClient();

  const { mutate } = useMutation(myPersonalPostApis.deleteMyPost, {
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


  const dialog = useRef<HTMLDialogElement>(null);

  const modalOpenHandler = () => {
    dialog.current?.showModal();
  }



  const handleDeletePostForm = () => {
    mutate(post._id);
    modalCloseHandler();
  }

  const DeletePostButton = <button className="text-red-700 text-sm" onClick={modalOpenHandler}>Delete</button>



  return (
    <>
      <div ref={ref} className="w-full flex flex-col justify-center items-center py-3">
        <Gallery
          user={user}
          postImgs={post.images}
          dropDownHandler={dropDownHandler}
          isDropped={isDropped}
          avatarUrl={avatarUrl}
          post_title={post.title}
        />
        <div
          className={`w-full ${isDropped ? "h-96 p-3 pb-4 " : "h-0"} bg-gray-100 transition-[height, padding] duration-300 ease overflow-y-scroll`}
        >
          <div className="flex flex-row w-full justify-between">
            <div>
              <a className="italic text-base font-semibold">@{user.username}</a>
              <p>{statusString}</p>
            </div>
            {username === user.username &&
              <DropDownMenu options={[{ value: `edit/${post._id}`, label: "Edit" },]} button={DeletePostButton} />}
          </div>

          <p className="text-black tracking-tighter text-justify mt-2">
            {post.recipe}
          </p>
        </div>
      </div>
      <Modal ref={dialog}>
        <div className="w-60 h-32 flex flex-col justify-start items-center px-8">
          <h5 className="text-center pb-4">Are you sure you want to delete this post?</h5>
          <button className="text-lg font-bold rounded-full  p-1 px-4 text-white bg-red-500" onClick={handleDeletePostForm}>Delete</button>
        </div>
      </Modal>
    </>
  );
});

export default PostCard;
