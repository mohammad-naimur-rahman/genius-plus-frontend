interface I18nConfig {
  defaultLocale: 'en'
  locales: ('en' | 'bn')[]
}

export const i18n: I18nConfig = {
  defaultLocale: 'en',
  locales: ['en', 'bn']
}
