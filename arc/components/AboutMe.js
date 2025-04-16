"use client"
import { useTranslation } from "react-i18next"
import Image from "next/image"

export default function AboutMe() {
  const { t } = useTranslation()

  return (
    <section
      id="about"
      className="w-full bg-gradient-to-br from-yellow-100 via-pink-100 to-blue-100 py-12 px-4"
    >
      <div className="max-w-9xl mx-auto flex flex-col md:flex-row items-center gap-12">
        {/* Image Section */}
        <div className="w-full md:w-1/2 flex justify-center">
          <Image
            src="/images/author.jpg"
            alt="Author"
            width={500}
            height={500}
            className="w-72 h-72 md:w-[28rem] md:h-[28rem] object-cover rounded-full border-4 border-pink-300 shadow-xl"
          />
        </div>

        {/* Text Section */}
        <div className="w-full md:w-1/2 text-center md:text-left">
          <h2 className="text-4xl font-extrabold text-rose-500 mb-6 drop-shadow-sm">
            {t("aboutAuthorTitle")}
          </h2>
          <p className="text-lg text-gray-800 mb-4 leading-relaxed">
            {t("aboutParagraph1")}
          </p>
          <p className="text-lg text-gray-800 leading-relaxed">
            {t("aboutParagraph2")}
          </p>
        </div>
      </div>
    </section>
  )
}
