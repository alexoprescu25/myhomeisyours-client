import axios from 'axios';

import { getNewAccessToken } from './account.service';

import { removeItem } from 'utils/localStorage';

export const api = axios.create({
    baseURL: process.env.REACT_APP_GLOBAL_URL,
    headers: {
        common: {
            'Content-Type': 'application/json'
        },
        post: {
            'Content-Type': 'application/json'
        },
        put: {
            'Content-Type': 'application/json'
        },
        delete: {
            'Content-Type': 'application/json'
        }
    }
})

api.interceptors.request.use(
    (config) => {
        const accessToken = localStorage.getItem("token");
        if (accessToken) {
            if (config.headers) config.headers.Authorization = `Bearer ${accessToken}`;
        }

        return config;
    },
    (error) => { 
      return Promise.reject(error);
    }
);

api.interceptors.response.use(
    (response) => response, 
    async (error) => {
        if (error && error.response.data && error.response.data.jwtExpired) {
          try {
            const refreshToken = localStorage.getItem('refreshToken');
            if (refreshToken) {
                const res = await getNewAccessToken(refreshToken);
                localStorage.setItem('token', res?.data.token);
                error.config.headers['Authorization'] = `Bearer ${res?.data.token}`;
                return api(error.config);
            } else {
                removeItem('token');
                removeItem('refreshToken');
                window.location.href = '/signin';
            }
          } catch (refreshError) {
            removeItem('token');
            removeItem('refreshToken');
            window.location.href = '/signin';

            throw refreshError;
          }
        }

        return Promise.reject(error);
    }
)