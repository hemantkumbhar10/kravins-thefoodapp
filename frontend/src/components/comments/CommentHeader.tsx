import { Link } from 'react-router-dom';
import CommentText from './CommentText';
import CommentActions from './CommentActions';
import CommentInput from './CommentInput';
import { IUserCommentsResponse } from '../../types/BackendTypes';
import { dateFormatter } from '../../utils/dates'
import { useAppContext } from '../../contexts/useAppContext';

type CommentHeaderPropTypes = {
    comment: IUserCommentsResponse;
    replyText: string,
    setReplyValue: (text: string) => void;
    submitReplyHandler: () => void;
    setIsOpenCommentInput: (is: boolean) => void;
    isOpenCommentInput: boolean;
    updateCommentHandler: (text: string) => void;
    deleteCommentHandler: () => void;
}

const CommentHeader = ({ comment, replyText, submitReplyHandler, setReplyValue, setIsOpenCommentInput, isOpenCommentInput, updateCommentHandler, deleteCommentHandler }: CommentHeaderPropTypes) => {
    const { statusString } = dateFormatter(new Date(comment.updatedAt));

    const openCommentInputBoxHandler = () => {
        setIsOpenCommentInput(!isOpenCommentInput);
    }

    const { isLoggedIn } = useAppContext();

    return <>
        <div className="w-full select-none flex flex-col justify-start items-start gap-2 ml-2">
            <div className="h-auto flex flex-row items-center gap-1"><Link to="/" className="mr-1 text-sm font-bold">{comment.author ? comment.author.username : ""}</Link>
                <div className="w-1 h-1 bg-gray-500 rounded-full"></div><time className=" text-xs">{statusString } </time>
                <div className='text-xs' >{comment.createdAt < comment.updatedAt && '(edited)'}</div>
            </div>
            <CommentText text={comment.text} />
            <CommentActions openCommentInputBoxHandler={openCommentInputBoxHandler} comment={comment} updateCommentHandler={updateCommentHandler} deleteCommentHandler={deleteCommentHandler}/>
            {isLoggedIn && <div className={`w-full ${!isOpenCommentInput && 'hidden'}`}>
                <CommentInput onChangeValue={setReplyValue} textValue={replyText} submitHandler={submitReplyHandler} />
            </div>}
        </div>
    </>
}
export default CommentHeader;
