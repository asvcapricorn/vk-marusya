<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import api from '@/services/api'
import type { IMovie } from '../types/movie'
import SearchForm from './SearchForm.vue'
import { useUserStore } from '@/stores/user'
import { useModalStore } from '@/stores/modal'
import { storeToRefs } from 'pinia'
import { debounce, handleAxiosError } from '@/utils'

const search = ref('')
const searchResults = ref<IMovie[]>([])

const userStore = useUserStore()
const { userName } = storeToRefs(userStore)

const modalStore = useModalStore()
const openAuth = () => {
  modalStore.openAuthModal()
}

interface IResponseMovies {
  movies: IMovie[]
}

const getMovies = async (title: string): Promise<IResponseMovies> => {
  try {
    const query = new URLSearchParams({
      title: title,
      count: String(5)
    })
    const resp = await api.get(`/movie?${query}`);
    const movies = await resp.data;

    return {
      movies: movies
    }
  } catch (err) {
    handleAxiosError(err);
    return {
      movies: []
    }
  }
};


const headerRef = ref<HTMLElement | null>(null)
const body = document.body

const toggleSearch = () => {
  body.classList.toggle('body-no-scroll-search')
  headerRef.value?.classList.toggle('header--search-open')
}

const closeSearch = () => {
  body.classList.remove('body-no-scroll-search')
  headerRef.value?.classList.remove('header--search-open')
}

const debouncedGetMovies = debounce(async (newVal: string) => {
  const response = await getMovies(newVal)
  searchResults.value = response.movies
}, 200)

watch(
  search,
  (newVal) => {
    if (newVal.length > 2) {
      debouncedGetMovies(newVal)
    } else {
      searchResults.value = []
    }
  },
  { deep: true },
)

onMounted(() => {
  const userData = localStorage.getItem('user')
  if (userData) {
    userName.value = JSON.parse(userData).name
  }
})
</script>

<template>
  <header class="header" ref="headerRef">
    <div class="container">
      <div class="header__wrapper">
        <RouterLink class="header__logo" to="/">
          <picture class="header__picture">
            <source media="(max-width: 767px)"
              srcset="@/assets/images/logo-mobile.png 1x, @/assets/images/logo-mobile@2x.png 2x" />
            <img class="header__image" src="@/assets/images/logo.png" srcset="@/assets/images/logo@2x.png 2x"
              height="32" width="144" alt="Логотип" loading="lazy" />
          </picture>
        </RouterLink>
        <div class="header__content">
          <div class="header__main">
            <RouterLink class="header__link-main" to="/">Главная</RouterLink>
            <RouterLink class="header__link" to="/genres">
              <span class="header__link-text">Жанры</span>
              <svg class="header__link-icon" width="24" height="24" aria-hidden="true">
                <use xlink:href="@/assets/images/sprite.svg#icon-genres"></use>
              </svg>
            </RouterLink>
            <div class="header__search">
              <SearchForm class="header__search-form" v-model="search" :searchResults="searchResults"
                @closeSearch="closeSearch" />
              <button class="header__btn btn btn--icon" @click="toggleSearch">
                <svg class="header__link-icon" width="24" height="24" aria-hidden="true">
                  <use xlink:href="@/assets/images/sprite.svg#icon-search"></use>
                </svg>
              </button>
            </div>
          </div>
          <div class="header__right">
            <div class="header__right-desktop">
              <RouterLink class="header__link header__link--profile" to="/profile" v-if="userName">
                {{ userName }}
              </RouterLink>
              <button class="header__link header__link--profile" type="button" @click="openAuth" v-else>
                Войти
              </button>
            </div>
            <div class="header__right-mobile">
              <RouterLink class="header__link header__link--profile" to="/profile" v-if="userName">
                <svg class="header__link-icon" width="24" height="24" aria-hidden="true">
                  <use xlink:href="@/assets/images/sprite.svg#icon-user"></use>
                </svg>
              </RouterLink>
              <button class="header__link header__link--profile" type="button" @click="openAuth" v-else>
                <svg class="header__link-icon" width="24" height="24" aria-hidden="true">
                  <use xlink:href="@/assets/images/sprite.svg#icon-user"></use>
                </svg>
              </button>
            </div>
          </div>
        </div>
        <div class="header__search-overlay" @click="toggleSearch"></div>
      </div>
    </div>
  </header>
</template>
