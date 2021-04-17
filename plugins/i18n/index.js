import en from './en'
import ru from './ru'

export default {
  locales: ['en', 'ru'],
  defaultLocale: 'en',
  strategy: 'no_prefix',
  vueI18n: {
    fallbackLocale: 'en',
    messages: { en, ru }
  }
}
