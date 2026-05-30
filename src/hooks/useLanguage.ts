import en from '../locales/en.json'
import es from '../locales/es.json'

export type Language = 'ENGLISH' | 'SPANISH'

const translations: Record<Language, Record<string, unknown>> = {
  ENGLISH: en,
  SPANISH: es,
}

const getValue = (language: Language, key: string): unknown => {
  const keys = key.split('.')
  let result: unknown = translations[language]

  for (const k of keys) {
    if (result == null || typeof result !== 'object') return key
    result = (result as Record<string, unknown>)[k]
  }

  return result
}

export function useLanguage(language: Language = 'ENGLISH') {
  const t = (key: string): string => {
    const value = getValue(language, key)
    return typeof value === 'string' ? value : key
  }

  const ta = (key: string): string[] => {
    const value = getValue(language, key)
    return Array.isArray(value) ? (value as string[]) : []
  }

  return { t, ta, language }
}
