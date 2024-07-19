import React from 'react';
import { AppContext } from './AuthContext';
import { AppContextType } from './AuthContext';

export const useAppContext = () => {
    const context = React.useContext(AppContext);
    return context as AppContextType;
}