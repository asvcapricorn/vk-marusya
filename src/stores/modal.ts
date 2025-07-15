import { ref, watch } from 'vue'
import { defineStore } from 'pinia'

export const useModalStore = defineStore('modal', () => {
  const body = document.body
  const scrollbarWidth = ref(0)

  const authModal = ref(false)
  const registrationModal = ref(false)
  const successModal = ref(false)
  const trailerModal = ref(false)
  const isBodyScrollLocked = ref(false)
  const trailerUrl = ref('')

  const openAuthModal = () => {
    authModal.value = true
    registrationModal.value = false
    successModal.value = false
    lockBodyScroll()
  }

  const openRegistrationModal = () => {
    registrationModal.value = true
    authModal.value = false
    successModal.value = false
    unlockBodyScroll()
  }

  const openSuccessModal = () => {
    successModal.value = true
    authModal.value = false
    registrationModal.value = false
    unlockBodyScroll()
  }

  const openTrailerModal = () => {
    trailerModal.value = true
    lockBodyScroll()
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
    if (
      isBodyScrollLocked.value &&
      !authModal.value &&
      !registrationModal.value &&
      !successModal.value &&
      !trailerModal.value
    ) {
      body.classList.remove('body-no-scroll')
      body.style.paddingRight = ''
      isBodyScrollLocked.value = false
    }
  }

  watch([authModal, registrationModal, successModal, trailerModal], () => {
    unlockBodyScroll()
  })

  return {
    authModal,
    registrationModal,
    successModal,
    trailerModal,
    trailerUrl,
    openAuthModal,
    openRegistrationModal,
    openSuccessModal,
    openTrailerModal,
  }
})
