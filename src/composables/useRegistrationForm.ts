import { ref } from 'vue'
import JustValidate from 'just-validate'
import api from '@/services/api'
import { useUserStore } from '@/stores/user'
import { storeToRefs } from 'pinia'

export function useRegistrationForm(closeModal: () => void) {
  const store = useUserStore()
  const { isAuthorized, userEmail, userName, userSurname } = storeToRefs(store)

  const email = ref('')
  const name = ref('')
  const surname = ref('')
  const password = ref('')
  const confirmPassword = ref('')
  const validator = ref<typeof JustValidate | null>(null)

  const handleSubmit = async () => {
    try {
      await api.post('/auth/login', {
        email: email.value,
        password: password.value,
      })
      closeModal()
      isAuthorized.value = true

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
      .onValidate(
        ({ fields }: { fields: Record<string, { elem: HTMLElement; isValid: boolean }> }) => {
          for (const key in fields) {
            const field = fields[key]
            field.elem
              .closest('.custom-input')
              ?.classList.toggle('custom-input--error', !field.isValid)
          }
        },
      )
      .onSuccess(handleSubmit)
  }

  const destroyValidator = () => {
    validator.value?.destroy()
  }

  return {
    email,
    name,
    surname,
    password,
    confirmPassword,
    initValidator,
    destroyValidator,
  }
}
