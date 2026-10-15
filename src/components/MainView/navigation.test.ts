import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { initializeNavigation } from './navigation'

let container: HTMLElement
let header: HTMLElement
let menu: HTMLButtonElement

const scrollTo = (top: number) => {
  container.scrollTop = top
  container.dispatchEvent(new Event('scroll'))
}

beforeEach(() => {
  document.body.innerHTML = `
    <main data-portfolio>
      <header data-header data-hidden-class="header--hidden">
        <nav data-navigation data-open-class="navigation--open"><a href="#about">About</a></nav>
        <button data-menu-toggle aria-expanded="false">Menu</button>
        <a data-language-link href="/web-portfolio/es/">EN</a>
      </header>
      <section id="about"></section>
      <a href="#top" data-to-top hidden>Back to top</a>
    </main>`
  container = document.querySelector('main')!
  header = document.querySelector('header')!
  menu = document.querySelector('button')!
  container.scrollTo = vi.fn()
  vi.stubGlobal('matchMedia', vi.fn().mockReturnValue({ matches: false }))
  initializeNavigation(container)
})

afterEach(() => {
  vi.unstubAllGlobals()
  history.replaceState(null, '', '/')
  document.body.innerHTML = ''
})

describe('portfolio navigation', () => {
  it('accumulates small scroll deltas before hiding the header', () => {
    for (const top of [1, 2, 3, 4, 5]) scrollTo(top)
    expect(header.classList.contains('header--hidden')).toBe(false)
    scrollTo(6)
    expect(header.classList.contains('header--hidden')).toBe(true)
  })

  it('requires cumulative movement after changing direction and reveals at the top', () => {
    scrollTo(20)
    expect(header.classList.contains('header--hidden')).toBe(true)
    scrollTo(19)
    scrollTo(14)
    expect(header.classList.contains('header--hidden')).toBe(true)
    scrollTo(13)
    expect(header.classList.contains('header--hidden')).toBe(false)
    scrollTo(30)
    scrollTo(0)
    expect(header.classList.contains('header--hidden')).toBe(false)
  })

  it('shows back to top after crossing the threshold and scrolls to the start', () => {
    const link = document.querySelector<HTMLAnchorElement>('[data-to-top]')!
    scrollTo(480)
    expect(link.hidden).toBe(true)
    scrollTo(481)
    expect(link.hidden).toBe(false)
    link.click()
    expect(container.scrollTo).toHaveBeenCalledWith({ top: 0, behavior: 'smooth' })
  })

  it('respects reduced motion when returning to the start', () => {
    vi.mocked(window.matchMedia).mockReturnValue({ matches: true } as MediaQueryList)
    document.querySelector<HTMLAnchorElement>('[data-to-top]')!.click()
    expect(container.scrollTo).toHaveBeenCalledWith({ top: 0, behavior: 'instant' })
  })

  it('opens the mobile menu and closes it after following an anchor', () => {
    menu.click()
    expect(menu.getAttribute('aria-expanded')).toBe('true')
    expect(document.querySelector('nav')!.classList.contains('navigation--open')).toBe(true)
    document.querySelector<HTMLAnchorElement>('nav a')!.click()
    expect(menu.getAttribute('aria-expanded')).toBe('false')
    expect(document.querySelector('nav')!.classList.contains('navigation--open')).toBe(false)
  })

  it('closes the menu with Escape and returns focus to its toggle', () => {
    menu.click()
    header.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }))
    expect(menu.getAttribute('aria-expanded')).toBe('false')
    expect(document.activeElement).toBe(menu)
  })

  it('preserves the current section in the language destination', () => {
    history.replaceState(null, '', '/web-portfolio/en/#work')
    const language = document.querySelector<HTMLAnchorElement>('[data-language-link]')!
    language.addEventListener('click', event => event.preventDefault())
    language.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true }))
    expect(language.pathname).toBe('/web-portfolio/es/')
    expect(language.hash).toBe('#work')
  })
})
