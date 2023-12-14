import { AxiosResponse } from "axios";
import apiClient from "../../core/api/apiClient";
import { ApiResponse } from "modules/core/types/apiResponse";
import type { User } from "../types/user";

export function useAuthApi() {
    async function login(payload: any) {
        const response: AxiosResponse<ApiResponse<User>> 
            = await apiClient.post('/auth/login', payload);
       
        return response.data.data;
    };
    
    async function register(payload: any) {
        const response: AxiosResponse<ApiResponse<User>> 
            = await apiClient.post('/auth/register', payload);
        
            return response.data.data;
    };

    return {
        login,
        register
    };
}