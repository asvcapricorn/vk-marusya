// import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { IMovie } from '../types/movie'
import api from '@/services/api'

export const useApiStore = defineStore('api', () => {
  const getRandomMovie = async (): Promise<IMovie> => {
    try {
      const resp = await api.get('/movie/random')
      const film: IMovie = await resp.data
      return film
    } catch (err) {
      throw new Error('random movie response was not ok')
    }
  }

  return { getRandomMovie }
})
