import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', () => {
  const isAuthorized = ref(false)

  return {
    isAuthorized,
  }
})
