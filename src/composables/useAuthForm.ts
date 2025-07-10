import { ref } from 'vue'
import JustValidate from 'just-validate'
import api from '@/services/api'
import { useUserStore } from '@/stores/user'
import { storeToRefs } from 'pinia'
import type { IFields } from '@/types/validationFields'

export function useAuthForm(closeModal: () => void) {
  const userStore = useUserStore()
  const { isAuthorized, userEmail, userName, userSurname } = storeToRefs(userStore)

  const email = ref('')
  const password = ref('')

  const validator = ref<typeof JustValidate | null>(null)

  const handleSubmit = async () => {
    const formEl = document.querySelector('.form')
    try {
      await api.post('/auth/login', {
        email: email.value,
        password: password.value,
      })
      closeModal()
      isAuthorized.value = true
      formEl?.classList.remove('form--error')

      try {
        const resp = await api.get('/profile')
        const data = await resp.data
        userEmail.value = data.email
        userName.value = data.name
        userSurname.value = data.surname

        localStorage.setItem('user', JSON.stringify(data))
      } catch (err) {
        console.error('Profile error:', err)
        throw new Error('Profile failed')
      }
    } catch (err) {
      formEl?.classList.add('form--error')
      console.error('Login error:', err)
      throw new Error('Login failed')
    }
  }

  const clearErrorClasses = () => {
    document.querySelectorAll('.custom-input--error').forEach((el) => {
      el.classList.remove('custom-input--error')
    })
  }

  const initValidator = (formSelector: string) => {
    validator.value = new JustValidate(formSelector)

    validator.value
      .addField('#email', [{ rule: 'required' }], {
        errorsContainer: '#email + .custom-input__error',
      })
      .addField('#password', [{ rule: 'required' }], {
        errorsContainer: '#password + .custom-input__error',
      })
      .onValidate(() => {
        clearErrorClasses()
      })
      .onSuccess(() => {
        clearErrorClasses()
        handleSubmit()
      })
      .onFail((fields: IFields) => {
        for (const key in fields) {
          const field = fields[key]
          field.elem
            .closest('.custom-input')
            ?.classList.toggle('custom-input--error', !field.isValid)
        }
      })
  }

  const destroyValidator = () => {
    validator.value?.destroy()
  }

  return {
    email,
    password,
    initValidator,
    destroyValidator,
  }
}
