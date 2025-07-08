<script setup lang='ts'>
import PosterMovieCard from './PosterMovieCard.vue';
import type { IMovie } from '../types/movie';

defineProps<{ movies: IMovie[] | [], cardTop: boolean, isFav?: boolean }>();

</script>
<template>
    <div class="movies" :class="{ 'movies-list--top': cardTop }">
        <ol class="movies__list">
            <li class="movies__item" v-for="movie in movies">
                <PosterMovieCard :movie="movie" :isFav="isFav" />
            </li>
        </ol>
    </div>
</template>