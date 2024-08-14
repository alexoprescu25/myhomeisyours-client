import { api } from "./dataService";
import { HTTP_METHODS } from 'constant';

export const fetchUserActivities = async (userId: string) => {
    const res = await api('/activity/fetch', {
        method: HTTP_METHODS.POST,
        data: JSON.stringify({ userId })
    })

    return res;
}

export const fetchUserActivitiesByDate = async (userId: string, from?: string, to?: string) => {
    const res = await api('/activity/fetch-by-date', {
        method: HTTP_METHODS.POST,
        data: JSON.stringify({ userId, from, to })
    })

    return res;
}