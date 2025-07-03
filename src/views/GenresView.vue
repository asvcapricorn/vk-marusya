<script setup lang="ts">
import { ref, onMounted } from 'vue';
import api from '@/services/api';
import GenreCard from '../components/GenreCard.vue';

const genres = ref<string[] | null>(null);

const getGenres = async (): Promise<void> => {
  try {
    const resp = await api.get('/movie/genres');
    genres.value = await resp.data;
  } catch (err) {
    throw new Error('genres response was not ok')
  }
};

onMounted(getGenres);

</script>

<template>
  <main>
    <section class="genres">
      <div class="container">
        <h1 class="genres__title">Жанры фильмов</h1>
        <ul class="genres__list">
          <li class="genres__item" v-for="genre in genres" :key="genre">
            <GenreCard :genre=genre />
          </li>
        </ul>
      </div>
    </section>
  </main>
</template>
