"use client"
import i18n from "i18next"
import { initReactI18next } from "react-i18next"
import en from "../public/locales/en.json"
import es from "../public/locales/es.json"
import pt from "../public/locales/pt.json"

const getInitialLang = () => {
  if (typeof window === "undefined") return "en"

  const storedLang = localStorage.getItem("lng")
  if (storedLang) return storedLang

  const browserLang = navigator.language.split("-")[0]
  const supportedLangs = ["en", "es", "pt"]
  const detectedLang = supportedLangs.includes(browserLang) ? browserLang : "en"

  localStorage.setItem("lng", detectedLang)
  return detectedLang
}

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    es: { translation: es },
    pt: { translation: pt },
  },
  lng: getInitialLang(), // ✅ gets stored or detected language
  fallbackLng: "en",
  interpolation: { escapeValue: false },
})

i18n.on("languageChanged", (lng) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("lng", lng)
  }
})

export default i18n
