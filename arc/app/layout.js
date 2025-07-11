import "./globals.css"
import LanguageSwitcher from "@/components/LanguageSwitcher"

export const metadata = {
  title: "Arcoiris de Amor",
  description: "Web de Vanina Starkoff",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico?v=3" />
      </head>
      <body>{children}</body>
    </html>
  )
}
