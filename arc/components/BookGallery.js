"use client"
import Image from "next/image"
import { useTranslation } from "react-i18next"
import { useParams } from "next/navigation"

const books = {
  "bailar-en-las-nubes": {
    images: [
      "/images/Bailar-en-las-nubes.jpg",
      "/images/01 Bailar en las nubes.jpg",
      "/images/02 Bailar en las nubesjpg.jpg", // (double "jpg" – keep this if it's the actual filename)
      "/images/03 Bailar en las nubes.jpg",
      "/images/04 Bailar en las nubes.jpg",
      "/images/05 Bailar en las nubes.jpg",
      "/images/06 Bailar en las nubes.jpg",
      "/images/08 Bailar en las nubes.jpg",
    ],
  },

  "pelo-rio": {
    images: [
      "/images/Pelo-Rio.jpg",
      "/images/01 Pelo-rio.jpg",
      "/images/02 Pelo-rio.jpg",
      "/images/03 Pelo-rio.jpg",
      "/images/04 Pelo-rio.jpg",
      "/images/05 Pelo-rio.jpg",
      "/images/06 Pelo-rio.jpg",
      "/images/07 Pelo-rio.jpg",
      "/images/08 Pelo-rio.jpg",
    ],
  },

  "bola-vermelha": {
    images: [
      "/images/Bola-Vermelha-CAPA.jpg",
      "/images/01 Bola-vermelha-02.jpg",
      "/images/02 Bola-vermelha-06.jpg",
      "/images/03 Bola-vermelha-10.jpg",
      "/images/05 Bola-vermelha-12.jpg",
    ],
  },

  "flores-en-el-desierto": {
    images: [
      "/images/FLORES-EN-EL-DESIERTO-COVER.jpg",
      "/images/01 Flores-01-copy.jpg",
      "/images/02 Flores-02-copy.jpg",
      "/images/03 Flores-05-copy.jpg",
      "/images/04 Flores-07-copy.jpg",
      "/images/05 Flores-08-copy.jpg",
      "/images/06 Flores-09-copy.jpg",
      "/images/07 Flores-12-copy.jpg",
      "/images/08 Flores-17-copy.jpg",
      "/images/09 Flores-18-copy.jpg",
    ],
  },

  "la-montana": {
    images: [
      "/images/La-montaña-cover.jpg",
      "/images/01 La-montaña-01.jpg",
      "/images/02 La-montaña-05.jpg",
      "/images/03 La-montaña-06.jpg",
      "/images/04 La-montaña-09.jpg",
      "/images/05 La-montaña-10.jpg",
      "/images/06 La-montaña-11.jpg",
    ],
  },

  "arboles-en-el-camino": {
    images: [
      "/images/Arboles-en-el-camino-COver.jpg",
      "/images/01-ARBOLESCAMINO-01.jpg",
      "/images/02-ARBOLESCAMINO-04.jpg",
      "/images/03-ARBOLESCAMINO-11.jpg",
      "/images/04-ARBOLESCAMINO-12.jpg",
      "/images/05-ARBOLESCAMINO-13.jpg",
    ],
  },

  capulana: {
    images: [
      "/images/CAPULANA_CAPA.jpg",
      "/images/01-CAPULANA_06.jpg",
      "/images/02-CAPULANA_02.jpg",
      "/images/03-CAPULANA_04.jpg",
      "/images/04CAPULANA_03.jpg",
      "/images/05-CAPULANA_9.jpg",
      "/images/06-CAPULANA_13.jpg",
      "/images/07-CAPULANA_12.jpg",
      "/images/08-Vanina-Starkoff-capulana-03.jpg",
      "/images/09-Vanina-Starkoff-capulana-01.jpg",
      "/images/10-Vanina-Starkoff-capulana-02.jpg",
    ],
  },

  "vou-la-buscar": {
    images: [
      "/images/Vou la buscar a noite e ja volto.jpg",

      "/images/02.-o-vento-que-arde.jpg",
      "/images/03.-O-monstro-dos-ares.jpg",
      "/images/04.-Sabio-conselho-(fundo-azul).jpg",
      "/images/05.-A-estrela-que-desceu.jpg",
    ],
  },

  "la-voz-de-la-vida": {
    images: [
      "/images/Tapa-Lavoz-de-la-vida-COLOR.jpg",
      "/images/1-a-voz-da-vida-15.jpg",
      "/images/2-a-voz-da-vida-07.jpg",
      "/images/3-a-voz-da-vida-13.jpg",
      "/images/4-a-voz-da-vida-10.jpg",
      "/images/5-a-voz-da-vida-14-a.jpg",
      "/images/6-a-voz-da-vida-02-a.jpg",
    ],
  },

  "a-caixa-de-zahara": {
    images: [
      "/images/01-A-caixa-de-Zahara---CAPA.jpg",
      "/images/02-Caixa-de-Zahara-01.jpg",
      "/images/03-Caixa-de-Zahara-02.jpg",
      "/images/04-Caixa-de-Zahara-003.jpg",
      "/images/05-Caixa-de-Zahara-11.jpg",
      "/images/06-Caixa-de-Zahara-12.jpg",
      "/images/07-Caixa-de-Zahara-13.jpg",
      "/images/08-Caixa-de-Zahara-15.jpg",
    ],
  },

  "my-grandma": {
    images: [
      "/images/01-yadooh-cover-new-pink.jpg",
      "/images/02-05-yadooh-1-8-new.jpg",
      "/images/03-yadooh-9-a-new.jpg",
      "/images/04-yadooh-8-final-new.jpg",
      "/images/05-yadooh-10-new.jpg",
      "/images/06-img_2191.jpeg",
      "/images/07-img_2204.jpeg",
      "/images/08-img_2197.jpeg",
      "/images/09-img_2198.jpeg",
      "/images/10-img_2207.jpeg",
      "/images/11-img_2210.jpeg",
    ],
  },

  "folk-tale": {
    images: [
      "/images/Chile-Portada.jpg", // cover
      "/images/01-Chile-6-7.jpg",
      "/images/02-Chile-8-9.jpg",
      "/images/03-Chile-12-13.jpg",
      "/images/04-Chile-20-21.jpg",
      "/images/05-Chile-26-27.jpg",
    ],
  },

  "un-canto": {
    images: [
      "/images/01-una-cancion-para-los-arboles.jpg",
      "/images/02-una-cancion-para-los-arboles-3.jpg",
      "/images/03-una-cancion-para-los-arboles-3a.jpg",
      "/images/04-una-cancion-para-los-arboles-12-a.jpg",
      "/images/05-img_3739.jpeg",
      "/images/06-img_3750.jpeg",
      "/images/07-img_3835.jpg",
      "/images/08-img_3826.jpeg",
      "/images/09-img_3960.jpeg",
      "/images/10-img_4310.jpeg",
    ],
  },

  "doce-pescadores": {
    images: [
      "/images/01.-Pincoya-02.jpg",
      "/images/02.-Pincoya-07.jpg",
      "/images/04.-Pincoya-08.jpg",
      "/images/05.-Pincoya-10.jpg",
      "/images/06. Pincoya-05.jpg",
      "/images/07.-Pincoya-11-.jpg",
      "/images/08. Pincoya-12.jpg",
    ],
  },

  "mae-sereia": {
    images: [
      "/images/Mãe-Sereia_Portada.jpg", // cover
      "/images/01 Mãe-Sereia_00.jpg",
      "/images/02 Mãe-Sereia_01.jpg",
      "/images/03 Mãe-Sereia_02.jpg",
      "/images/04 Mãe-Sereia_03.jpg",
      "/images/05 Mãe-Sereia_04.jpg",
      "/images/06 Mãe-Sereia_05.jpg",
      "/images/07 Mãe-Sereia_06.jpg",
      "/images/08 Mãe-Sereia_07.jpg",
    ],
  },

  "da-minha-janela": {
    images: [
      "/images/Da-minha-janela_Portada.jpg", // cover
      "/images/02-DA-MINHA-JANELA_3-ajustes.jpg",
      "/images/03-DA-MINHA-JANELA_4.jpg",
      "/images/05-DA-MINHA-JANELA_7.jpg",
      "/images/06-DA-MINHA-JANELA_8-.jpg",
      "/images/07-DA-MINHA-JANELA_9.jpg",
      "/images/08-DA-MINHA-JANELA_10.jpg",
      "/images/09-DA-MINHA-JANELA_13.jpg",
      "/images/10-DA-MINHA-JANELA_17-ajustes.jpg",
      "/images/11 DA-MINHA-JANELA_maracana.jpg",
    ],
  },

  "wangari-maathai": {
    images: [
      "/images/Wangari-Maathai-Portada.jpg", // cover
      "/images/Wangari-Maathai-----14-15.jpg",
      "/images/Wangari-Maathai-----18-19.jpg",
      "/images/Wangari-Maathai-----20-21-.jpg",
      "/images/Wangari-Maathai-----22-23.jpg",
      "/images/Wangari-Maathai-----24-25.jpg",
      "/images/Wangari-Maathai-----30-31.jpg",
    ],
  },

  "wonders-of-egypt": {
    images: [
      "/images/Wonders-of-egypt.jpg", // cover
      "/images/01-Vanina-Starkoff---The-Nile.jpg",
      "/images/02-Vanina-Starkoff---The-Nile-c.jpg",
      "/images/03-at-Bologna!!!.jpg",
    ],
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
