<script setup lang="ts">
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

const { register } = useAuthApi();
const { updateUser } = useAuthStore();
const router = useRouter();
const formRef = ref<FormInst | null>(null);
const rules = ref<FormRules>({
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
    reenteredPassword: {
        required: true,
        message: 'Please input your password',
        trigger: 'blur'
    },
})
const model = reactive({
    email: '',
    password: '',
    reenteredPassword: ''
})

async function handleValidateClick (e: MouseEvent) {
    e.preventDefault()
    formRef.value?.validate(async (errors) => {
        if (!errors) {
            const response = await register({ 
                email: model.email, 
                password: model.password 
            })
            handleLoginResponse(response);
        } else {
        console.log(errors)
        console.log('Invalid')
        }
    })
}

function handleLoginResponse(payload: any) {
    updateUser(payload);
    router.push('/dashboard');
}
</script>

<template>
    <div class="w-[400px] h-[600px] text-black flex flex-col items-center justify-center rounded-xl shadow-xl">
        <h1 class="mb-12 text-xl">Zarejestruj się <br /> w <strong>panelu logopedy</strong></h1>
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
                    placeholder="Password"
                />
            </n-form-item>
            <n-form-item path="password" label="Password">
                <n-input 
                    v-model:value="model.reenteredPassword"
                    type="password" 
                    show-password-on="click" 
                    size="large"
                    placeholder="Repeat password"
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
                    Zarejestruj
                </n-button>
            </n-form-item>
        </n-form>
        <div>
            <router-link to="/login">Powrót do logowania</router-link>
        </div>
    </div>
</template>@/modules/auth/api/auth