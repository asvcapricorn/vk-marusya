<script setup lang="ts">
import { ref, watch, onUnmounted, nextTick } from 'vue';
import { useModal } from '@/composables/useModal';
import { useAuthForm } from '@/composables/useAuthForm';

const props = defineProps<{
    modelValue: boolean;
}>();

const emit = defineEmits<{
    (e: 'update:modelValue', value: boolean): void;
}>();

const { isOpen, close } = useModal(props, emit);
const { email, password, initValidator, destroyValidator } = useAuthForm(close);

const emailEl = ref();
const passwordEl = ref();

watch(isOpen, async (val) => {
    if (val) {
        await nextTick();
        initValidator('#app .auth-form');
    }
});

onUnmounted(() => {
    destroyValidator();
});
</script>

<template>
    <Teleport to="#app">
        <div class="auth-modal-overlay" v-if="isOpen" @click.self="close()">
            <div class="auth-modal">
                <picture class="auth-modal__logo">
                    <img class="auth-modal__image" src="@/assets/images/logo-light.png"
                        srcset="@/assets/images/logo-light@2x.png 2x" height="35" width="157" alt="Логотип">
                </picture>
                <form class="auth-form">
                    <fieldset class="auth-form__group">
                        <div class="custom-input custom-input--light" :ref="emailEl">
                            <input class="custom-input__field" name="email" id="email" type="email"
                                placeholder="Электронная почта" v-model="email">
                            <span class="custom-input__error"></span>
                            <svg class="custom-input__icon" width="24" height="24" aria-hidden="true">
                                <use xlink:href="@/assets/images/sprite.svg#icon-mail"></use>
                            </svg>
                        </div>
                        <div class="custom-input custom-input--light">
                            <input class="custom-input__field" name="password" id="password" type="text"
                                placeholder="Пароль" v-model="password">
                            <span class="custom-input__error"></span>
                            <svg class="custom-input__icon" width="24" height="24" aria-hidden="true">
                                <use xlink:href="@/assets/images/sprite.svg#icon-key"></use>
                            </svg>
                        </div>
                    </fieldset>
                    <div class="auth-form__wrapper">
                        <button class="auth-form__btn btn btn--primary" type="submit">Войти</button>
                        <button class="auth-form__btn btn btn--tertiary" type="button">Регистрация</button>
                    </div>
                </form>
                <button class="auth-modal__btn btn btn--icon" type="button" @click="close()">
                    <svg class="auth-modal__btn-icon" width="24" height="24" aria-hidden="true">
                        <use xlink:href="@/assets/images/sprite.svg#icon-close"></use>
                    </svg>
                </button>
            </div>
        </div>
    </Teleport>
</template>
