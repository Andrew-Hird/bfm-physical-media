import vinyl from './assets/images/vinyl.png'
import cd from './assets/images/cd.png'

export const getMediaIcon = mediaType => {
  if (mediaType === 'Vinyl' || mediaType === '7\'') {
    return vinyl
  } else if (mediaType === 'CD' || mediaType === 'CDingle' || mediaType.toLowerCase() === 'single') {
    return cd
  }
}

export const correctChar = item => {
  return item.replace(/�/g, '\'')
}
