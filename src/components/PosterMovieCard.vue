<script setup lang="ts">
import type { IMovie } from '../types/movie'
import { useFavStore } from '@/stores/favourites'

const props = defineProps<{ movie: IMovie | null }>();
const favStore = useFavStore();

const handleDelete = async () => {
  if (!props.movie?.id) return

  try {
    await favStore.deleteFromFavs(props.movie.id);
  } catch (err) {
    console.error('Failed to remove from favorites:', err)
  }
}
</script>

<template>
  <RouterLink class="poster-movie-card" :to="`/movie/${movie?.id}`">
    <div class="poster-movie-card__wrapper">
      <img class="poster-movie-card__image" :src="movie?.posterUrl" v-if="movie?.posterUrl" height="336" width="224"
        alt="Постер фильма">
      <svg class="poster-movie-card__icon" width="16" height="16" aria-hidden="true" v-else>
        <use xlink:href="@/assets/images/sprite.svg#icon-movie"></use>
      </svg>
    </div>
    <button class="poster-movie-card__btn-delete" type="button" @click.stop.prevent="handleDelete">
      <svg class="poster-movie-card__btn-icon" width="24" height="24" aria-hidden="true">
        <use xlink:href="@/assets/images/sprite.svg#icon-close"></use>
      </svg>
    </button>
  </RouterLink>
</template>