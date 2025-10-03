export default {
  header: {
    title: 'Movies & Series',
    subtitle: 'How Other Mediums Create Emotion?',
  },
  acting: {
    title: 'The Acting',
    src: [`${import.meta.env.VITE_CDN_URL}/videos/modern-times.mp4`],
    alt: 'Picture of Charlie Chaplin as The Tramp from the movie "Modern Times"',
    cover: '/images/movies-series/modern-times.webp',
    caption: '"Modern Times" by Charlie Chaplin, 1936',
  },
  music: {
    title: 'The Music',
    srcA: [`${import.meta.env.VITE_CDN_URL}/videos/pride-and-prejudice-1.mp4`],
    srcB: [`${import.meta.env.VITE_CDN_URL}/videos/pride-and-prejudice-2.mp4`],
    altA: 'Picture of a man and a woman face to face from the movie "Pride & Prejudice"',
    altB: 'Picture of a man walking in a field from the movie "Pride & Prejudice"',
    coverA: '/images/movies-series/pride-and-prejudice-original.webp',
    coverB: '/images/movies-series/pride-and-prejudice-horror.webp',
    captionA: '"Pride & Prejudice" by Joe Wright, 2005',
    captionB: '"Pride & Prejudice" by Joe Wright, 2005',
  },
  sound: {
    title: 'The Sounds',
    srcA: [
      `${import.meta.env.VITE_CDN_URL}/videos/titanic-laugh-track.webm`,
      `${import.meta.env.VITE_CDN_URL}/videos/titanic-laugh-track.mp4`,
    ],
    srcB: [`${import.meta.env.VITE_CDN_URL}/videos/ross-the-psychopath.mp4`],
    altA: 'Picture of the Titanic sinking from the movie "Titanic"',
    altB: 'Picture of Ross Geller from the series "Friends" pointing two fingers at his head',
    coverA: '/images/movies-series/titanic.webp',
    coverB: '/images/movies-series/friends-ross.webp',
    captionA: '"Titanic" by James Cameron, 1997',
    captionB: '"Friends" by TVBee on Youtube',
  },
}
