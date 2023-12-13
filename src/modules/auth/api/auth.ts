import { AxiosResponse } from "axios";
import apiClient from "../../core/api/apiClient";

type TLoginResponse = {
    id: string,
    email: string,
    sessionToken: string
}

export function useAuthApi() {
    async function login(payload: any) {
        const response: AxiosResponse<TLoginResponse> = await apiClient.post('/auth/login', payload);
        return response.data;
    };
    
    async function register(payload: any) {
        const response: AxiosResponse<TLoginResponse> = await apiClient.post('/auth/register', payload);
        return response.data;
    };

    return {
        login,
        register
    };
}