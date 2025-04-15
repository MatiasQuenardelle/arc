export default function Footer() {
  return (
    <footer className="bg-pink-400 text-white py-4 px-6 ">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between text-sm text-center md:text-left space-y-2 md:space-y-0">
        <p className="font-medium">
          © {new Date().getFullYear()} Vanina Starkoff. All rights reserved.
        </p>
        <div className="flex gap-4">
          <a href="/contact" className="hover:underline">
            Contact
          </a>
          <a href="/books" className="hover:underline">
            Books
          </a>
          <a href="/about" className="hover:underline">
            About Me
          </a>
        </div>
        <p className="font-medium">Thank you for visiting!</p>
      </div>
    </footer>
  )
}
