<script setup lang="ts">
import api from '@/services/api'
import { useUserStore } from '@/stores/user'
import { storeToRefs } from 'pinia'

const userStore = useUserStore()
const { isAuthorized, userEmail, userName, userSurname } = storeToRefs(userStore)

const userData = localStorage.getItem('user')
let user: string = ''
let emailString: string = ''
let nameString: string = ''
let surnameString: string = ''

if (userData) {
  try {
    const parsedUser = JSON.parse(userData)

    nameString = parsedUser.name || ''
    surnameString = parsedUser.surname || ''
    user = nameString + ' ' + surnameString
    emailString = parsedUser.email || ''
  } catch (err) {
    console.error('An error occurred while parsing JSON:', err)
  }
}

const getInitials = (): string => {
  const firstCharName = nameString.charAt(0) || ''
  const firstCharSurname = surnameString.charAt(0) || ''

  return (firstCharName + firstCharSurname).toUpperCase()
}

const logout = async (): Promise<void> => {
  try {
    await api.get('/auth/logout')
    isAuthorized.value = false
    userEmail.value = ''
    userName.value = ''
    userSurname.value = ''

    localStorage.removeItem('user')
  } catch (err) {
    console.error('logout data response was not ok:', err)
  }
}
</script>

<template>
  <div class="settings">
    <div class="settings__items">
      <div class="settings__item">
        <div class="settings__icon-wrapper">
          <span class="settings__icon">{{ getInitials() }}</span>
        </div>
        <div class="settings__text">
          <div class="settings__label">Имя Фамилия</div>
          <div class="settings__value">{{ user }}</div>
        </div>
      </div>
      <div class="settings__item">
        <div class="settings__icon-wrapper">
          <svg class="settings__icon" width="24" height="24" aria-hidden="true">
            <use xlink:href="@/assets/images/sprite.svg#icon-mail"></use>
          </svg>
        </div>
        <div class="settings__text">
          <div class="settings__label">Электронная почта</div>
          <div class="settings__value">{{ emailString }}</div>
        </div>
      </div>
    </div>
    <RouterLink class="settings__btn btn btn--primary" @click="logout" to="/"
      >Выйти из аккаунта</RouterLink
    >
  </div>
</template>
