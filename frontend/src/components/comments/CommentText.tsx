



type CommentTextPropType = {
    text: string;
}


const CommentText = ({ text }: CommentTextPropType) => {

    return <>
        <p className='w-full tracking-normal text-sm break-words hyphens-auto'>{text}</p>
    </>
}



export default CommentText;
