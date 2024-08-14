import { api } from "./dataService";
import { HTTP_METHODS } from 'constant';

import { FiltersDataType } from "types/shared";

export const createProperty = async (formData: any) => {
    const res = await api('/property/create', {
        method: HTTP_METHODS.POST,
        data: JSON.stringify({ formData: formData })
    })

    return res;
}

// DELETE PROPERTY

export const deleteProperty = async (propertyId: string) => {
    const res = await api('/property/delete', {
        method: HTTP_METHODS.POST,
        data: JSON.stringify({ propertyId: propertyId })
    })

    return res;
}

// UPDATE PROPERTY

export const updateProperty = async (formData: any, propertyId: string) => {
    const res = await api('/property/update', {
        method: HTTP_METHODS.POST,
        data: JSON.stringify({ formData: formData, propertyId: propertyId })
    })

    return res;
}

// PROPERTY IMAGES

export const uploadImage = async (formData: FormData) => {
    const res = await api(`/property/upload-image`, {
        method: 'POST',
        data: formData,
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })

    return res;
}

export const updateImages = async (propertyId: string, images: any) => {
    const res = await api('/property/update-images', {
        method: HTTP_METHODS.POST,
        data: JSON.stringify({
            propertyId: propertyId,
            images: images
        })
    })

    return res;
}

// DELETE FLOORPLAN

export const deleteFloorplan = async (propertyId: string) => {
    const res = await api(`/property/delete-floorplan`, {
        method: 'POST',
        data: JSON.stringify({ propertyId })
    })

    return res;
}

// PROPERTY FLOORPLAN

export const uploadFloorplan = async (formData: FormData) => {
    const res = await api(`/property/upload-floorplan`, {
        method: 'POST',
        data: formData,
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })

    return res;
}

export const updateFloorplan = async (propertyId: string, floorplan: { key: string; name: string; url: string; }) => {
    const res = await api('/property/update-floorplan', {
        method: HTTP_METHODS.POST,
        data: JSON.stringify({
            propertyId: propertyId,
            floorplan: floorplan
        })
    })

    return res;
}

// CHANGE FLOORPLAN

export const changeFloorplan = async (propertyId: string, floorplan: { key: string; name: string; url: string; }) => {
    const res = await api('/property/change-floorplan', {
        method: HTTP_METHODS.POST,
        data: JSON.stringify({
            propertyId: propertyId,
            floorplan: floorplan
        })
    })

    return res;
}

// UPDATE VIDEOS

export const updateVideos = async (videos: {
    name: string; url: string; type: string;
}[], propertyId: string) => {

    const res = await api(`/property/update-videos`, {
        method: 'POST',
        data: JSON.stringify({ videos, propertyId })
    })

    return res;
}

export const fetchListings = async (config: { skip: number; limit: number; }) => {
    const res = await api(`/property/fetch`, {
        method: HTTP_METHODS.POST,
        data: JSON.stringify({ 
            skip: config.skip,
            limit: config.limit
         })
    });

    return res; 
}

// FETCH PROPERTY BY ID

export const fetchPropertyById = async (propertyId: string) => {
    const res = await api('/property/fetch-by-id', {
        method: HTTP_METHODS.POST,
        data: JSON.stringify({ propertyId: propertyId })
    })

    return res;
}


// FIND NEARBY LCOATIONS

export const findNearbyLocations = async (coordinates: number[], filters: FiltersDataType) => {
    const res = await api('/property/nearby-search', {
        method: HTTP_METHODS.POST,
        data: JSON.stringify({ 
            coordinates: coordinates, 
            filters: filters
        })
    })

    return res;
}

// DELTE IMAGES

export const deleteImage = async (propertyId: string, imageId: string) => {
    const res = await api('/property/delete-image', {
        method: HTTP_METHODS.POST,
        data: JSON.stringify({
            propertyId: propertyId,
            imageId: imageId
        })
    })

    return res;
}

// UPDATE IMAGES ORDER

export const updateImagesOrder = async (propertyId: string, images: any) => {
    const res = await api('/property/update-images-order', {
        method: HTTP_METHODS.POST,
        data: JSON.stringify({
            propertyId: propertyId,
            images: images
        })
    })

    return res;
}


// SAVE VIDEOS

export const saveVideos = async (propertyId: string, videos: any) => {
    const res = await api('/property/save-videos', {
        method: HTTP_METHODS.POST,
        data: JSON.stringify({
            propertyId: propertyId,
            videos: videos
        })
    })

    return res;
}