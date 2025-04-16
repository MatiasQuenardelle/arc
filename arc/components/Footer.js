"use client"
import { useTranslation } from "react-i18next"

export default function Footer() {
  const { t } = useTranslation()

  return (
    <footer className="bg-pink-400 text-white py-4 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between text-sm text-center md:text-left space-y-2 md:space-y-0">
        <p className="font-medium">
          © {new Date().getFullYear()} Vanina Starkoff. {t("footer.rights")}
        </p>
        <div className="flex gap-4">
          <a href="#contact" className="hover:underline">
            {t("footer.contact")}
          </a>
          <a href="#books" className="hover:underline">
            {t("footer.books")}
          </a>
          <a href="#about" className="hover:underline">
            {t("footer.about")}
          </a>
        </div>
        <p className="font-medium">{t("footer.thankYou")}</p>
      </div>
    </footer>
  )
}
