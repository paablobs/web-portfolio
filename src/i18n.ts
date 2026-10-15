import en from './locales/en.json'
import es from './locales/es.json'

export const locales = ['en', 'es'] as const
export type Locale = typeof locales[number]
export type Language = 'ENGLISH' | 'SPANISH'
export const languages: Record<Locale, Language> = { en: 'ENGLISH', es: 'SPANISH' }
const translations: Record<Language, Record<string, unknown>> = { ENGLISH: en, SPANISH: es }

export function translate(language: Language) {
  const getValue = (key: string): unknown => {
    let result: unknown = translations[language]
    for (const part of key.split('.')) {
      if (result == null || typeof result !== 'object') return undefined
      result = (result as Record<string, unknown>)[part]
    }
    return result
  }
  return {
    t: (key: string): string => {
      const value = getValue(key)
      return typeof value === 'string' ? value : key
    },
    ta: (key: string): string[] => {
      const value = getValue(key)
      return Array.isArray(value) ? value as string[] : []
    },
    language,
  }
}

export function localizedPath(base: string, locale: Locale, path = ''): string {
  return `${base.replace(/\/$/, '')}/${locale}/${path.replace(/^\/+|\/+$/g, '')}`.replace(/\/?$/, '/')
}
