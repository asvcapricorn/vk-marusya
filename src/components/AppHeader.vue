<script setup lang="ts">
import { ref, watch } from 'vue';
import api from '@/services/api';
import type { IMovie } from '../types/movie'

const search = ref('');

interface IResponseMovies {
  movies: IMovie[]
}

const getMovies = async (title: string): Promise<IResponseMovies> => {
  try {
    const resp = await api.get(`/movie?title=${title}`);
    const movies = await resp.data;
    console.log('movies', movies);

    return {
      movies: movies
    }
  } catch (err) {
    throw new Error('movies response was not ok')
  }
};

watch(search, () => {
  console.log('search', search.value);
  getMovies(search.value);
});
</script>

<template>
  <header class="header">
    <div class="container">
      <div class="header__wrapper">
        <RouterLink class="header__logo" to="/" exact>
          <picture class="header__picture">
            <img class="header__image" src="@/assets/images/logo.png" srcset="@/assets/images/logo@2x.png 2x"
              height="32" width="144" alt="Логотип">
          </picture>
        </RouterLink>
        <div class="header__main">
          <RouterLink class="header__link" to="/">Главная</RouterLink>
          <RouterLink class="header__link" to="/genres">Жанры</RouterLink>
          <div class="custom-input">
            <input class="custom-input__field" name="search" id="search" type="text" placeholder="Поиск"
              v-model="search">
            <svg class="custom-input__search-icon" width="24" height="24" aria-hidden="true">
              <use xlink:href="@/assets/images/sprite.svg#icon-search"></use>
            </svg>
          </div>
        </div>
        <RouterLink class="header__link" to="/auth">Войти</RouterLink>
      </div>
    </div>
  </header>
</template>
