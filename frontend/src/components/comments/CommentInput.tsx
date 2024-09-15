

type CommentInputPropType = {
    onChangeValue: (text: string) => void,
    textValue: string,
    submitHandler: () => void,
    type?: string,
    defaultValue?: string,

}

const CommentInput = ({ onChangeValue, textValue, submitHandler, type, defaultValue }: CommentInputPropType) => {

    return (<>

        <div className='w-full'>
            <label className="hidden" aria-label={type === 'UPDATE' ? 'Update Comment' : 'Enter comment'} htmlFor='commentbox'>{type === 'UPDATE' ? 'Update Comment' : 'Enter comment'}</label>
            <textarea id='commentbox' rows={3}
                onChange={e => onChangeValue(e.target.value)}
                value={textValue}
                defaultValue={defaultValue}
                placeholder="Enter your comment here"
                className="p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />

            <button type='button' onClick={submitHandler} className='text-sm bg-tomato text-white p-1 font-bold hover:bg-orange-600 rounded-md px-4'>
                {type === 'UPDATE' ? 'Update' : 'Comment'}
            </button>
        </div>


    </>

    )
}



export default CommentInput;
