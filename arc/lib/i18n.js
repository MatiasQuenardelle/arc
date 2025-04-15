"use client"
import i18n from "i18next"
import { initReactI18next } from "react-i18next"
import { useEffect, useState } from "react"
import en from "../public/locales/en.json"
import es from "../public/locales/es.json"
import pt from "../public/locales/pt.json"

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    es: { translation: es },
    pt: { translation: pt },
  },
  lng:
    typeof window !== "undefined" ? localStorage.getItem("lng") || "en" : "en", // Save user preference
  fallbackLng: "en",
  interpolation: { escapeValue: false },
})

export function useLanguageChange() {
  const [lng, setLng] = useState(i18n.language)

  useEffect(() => {
    i18n.on("languageChanged", (newLng) => {
      setLng(newLng)
      localStorage.setItem("lng", newLng) // Save selected language
    })
  }, [])

  return lng
}

export default i18n
