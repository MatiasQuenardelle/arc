"use client"
import { useTranslation } from "react-i18next"
import "@/lib/i18n"
import TopMenu from "@/components/TopMenu"
import HeroSection from "@/components/HeroSection"
import AboutMe from "@/components/AboutMe"
import BookDisplay from "@/components/BookDisplay"

export default function Home() {
  return (
    <main className="w-full">
      <TopMenu />
      <HeroSection />
      <AboutMe />
      <BookDisplay />
    </main>
  )
}
