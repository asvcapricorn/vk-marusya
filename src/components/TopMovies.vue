<script setup lang='ts'>
import { ref, onMounted } from 'vue';
import api from '@/services/api';
import MoviesList from './MoviesList.vue';
import type { IMovie } from '../types/movie';

const topMovies = ref<IMovie[] | []>([]);

const getTop10 = async (): Promise<void> => {
    try {
        const resp = await api.get('/movie/top10');
        topMovies.value = await resp.data;
    } catch (err) {
        throw new Error('top 10 movies response was not ok')
    }
}

onMounted(getTop10);

</script>
<template>
    <section class="top">
        <h2 class="top__title">Топ 10 фильмов</h2>
        <MoviesList class="movies-list--top" :movies="topMovies" />
    </section>
</template>