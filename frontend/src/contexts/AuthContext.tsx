import React, { createContext, useState } from 'react';
import Toast from '../components/ui/Toast';

type ToastMessage = {
    message: string;
    type: "SUCCESS" | "WARNING" | "ERROR";
}

export type AppContextType = {
    showToast: (toastMessage: ToastMessage) => void;
}

export const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppContextProvider = ({ children }: { children: React.ReactNode }) => {

    const [toast, setToast] = useState<ToastMessage | undefined>(undefined);


    return (
        <AppContext.Provider value={{
            showToast: (toastMessage) => {
                setToast(toastMessage);
            }
        }}>
            {children}
            {/* NOTIFICATION TOAST */}
            {toast && (<Toast message={toast.message} type={toast.type} onClose={() => setToast(undefined)}></Toast>)}
        </AppContext.Provider>
    )
}

