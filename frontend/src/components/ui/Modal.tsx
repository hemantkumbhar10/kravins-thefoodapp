import React from 'react'
import { forwardRef } from 'react'
import { IoMdCloseCircle } from "react-icons/io";

type ModalProps = {
    children: React.ReactNode;
}

const Modal = forwardRef<HTMLDialogElement, ModalProps>(({ children }, ref) => {
    return (
        <dialog ref={ref} className='rounded-xl'>
            <form method='dialog' className='w-full flex justify-end pt-2 pr-2'>
                <button ><IoMdCloseCircle fontSize={30} className='text-red-500 hover:text-red-700 hover:scale-90'/></button>
            </form>
            {children}
        </dialog>
    )
});
export default Modal