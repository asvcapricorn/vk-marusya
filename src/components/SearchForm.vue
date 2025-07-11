<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted } from 'vue';
import type { IMovie } from '../types/movie';
import MovieCard from './MovieCard.vue';

const props = defineProps<{ modelValue: string, searchResults: IMovie[] | null }>();
const emit = defineEmits(['update:modelValue']);

const isShow = ref(false);
const searchResultsRef = ref<HTMLElement | null>(null);

watch(
    () => props.searchResults,
    (newResults) => {
        isShow.value = !!newResults && newResults.length > 0;
    },
    { immediate: true }
);

const handleClickOutside = (event: MouseEvent) => {
    if (searchResultsRef.value && !searchResultsRef.value.contains(event.target as Node)) {
        isShow.value = false;
    }
};

const handleKeydown = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
        isShow.value = false;
    }
};

onMounted(() => {
    document.addEventListener('click', handleClickOutside);
    document.addEventListener('keydown', handleKeydown);
});

onUnmounted(() => {
    document.removeEventListener('click', handleClickOutside);
    document.removeEventListener('keydown', handleKeydown);
});

</script>

<template>
    <form class="search-form" action="#">
        <div class="custom-input">
            <input class="custom-input__field" name="search" id="search" type="text" placeholder="Поиск"
                :value="modelValue" @input="emit('update:modelValue', ($event.target as HTMLInputElement).value)">
            <svg class="custom-input__icon" width="24" height="24" aria-hidden="true">
                <use xlink:href="@/assets/images/sprite.svg#icon-search"></use>
            </svg>
            <button class="custom-input__btn" type="button" aria-label="Кнопка удаления введенного в поле запроса"
                @click="emit('update:modelValue', '')">
                <svg class="custom-input__btn-icon" width="24" height="24" aria-hidden="true">
                    <use xlink:href="@/assets/images/sprite.svg#icon-close"></use>
                </svg>
            </button>
        </div>
        <ul class="search-form__results" :class="{ 'search-form__results--show': isShow }" ref="searchResultsRef">
            <li class="search-form__result" v-for="movie in searchResults" :key="movie.id">
                <MovieCard class="movie-card--search" :movie=movie @click="isShow = false" />
            </li>
        </ul>
    </form>
</template>
