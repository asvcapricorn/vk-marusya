<script setup lang="ts">
import type { IMovie } from '../types/movie'

defineProps<{ movie: IMovie | null }>();
</script>

<template>
  <RouterLink class="poster-movie-card" :to="`/movie/${movie?.id}`">
    <img class="poster-movie-card__image" :src="movie?.posterUrl" v-if="movie?.posterUrl" height="336" width="224"
      alt="Постер фильма">
    <svg class="poster-movie-card__icon" width="16" height="16" aria-hidden="true" v-else>
      <use xlink:href="@/assets/images/sprite.svg#icon-movie"></use>
    </svg>
  </RouterLink>
</template>