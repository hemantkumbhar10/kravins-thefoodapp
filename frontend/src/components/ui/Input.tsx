import React from 'react'


interface InputProps {
    label: string,
    type: string,
    className?: string,
    labelClassName?: string,
}


//REACT_HOOK_FORM PASSES REF TO INPUT
const Input = React.forwardRef<HTMLInputElement, InputProps>(({ label, type, labelClassName, className, ...rest }, ref) => {
    return (
        <label className={`text-gray-600 w-full px-3 text-sm mt-1 ${labelClassName}`}>
            {label}
            <input type={type} className={`w-full border-b mt-1 ${className}`} {...rest} ref={ref} />
        </label>
    )
})

export default Input