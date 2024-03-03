import axios from "axios";
import { PhotoType } from "../types/photoType";

const request_header = {
    Authorization: `Client-ID ${import.meta.env.VITE_UNSPLASH_ACCESS_KEY}`
}

const cachePopular: Record<string, PhotoType[]> = {};
export const getPhotos = async (page = 1, option = {}) => {

    const URL = `${import.meta.env.VITE_UNSPLASH_API_BASE_URL}/photos/?page=${page}&per_page=20&order_by=popular`;

    if(cachePopular[URL]) {
        return cachePopular[URL]
    }
    
    const res = await axios.get(URL, {
        ...option,
        headers: request_header
    }) as {data: PhotoType[]}

    cachePopular[URL] = res.data;

    return res.data
}

const cacheSearched: Record<string, any> = {}
export const getPhotosByQuery = async (query: string, page = 1, option = {}) => {

    const URL = `${import.meta.env.VITE_UNSPLASH_API_BASE_URL}/search/photos?query=${query}&page=${page}&per_page=20`;
    
    if(cacheSearched[URL]) {
        return cacheSearched[URL];
    }
    
    const res = await axios.get(URL, {
        ...option,
        headers: request_header,
    }) as {data: {results: PhotoType[], total_pages: number}}

    cacheSearched[URL] = {results: res.data.results, total_pages: res.data.total_pages}
    
    return {results: res.data.results, total_pages: res.data.total_pages};
}

const cacheStatistics: Record<string, any> = {};
export const getPhotosStatistics = async (id: string, option = {}) => {
    const URL = `${import.meta.env.VITE_UNSPLASH_API_BASE_URL}/photos/${id}/statistics`;

    if(cacheStatistics[URL]) {
        return cacheStatistics[URL]
    }
    
    const res = await axios.get(URL, {
        ...option,
        headers: request_header,
    })

    cacheStatistics[URL] = res.data;
    
    return res.data;
}