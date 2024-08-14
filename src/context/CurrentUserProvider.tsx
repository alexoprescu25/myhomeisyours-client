import React, { useState, useEffect, type ReactNode } from 'react';

import { Subject } from 'types/shared';
import { fetchCurrentAccount } from 'service/account.service';

import { handleAPIError } from 'utils';

import { useAuthContext } from './AuthContext';

type ContextTypes = {
    currentUser: Subject | null;
    fetchCurrentUser: () => void
}

type CurrentUserContextTypes = {
    value?: ContextTypes;
    children: ReactNode;
}

export const CurrentUserContext = React.createContext<ContextTypes>({
    currentUser: null,
    fetchCurrentUser: () => {}
});

export const CurrentUserProvider = (props: CurrentUserContextTypes) => {
    const [currentUser, setCurrentUser] = useState<Subject | null>(null);

    const { token } = useAuthContext();

    const allDataLoaded = () => {
        return (
            currentUser
        ) ? true : false;
    }

    const fetchCurrentUser = async () => {
        try {
            const response = await fetchCurrentAccount();
            
            if (response && response.status === 200) {
                setCurrentUser(response.data.userData);
            }
        } catch (error) {
            handleAPIError(error, true);
        }
    }
    
    useEffect(() => { 
        if (token && token !== undefined && token !== '') {
            fetchCurrentUser();
        }
    }, [token]);

    const value = { 
        currentUser, 
        fetchCurrentUser
    };

    return (
        <CurrentUserContext.Provider value={ value }>
            { allDataLoaded() ? props.children : null }
        </CurrentUserContext.Provider>
    )
}

export const useCurrentUser = () => React.useContext(CurrentUserContext);