<script setup lang="ts">
import AppHeader from './components/AppHeader.vue';
import AppFooter from './components/AppFooter.vue';
import AuthModal from '@/components/AuthModal.vue';
import RegistrationModal from '@/components/RegistrationModal.vue';
import { useModalStore } from '@/stores/modal'
import { storeToRefs } from 'pinia'

const modalStore = useModalStore();
const { authModal, registrationModal } = storeToRefs(modalStore);

</script>

<template>
  <AppHeader />
  <RouterView />
  <AppFooter />
  <AuthModal v-model="authModal" />
  <RegistrationModal v-model="registrationModal" />
</template>
