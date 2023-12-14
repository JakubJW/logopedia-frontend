import { defineStore } from 'pinia'
import { ref } from 'vue';
import type { User} from '../types/user'

type UserState = {
    id: string | null,
    email: string | null,
    sessionToken: string | null
};

export const useAuthStore = defineStore('auth', () => {
    const user = ref<UserState>({
        id: null,
        email: null,
        sessionToken: null
    });

    function updateUser(payload: User) {
        user.value = Object.assign({}, user.value, payload);
    };

    function logout() {
        user.value = { 
            id: null,
            email: null,
            sessionToken: null
        };
    };

    return {
        user,
        updateUser,
        logout
    }
})