<script setup lang='ts'>
import PosterMovieCard from './PosterMovieCard.vue';
import type { IMovie } from '../types/movie';

defineProps<{ movies: IMovie[] | [], isFav?: boolean }>();

</script>
<template>
    <div class="movies">
        <ol class="movies__list">
            <li class="movies__item" v-for="movie in movies">
                <PosterMovieCard :class="{ 'poster-movie-card--fav': isFav }" :movie="movie" />
            </li>
        </ol>
    </div>
</template>