/**
 * Return the current time in HH:MM format.
 */
export const clock = () => {
  const nodes = document.querySelectorAll('[data-selector="clock"]')

  setInterval(() => {
    const date = new Date()
    const HH = String(date.getHours()).padStart(2, '0')
    const MM = String(date.getMinutes()).padStart(2, '0')

    nodes.forEach((node) => {
      node.textContent = `${HH}:${MM}`
    })
  }, 1000)
}

/**
 * Return the time elapsed in the MM:SS format since the method was called.
 */
export const timer = () => {
  const nodes = document.querySelectorAll('[data-selector="timer"]')
  const startTime = Date.now()

  setInterval(() => {
    const elapsed = Math.floor((Date.now() - startTime) / 1000)
    const MM = String(Math.floor(elapsed / 60)).padStart(2, '0')
    const SS = String(elapsed % 60).padStart(2, '0')

    nodes.forEach((node) => {
      node.textContent = `${MM}:${SS}`
    })
  }, 1000)
}
