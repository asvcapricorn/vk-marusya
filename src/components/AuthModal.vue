<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { storeToRefs } from 'pinia'
import api from '@/services/api';
import { useUserStore } from '@/stores/user';
import type { IMovie } from '../types/movie';
import SearchForm from './SearchForm.vue';

const props = defineProps<{
    modelValue: boolean; // v-model управляет открытием
}>();

const emit = defineEmits<{
    (e: 'update:modelValue', value: boolean): void;
}>();

const isOpen = computed({
    get: () => props.modelValue,
    set: (value) => emit('update:modelValue', value),
});

const email = ref('');
const password = ref('');

const close = () => {
    isOpen.value = false;
};

const handleSubmit = () => {
    console.log('Отправка формы', email.value, password.value);
    // Здесь авторизация через API
    close();
};

// Закрытие по Escape
const onKeydown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') close();
};

onMounted(() => window.addEventListener('keydown', onKeydown));
onUnmounted(() => window.removeEventListener('keydown', onKeydown));
</script>

<template>
    <Teleport to="#app">
        <div class="auth-modal">
            <picture class="auth-modal__logo">
                <img class="auth-modal__image" src="@/assets/images/logo-light.png"
                    srcset="@/assets/images/logo-light@2x.png 2x" height="35" width="157" alt="Логотип">
            </picture>
            <form class="auth-form" @submit.prevent="handleSubmit">
                <div class="custom-input">
                    <input class="custom-input__field" name="email" id="email" type="email"
                        placeholder="Электронная почта" v-model="email">
                    <svg class="custom-input__search-icon" width="24" height="24" aria-hidden="true">
                        <use xlink:href="@/assets/images/sprite.svg#icon-mail"></use>
                    </svg>
                </div>
                <div class="custom-input">
                    <input class="custom-input__field" name="password" id="password" type="text" placeholder="Пароль"
                        v-model="password">
                    <svg class="custom-input__search-icon" width="24" height="24" aria-hidden="true">
                        <use xlink:href="@/assets/images/sprite.svg#icon-key"></use>
                    </svg>
                </div>
            </form>
            <button class="auth-modal__btn btn btn--primary" type="submit">Войти</button>
            <button class="auth-modal__btn btn btn--tertiary" type="button">Регистрация</button>
            <button class="auth-modal__btn btn--icon" type="button">
                <svg class="auth-modal__btn-icon" width="24" height="24" aria-hidden="true">
                    <use xlink:href="@/assets/images/sprite.svg#icon-close"></use>
                </svg>
            </button>
        </div>
    </Teleport>
</template>
