import ru from './ru'
import en from './en'

export default {
  locales: ['ru', 'en'],
  defaultLocale: 'ru',
  strategy: 'no_prefix',
  vueI18n: {
    fallbackLocale: 'en',
    messages: { ru, en }
  }
}
