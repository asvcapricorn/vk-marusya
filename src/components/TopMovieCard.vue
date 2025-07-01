<script setup lang="ts">
import type { IMovie } from '../types/movie'

defineProps<{ movie: IMovie | null }>();

</script>

<template>
  <a class="top-movie-card" href="#">
    <img class="top-movie-card__image" :src="movie?.posterUrl" v-if="movie?.posterUrl" height="336" width="224"
      alt="Постер фильма">
    <svg class="top-movie-card__icon" width="16" height="16" aria-hidden="true" v-else>
      <use xlink:href="@/assets/images/sprite.svg#icon-movie"></use>
    </svg>
  </a>
</template>