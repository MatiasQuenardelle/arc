"use client"
import { useState, useRef } from "react"
import emailjs from "@emailjs/browser"
import HCaptcha from "@hcaptcha/react-hcaptcha"
import { useTranslation } from "react-i18next"

export default function ContactForm() {
  const { t } = useTranslation()
  const [formData, setFormData] = useState({ name: "", email: "", message: "" })
  const [captchaToken, setCaptchaToken] = useState("")
  const [status, setStatus] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const captchaRef = useRef(null)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!captchaToken) {
      setStatus(t("contactForm.captchaRequired"))
      return
    }

    setIsSubmitting(true)

    emailjs
      .send(
        "service_trpfbx7",
        "template_l2mjwy7",
        {
          from_name: formData.name,
          reply_to: formData.email,
          message: formData.message,
        },
        "VM0gePEBgxX098yry"
      )
      .then(() => {
        setStatus(t("contactForm.success"))
        setFormData({ name: "", email: "", message: "" })
        setCaptchaToken("")
        if (captchaRef.current) captchaRef.current.resetCaptcha()
      })
      .catch((error) => {
        console.error(error)
        setStatus(t("contactForm.error"))
      })
      .finally(() => setIsSubmitting(false))
  }

  return (
    <section
      id="contact"
      className="bg-gradient-to-br from-yellow-50 via-pink-50 to-blue-50 py-16 px-6"
    >
      <div className="max-w-xl mx-auto bg-white p-8 rounded-lg shadow-xl">
        <h2 className="text-3xl font-bold text-center text-rose-500 mb-6">
          {t("contactForm.title")}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder={t("contactForm.namePlaceholder")}
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full text-black p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300"
          />
          <input
            type="email"
            name="email"
            placeholder={t("contactForm.emailPlaceholder")}
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full text-black p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300"
          />
          <textarea
            name="message"
            placeholder={t("contactForm.messagePlaceholder")}
            rows={5}
            value={formData.message}
            onChange={handleChange}
            required
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300"
          />

          <HCaptcha
            sitekey="9302a1d4-affa-402a-814e-d1d228ba70ce"
            onVerify={(token) => setCaptchaToken(token)}
            ref={captchaRef}
          />

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-rose-400 text-white font-bold py-3 px-4 rounded-lg hover:bg-rose-500 transition-colors"
          >
            {isSubmitting
              ? t("contactForm.sending")
              : t("contactForm.sendButton")}
          </button>
        </form>
        {status && (
          <p className="mt-4 text-center text-sm text-gray-700">{status}</p>
        )}
      </div>
    </section>
  )
}
