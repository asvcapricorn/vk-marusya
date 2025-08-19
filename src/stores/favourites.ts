import { ref } from 'vue'
import { defineStore } from 'pinia'
import api from '@/services/api'
import type { IMovie } from '../types/movie'
import { handleAxiosError } from '@/utils'

export const useFavStore = defineStore('fav', () => {
  const favIds = ref<number[]>([])
  const favMovies = ref<IMovie[]>([])

  const fetchFavMovies = async () => {
    try {
      const response = await api.get('/favorites')
      favMovies.value = response.data
      favIds.value = response.data.map((movie: IMovie) => movie.id)
      return favMovies.value
    } catch (err) {
      handleAxiosError(err)
      favMovies.value = []
      return favMovies.value
    }
  }

  const addToFavs = async (id: number) => {
    try {
      await api.post('/favorites', { id: String(id) })
      await fetchFavMovies()
      return true
    } catch (err) {
      handleAxiosError(err)
      return false
    }
  }

  const deleteFromFavs = async (id: number) => {
    try {
      await api.delete(`/favorites/${id}`)
      await fetchFavMovies()
      return true
    } catch (err) {
      handleAxiosError(err)
      return false
    }
  }

  const isFavorite = (id: number) => {
    return favIds.value.includes(id)
  }

  const toggleFavorite = async (id: number) => {
    return isFavorite(id) ? await deleteFromFavs(id) : await addToFavs(id)
  }

  return {
    favMovies,
    fetchFavMovies,
    deleteFromFavs,
    isFavorite,
    toggleFavorite,
  }
})
