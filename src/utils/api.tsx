import axios from 'axios';

const API_KEY = process.env.NEXT_PUBLIC_OMDB_API_KEY;
const BASE_URL = process.env.NEXT_PUBLIC_OMDB_BASE_URL;

export const fetchMovies = async (query: string) => {
    const response = await axios.get(`${BASE_URL}/?s=${query}&apikey=${API_KEY}`);
    if (response.data.Error) {
        throw new Error(response.data.Error); 
    }
    return response.data.Search; 
};

export const fetchMovieDetails = async (id: string) => {
    const response = await axios.get(`${BASE_URL}/?i=${id}&apikey=${API_KEY}`);
    if (response.data.Error) {
        throw new Error(response.data.Error); 
    }
    return response.data; 
};
