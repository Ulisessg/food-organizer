/**
 * Set the DOM focus in HTML element
 */
const setFocusInElement = (elementId: string): void => {
  (document.getElementById(elementId) as HTMLElement).focus()
}

export default setFocusInElement
