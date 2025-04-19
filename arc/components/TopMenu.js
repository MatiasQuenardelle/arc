"use client"
import { useState } from "react"
import Link from "next/link"
import { useTranslation } from "react-i18next"
import { ChevronDown, Menu, X } from "lucide-react"
import { useRouter } from "next/navigation"
import i18n from "@/lib/i18n"

export default function TopMenu() {
  const { t } = useTranslation()
  const [isOpen, setIsOpen] = useState(false)
  const [booksOpen, setBooksOpen] = useState(false)
  const [langOpen, setLangOpen] = useState(false)

  const toggleMenu = () => setIsOpen(!isOpen)
  const toggleBooks = () => setBooksOpen(!booksOpen)
  const toggleLang = () => setLangOpen(!langOpen)
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng)
    setLangOpen(false) // Close language menu after selection
  }
  const router = useRouter()

  const handleScrollTo = (sectionId) => {
    const isHome = window.location.pathname === "/"

    if (isHome) {
      const section = document.getElementById(sectionId)
      section?.scrollIntoView({ behavior: "smooth" })
    } else {
      // Append hash to scroll after navigation
      router.push(`/#${sectionId}`)
    }
  }

  const bookSlugs = [
    "bailar-en-las-nubes",
    "pelo-rio",
    "bola-vermelha",
    "flores-en-el-desierto",
    "la-montana",
    "arboles-en-el-camino",
    "capulana",
    "vou-la-buscar",
    "la-voz-de-la-vida",
    "a-caixa-de-zahara",
    "my-grandma",
    "folk-tale",
    "un-canto",
    "doce-pescadores",
    "mae-sereia",
    "da-minha-janela",
    "wangari-maathai",
    "wonders-of-egypt",
  ]

  return (
    <nav className="bg-pink-400 text-white p-4 shadow-lg w-full">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-4 md:px-8">
        {/* Logo or Home Link */}
        <Link href="/" className="text-xl font-bold uppercase mr-6">
          {t("home")}
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-8 items-center">
          <button
            onClick={() => handleScrollTo("about")}
            className="hover:underline"
          >
            {t("about")}
          </button>

          <button
            onClick={() => handleScrollTo("contact")}
            className="hover:underline"
          >
            {t("contact")}
          </button>

          {/* Books Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setBooksOpen(true)}
            onMouseLeave={() => setBooksOpen(false)}
          >
            <button className="flex items-center hover:underline">
              {t("books")} <ChevronDown className="ml-1 w-4 h-4" />
            </button>

            {booksOpen && (
              <div className="absolute left-0 top-full w-64 bg-white text-black shadow-lg rounded-md z-50">
                {bookSlugs.map((slug) => (
                  <button
                    key={slug}
                    onClick={() => router.push(`/books/${slug}`)}
                    className="block w-full text-left px-4 py-2 hover:bg-pink-200"
                  >
                    {t(`bookTitles.${slug}`)}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Language Switcher Dropdown */}
          <div className="relative">
            <button
              onClick={toggleLang}
              className="bg-white text-pink-500 px-2 py-1 rounded-md flex items-center space-x-2"
            >
              {i18n.language === "en"
                ? "🇬🇧 EN"
                : i18n.language === "es"
                ? "🇪🇸 ES"
                : "🇵🇹 PT"}{" "}
              <ChevronDown className="ml-1 w-4 h-4" />
            </button>
            {langOpen && (
              <div
                className="absolute left-0 mt-2 w-24 bg-white text-pink-500 shadow-lg rounded-md z-50"
                onMouseEnter={() => setLangOpen(true)}
                onMouseLeave={() => setLangOpen(false)}
              >
                <button
                  onClick={() => changeLanguage("en")}
                  className="block w-full text-left px-4 py-2 hover:bg-pink-200"
                >
                  🇬🇧 EN
                </button>
                <button
                  onClick={() => changeLanguage("es")}
                  className="block w-full text-left px-4 py-2 hover:bg-pink-200"
                >
                  🇪🇸 ES
                </button>
                <button
                  onClick={() => changeLanguage("pt")}
                  className="block w-full text-left px-4 py-2 hover:bg-pink-200"
                >
                  🇵🇹 PT
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button onClick={toggleMenu} className="md:hidden">
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden mt-4 space-y-2 bg-pink-500 text-white p-4 rounded-md w-full max-h-[calc(100vh-100px)] overflow-y-auto">
          <button
            onClick={() => {
              const section = document.getElementById("about")
              section?.scrollIntoView({ behavior: "smooth" })
            }}
            className="hover:underline"
          >
            {t("about")}
          </button>

          <button
            onClick={() => {
              const section = document.getElementById("contact")
              section?.scrollIntoView({ behavior: "smooth" })
            }}
            className="hover:underline"
          >
            {t("contact")}
          </button>

          <button
            onClick={toggleBooks}
            className="block w-full text-left flex justify-between hover:underline"
          >
            {t("books")} <ChevronDown className="w-4 h-4" />
          </button>
          {booksOpen && (
            <div className="pl-4 space-y-1">
              {bookSlugs.map((slug) => (
                <Link
                  key={slug}
                  href={`/books/${slug}`}
                  className="block hover:bg-pink-500 p-1"
                >
                  {t(`bookTitles.${slug}`)}
                </Link>
              ))}
            </div>
          )}

          {/* Mobile Language Switcher */}
          <div className="relative">
            <button
              onClick={toggleLang}
              className="bg-white text-pink-500 px-2 py-1 rounded-md flex items-center"
            >
              {i18n.language.toUpperCase()}{" "}
              <ChevronDown className="ml-1 w-4 h-4" />
            </button>
            {langOpen && (
              <div className="absolute left-0 mt-2 w-24 bg-white text-pink-500 shadow-lg rounded-md">
                <button
                  onClick={() => changeLanguage("en")}
                  className="block w-full text-left px-4 py-2 hover:bg-pink-200"
                >
                  🇬🇧 EN
                </button>
                <button
                  onClick={() => changeLanguage("es")}
                  className="block w-full text-left px-4 py-2 hover:bg-pink-200"
                >
                  🇪🇸 ES
                </button>
                <button
                  onClick={() => changeLanguage("pt")}
                  className="block w-full text-left px-4 py-2 hover:bg-pink-200"
                >
                  🇵🇹 PT
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}
