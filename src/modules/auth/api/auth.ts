import { AxiosResponse } from "axios";
import apiCLient from "../../core/api/apiClient";

type TLoginResponse = {
    id: string,
    email: string,
    sessionToken: string
}

export function useAuthApi() {
    async function login(payload: any) {
        const response: AxiosResponse<TLoginResponse> = await apiCLient.post('/auth/login', payload);
        return response.data;
    };
    
    async function register(payload: any) {
        const response: AxiosResponse<TLoginResponse> = await apiCLient.post('/auth/register', payload);
        return response.data;
    };

    return {
        login,
        register
    };
}