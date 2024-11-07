import i18n from 'i18next';
import translationVi from './locales/vi/translation';

export const defaultNS = 'translation';
export const resources = {
  vi: {
    translation: translationVi,
  },
};

i18n.init({
  lng: 'vi', // if you're using a language detector, do not define the lng option
  fallbackLng: 'vi',
  defaultNS: defaultNS, // default namespace
  resources: resources,
  keySeparator: '.',
  compatibilityJSON: 'v3',
  debug: false,
});
export default i18n;
