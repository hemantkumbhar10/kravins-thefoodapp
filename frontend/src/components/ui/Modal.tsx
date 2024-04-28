import React from 'react'


type ModalProps = {
    isModalOpen: boolean;
    modalOpenHandler: () => void;
    children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isModalOpen, modalOpenHandler, children }) => {

    const modalHandler = () => {
        modalOpenHandler();
    }

    return (
        isModalOpen ? <div className="flex top-0 left-0 justify-center items-center h-screen w-screen bg-gray-400 bg-opacity-25 z-10 fixed" onClick={modalHandler}>
            {children}
        </div> : <></>


    )
}

export default Modal