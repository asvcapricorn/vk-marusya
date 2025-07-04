import { ref } from 'vue'
import JustValidate from 'just-validate'
import type { Fields } from 'just-validate'
import api from '@/services/api'
import { useUserStore } from '@/stores/user'
import { storeToRefs } from 'pinia'

export function useAuthForm(closeModal: () => void) {
  const store = useUserStore()
  const { isAuthorized } = storeToRefs(store)

  const email = ref('')
  const password = ref('')
  const validator = ref<JustValidate | null>(null)

  const handleSubmit = async () => {
    try {
      await api.post('/auth/login', {
        email: email.value,
        password: password.value,
      })
      closeModal()
      isAuthorized.value = true

      try {
        const resp = await api.get('/profile', {
          withCredentials: true,
        })
        const data = await resp.data
      } catch (err) {
        console.error('Profile error:', err)
        throw new Error('Profile failed')
      }
    } catch (err) {
      console.error('Login error:', err)
      throw new Error('Login failed')
    }
  }

  const initValidator = (formSelector: string) => {
    validator.value = new JustValidate(formSelector, {
      validateBeforeSubmitting: true,
    })

    validator.value
      .addField('#email', [{ rule: 'required' }, { rule: 'email' }], {
        errorsContainer: '#email + .custom-input__error',
      })
      .addField('#password', [{ rule: 'required' }], {
        errorsContainer: '#password + .custom-input__error',
      })
      .onValidate((fields: Fields) => {
        for (const key in fields.fields) {
          const field = fields.fields[key]
          field.elem
            .closest('.custom-input')
            ?.classList.toggle('custom-input--error', !field.isValid)
        }
      })
      .onSuccess(handleSubmit)
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
