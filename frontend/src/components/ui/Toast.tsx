import { useEffect } from 'react'

type ToastType = {
    message: string;
    type: 'SUCCESS' | 'WARNING' | 'ERROR';
    onClose: () => void;
}



const Toast = ({ message, type, onClose }: ToastType) => {

    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, 5000);

        return () => {
            clearTimeout(timer);
        }
    }, [onClose])


    const toastStyles = (type === "SUCCESS" ? "bg-green-600" : type === 'ERROR' ? "bg-red-600" : "bg-yellow-600");


    return (
        <>
            <div className={`fixed bottom-20 right-4 z-50 p-4 rounded-md text-white max-w-md ${toastStyles}`}>
                <div className="flex justify-center items-center">
                    {/* ADD BUTTON TO CLOSE TOAST */}
                    <span className="text-sm font-semibold">{message}</span>
                </div>
            </div>
        </>
    )
}

export default Toast