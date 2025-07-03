<script setup lang="ts">
import { computed } from 'vue';
import { GENRE_MAP } from '@/constants/genres';
import type { GenreKey } from '@/constants/genres';
import { RouterLink } from 'vue-router';

const props = defineProps<{ genre: GenreKey }>();

const translatedGenre = computed(() => {
    if (props.genre) {
        const lowerTranslatedGenre = GENRE_MAP[props.genre as GenreKey]?.translation || props.genre;
        const upperFirstChar = lowerTranslatedGenre.charAt(0).toUpperCase();
        const restOfString = lowerTranslatedGenre.slice(1);
        return upperFirstChar + restOfString;
    }
    return '';
});

const imgUrl = computed(() =>
    props.genre ? (GENRE_MAP[props.genre as GenreKey]?.posterUrlDesktop || '') : ''
);

const altText = computed(() =>
    props.genre ? `Картинка для жанра ${translatedGenre}` : 'Картинка для жанра'
);

</script>

<template>
    <RouterLink class="genre-card" :to="`/moviesByGenre/${genre}`">
        <img class="genre-card__img" :src="imgUrl" :alt="altText" />
        <h2 class="genre-card__title">{{ translatedGenre }}</h2>
    </RouterLink>
</template>