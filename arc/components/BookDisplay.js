"use client"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useTranslation } from "react-i18next"

const books = [
  { id: "bailar-en-las-nubes", image: "/images/Bailar-en-las-nubes.jpg" },
  { id: "pelo-rio", image: "/images/Pelo-Rio.jpg" },
  { id: "bola-vermelha", image: "/images/Bola-Vermelha-CAPA.jpg" },
  {
    id: "flores-en-el-desierto",
    image: "/images/FLORES-EN-EL-DESIERTO-COVER.jpg",
  },
  { id: "la-montana", image: "/images/La-montaña-cover.jpg" },
  {
    id: "arboles-en-el-camino",
    image: "/images/Arboles-en-el-camino-COver.jpg",
  },
  { id: "capulana", image: "/images/CAPULANA_CAPA.jpg" },
  {
    id: "vou-la-buscar",
    image: "/images/Vou la buscar a noite e ja volto.jpg",
  },
  { id: "la-voz-de-la-vida", image: "/images/Tapa-Lavoz-de-la-vida-COLOR.jpg" },
  { id: "a-caixa-de-zahara", image: "/images/A-caixa-de-Zahara---CAPA.jpg" },
  { id: "my-grandma", image: "/images/Yadooh-cover-NEW-pink.jpg" },
  { id: "folk-tale", image: "/images/Chile-Portada.jpg" },
  { id: "un-canto", image: "/images/un-canto-per-gli-alberi-(copertina).jpg" },
  { id: "doce-pescadores", image: "/images/Doce pescadores.jpg" },
  { id: "mae-sereia", image: "/images/Mãe-Sereia_Portada.jpg" },
  { id: "da-minha-janela", image: "/images/Da-minha-janela_Portada.jpg" },
  { id: "wangari-maathai", image: "/images/Wangari-Maathai-Portada.jpg" },
  { id: "wonders-of-egypt", image: "/images/Wonders-of-egypt.jpg" },
]

export default function BookDisplay() {
  const { t } = useTranslation()
  const router = useRouter()

  const handleClick = (slug) => {
    router.push(`/books/${slug}`)
  }

  return (
    <section className="bg-gradient-to-br from-pink-100 via-yellow-100 to-blue-100 py-16 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {books.map((book, index) => (
          <div
            key={index}
            onClick={() => handleClick(book.id)}
            className="cursor-pointer group flex flex-col items-center rounded-lg shadow-lg overflow-hidden transition-transform hover:scale-105"
          >
            {/* <div className="w-full bg-rose-400 text-white font-bold text-center py-2 rounded-t-lg">
              {t(`bookTitles.${book.id}`)}
            </div> */}
            <Image
              src={book.image}
              alt={t(`bookTitles.${book.id}`)}
              width={300}
              height={400}
              className="w-full h-80 object-cover rounded-b-lg"
            />
          </div>
        ))}
      </div>
    </section>
  )
}
