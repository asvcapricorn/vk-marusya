<script setup lang='ts'>
import { ref, onMounted } from 'vue';
import api from '@/services/api';
import MovieCard from './MovieCard.vue';
import type { IMovie } from '../types/movie';

const movie = ref<IMovie | null>(null);

const getRandomMovie = async (): Promise<void> => {
  try {
    const resp = await api.get('/movie/random');
    movie.value = await resp.data;
  } catch (err) {
    throw new Error('random movie response was not ok')
  }
};

onMounted(getRandomMovie);





</script>
<template>
  <section class="random-movie">
    <MovieCard :movie=movie @refreshMovie="getRandomMovie" />
  </section>
</template>