<script setup lang="ts">
import { computed } from 'vue';
import { GENRE_MAP } from '@/constants/genres';
import type { GenreKey } from '@/constants/genres';

const props = defineProps<{ genre: string }>();

const translatedGenre = computed(() => {
    if (props.genre) {
        const lowerTranslatedGenre = GENRE_MAP[props.genre as GenreKey]?.translation || props.genre;
        const upperFirstChar = lowerTranslatedGenre.charAt(0).toUpperCase();
        const restOfString = lowerTranslatedGenre.slice(1);
        return upperFirstChar + restOfString;
    }
    return '';
}
);

const imgUrl = computed(() =>
    props.genre ? (GENRE_MAP[props.genre as GenreKey]?.posterUrlDesktop || '') : ''
);

const altText = computed(() =>
    props.genre ? `Картинка для жанра ${translatedGenre}` : 'Картинка для жанра'
);

</script>

<template>
    <div class="genre-card">
        <img class="genre-card__img" :src="imgUrl" :alt="altText" />
        <h2 class="genre-card__title">{{ translatedGenre }}</h2>
    </div>
</template>