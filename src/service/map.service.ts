import { api } from "./dataService";
import { HTTP_METHODS } from 'constant';

export const handleMap = async (query: string) => {
    const res = await api('/map/geo-location', {
        method: HTTP_METHODS.POST,
        data: JSON.stringify({ query: query })
    })

    return res;
}