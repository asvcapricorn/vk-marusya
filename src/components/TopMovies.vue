<script setup lang='ts'>
import { ref, onMounted } from 'vue';
import api from '@/services/api';
import TopMovieCard from './TopMovieCard.vue';
import type { IMovie } from '../types/movie';

const topMovies = ref<IMovie[] | []>([]);

const getTop10 = async (): Promise<void> => {
    try {
        const resp = await api.get('/movie/top10');
        topMovies.value = await resp.data;
        console.log(topMovies.value);
    } catch (err) {
        throw new Error('top 10 movies response was not ok')
    }
}

onMounted(getTop10);

</script>
<template>
    <div class="top">
        <h2 class="top__title">Топ 10 фильмов</h2>
        <ol class="top__list">
            <li class="top__item" v-for="movie in topMovies">
                <TopMovieCard :movie="movie" />
            </li>
        </ol>
    </div>
</template>