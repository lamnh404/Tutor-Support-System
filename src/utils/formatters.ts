

export const interceptorLoadingElements = (calling: boolean): void => {
  const elements: NodeListOf<HTMLElement> = document.querySelectorAll('.interceptor-loading')

  for (let i = 0; i < elements.length; i++) {
    const el = elements[i]
    if (calling) {
      el.style.opacity = '0.5'
      el.style.pointerEvents = 'none'
    } else {
      el.style.opacity = 'initial'
      el.style.pointerEvents = 'initial'
    }
  }
}
