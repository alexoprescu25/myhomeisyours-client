import React, { useState, useEffect, useContext, type ReactNode } from 'react';
import { setItem, getItem, removeItem } from 'utils/localStorage';

type ContextValues = {
    token: string | null;
    onLogout: () => void;
    onLogin: (param: {token: string; userId: string; refreshToken: string;}) => void;
}

interface AuthContextValue {
    value?: ContextValues;
    children: ReactNode;
}

const AuthContext = React.createContext<ContextValues>({
    token: null,
    onLogout: () => {},
    onLogin: () => {}
})

const AuthContextProvider = (props: AuthContextValue) => {
    const [token, setToken] = useState<string | null>(null);

    useEffect(() => {
        const token = getItem('token');
        if (token) {
          setToken(token);
        };
    }, [token])

    const calculateRemainingTime = () => {
        const currentTime = new Date().getTime();
        const adjExpTime = new Date().getTime() + 14400000;

        const remainingTime = adjExpTime - currentTime;
        return remainingTime;
    }

    const logoutHandler = () => {
        removeItem('token');
        removeItem('refreshToken');
        removeItem('userId');
        setToken(null);
    }

    const loginHandler = (param: { token: string; userId: string; refreshToken: string; }) => {
        const { token, userId, refreshToken } = param;
        if (refreshToken) setItem('refreshToken', refreshToken);
        setItem('userId', userId);
        setItem('token', token);
        setToken(token);

        const remainingTime = calculateRemainingTime();
        setTimeout(logoutHandler, remainingTime);
    }

    const value = { 
        token: token,
        onLogout: logoutHandler,
        onLogin: loginHandler
    }

    return (
        <AuthContext.Provider value={ value }>
            { props.children }
        </AuthContext.Provider>
    )
}

export const useAuthContext = () => useContext(AuthContext);
export { AuthContextProvider };
export default AuthContext;