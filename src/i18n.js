import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./locales/en/en.json";
import ta from "./locales/ta/ta.json";

const resources = {
  en: { translation: en },
  ta: { translation: ta },
};

const savedLanguage = localStorage.getItem("language") || "en";

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: savedLanguage,
    fallbackLng: "en",
    interpolation: { escapeValue: false },
  });

export default i18n;
