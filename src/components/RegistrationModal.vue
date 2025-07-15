<script setup lang="ts">
import { watch, onUnmounted, nextTick } from 'vue';
import { useModal } from '@/composables/useModal';
import { useRegistrationForm } from '@/composables/useRegistrationForm';
import { useModalStore } from '@/stores/modal'

const props = defineProps<{
    modelValue: boolean;
}>();

const emit = defineEmits<{
    (e: 'update:modelValue', value: boolean): void;
}>();

const { isOpen, close } = useModal(props, emit);
const { email, name, surname, password, confirmPassword, initValidator, destroyValidator } = useRegistrationForm(close);

watch(isOpen, async (val) => {
    if (val) {
        await nextTick();
        initValidator('#app .registration-form');
    }
});

onUnmounted(() => {
    destroyValidator();
});

const modalStore = useModalStore();

const openAuth = () => {
    close();
    modalStore.openAuthModal();
};

</script>

<template>
    <div class="modal-overlay" v-if="isOpen" @click.self="close()" @keyup.esc="close()">
        <div class="modal">
            <picture class="modal__logo">
                <img class="modal__image" src="@/assets/images/logo-light.png"
                    srcset="@/assets/images/logo-light@2x.png 2x" height="35" width="157" alt="Логотип">
            </picture>
            <form class="form registration-form">
                <fieldset class="form__group">
                    <span class="form__error">Registration error. Such user already exists.</span>
                    <legend class="form__group-name">Регистрация</legend>
                    <div class="custom-input custom-input--light">
                        <input class="custom-input__field" name="email" id="email" type="email"
                            placeholder="Электронная почта" v-model="email">
                        <span class="custom-input__error"></span>
                        <svg class="custom-input__icon" width="24" height="24" aria-hidden="true">
                            <use xlink:href="@/assets/images/sprite.svg#icon-mail"></use>
                        </svg>
                    </div>
                    <div class="custom-input custom-input--light">
                        <input class="custom-input__field" name="name" id="name" type="name" placeholder="Имя"
                            v-model="name">
                        <span class="custom-input__error"></span>
                        <svg class="custom-input__icon" width="24" height="24" aria-hidden="true">
                            <use xlink:href="@/assets/images/sprite.svg#icon-user"></use>
                        </svg>
                    </div>
                    <div class="custom-input custom-input--light">
                        <input class="custom-input__field" name="surname" id="surname" type="surname"
                            placeholder="Фамилия" v-model="surname">
                        <span class="custom-input__error"></span>
                        <svg class="custom-input__icon" width="24" height="24" aria-hidden="true">
                            <use xlink:href="@/assets/images/sprite.svg#icon-user"></use>
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
                    <div class="custom-input custom-input--light">
                        <input class="custom-input__field" name="confirmPassword" id="confirmPassword" type="password"
                            placeholder="Подтвердите пароль" v-model="confirmPassword">
                        <span class="custom-input__error"></span>
                        <svg class="custom-input__icon" width="24" height="24" aria-hidden="true">
                            <use xlink:href="@/assets/images/sprite.svg#icon-key"></use>
                        </svg>
                    </div>
                </fieldset>
                <div class="form__wrapper">
                    <button class="form__btn btn btn--primary" type="submit">Создать аккаунт</button>
                    <button class="form__btn btn btn--tertiary" type="button" @click="openAuth">У меня
                        есть пароль</button>
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
