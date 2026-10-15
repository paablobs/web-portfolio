export function initializeNavigation(container: HTMLElement) {
  const header = container.querySelector<HTMLElement>('[data-header]')
  const navigation = container.querySelector<HTMLElement>('[data-navigation]')
  const menu = container.querySelector<HTMLButtonElement>('[data-menu-toggle]')
  const toTop = container.querySelector<HTMLAnchorElement>('[data-to-top]')
  let lastSignificantTop = 0
  let lastDirection: 'up' | 'down' | null = null

  const setMenuOpen = (open: boolean) => {
    menu?.setAttribute('aria-expanded', String(open))
    if (navigation?.dataset.openClass) navigation.classList.toggle(navigation.dataset.openClass, open)
  }
  menu?.addEventListener('click', () => setMenuOpen(menu.getAttribute('aria-expanded') !== 'true'))
  navigation?.addEventListener('click', event => {
    if ((event.target as Element).closest('a')) setMenuOpen(false)
  })
  header?.addEventListener('keydown', event => {
    if (event.key === 'Escape' && menu?.getAttribute('aria-expanded') === 'true') {
      setMenuOpen(false)
      menu.focus()
    }
  })

  container.addEventListener('scroll', () => {
    const top = Math.max(0, container.scrollTop)
    const delta = top - lastSignificantTop
    if (toTop) toTop.hidden = top <= 480
    const setHidden = (hidden: boolean) => {
      if (header?.dataset.hiddenClass) header.classList.toggle(header.dataset.hiddenClass, hidden)
    }
    if (top <= 0) {
      setHidden(false)
      lastSignificantTop = 0
      lastDirection = null
      return
    }
    if (delta === 0) return
    const direction = delta < 0 ? 'up' : 'down'
    if (lastDirection !== null && direction !== lastDirection) {
      lastSignificantTop = top
      lastDirection = direction
      if (Math.abs(delta) >= 6) setHidden(direction === 'down')
      return
    }
    if (Math.abs(delta) < 6) return
    setHidden(direction === 'down')
    lastSignificantTop = top
    lastDirection = direction
  }, { passive: true })

  toTop?.addEventListener('click', event => {
    event.preventDefault()
    container.scrollTo({ top: 0, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' })
  })
  const languageLink = container.querySelector<HTMLAnchorElement>('[data-language-link]')
  languageLink?.addEventListener('click', () => {
    if (location.hash) languageLink.hash = location.hash
  })
}
