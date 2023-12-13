import { defineStore } from 'pinia'
import { ref } from 'vue';

type TLoginResponse = {
    id: string,
    email: string,
    sessionToken: string
}

export const useAuthStore = defineStore('auth', () => {
    const user = ref({
        id: '',
        email: '',
        sessionToken: ''
    });

    function updateUser(payload: TLoginResponse) {
        user.value = Object.assign({}, user.value, payload);
    };

    function logout() {
        user.value = { 
            id: '',
            email: '',
            sessionToken: ''
        };
    };

    return {
        user,
        updateUser,
        logout
    }
})