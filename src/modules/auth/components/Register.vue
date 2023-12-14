<script setup lang="ts">
import { 
    NInput, 
    NForm, 
    NFormItem, 
    NButton,
    FormInst,
    FormItemInst,
    FormItemRule,
    FormValidationError,
    FormRules, 
} from 'naive-ui'
import { reactive, ref } from "vue";
import { RouterLink, useRouter } from "vue-router";
import { useAuthApi } from 'modules/auth/api/auth'
import { useAuthStore } from 'modules/auth/store/authStore'

type RegisterForm = {
    email: string | null;
    password: string | null;
    repeatPassword: string | null;
}

const { register, login } = useAuthApi();
const { updateUser } = useAuthStore();
const router = useRouter();
const formRef = ref<FormInst | null>(null);
const rPasswordFormItemRef = ref<FormItemInst | null>(null);
const rules: FormRules = {
    email: {
        required: true,
        message: 'Adres e-mail jest wymagany',
        trigger: 'blur'
    },
    password: {
        required: true,
        message: 'Hasło jest wymagane',
    },
    repeatPassword: [
        {   
            required: true,
            message: 'Powtórz hasło jest wymagane',
            trigger: ['blur', 'input']
        },
        {   
            validator: validatePasswordStartWith,
            message: 'Podane hasła różnią się',
            trigger: 'input'
        },
        {   
            validator: validatePasswordSame,
            message: 'Podane hasła różnią się',
            trigger: ['blur', 'input']
        }
    ],
}
const model = reactive<RegisterForm>({
    email: null,
    password: null,
    repeatPassword: null
})

//@ts-ignore
function validatePasswordStartWith(rule: FormItemRule, value: string): boolean {
    return (
        !!model.password &&
        model.password.startsWith(value) &&
        model.password.length >= value.length
    );
};

//@ts-ignore
function validatePasswordSame (rule: FormItemRule, value: string): boolean {
    return value === model.password;
};

function handlePasswordInput() {
    if (model.repeatPassword) {
        rPasswordFormItemRef.value?.validate({ trigger: 'password-input' })
    };
};

async function handleValidateClick (formEl: FormInst | null) {
    if (!formEl) return;

    formEl.validate(async (errors: Array<FormValidationError> | undefined) => {
        if (!errors) {
            await register({ 
                email: model.email, 
                password: model.password 
            }).then(async () => {
                const response = await login({email: model.email, password: model.password});
                handleLoginResponse(response);
            });
        };
    });
};

function handleLoginResponse(payload: any) {
    updateUser(payload);
    router.push('/dashboard');
};
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
            <n-form-item 
                path="email" 
                label="Email"
            >
                <n-input
                    v-model:value="model.email"
                    type="text" 
                    size="large" 
                    placeholder="E-mail"
                />
            </n-form-item>
            <n-form-item 
                path="password" 
                label="Password"
            >
                <n-input 
                    v-model:value="model.password"
                    type="password" 
                    show-password-on="click" 
                    size="large"
                    placeholder="Hasło"
                    @input="handlePasswordInput"
                />
            </n-form-item>
            <n-form-item 
                path="repeatPassword" 
                label="Repeat password" 
                ref="rPasswordFormItemRef"
                first
            >
                <n-input 
                    v-model:value="model.repeatPassword"
                    type="password" 
                    show-password-on="click" 
                    size="large"
                    placeholder="Powtórz hasło"
                    :disabled="!model.password"
                />
            </n-form-item>
            <n-form-item>
                <n-button
                    type="primary"
                    secondary 
                    strong
                    class="w-full"
                    :disabled="!model.email || !model.password || !model.repeatPassword"
                    @click="handleValidateClick(formRef)"
                 
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