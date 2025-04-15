"use client"
import Image from "next/image"
import { useRouter } from "next/navigation"

const books = [
  { title: "Bailar en las Nubes", image: "/images/Bailar-en-las-nubes.jpg" },
  { title: "Pelo Rio", image: "/images/Pelo-Rio.jpg" },
  { title: "Bola Vermelha", image: "/images/Bola-Vermelha-CAPA.jpg" },
  {
    title: "Flores En El Desierto",
    image: "/images/FLORES-EN-EL-DESIERTO-COVER.jpg",
  },
  { title: "La Montaña", image: "/images/La-montaña-cover.jpg" },
  {
    title: "Arboles en el Camino",
    image: "/images/Arboles-en-el-camino-COver.jpg",
  },
  { title: "Capulana", image: "/images/CAPULANA_CAPA.jpg" },
  {
    title: "Vou La Buscar a Noite e Ja Volto",
    image: "/images/Vou la buscar a noite e ja volto.jpg",
  },
  {
    title: "La Voz de la Vida",
    image: "/images/Tapa-Lavoz-de-la-vida-COLOR.jpg",
  },
  {
    title: "The A Caixa de Zahara",
    image: "/images/A-caixa-de-Zahara---CAPA.jpg",
  },
  { title: "My Grandma", image: "/images/Yadooh-cover-NEW-pink.jpg" },
  { title: "Folk Tale From The World", image: "/images/Chile-Portada.jpg" },
  {
    title: "Un Canto Per Gli Alberi",
    image: "/images/un-canto-per-gli-alberi-(copertina).jpg",
  },
  { title: "Doce Pescadores", image: "/images/Doce pescadores.jpg" },
  { title: "Mae Sereia", image: "/images/Mãe-Sereia_Portada.jpg" },
  {
    title: "The Da Minha Janela",
    image: "/images/Da-minha-janela_Portada.jpg",
  },
  { title: "Wangari Maathai", image: "/images/Wangari-Maathai-Portada.jpg" },
  { title: "Wonders of Egypt", image: "/images/Wonders-of-egypt.jpg" },
]

export default function BookDisplay() {
  const router = useRouter()

  const handleClick = (title) => {
    const slug = title.toLowerCase().replace(/\s+/g, "-")
    router.push(`/books/${slug}`)
  }

  return (
    <section className="bg-gradient-to-br from-pink-100 via-yellow-100 to-blue-100 py-16 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {books.map((book, index) => (
          <div
            key={index}
            onClick={() => handleClick(book.title)}
            className="cursor-pointer group flex flex-col items-center rounded-lg shadow-lg overflow-hidden transition-transform hover:scale-105"
          >
            <div className="w-full bg-rose-400 text-white font-bold text-center py-2 rounded-t-lg">
              {book.title}
            </div>
            <Image
              src={book.image}
              alt={book.title}
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
