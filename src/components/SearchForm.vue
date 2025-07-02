<script setup lang="ts">
import type { IMovie } from '../types/movie';
import MovieCard from './MovieCard.vue';

defineProps<{ modelValue: string, searchResults: IMovie[] | null }>();
const emit = defineEmits(['update:modelValue']);
</script>

<template>
    <form class="search-form" action="#">
        <div class="custom-input">
            <input class="custom-input__field" name="search" id="search" type="text" placeholder="Поиск"
                :value="modelValue" @input="emit('update:modelValue', ($event.target as HTMLInputElement).value)">
            <svg class="custom-input__search-icon" width="24" height="24" aria-hidden="true">
                <use xlink:href="@/assets/images/sprite.svg#icon-search"></use>
            </svg>
            <button class="custom-input__btn" type="button" aria-label="Кнопка удаления введенного в поле запроса"
                @click="emit('update:modelValue', '')">
                <svg class="custom-input__btn-icon" width="24" height="24" aria-hidden="true">
                    <use xlink:href="@/assets/images/sprite.svg#icon-close"></use>
                </svg>
            </button>
        </div>
        <ul class="search-form__results"
            :class="{ 'search-form__results--show': searchResults && searchResults.length }">
            <li class="search-form__result" v-for="movie in searchResults">
                <MovieCard :movie=movie :for-search="true" />
            </li>
        </ul>
    </form>
</template>
