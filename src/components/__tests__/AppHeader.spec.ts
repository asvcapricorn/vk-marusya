import { describe, it, expect, beforeEach } from 'vitest'
import { shallowMount, RouterLinkStub } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'
import AppHeader from '../AppHeader.vue'
import { useUserStore } from '../../stores/user'

describe('AppHeader.vue', () => {
  let wrapper: ReturnType<typeof shallowMount>
  beforeEach(() => {
    localStorage.clear()
    wrapper = shallowMount(AppHeader, {
      global: {
        stubs: {
          RouterLink: RouterLinkStub,
        },
        plugins: [createTestingPinia()],
      },
    })
  })

  it('renders correctly', async () => {
    expect(wrapper.find('.header__logo').exists()).toBe(true)
    expect(wrapper.find('.header__link-main').exists()).toBe(true)
    expect(wrapper.find('.header__link-icon').exists()).toBe(true)
  })

  it('shows login button when user is not authenticated', () => {
    expect(wrapper.find('.header__link--profile').text()).toBe('Войти')
  })

  it('shows user name when authenticated', async () => {
    const userStore = useUserStore()
    userStore.userName = 'Test User'
    await wrapper.vm.$nextTick()

    expect(wrapper.find('.header__link--profile').text()).toBe('Test User')
  })

  it('opens search when button clicked', async () => {
    await wrapper.find('.header__btn').trigger('click')
    expect(wrapper.find('.header').element.classList.contains('header--search-open')).toBe(true)
  })

  it('closes search when closeSearch called', async () => {
    wrapper.vm.closeSearch()
    expect(wrapper.find('.header').element.classList.contains('header--search-open')).toBe(false)
  })
})

describe('AppHeader.vue', () => {
  let wrapper: ReturnType<typeof shallowMount>

  it('displays user name from localStorage', async () => {
    localStorage.setItem('user', JSON.stringify({ name: 'Local User' }))

    wrapper = shallowMount(AppHeader, {
      global: {
        stubs: {
          RouterLink: RouterLinkStub,
        },
        plugins: [createTestingPinia()],
      },
    })
    await wrapper.vm.$nextTick()

    expect(wrapper.find('.header__link--profile').text()).toBe('Local User')
  })
})
