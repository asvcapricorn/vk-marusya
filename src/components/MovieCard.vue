<script setup lang="ts">
import type { IMovie } from '../types/movie'
import { GENRE_MAP } from '@/constants/genres';

const props = defineProps<{ movie: IMovie | null }>()

type GenreKey = keyof typeof GENRE_MAP;

const translateGenres = (genres: GenreKey[]) => genres.map(genre => GENRE_MAP[genre] || genre);

</script>

<template>
  <div class="movie-card">
    <div class="movie-card__content">
      <span class="movie-card__labels">
        <span class="movie-card__rating">
          <svg class="movie-card__rating-icon" width="16" height="16" aria-hidden="true">
            <use xlink:href="@/assets/images/sprite.svg#icon-star"></use>
          </svg>
          <span class="movie-card__rating-number">{{ movie?.tmdbRating || 'no rating' }}</span>
        </span>
        <span class="movie-card__year">{{ movie?.releaseYear }}</span>
        <span class="movie-card__genres">{{ translateGenres(movie?.genres) }}</span>
        <span class="movie-card__runtime">{{ movie?.runtime }}</span>
      </span>
      <h1 class="movie-card__title">{{ movie?.title }}</h1>
      <p class="movie-card__plot">{{ movie?.plot }}</p>
      <div class="movie-card__btns">
        <button class="btn" type="button">Трейлер</button>
        <a class="btn">О фильме</a>
        <button class="btn">
          <svg class="movie-card__rating-icon" width="16" height="16" aria-hidden="true">
            <use xlink:href="@/assets/images/sprite.svg#icon-star"></use>
          </svg>
        </button>
        <button class="btn">
          <svg class="movie-card__rating-icon" width="24" height="24" aria-hidden="true">
            <use xlink:href="@/assets/images/sprite.svg#icon-search"></use>
          </svg>
        </button>
      </div>
    </div>
    <img class="movie-card__image" :src="movie?.posterUrl" height="552" width="680" alt="Постер фильма">
  </div>
</template>