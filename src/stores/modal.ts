import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useModalStore = defineStore('modal', () => {
  const authModal = ref(false)
  const registrationModal = ref(false)
  const anyModalOpen = computed(() => authModal.value || registrationModal.value)

  const openAuthModal = () => {
    authModal.value = true
    registrationModal.value = false
  }

  const openRegistrationModal = () => {
    registrationModal.value = true
    authModal.value = false
  }

  return {
    authModal,
    registrationModal,
    openAuthModal,
    openRegistrationModal,
  }
})
