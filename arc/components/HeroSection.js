"use client"
import { useState, useEffect } from "react"
import { useTranslation } from "react-i18next"
import { ChevronLeft, ChevronRight } from "lucide-react"

const images = [
  "/images/HeroSection00.jpg",
  "/images/heroSection1.jpg",
  "/images/slide3.jpg",
]

export default function HeroSection() {
  const { t } = useTranslation()
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)

  // Auto-slide every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % images.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const goToSlide = (newSlide) => {
    if (isTransitioning || newSlide === currentSlide) return
    setIsTransitioning(true)
    setCurrentSlide(newSlide)
    setTimeout(() => setIsTransitioning(false), 700)
  }

  const nextSlide = () => {
    const newSlide = (currentSlide + 1) % images.length
    goToSlide(newSlide)
  }

  const prevSlide = () => {
    const newSlide = (currentSlide - 1 + images.length) % images.length
    goToSlide(newSlide)
  }

  // Get slide classes for fade effect
  const getSlideClasses = (index) => {
    const isActive = index === currentSlide
    return `absolute inset-0 bg-cover bg-center transition-opacity duration-700 ease-in-out ${
      isActive ? "opacity-100 z-10" : "opacity-0 z-0"
    }`
  }

  return (
    <section className="relative w-full h-[calc(100vh-80px)] overflow-hidden">
      {/* Slides Container */}
      <div className="absolute inset-0">
        {images.map((image, index) => (
          <div
            key={index}
            className={getSlideClasses(index)}
            style={{
              backgroundImage: `url(${image})`,
            }}
          >
            <div className="absolute inset-0 bg-black bg-opacity-15 flex justify-center items-center">
              {/* Content can go here */}
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-3 rounded-full hover:bg-opacity-75 z-20"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-3 rounded-full hover:bg-opacity-75 z-20"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Dots Navigation */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide ? "bg-white scale-125" : "bg-gray-500 hover:bg-gray-300"
            }`}
          />
        ))}
      </div>
    </section>
  )
}
