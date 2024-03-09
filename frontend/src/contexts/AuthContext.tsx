import React, { createContext, useState } from 'react';
import Toast from '../components/ui/Toast';
import { useQuery } from 'react-query';
import * as userAuthApiClient from '../apis/auth.api';

type ToastMessage = {
    message: string;
    type: "SUCCESS" | "WARNING" | "ERROR";
}

export type AppContextType = {
    showToast: (toastMessage: ToastMessage) => void;
    isLoggedIn: boolean;
}

export const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppContextProvider = ({ children }: { children: React.ReactNode }) => {

    const [toast, setToast] = useState<ToastMessage | undefined>(undefined);


    const { isError } = useQuery('validateToken', userAuthApiClient.validateToken, {
        retry: false,
    })

    return (
        <AppContext.Provider value={{
            showToast: (toastMessage) => {
                setToast(toastMessage);
            },
            isLoggedIn: !isError
        }}>
            {children}
            {/* NOTIFICATION TOAST */}
            {toast && (<Toast message={toast.message} type={toast.type} onClose={() => setToast(undefined)}></Toast>)}
        </AppContext.Provider>
    )
}

