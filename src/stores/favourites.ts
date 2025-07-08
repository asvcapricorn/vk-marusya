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
      throw err
    }
  }

  const addToFavs = async (id: number) => {
    try {
      await api.post('/favorites', { id: String(id) })
      await fetchFavMovies()
    } catch (err) {
      throw new Error('add to favourites response was not ok')
    }
  }

  const deleteFromFavs = async (id: number) => {
    try {
      await api.delete(`/favorites/${id}`)
      await fetchFavMovies()
    } catch (err) {
      throw new Error('delete from favourites response was not ok')
    }
  }

  const isFavorite = (id: number) => {
    return favIds.value.includes(id)
  }

  const toggleFavorite = async (id: number) => {
    try {
      if (isFavorite(id)) {
        await deleteFromFavs(id)
      } else {
        await addToFavs(id)
      }
    } catch (err) {
      console.error('Failed to toggle favorite:', err)
      throw err
    }
  }

  return {
    favMovies,
    fetchFavMovies,
    deleteFromFavs,
    isFavorite,
    toggleFavorite,
  }
})
