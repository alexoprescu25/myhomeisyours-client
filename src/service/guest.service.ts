import { api } from "./dataService";
import { HTTP_METHODS } from 'constant';

import { GuestFormProps } from "types/shared";

export const createGuest = async (formData: GuestFormProps, propertyId: string, propertyName: string) => {
    const res = await api('/guest/create', {
        method: HTTP_METHODS.POST,
        data: JSON.stringify({ formData, propertyId, propertyName })
    })

    return res;
}

export const deleteGuest = async (guestId: string, propertyName: string) => {
    const res = await api('/guest/delete', {
        method: HTTP_METHODS.POST,
        data: JSON.stringify({ guestId, propertyName })
    })

    return res;
}

export const fetchFutureGuests = async (propertyId: string) => {
    const res = await api('/guest/fetch-future-guests', {
        method: HTTP_METHODS.POST,
        data: JSON.stringify({ propertyId })
    })

    return res;
}

export const fetchPastGuests = async (propertyId: string) => {
    const res = await api('/guest/fetch-past-guests', {
        method: HTTP_METHODS.POST,
        data: JSON.stringify({ propertyId })
    })

    return res;
}

export const fetchGuests = async (config: { skip: number; limit: number; from?: string; to?: string; }) => {
    const res = await api('/guest/fetch', {
        method: HTTP_METHODS.POST,
        data: JSON.stringify({ 
            skip: config.skip,
            limit: config.limit,
            from: config.from,
            to: config.to
        })
    })

    return res;
}