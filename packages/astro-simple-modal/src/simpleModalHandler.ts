/**
 * Retrieves a modal element from the DOM by its ID.
 * @param modalId The ID of the modal element.
 * @returns The modal element if found, otherwise null.
 */
function getModalElement(modalId: string | number): Element | null {
  const modal = document.querySelector(`#simple-modal-${modalId}`)
  if (!modal) {
    console.error(`Modal with ID "${modalId}" not found.`)
    return null
  }
  return modal
}

/**
 * Toggles the visibility of an "Astro Simple Modal" with a fade transition.
 * @param modalId The ID of the modal to toggle.
 * @param action 'open' to show the modal, 'close' to hide it.
 * @returns A Promise that resolves when the transition ends.
 */
function toggleSimpleModal(modalId: string | number, action: 'open' | 'close') {
  if (!['open', 'close'].includes(action)) {
    console.error(`Unknown action: ${action}`)
    return Promise.resolve()
  }
  const modal = getModalElement(modalId)
  if (!modal) {
    return Promise.resolve()
  }

  return new Promise<void>(resolve => {
    function handleTransitionEnd (e: Event) {
      e.target.removeEventListener("transitionend", handleTransitionEnd )
      resolve()
    }

    modal.addEventListener("transitionend", handleTransitionEnd )
    modal.classList.add("fade")

    if (action === 'open') {
      modal.parentNode.removeChild(modal)
      document.body.appendChild(modal)
      modal.classList.remove('hide')
      modal.classList.add('show')
      requestAnimationFrame(() => {
        modal.classList.remove('fade')
      })
    }
    if (action === 'close') {
      modal.classList.add('fade', 'fade-out')
    }
  })
}

/**
 * Sets a callback function to be executed after the "Astro Simple Modal"
 * finishes its open or close transition.
 * @param modalId The ID of the modal to attach the listener to.
 * @param action 'open' for a callback after opening, 'close' for after closing.
 * @param callback The function to execute after the transition.
 */
function setEventListener(modalId: string, action: 'open' | 'close', callback: () => void) {
  const modal = getModalElement(modalId)
  if (!modal) return

  modal.addEventListener('transitionend', (event) => {
    const targetElement = event.target as HTMLDivElement
    const classList = Array.from(targetElement.classList)

    if (classList.includes('show') && action === 'open') {
      callback()
    }
    if (classList.includes('hide') && action === 'close') {
      callback()
    }
  })
}

const simpleModalHandler = {
  /**
   * Opens the "Astro Simple Modal" with the specified ID.
   * @param modalId The ID of the modal to open.
   * @returns A Promise that resolves when the opening transition finishes.
   */
  open: (modalId: string | number) => toggleSimpleModal(modalId, 'open'),

  /**
   * Closes the "Astro Simple Modal" with the specified ID.
   * @param modalId The ID of the modal to close.
   * @returns A Promise that resolves when the closing transition finishes and the modal is hidden.
   */
  close: (modalId: string) => toggleSimpleModal(modalId, 'close'),

  /**
   * Registers a callback function to be executed after the modal has finished opening.
   * @param modalId The ID of the modal to listen to.
   * @param callback The function to execute after the modal opens.
   */
  onOpen: (modalId: string, callback: () => void) => setEventListener(modalId, 'open', callback),

  /**
   * Registers a callback function to be executed after the modal has finished closing and is hidden.
   * @param modalId The ID of the modal to listen to.
   * @param callback The function to execute after the modal closes.
   */
  onClose: (modalId: string, callback: () => void) => setEventListener(modalId, 'close', callback)
}

export default simpleModalHandler