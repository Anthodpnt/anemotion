export default {
  header: {
    title: 'Find the Balance',
    subtitle: 'Understanding Motion with Google',
  },
  contents: [
    {
      title: 'Informative',
      text: 'The motion informs the users by highlighting the relationships between elements and actions.',
      videos: [
        [`${import.meta.env.VITE_CDN_URL}/videos/understanding-motion-1.mp4`],
        [`${import.meta.env.VITE_CDN_URL}/videos/understanding-motion-2.mp4`],
      ],
    },
    {
      title: 'Focused',
      text: 'The motion focuses the attention on what is important, without creating unecessary distractions.',
      videos: [[`${import.meta.env.VITE_CDN_URL}/videos/understanding-motion-3.mp4`]],
    },
    {
      title: 'Expressive',
      text: 'The motion celebrates moments in the user journeys and adds character to common interactions.',
      videos: [
        [`${import.meta.env.VITE_CDN_URL}/videos/understanding-motion-4.mp4`],
        [`${import.meta.env.VITE_CDN_URL}/videos/understanding-motion-5.mp4`],
      ],
    },
  ],
}
