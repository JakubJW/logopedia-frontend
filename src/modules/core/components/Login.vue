<script setup lang="ts">
    import type { CallbackTypes } from "vue3-google-login";
    
    function onSignIn(googleUser: CallbackTypes.CredentialCallback) {
      console.log(googleUser)
    }
</script>

<template>
    <div class="w-[400px] h-[600px] flex items-center justify-center rounded-xl shadow-xl">
        <GoogleLogin :callback="onSignIn" />
    </div>
</template>