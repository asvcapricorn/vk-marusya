<script setup lang="ts">
import { ref, watch } from 'vue';
import { storeToRefs } from 'pinia'
import api from '@/services/api';
import { useUserStore } from '@/stores/user';
import type { IMovie } from '../types/movie';
import SearchForm from './SearchForm.vue';
import AuthModal from '@/components/AuthModal.vue';

const store = useUserStore();
const { isAuthorized } = storeToRefs(store);

const isAuthModalOpen = ref(false);
const search = ref('');
const searchResults = ref<IMovie[]>([]);

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
    console.log('movies', movies);

    return {
      movies: movies
    }
  } catch (err) {
    throw new Error('movies response was not ok')
  }
};

watch(search, async (newVal) => {
  if (newVal.length > 2) {
    const response = await getMovies(newVal);
    searchResults.value = response.movies;
  } else {
    searchResults.value = [];
  }
});
</script>

<template>
  <header class="header">
    <div class="container">
      <div class="header__wrapper">
        <RouterLink class="header__logo" to="/">
          <picture class="header__picture">
            <img class="header__image" src="@/assets/images/logo.png" srcset="@/assets/images/logo@2x.png 2x"
              height="32" width="144" alt="Логотип">
          </picture>
        </RouterLink>
        <div class="header__main">
          <RouterLink class="header__link" to="/">Главная</RouterLink>
          <RouterLink class="header__link" to="/genres">Жанры</RouterLink>
          <SearchForm v-model="search" :searchResults="searchResults" />
        </div>
        <RouterLink class="header__link" to="/profile" v-if="isAuthorized">Профиль</RouterLink>
        <button class="header__link" type="button" @click="isAuthModalOpen = true" v-else>Войти</button>
        <AuthModal v-model="isAuthModalOpen" />
      </div>
    </div>
  </header>
</template>
