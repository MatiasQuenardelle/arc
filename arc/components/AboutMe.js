"use client"
import { useTranslation } from "react-i18next"

export default function AboutMe() {
  const { t } = useTranslation()

  return (
    <section className="w-full max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-8 p-6 md:p-12">
      {/* Image Section */}
      <div className="w-full md:w-1/2 flex justify-center">
        <img
          src="/images/author.jpg"
          alt="Author"
          className="w-72 h-72 md:w-96 md:h-96 object-cover rounded-lg shadow-lg"
        />
      </div>

      {/* Text Section */}
      <div className="w-full md:w-1/2 text-center md:text-left">
        <h2 className="text-3xl font-bold text-pink-500 mb-4">
          {t("aboutAuthorTitle")}
        </h2>
        <p className="text-lg text-gray-700 mb-4">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
          euismod, erat eu feugiat vehicula, purus urna ultrices nunc, a cursus
          nunc risus eget orci. Nulla facilisi. Pellentesque habitant morbi
          tristique senectus et netus et malesuada fames ac turpis egestas.
        </p>
        <p className="text-lg text-gray-700">
          Vivamus tincidunt, sem eget pretium aliquet, ligula tortor fermentum
          risus, id scelerisque mauris libero at risus. Fusce gravida arcu ac
          justo sodales, et scelerisque magna rhoncus. Maecenas malesuada diam
          vitae nulla bibendum, ac convallis risus posuere.
        </p>
      </div>
    </section>
  )
}
