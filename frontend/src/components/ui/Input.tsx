import React from 'react'


interface InputProps {
    label: string,
    type: string,
}


//REACT_HOOK_FORM PASSES REF TO INPUT
const Input = React.forwardRef<HTMLInputElement, InputProps>(({ label, type, ...rest }, ref) => {
    return (
        <label className='text-gray-600 w-full px-3 text-sm mt-1'>
            {label}
            <input type={type} className='w-full border-b rounded mt-1' {...rest} ref={ref} />
        </label>
    )
})

export default Input