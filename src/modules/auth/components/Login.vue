<script setup lang="ts">
import type { CallbackTypes } from "vue3-google-login";
import { 
    NInput, 
    FormInst, 
    FormRules, 
    NForm, 
    NFormItem, 
    NButton, 
FormValidationError
} from 'naive-ui'
import { reactive, ref } from "vue";
import { RouterLink, useRouter } from "vue-router";
import { useAuthApi } from 'modules/auth/api/auth'
import { useAuthStore } from 'modules/auth/store/authStore'
import { User } from "../types/user";

type LoginForm = {
    email: string | null,
    password: string | null
}

const router = useRouter();
const { login } = useAuthApi();
const { updateUser } = useAuthStore();
const formRef = ref<FormInst | null>(null);
const rules: FormRules = {
    email: {
        required: true,
        message: 'Adres e-mail jest wymagany',
        trigger: 'blur'
    },
    password: {
        required: true,
        message: 'Hasło jest wymagane',
        trigger: 'blur'
    },
}

const model = reactive<LoginForm>({
    email: null,
    password: null
})

function onSignIn(googleUser: CallbackTypes.CredentialCallback) {
    console.log(googleUser)
}

async function handleValidateClick (formEl: FormInst | null) {
    if (!formEl) return;

    formEl.validate(async (errors: Array<FormValidationError> | undefined) => {
        if (!errors) {
            await login(model).then((response) => {
                handleLoginResponse(response)
            })
        }
    })
}

function handleLoginResponse(payload: User) {
    updateUser(payload);
    router.push('/dashboard');
}
</script>

<template>
    <div class="w-[400px] h-[600px] text-black flex flex-col items-center justify-center rounded-xl shadow-xl">
        <h1 class="mb-12 text-xl">Zaloguj się <br />do <strong>panelu logopedy</strong></h1>
        <n-form
            ref="formRef"
            :model="model"
            :rules="rules"
            :show-label="false"
        >
            <n-form-item path="email" label="Email">
                <n-input
                    v-model:value="model.email"
                    type="text" 
                    size="large" 
                    placeholder="E-mail"
                />
            </n-form-item>
            <n-form-item path="password" label="Password">
                <n-input 
                    v-model:value="model.password"
                    type="password" 
                    show-password-on="click" 
                    size="large"
                    placeholder="Hasło"
                />
            </n-form-item>
            <n-form-item>
                <n-button
                    type="primary"
                    secondary 
                    strong
                    class="w-full"
                    :disabled="!model.email || !model.password"
                    @click="handleValidateClick(formRef)"
                 
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