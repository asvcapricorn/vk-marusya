<script setup lang='ts'>
import PosterMovieCard from './PosterMovieCard.vue';
import type { IMovie } from '../types/movie';

defineProps<{ movies: IMovie[] | [], cardTop: boolean }>();
</script>
<template>
    <div class="movies" :class="{ 'movies-list--top': cardTop }">
        <ol class="movies__list">
            <li class="movies__item" v-for="movie in movies">
                <PosterMovieCard :movie="movie" />
            </li>
        </ol>
    </div>
</template>