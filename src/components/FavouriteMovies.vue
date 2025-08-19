<script setup lang='ts'>
import { onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import MoviesList from './MoviesList.vue';
import { useFavStore } from '@/stores/favourites'

const favStore = useFavStore();
const { favMovies } = storeToRefs(favStore);

onMounted(async () => {
  await favStore.fetchFavMovies();
})

</script>
<template>
  <section class="favourites">
    <MoviesList :movies="favMovies" :cardTop="true" :isFav="true" v-if="favMovies && favMovies.length" />
    <span class="favourites__text" v-else>Вы пока не добавили ни одного фильма в избранное</span>
  </section>
</template>
