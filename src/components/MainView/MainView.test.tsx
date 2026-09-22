import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import MainView from './MainView'

const getScrollContainer = () => screen.getByRole('main')

const scrollTo = (scrollContainer: HTMLElement, top: number) => {
    scrollContainer.scrollTop = top
    fireEvent.scroll(scrollContainer)
}

describe('MainView', () => {
    it('accumulates small scroll deltas before hiding the header', () => {
        render(<MainView />)
        const scrollContainer = getScrollContainer()
        const header = screen.getByRole('banner')

        for (const top of [1, 2, 3, 4, 5]) {
            scrollTo(scrollContainer, top)
        }

        expect(header.className).not.toContain('header--hidden')

        scrollTo(scrollContainer, 6)

        expect(header.className).toContain('header--hidden')
    })

    it('requires cumulative movement after a direction change and reveals at the top boundary', () => {
        render(<MainView />)
        const scrollContainer = getScrollContainer()
        const header = screen.getByRole('banner')

        scrollTo(scrollContainer, 20)
        expect(header.className).toContain('header--hidden')

        scrollTo(scrollContainer, 19)
        scrollTo(scrollContainer, 14)
        expect(header.className).toContain('header--hidden')

        scrollTo(scrollContainer, 13)
        expect(header.className).not.toContain('header--hidden')

        scrollTo(scrollContainer, 0)
        expect(header.className).not.toContain('header--hidden')
    })

    it('shows the localized back to top control after crossing the threshold', () => {
        render(<MainView />)
        const scrollContainer = getScrollContainer()

        scrollTo(scrollContainer, 480)
        expect(screen.queryByRole('button', { name: 'Back to top' })).toBeNull()

        scrollTo(scrollContainer, 481)
        expect(screen.getByRole('button', { name: 'Back to top' })).toBeTruthy()

        const scrollToSpy = vi.fn()
        scrollContainer.scrollTo = scrollToSpy
        fireEvent.click(screen.getByRole('button', { name: 'Back to top' }))

        expect(scrollToSpy).toHaveBeenCalledWith({ top: 0, behavior: 'smooth' })
    })

    it('supports mobile menu navigation and closes the menu after an anchor click', () => {
        render(<MainView />)
        const menu = screen.getByRole('button', { name: 'Menu' })

        expect(menu.getAttribute('aria-expanded')).toBe('false')
        fireEvent.click(menu)
        expect(menu.getAttribute('aria-expanded')).toBe('true')

        const aboutLink = screen.getByRole('link', { name: 'About' })
        expect(aboutLink.getAttribute('href')).toBe('#about')
        fireEvent.click(aboutLink)

        expect(menu.getAttribute('aria-expanded')).toBe('false')
    })

    it('switches language and updates document metadata and navigation labels', () => {
        render(<MainView />)

        fireEvent.click(screen.getByRole('button', { name: 'EN' }))

        expect(document.documentElement.lang).toBe('es')
        expect(document.title).toBe('Pablo Bessone - Web Portfolio')
        expect(screen.getByRole('link', { name: 'Sobre mí' })).toBeTruthy()
        expect(screen.getByRole('button', { name: 'ES' })).toBeTruthy()
    })

    it('keeps external links pointed at their declared destinations', () => {
        render(<MainView />)

        const links = screen.getAllByRole('link')
        const externalLinks = links.filter(link => link.getAttribute('target') === '_blank')

        expect(externalLinks.length).toBeGreaterThan(0)
        for (const link of externalLinks) {
            expect(link.getAttribute('href')).toMatch(/^https:\/\//)
            expect(link.getAttribute('rel')).toContain('noopener')
            expect(link.getAttribute('rel')).toContain('noreferrer')
        }
    })
})
