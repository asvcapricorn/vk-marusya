<script setup lang="ts">
import { watch, onUnmounted, nextTick } from 'vue';
import { useModal } from '@/composables/useModal';
import { useAuthForm } from '@/composables/useAuthForm';
import { useModalStore } from '@/stores/modal'

const props = defineProps<{
    modelValue: boolean;
}>();

const emit = defineEmits<{
    (e: 'update:modelValue', value: boolean): void;
}>();

const modalStore = useModalStore();

const { isOpen, close } = useModal(props, emit);
const { email, password, initValidator, destroyValidator } = useAuthForm(close);

watch(isOpen, async (val) => {
    if (val) {
        await nextTick();
        initValidator('#app .auth-form');
    }
});

onUnmounted(() => {
    destroyValidator();
});

const openRegistration = () => {
    close();
    modalStore.openRegistrationModal();
};

</script>

<template>
    <div class="modal-overlay" v-if="isOpen" @click.self="close()" @keyup.esc="close()">
        <div class="modal">
            <picture class="modal__logo">
                <source media="(max-width: 767px)"
                    srcset="@/assets/images/logo-light-mobile.png 1x, @/assets/images/logo-light-mobile@2x.png 2x">
                <img class="modal__image" src="@/assets/images/logo-light.png"
                    srcset="@/assets/images/logo-light@2x.png 2x" height="35" width="157" alt="Логотип" loading="lazy">
            </picture>
            <form class="form auth-form">
                <fieldset class="form__group">
                    <span class="form__error">Incorrect email or password!</span>
                    <div class="custom-input custom-input--light">
                        <input class="custom-input__field" name="email" id="email" type="email"
                            placeholder="Электронная почта" v-model="email">
                        <span class="custom-input__error"></span>
                        <svg class="custom-input__icon" width="24" height="24" aria-hidden="true">
                            <use xlink:href="@/assets/images/sprite.svg#icon-mail"></use>
                        </svg>
                    </div>
                    <div class="custom-input custom-input--light">
                        <input class="custom-input__field" name="password" id="password" type="password"
                            placeholder="Пароль" v-model="password">
                        <span class="custom-input__error"></span>
                        <svg class="custom-input__icon" width="24" height="24" aria-hidden="true">
                            <use xlink:href="@/assets/images/sprite.svg#icon-key"></use>
                        </svg>
                    </div>
                </fieldset>
                <div class="form__wrapper">
                    <button class="form__btn btn btn--primary" type="submit">Войти</button>
                    <button class="form__btn btn btn--tertiary" type="button"
                        @click="openRegistration">Регистрация</button>
                </div>
            </form>
            <button class="modal__btn btn btn--icon" type="button" @click="close()">
                <svg class="modal__btn-icon" width="24" height="24" aria-hidden="true">
                    <use xlink:href="@/assets/images/sprite.svg#icon-close"></use>
                </svg>
            </button>
        </div>
    </div>
</template>
