"use client"
import Image from "next/image"
import { useTranslation } from "react-i18next"
import { useParams } from "next/navigation"

const books = {
  "bailar-en-las-nubes": {
    images: ["/images/Bailar-en-las-nubes.jpg"],
  },
  "pelo-rio": {
    images: ["/images/Pelo-Rio.jpg"],
  },
  "bola-vermelha": {
    images: ["/images/Bola-Vermelha-CAPA.jpg"],
  },
  "flores-en-el-desierto": {
    images: ["/images/FLORES-EN-EL-DESIERTO-COVER.jpg"],
  },
  "la-montana": {
    images: ["/images/La-montaña-cover.jpg"],
  },
  "arboles-en-el-camino": {
    images: ["/images/Arboles-en-el-camino-COver.jpg"],
  },
  capulana: {
    images: ["/images/CAPULANA_CAPA.jpg"],
  },
  "vou-la-buscar": {
    images: ["/images/Vou la buscar a noite e ja volto.jpg"],
  },
  "la-voz-de-la-vida": {
    images: ["/images/Tapa-Lavoz-de-la-vida-COLOR.jpg"],
  },
  "a-caixa-de-zahara": {
    images: ["/images/A-caixa-de-Zahara---CAPA.jpg"],
  },
  "my-grandma": {
    images: ["/images/Yadooh-cover-NEW-pink.jpg"],
  },
  "folk-tale": {
    images: ["/images/Chile-Portada.jpg"],
  },
  "un-canto": {
    images: ["/images/un-canto-per-gli-alberi-(copertina).jpg"],
  },
  "doce-pescadores": {
    images: ["/images/Doce pescadores.jpg"],
  },
  "mae-sereia": {
    images: ["/images/Mãe-Sereia_Portada.jpg"],
  },
  "da-minha-janela": {
    images: ["/images/Da-minha-janela_Portada.jpg"],
  },
  "wangari-maathai": {
    images: ["/images/Wangari-Maathai-Portada.jpg"],
  },
  "wonders-of-egypt": {
    images: ["/images/Wonders-of-egypt.jpg"],
  },
}

export default function BookGallery() {
  const { slug } = useParams()
  const { t } = useTranslation()
  const book = books[slug]

  if (!book) {
    return (
      <div className="text-center py-16">
        <h1 className="text-3xl font-bold text-rose-500">
          {t("bookNotFound")}
        </h1>
      </div>
    )
  }

  const translatedTitle = t(`bookTitles.${slug}`)

  return (
    <section className="bg-gradient-to-br from-yellow-50 via-pink-50 to-blue-50 py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-rose-500 mb-8">
          {translatedTitle}
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {book.images.map((img, i) => (
            <Image
              key={i}
              src={img}
              alt={`${translatedTitle} page ${i + 1}`}
              width={1000}
              height={1400}
              className="w-full rounded-lg shadow-md object-cover"
            />
          ))}
        </div>
      </div>
    </section>
  )
}
