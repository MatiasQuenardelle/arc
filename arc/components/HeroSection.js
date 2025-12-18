"use client"
import { useState, useEffect } from "react"
import { useTranslation } from "react-i18next"
import { ChevronLeft, ChevronRight } from "lucide-react"

const images = [
  "/images/HeroSection00.jpg",
  "/images/heroSection1.jpg",
  "/images/slide3.jpg",
]

// Effect types
const EFFECTS = {
  FADE: "fade",
  SLIDE: "slide",
  ZOOM: "zoom",
  FLIP: "flip",
}

const effectLabels = {
  [EFFECTS.FADE]: "Fade",
  [EFFECTS.SLIDE]: "Slide",
  [EFFECTS.ZOOM]: "Zoom",
  [EFFECTS.FLIP]: "3D Flip",
}

export default function HeroSection() {
  const { t } = useTranslation()
  const [currentSlide, setCurrentSlide] = useState(0)
  const [previousSlide, setPreviousSlide] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [selectedEffect, setSelectedEffect] = useState(EFFECTS.FADE)
  const [slideDirection, setSlideDirection] = useState("next")

  // Auto-slide every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      goToSlide((currentSlide + 1) % images.length, "next")
    }, 5000)
    return () => clearInterval(interval)
  }, [currentSlide])

  const goToSlide = (newSlide, direction) => {
    if (isTransitioning || newSlide === currentSlide) return
    setSlideDirection(direction)
    setPreviousSlide(currentSlide)
    setIsTransitioning(true)
    setCurrentSlide(newSlide)
    setTimeout(() => setIsTransitioning(false), 700)
  }

  const nextSlide = () => {
    const newSlide = (currentSlide + 1) % images.length
    goToSlide(newSlide, "next")
  }

  const prevSlide = () => {
    const newSlide = (currentSlide - 1 + images.length) % images.length
    goToSlide(newSlide, "prev")
  }

  // Get slide classes based on selected effect
  const getSlideClasses = (index) => {
    const isActive = index === currentSlide
    const isPrevious = index === previousSlide

    const baseClasses = "absolute inset-0 bg-cover bg-center"

    switch (selectedEffect) {
      case EFFECTS.FADE:
        return `${baseClasses} transition-opacity duration-700 ease-in-out ${
          isActive ? "opacity-100 z-10" : "opacity-0 z-0"
        }`

      case EFFECTS.SLIDE:
        if (isActive) {
          return `${baseClasses} transition-transform duration-700 ease-in-out z-10 ${
            isTransitioning
              ? slideDirection === "next"
                ? "translate-x-0"
                : "translate-x-0"
              : "translate-x-0"
          }`
        }
        if (isPrevious && isTransitioning) {
          return `${baseClasses} transition-transform duration-700 ease-in-out z-10 ${
            slideDirection === "next" ? "-translate-x-full" : "translate-x-full"
          }`
        }
        return `${baseClasses} translate-x-full z-0 opacity-0`

      case EFFECTS.ZOOM:
        return `${baseClasses} transition-all duration-700 ease-in-out ${
          isActive
            ? "opacity-100 scale-100 z-10"
            : isPrevious && isTransitioning
            ? "opacity-0 scale-125 z-5"
            : "opacity-0 scale-95 z-0"
        }`

      case EFFECTS.FLIP:
        return `${baseClasses} backface-hidden ${
          isActive
            ? "z-10"
            : "z-0"
        }`

      default:
        return baseClasses
    }
  }

  // Get container styles for flip effect
  const getContainerStyles = () => {
    if (selectedEffect === EFFECTS.FLIP) {
      return {
        transformStyle: "preserve-3d",
        perspective: "1000px",
      }
    }
    return {}
  }

  // Get wrapper styles for flip effect
  const getWrapperStyles = (index) => {
    const isActive = index === currentSlide

    if (selectedEffect === EFFECTS.FLIP) {
      return {
        transform: isActive ? "rotateY(0deg)" : "rotateY(180deg)",
        transition: "transform 0.7s ease-in-out",
        transformStyle: "preserve-3d",
        backfaceVisibility: "hidden",
      }
    }

    if (selectedEffect === EFFECTS.SLIDE) {
      const isActive = index === currentSlide
      const isPrevious = index === previousSlide

      if (isActive) {
        return {
          transform: isTransitioning
            ? slideDirection === "next"
              ? "translateX(0)"
              : "translateX(0)"
            : "translateX(0)",
          transition: "transform 0.7s ease-in-out",
        }
      }
      if (isPrevious && isTransitioning) {
        return {
          transform: slideDirection === "next" ? "translateX(-100%)" : "translateX(100%)",
          transition: "transform 0.7s ease-in-out",
        }
      }
      if (!isActive && !isPrevious) {
        return {
          transform: slideDirection === "next" ? "translateX(100%)" : "translateX(-100%)",
          transition: "none",
        }
      }
    }

    return {}
  }

  return (
    <section className="relative w-full h-[calc(100vh-80px)] overflow-hidden">
      {/* Effect Selector - Client Preview Buttons */}
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-30 flex flex-wrap justify-center gap-2 bg-black bg-opacity-60 px-4 py-3 rounded-lg backdrop-blur-sm">
        <span className="text-white text-sm font-medium mr-2 self-center">Efecto:</span>
        {Object.entries(effectLabels).map(([effect, label]) => (
          <button
            key={effect}
            onClick={() => setSelectedEffect(effect)}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
              selectedEffect === effect
                ? "bg-white text-black shadow-lg"
                : "bg-white bg-opacity-20 text-white hover:bg-opacity-40"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Slides Container */}
      <div className="absolute inset-0" style={getContainerStyles()}>
        {images.map((image, index) => (
          <div
            key={index}
            className={getSlideClasses(index)}
            style={{
              backgroundImage: `url(${image})`,
              ...getWrapperStyles(index),
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
            onClick={() => goToSlide(index, index > currentSlide ? "next" : "prev")}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide ? "bg-white scale-125" : "bg-gray-500 hover:bg-gray-300"
            }`}
          />
        ))}
      </div>
    </section>
  )
}
