<script setup lang="ts">
import type { CallbackTypes } from "vue3-google-login";
import { 
    NInput, 
    FormInst, 
    FormRules, 
    NForm, 
    NFormItem, 
    NButton 
} from 'naive-ui'
import { reactive, ref } from "vue";
import { RouterLink, useRouter } from "vue-router";
import { useAuthApi } from 'modules/auth/api/auth'
import { useAuthStore } from 'modules/auth/store/authStore'

const router = useRouter();
const { login } = useAuthApi();
const { updateUser } = useAuthStore();
const formRef = ref<FormInst | null>(null);
const loginFormRules = ref<FormRules>({
    email: {
        required: true,
        message: 'Please input your name',
        trigger: 'blur'
    },
    password: {
        required: true,
        message: 'Please input your password',
        trigger: 'blur'
    },
})
const loginForm = reactive({
    email: '',
    password: ''
})

type TLoginResponse = {
    id: string,
    email: string,
    sessionToken: string
}

function onSignIn(googleUser: CallbackTypes.CredentialCallback) {
    console.log(googleUser)
}

async function handleValidateClick (e: MouseEvent) {
    e.preventDefault()
    formRef.value?.validate(async (errors) => {
        if (!errors) {
            const response = await login(loginForm);
            handleLoginResponse(response);
        } else {
        console.log(errors)
        console.log('Invalid')
        }
    })
}

function handleLoginResponse(payload: TLoginResponse) {
    updateUser(payload);
    router.push('/dashboard');
}
</script>

<template>
    <div class="w-[400px] h-[600px] text-black flex flex-col items-center justify-center rounded-xl shadow-xl">
        <h1 class="mb-12 text-xl">Zaloguj się <br />do <strong>panelu logopedy</strong></h1>
        <n-form
            ref="formRef"
            :model="loginForm"
            :rules="loginFormRules"
            :show-label="false"
        >
            <n-form-item path="email" label="Email">
                <n-input
                    v-model:value="loginForm.email"
                    type="text" 
                    size="large" 
                    placeholder="E-mail"
                />
            </n-form-item>
            <n-form-item path="password" label="Password">
                <n-input 
                    v-model:value="loginForm.password"
                    type="password" 
                    show-password-on="click" 
                    size="large"
                    placeholder="Password"
                />
            </n-form-item>
            <n-form-item>
                <n-button
                    type="primary"
                    secondary 
                    strong
                    class="w-full"
                    @click="handleValidateClick"
                 
                 >
                    Zaloguj
                </n-button>
            </n-form-item>
            <GoogleLogin :callback="onSignIn" />
        </n-form>
        <div>
            Nie masz konta? 
            <router-link to="/register">Zarejestruj się</router-link>
        </div>
    </div>
</template>@/modules/auth/api/auth