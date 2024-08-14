import { api } from "./dataService";
import { handleAPIError } from "utils";
import { HTTP_METHODS } from 'constant';

// FETCH CURRENT USER

export const fetchCurrentAccount = async () => {
    const res = await api('/account/fetch');

    return res;
}

// REFRESH TOKEN

export const getNewAccessToken = async (refreshToken: string) => {
    const res = await api('/account/refresh', {
        method: HTTP_METHODS.POST,
        data: JSON.stringify({ refreshToken: refreshToken })
    })

    return res;
}

// LOG OUT

export const logOutCurrentAccount = async () => {
    try {
        const res = await api('/account/logout', {
            method: HTTP_METHODS.POST
        })

        return res;
    } catch (error) {   
        handleAPIError(error);
    }
}