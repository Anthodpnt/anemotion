export default {
  demo: {
    models: [
      {
        name: 'Releasor',
        level: '1',
        description:
          '<b>Releasor</b> is a simple release button that relies mostly on its <b>native browser appearance</b>. It only features a <b>custom size</b>, and nothing more.',
      },
      {
        name: 'Releasium',
        level: '10',
        description:
          '<b>Releasium</b> is a more advanced button design. It has a <b>custom shape</b> with <b>rounded corners</b> and <b>vibrant colors</b>. It also provides clear <b>hover</b> and <b>active states</b>, making it more engaging.',
      },
      {
        name: 'Releasaurus',
        level: '100',
        description:
          '<b>Releasaurus</b> is the most advanced button design, featuring <b>shiny border effects</b>, <b>animated text</b>, and <b>interactive particles</b> that make it even more engaging and memorable.',
      },
    ],
  },
  video: {
    src: [`${import.meta.env.VITE_CDN_URL}/videos/organic-cursor.mp4`],
    title: 'The Organic Cursor',
  },
}
