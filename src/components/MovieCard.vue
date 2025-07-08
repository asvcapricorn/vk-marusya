<script setup lang="ts">
import { ref, watch } from 'vue';
import AppLoader from './AppLoader.vue';
import type { IMovie } from '../types/movie'
import { GENRE_MAP } from '@/constants/genres';
import { useFavStore } from '@/stores/favourites'

const props = defineProps<{ movie: IMovie | null, forSearch?: boolean, forView?: boolean }>();

const getTranslatedGenres = (genres: string[] | undefined) => {
  if (!genres) return '';
  return genres
    .map(genre => GENRE_MAP[genre as keyof typeof GENRE_MAP].translation || genre)
    .join(', ')
};

const getHoursAndMinutes = (minutes: number | undefined) => {
  return minutes ? `${Math.floor(minutes / 60)} ч ${minutes % 60} мин` : '';
};

const getRatingClass = (rating: number | undefined) => {
  if (!rating) {
    return 'movie-card__rating--bad';
  }
  if (rating > 8.4) {
    return 'movie-card__rating--excellent';
  }
  if (rating > 6.9) {
    return 'movie-card__rating--good';
  }
  if (rating > 4.9) {
    return 'movie-card__rating--poor';
  }
  return 'movie-card__rating--bad';
};

const isFav = ref<boolean>(false);

const favStore = useFavStore();

const checkFavoriteStatus = () => {
  console.log(isFav.value, 'checkFavoriteStatus');
  if (!props.movie?.id) return
  try {
    isFav.value = favStore.isFavorite(props.movie.id);
  } catch (err) {
    console.error('Failed to check favoutire status of movie:', err)
  }
};

const handleToggleFav = async () => {
  if (!props.movie?.id) return
  try {
    await favStore.toggleFavorite(props.movie.id);
    isFav.value = !isFav.value;
  } catch (err) {
    console.error('Failed to toggle favourite:', err)
  }
};


watch(() => props.movie, (newMovie) => {
  if (newMovie) {
    checkFavoriteStatus();
  }
}, { immediate: true });
</script>

<template>
  <div class="movie-card" :class="{ 'movie-card--search': forSearch, 'movie-card--view': forView }" v-if="movie">
    <div class="movie-card__content">
      <span class="movie-card__labels">
        <span class="movie-card__rating" :class="getRatingClass(movie?.tmdbRating)">
          <svg class="movie-card__rating-icon" width="16" height="16" aria-hidden="true">
            <use xlink:href="@/assets/images/sprite.svg#icon-star"></use>
          </svg>
          <span class="movie-card__rating-number">{{ movie?.tmdbRating?.toFixed(1)
            || '0.0' }}</span>
        </span>
        <span class="movie-card__year">{{ movie?.releaseYear }}</span>
        <span class="movie-card__genres"> {{ getTranslatedGenres(movie?.genres) }}
        </span>
        <span class="movie-card__runtime">{{ getHoursAndMinutes(movie?.runtime) }}</span>
      </span>
      <h2 class="movie-card__title">{{ movie?.title }}</h2>
      <p class="movie-card__plot">{{ movie?.plot }}</p>
      <div class="movie-card__btns">
        <button class="btn btn--primary" type="button">Трейлер</button>
        <RouterLink class="btn btn--secondary btn--random" :to="`/movie/${movie?.id}`">О фильме</RouterLink>
        <button class="btn btn--secondary btn--icon" type="button" @click="handleToggleFav">
          <svg class="movie-card__icon" width="24" height="24" aria-hidden="true" v-if="!isFav">
            <use xlink:href="@/assets/images/sprite.svg#icon-fav"></use>
          </svg>
          <svg class="movie-card__icon-is-fav" width="24" height="24" aria-hidden="true" v-else>
            <use xlink:href="@/assets/images/sprite.svg#icon-fav-fill"></use>
          </svg>
        </button>
        <button class="btn btn--secondary btn--icon btn--random" type="button" @click="$emit('refreshMovie')">
          <svg class="movie-card__rating-icon" width="24" height="24" aria-hidden="true">
            <use xlink:href="@/assets/images/sprite.svg#icon-refresh"></use>
          </svg>
        </button>
      </div>
    </div>
    <img class="movie-card__image" :src="movie?.posterUrl" height="552" width="680" alt="Постер фильма"
      v-if="movie.posterUrl">
    <svg class="movie-card__icon-default" width="16" height="16" aria-hidden="true" v-else>
      <use xlink:href="@/assets/images/sprite.svg#icon-movie"></use>
    </svg>
    <RouterLink class="movie-card__link-search" :to="`/movie/${movie?.id}`"></RouterLink>
  </div>
  <AppLoader v-else />
</template>