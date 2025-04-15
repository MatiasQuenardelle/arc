"use client"
import { useTranslation } from "react-i18next"

export default function LanguageSwitcher() {
  const { i18n } = useTranslation()

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng)
  }

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
