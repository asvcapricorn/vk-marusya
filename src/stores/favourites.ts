import { ref } from 'vue'
import { defineStore } from 'pinia'
import api from '@/services/api'
import type { IMovie } from '../types/movie'

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
      console.error('Failed to fetch favorites:', err)
    }
  }

  const addToFavs = async (id: number) => {
    try {
      await api.post('/favorites', { id: String(id) })
      await fetchFavMovies()
      return true
    } catch (err) {
      console.error('Failed to add to favorites:', err)
      return false
    }
  }

  const deleteFromFavs = async (id: number) => {
    try {
      await api.delete(`/favorites/${id}`)
      await fetchFavMovies()
      return true
    } catch (err) {
      console.error('Failed to delete from favorites:', err)
      return false
    }
  }

  const isFavorite = (id: number) => {
    return favIds.value.includes(id)
  }

  const toggleFavorite = async (id: number) => {
    let resp = false
    try {
      if (isFavorite(id)) {
        resp = await deleteFromFavs(id)
      } else {
        resp = await addToFavs(id)
      }
    } catch (err) {
      console.error('Failed to toggle favorite:', err)
    }
    return resp
  }

  return {
    favMovies,
    fetchFavMovies,
    deleteFromFavs,
    isFavorite,
    toggleFavorite,
  }
})
