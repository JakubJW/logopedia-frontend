import axios from "axios";
import { createDiscreteApi } from "naive-ui";

const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_BACKEND_URL,
    headers: {
        'Content-Type': 'application/json',
    }, 
})

apiClient.interceptors.response.use(
    (response: any) => {
        return response;
    }, (error: any) => {
        const { message } = createDiscreteApi(['message']);
        console.error('Request error')
        console.error(error.response)
    
        if (
            error.response &&
            error.response.data &&
            error.response.data.message
        ) {
            message.error(error.response.data.message);
        }
    }
)

export default apiClient;