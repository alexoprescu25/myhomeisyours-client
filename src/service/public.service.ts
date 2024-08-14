import { api } from "./dataService";
import { HTTP_METHODS } from 'constant';

// FETCH PROPERTY BY ID

export const fetchProperty = async (propertyId: string) => {
    const res = await api('/public/property', {
        method: HTTP_METHODS.POST,
        data: JSON.stringify({ propertyId: propertyId })
    });

    return res;
}