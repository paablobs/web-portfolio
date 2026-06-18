import { useMemo } from 'react'
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
  const t = useMemo(() => (key: string): string => {
    const value = getValue(language, key)
    return typeof value === 'string' ? value : key
  }, [language])

  const ta = useMemo(() => (key: string): string[] => {
    const value = getValue(language, key)
    return Array.isArray(value) ? (value as string[]) : []
  }, [language])

  return useMemo(() => ({ t, ta, language }), [t, ta, language])
}
