import gsap from 'gsap'

import navigation from '@data/navigation'

/**
 * Triggers a scroll to the top of the page.
 * @param locomotive - The LocomotiveScroll instance.
 * @param options - Optional set of options for the scroll.
 */
export const navigateToHome = (locomotive, options = {}) => {
  if (locomotive) {
    const entry = navigation[0]
    const position = entry.from * window.innerHeight
    locomotive.scrollTo(position, { lock: true, easing: gsap.parseEase('power2.inOut'), duration: 5, ...options })
  }
}

/**
 * Triggers a scroll to the bottom of the page.
 * @param locomotive - The LocomotiveScroll instance.
 * @param options - Optional set of options for the scroll.
 */
export const navigateToEnd = (locomotive, options = {}) => {
  if (locomotive) {
    const entry = navigation[navigation.length - 1]
    const position = entry.to * window.innerHeight
    locomotive.scrollTo(position, { lock: true, easing: gsap.parseEase('power2.inOut'), duration: 5, ...options })
  }
}

/**
 * Trigger a scroll to a specific position
 * @param locomotive - The LocomotiveScroll instance.
 * @param position - The position to scroll to.
 * @param options - Optional set of options for the scroll.
 */
export const navigateToPosition = (locomotive, position, options = {}) => {
  if (locomotive) {
    locomotive.scrollTo(position, { lock: true, easing: gsap.parseEase('power2.inOut'), duration: 1.5, ...options })
  }
}

/**
 * Initialize the keyboard navigation.
 */
const navigate = (locomotive) => {
  let current = -1
  let running = false

  // Manage the key down event
  const onKeyDown = (e) => {
    switch (e.key) {
      case 'Home': {
        e.preventDefault()

        if (running) {
          return
        }

        current = 0
        running = true

        navigateToHome(locomotive, { onComplete: () => (running = false) })
        break
      }

      case 'End': {
        e.preventDefault()

        if (running) {
          return
        }

        current = navigation.length - 1
        running = true

        navigateToEnd(locomotive, { onComplete: () => (running = false) })
        break
      }

      case 'PageUp':
      case 'ArrowUp': {
        e.preventDefault()

        if (running) {
          return
        }

        if (current >= 0) {
          const entry = navigation[current]
          const position = entry.from * window.innerHeight

          current -= 1
          running = true

          navigateToPosition(locomotive, position, {
            easing: gsap.parseEase(entry.ease),
            duration: entry.duration,
            onComplete: () => (running = false),
          })
        }
        break
      }

      case 'PageDown':
      case 'ArrowDown': {
        e.preventDefault()

        if (running) {
          return
        }

        if (current < navigation.length - 1) {
          current += 1
          running = true

          const entry = navigation[current]
          const position = entry.to * window.innerHeight

          navigateToPosition(locomotive, position, {
            easing: gsap.parseEase(entry.ease),
            duration: entry.duration,
            onComplete: () => (running = false),
          })
        }
        break
      }
    }
  }

  // Method to initialize the keyboard navigation
  window.addEventListener('keydown', onKeyDown)

  // Method to destroy the keyboard navigation
  const destroy = () => {
    current = -1
    running = false
    window.removeEventListener('keydown', onKeyDown)
  }

  return { destroy }
}

export default navigate
