import historyDesktop from '@/assets/images/genres/history-desktop.jpg'
import horrorDesktop from '@/assets/images/genres/horror-desktop.jpg'
import scifiDesktop from '@/assets/images/genres/scifi-desktop.jpg'
import standUpDesktop from '@/assets/images/genres/stand-up-desktop.jpg'
import fantasyDesktop from '@/assets/images/genres/fantasy-desktop.jpg'
import dramaDesktop from '@/assets/images/genres/drama-desktop.jpg'
import mysteryDesktop from '@/assets/images/genres/mystery-desktop.jpg'
import familyDesktop from '@/assets/images/genres/family-desktop.jpg'
import comedyDesktop from '@/assets/images/genres/comedy-desktop.jpg'
import romanceDesktop from '@/assets/images/genres/romance-desktop.jpg'
import musicDesktop from '@/assets/images/genres/music-desktop.jpg'
import crimeDesktop from '@/assets/images/genres/crime-desktop.jpg'
import tvMovieDesktop from '@/assets/images/genres/tv-movie-desktop.jpg'
import documentaryDesktop from '@/assets/images/genres/documentary-desktop.jpg'
import actionDesktop from '@/assets/images/genres/action-desktop.jpg'
import thrillerDesktop from '@/assets/images/genres/thriller-desktop.jpg'
import westernDesktop from '@/assets/images/genres/western-desktop.jpg'
import animationDesktop from '@/assets/images/genres/animation-desktop.jpg'
import warDesktop from '@/assets/images/genres/war-desktop.jpg'
import adventureDesktop from '@/assets/images/genres/adventure-desktop.jpg'

export const GENRE_MAP = {
  history: {
    translation: 'исторический',
    posterUrlDesktop: historyDesktop,
  },
  horror: {
    translation: 'ужасы',
    posterUrlDesktop: horrorDesktop,
  },
  scifi: {
    translation: 'фантастика',
    posterUrlDesktop: scifiDesktop,
  },
  'stand-up': {
    translation: 'стендап',
    posterUrlDesktop: standUpDesktop,
  },
  fantasy: {
    translation: 'фэнтези',
    posterUrlDesktop: fantasyDesktop,
  },
  drama: {
    translation: 'драма',
    posterUrlDesktop: dramaDesktop,
  },
  mystery: {
    translation: 'детектив',
    posterUrlDesktop: mysteryDesktop,
  },
  family: {
    translation: 'семейный',
    posterUrlDesktop: familyDesktop,
  },
  comedy: {
    translation: 'комедия',
    posterUrlDesktop: comedyDesktop,
  },
  romance: {
    translation: 'мелодрама',
    posterUrlDesktop: romanceDesktop,
  },
  music: {
    translation: 'музыкальный',
    posterUrlDesktop: musicDesktop,
  },
  crime: {
    translation: 'криминал',
    posterUrlDesktop: crimeDesktop,
  },
  'tv-movie': {
    translation: 'телефильм',
    posterUrlDesktop: tvMovieDesktop,
  },
  documentary: {
    translation: 'документальный',
    posterUrlDesktop: documentaryDesktop,
  },
  action: {
    translation: 'боевик',
    posterUrlDesktop: actionDesktop,
  },
  thriller: {
    translation: 'триллер',
    posterUrlDesktop: thrillerDesktop,
  },
  western: {
    translation: 'вестерн',
    posterUrlDesktop: westernDesktop,
  },
  animation: {
    translation: 'мультфильм',
    posterUrlDesktop: animationDesktop,
  },
  war: {
    translation: 'военный',
    posterUrlDesktop: warDesktop,
  },
  adventure: {
    translation: 'приключения',
    posterUrlDesktop: adventureDesktop,
  },
}

export type GenreKey = keyof typeof GENRE_MAP
