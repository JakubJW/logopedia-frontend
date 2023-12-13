<script setup lang="ts">
import { NButton } from 'naive-ui';
import { useAuthStore } from 'modules/auth/store/authStore'
import { useRouter } from 'vue-router'

const { logout } = useAuthStore();
const router = useRouter();

function handleLogout() {
    logout();
    router.push('/login');
};
</script>

<template>
    <div>
        <div class="text-black">
            Siema dashboard here
        </div>
        <n-button @click="handleLogout">
            Wyloguj
        </n-button>
    </div>
</template>