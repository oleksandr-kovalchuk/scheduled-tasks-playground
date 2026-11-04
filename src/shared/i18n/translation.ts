import type { en } from '@/shared/i18n/locales/en'

type TranslationShape<T> = { [K in keyof T]: T[K] extends string ? string : TranslationShape<T[K]> }

// English is the reference locale: every other locale must have exactly the same keys.
export type Translation = TranslationShape<typeof en>
