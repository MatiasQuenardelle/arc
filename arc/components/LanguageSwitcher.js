"use client"
import { useEffect } from "react"
import { useTranslation } from "react-i18next"

export default function LanguageSwitcher() {
  const { i18n } = useTranslation()

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng)
    localStorage.setItem("langSelected", "true")
    localStorage.setItem("selectedLang", lng)
  }

  useEffect(() => {
    const hasSelectedLang = localStorage.getItem("langSelected")
    const storedLang = localStorage.getItem("selectedLang")

    if (!hasSelectedLang) {
      const browserLang = navigator.language.split("-")[0] // get 'en' from 'en-US'
      const supportedLangs = ["en", "es", "pt"]
      const matchedLang = supportedLangs.includes(browserLang)
        ? browserLang
        : "en"

      i18n.changeLanguage(matchedLang)
      localStorage.setItem("langSelected", "true")
      localStorage.setItem("selectedLang", matchedLang)
    } else if (storedLang && storedLang !== i18n.language) {
      i18n.changeLanguage(storedLang)
    }
  }, [])

  return (
    <div className="flex space-x-4">
      <button onClick={() => changeLanguage("en")} className="text-white">
        🇬🇧 English
      </button>
      <button onClick={() => changeLanguage("es")} className="text-white">
        🇪🇸 Español
      </button>
      <button onClick={() => changeLanguage("pt")} className="text-white">
        🇵🇹 Português
      </button>
    </div>
  )
}
