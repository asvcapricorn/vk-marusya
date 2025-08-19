<script setup lang="ts">
import { ref, watch } from 'vue'
import AppLoader from './AppLoader.vue'
import type { IMovie } from '../types/movie'
import { GENRE_MAP } from '@/constants/genres'
import { useFavStore } from '@/stores/favourites'
import { useModalStore } from '@/stores/modal'
import { storeToRefs } from 'pinia'
import { emitter } from '@/utils/index'

const props = defineProps<{ movie: IMovie | null }>()

const getTranslatedGenres = (genres: string[] | undefined) => {
  if (!genres) return ''
  return genres
    .map((genre) => GENRE_MAP[genre as keyof typeof GENRE_MAP].translation || genre)
    .join(', ')
}

const getHoursAndMinutes = (minutes: number | undefined) => {
  return minutes ? `${Math.floor(minutes / 60)} ч ${minutes % 60} мин` : ''
}

const getRatingClass = (rating: number | undefined) => {
  if (!rating) {
    return 'movie-card__rating--bad'
  }
  if (rating > 8.4) {
    return 'movie-card__rating--excellent'
  }
  if (rating > 6.9) {
    return 'movie-card__rating--good'
  }
  if (rating > 4.9) {
    return 'movie-card__rating--poor'
  }
  return 'movie-card__rating--bad'
}

const isFav = ref<boolean>(false)

const favStore = useFavStore()
const modalStore = useModalStore()

const { trailerUrl } = storeToRefs(modalStore)

const openTrailer = () => {
  modalStore.openTrailerModal()
}

const checkFavoriteStatus = () => {
  if (!props.movie?.id) return
  isFav.value = favStore.isFavorite(props.movie.id);
}

const setTrailerUrl = () => {
  if (!props.movie?.id) return
  trailerUrl.value = props.movie.trailerUrl
}

const handleToggleFav = async () => {
  const userData = localStorage.getItem('user');
  if (!props.movie?.id) return
  if (!userData) {
    emitter.emit('auth:required');
    return;
  }
  const resp = await favStore.toggleFavorite(props.movie.id);
  if (resp) {
    isFav.value = !isFav.value;
  }
}

watch(
  () => props.movie,
  (newMovie) => {
    if (newMovie) {
      checkFavoriteStatus()
      setTrailerUrl()
    }
  },
  { immediate: true },
)
</script>

<template>
  <div class="movie-card" v-if="movie">
    <div class="movie-card__content">
      <span class="movie-card__labels">
        <span class="movie-card__rating" :class="getRatingClass(movie?.tmdbRating)">
          <svg class="movie-card__rating-icon" width="16" height="16" aria-hidden="true">
            <use xlink:href="@/assets/images/sprite.svg#icon-star"></use>
          </svg>
          <span class="movie-card__rating-number">{{
            movie?.tmdbRating?.toFixed(1) || '0.0'
          }}</span>
        </span>
        <span class="movie-card__year">{{ movie?.releaseYear }}</span>
        <span class="movie-card__genres"> {{ getTranslatedGenres(movie?.genres) }} </span>
        <span class="movie-card__runtime">{{ getHoursAndMinutes(movie?.runtime) }}</span>
      </span>
      <h2 class="movie-card__title">{{ movie?.title }}</h2>
      <p class="movie-card__plot">{{ movie?.plot }}</p>
      <div class="movie-card__btns">
        <button class="btn btn--primary" type="button" @click="openTrailer">Трейлер</button>
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
    <img class="movie-card__image" :src="movie?.posterUrl" height="552" width="500" alt="Постер фильма"
      v-if="movie.posterUrl" />
    <svg class="movie-card__icon-default" width="16" height="16" aria-hidden="true" v-else>
      <use xlink:href="@/assets/images/sprite.svg#icon-movie"></use>
    </svg>
    <RouterLink class="movie-card__link-search" :to="`/movie/${movie?.id}`"></RouterLink>
  </div>
  <AppLoader v-else />
</template>
