import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useModalStore = defineStore('modal', () => {
  const body = document.body
  const scrollbarWidth = ref(0)

  const authModal = ref(false)
  const registrationModal = ref(false)
  const isBodyScrollLocked = ref(false)

  const openAuthModal = () => {
    authModal.value = true
    registrationModal.value = false
    lockBodyScroll()
  }

  const openRegistrationModal = () => {
    registrationModal.value = true
    authModal.value = false
    unlockBodyScroll()
  }

  const lockBodyScroll = () => {
    if (!isBodyScrollLocked.value) {
      scrollbarWidth.value = window.innerWidth - document.documentElement.clientWidth
      body.style.paddingRight = `${scrollbarWidth.value}px`
      body.classList.add('body-no-scroll')
      isBodyScrollLocked.value = true
    }
  }
  const unlockBodyScroll = () => {
    if (isBodyScrollLocked.value && !authModal.value && !registrationModal.value) {
      body.classList.remove('body-no-scroll')
      body.style.paddingRight = ''
      isBodyScrollLocked.value = false
    }
  }

  return {
    authModal,
    registrationModal,
    isBodyScrollLocked,
    openAuthModal,
    openRegistrationModal,
  }
})
