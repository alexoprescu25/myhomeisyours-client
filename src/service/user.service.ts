import { api } from "./dataService";
import { HTTP_METHODS } from 'constant';

// FETCH ALL USERS

export const fetchUsers = async () => {
    const res = await api('/user/fetch-all');

    return res;
}

// DELETE ACCOUNT

export const deleteAccount = async (accountId: string) => {
    const res = await api('/user/delete', {
        method: HTTP_METHODS.POST,
        data: JSON.stringify({ accountId })
    })

    return res;
}

// FETCH USER

export const fetchAccount = async (accountId: string) => {
    const res = await api('/user/fetch-by-id', {
        method: HTTP_METHODS.POST,
        data: JSON.stringify({ accountId })
    });

    return res;
}

// FETCH USER

export const changePassword = async (accountId: string, password: string) => {
    const res = await api('/user/change-password', {
        method: HTTP_METHODS.POST,
        data: JSON.stringify({ accountId, password })
    });

    return res;
}

// UPDATE USER

export const updateAccount = async (accountId: string, data: any) => {
    const res = await api('/user/update', {
        method: HTTP_METHODS.POST,
        data: JSON.stringify({ accountId, data })
    });

    return res;
}