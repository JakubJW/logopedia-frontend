import { defineStore } from 'pinia'
import { ref } from 'vue';
import type { User} from '../types/user'

const localStorageKey = import.meta.env.VITE_AUTH_LOCAL_STORAGE_KEY

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
        localStorage.removeItem(localStorageKey)
    };

    return {
        user,
        updateUser,
        logout
    }
})