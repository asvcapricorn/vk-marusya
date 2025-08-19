<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue';
import { emitter } from '@/utils/index';
import AppHeader from './components/AppHeader.vue';
import AppFooter from './components/AppFooter.vue';
import AuthModal from '@/components/AuthModal.vue';
import RegistrationModal from '@/components/RegistrationModal.vue';
import SuccessModal from '@/components/SuccessModal.vue';
import ErrorModal from '@/components/ErrorModal.vue';
import TrailerModal from './components/TrailerModal.vue';
import { useModalStore } from '@/stores/modal'
import { storeToRefs } from 'pinia'

const modalStore = useModalStore();
const { authModal, registrationModal, successModal, errorModal, trailerModal, errContent } = storeToRefs(modalStore);

onMounted(() => {
  emitter.on('auth:required', () => {
    modalStore.openAuthModal();
  });
});

onUnmounted(() => {
  emitter.off('auth:required');
});
</script>

<template>
  <AppHeader />
  <RouterView />
  <AppFooter />
  <AuthModal v-model="authModal" />
  <RegistrationModal v-model="registrationModal" />
  <SuccessModal v-model="successModal" />
  <ErrorModal v-model="errorModal" :err="errContent" />
  <TrailerModal v-model="trailerModal" />
</template>
