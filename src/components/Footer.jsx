"use client"

import { useState } from "react"
import { Instagram, Send, Facebook } from "lucide-react"
import axios from "axios"
import Logo from "../assets/logo.png"
import { handlePhoneInputChange, cleanPhoneNumber } from "../utils/phoneFormatter"
import ApplicationForm from "./modal-form/modal-form"
import { apiUrl } from "../utils/api"

export default function MedicalFooter({ onNavigate }) {
  const [phoneNumber, setPhoneNumber] = useState("+998 ")
  const [isAppointmentModalOpen, setIsAppointmentModalOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)

  const handlePhoneChange = (e) => {
    handlePhoneInputChange(e, setPhoneNumber)
    setError("")
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setSuccess(false)

    if (!phoneNumber.trim() || phoneNumber === "+998 ") {
      setError("Telefon raqamini kiriting")
      return
    }

    setLoading(true)
    try {
      const phone = cleanPhoneNumber(phoneNumber)
      await axios.post(apiUrl("call-orders/"), {
        name_uz: "Savol so'rovi",
        name_ru: "Savol so'rovi",
        phone
      })
      setSuccess(true)
      setPhoneNumber("+998 ")
      setTimeout(() => setSuccess(false), 2500)
    } catch (err) {
      setError(err?.response?.data?.message || err?.response?.data?.error || "Xatolik yuz berdi. Qayta urinib ko'ring.")
    } finally {
      setLoading(false)
    }
  }

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  const handleLinkClick = (e, section) => {
    e.preventDefault()
    if (section === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
      if (onNavigate) onNavigate('home')
    } else if (section === 'services') {
      if (onNavigate) onNavigate('home')
      setTimeout(() => scrollToSection('services-section'), 100)
    } else if (section === 'specialists') {
      if (onNavigate) onNavigate('home')
      setTimeout(() => scrollToSection('specialists-section'), 100)
    } else if (section === 'news') {
      if (onNavigate) onNavigate('home')
      setTimeout(() => scrollToSection('news-section'), 100)
    } else if (section === 'contact') {
      setIsAppointmentModalOpen(true)
    } else if (section === 'about') {
      if (onNavigate) onNavigate('about')
      setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 100)
    } else if (section === 'checkup') {
      if (onNavigate) onNavigate('check-up')
    }
  }

  return (
    <footer className="w-full">
      {(success || error) && (
        <div className="fixed top-4 left-1/2 z-[70] -translate-x-1/2 px-5 py-3 rounded-full shadow-lg animate-bounce text-white"
          style={{ backgroundColor: error ? '#ef4444' : '#22c55e' }}>
          {error || "Muvaffaqiyatli jo'natildi!"}
        </div>
      )}
      {/* Top Banner */}
      <div className="max-w bg-blue-600 py-6 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-white text-center md:text-left">
            <h2 className="text-2xl font-bold mb-1">Savollaringiz Bormi?</h2>
            <p className="text-blue-100 text-sm">Telefon raqamingizni qoldiring, biz tezda aloqamiz chiqamiz!</p>
            {error && (
              <div className="mt-2 text-sm text-red-100 bg-white/10 border border-white/20 rounded-full px-3 py-2">
                {error}
              </div>
            )}
            {success && (
              <div className="mt-2 text-sm text-green-100 bg-white/10 border border-white/20 rounded-full px-3 py-2">
                Muvaffaqiyatli jo'natildi!
              </div>
            )}
          </div>
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
            <div className="relative w-full sm:w-64">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xl">🇺🇿</span>
              <input
                type="tel"
                value={phoneNumber}
                onChange={handlePhoneChange}
                placeholder="+998 99 465 55 55"
                className="w-full h-12 pl-12 pr-4 rounded-full bg-white/20 backdrop-blur-sm text-white placeholder:text-gray-900 border border-white/30 focus:outline-none focus:ring-2 focus:ring-white/50 disabled:opacity-70"
                disabled={loading}
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="h-12 px-6 rounded-full bg-white text-blue-600 font-semibold hover:bg-blue-50 transition-colors whitespace-nowrap w-full sm:w-auto disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? "Yuborilmoqda..." : "Menga Qo'ng'iroq Qiling"}
            </button>
          </form>
        </div>
      </div>

      {/* Main Footer */}
      <div className="bg-gray-50 py-12 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo Section */}
          <div className="space-y-4 text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start gap-3">
              <div className="w-40 h-24 flex items-center justify-center">
                <img src={Logo} alt="" />
              </div>
              {/* <div>
                <div className="text-lg font-bold text-gray-900">Quvonch</div>
                <div className="text-xs text-blue-600 font-semibold">MEDICAL CENTER</div>
              </div> */}
            </div>
            <p className="text-sm text-gray-600">Kattalar va bolalar klinikasi</p>
            <div className="flex justify-center sm:justify-start">
              <button 
                onClick={() => setIsAppointmentModalOpen(true)}
                className="bg-blue-600 text-white px-6 py-2.5 rounded-full font-medium hover:bg-blue-700 transition-colors"
              >
                Qabulga Yozilish
              </button>
            </div>
          </div>

          {/* Navigation Links - Column 1 */}
          <div className="text-center sm:text-left">
            <ul className="space-y-3">
              <li>
                <a href="#home" onClick={(e) => handleLinkClick(e, 'home')} className="text-gray-700 hover:text-blue-600 transition-colors cursor-pointer">
                  Bosh sahifa
                </a>
              </li>
              <li>
                <a href="#about" onClick={(e) => handleLinkClick(e, 'about')} className="text-gray-700 hover:text-blue-600 transition-colors cursor-pointer">
                  Biz haqimizda
                </a>
              </li>
              <li>
                <a href="#services" onClick={(e) => handleLinkClick(e, 'services')} className="text-gray-700 hover:text-blue-600 transition-colors cursor-pointer">
                  Xizmatlar
                </a>
              </li>
              <li>
                <a href="#specialists" onClick={(e) => handleLinkClick(e, 'specialists')} className="text-gray-700 hover:text-blue-600 transition-colors cursor-pointer">
                  Mutaxassislar
                </a>
              </li>
            </ul>
          </div>

          {/* Navigation Links - Column 2 */}
          <div className="text-center sm:text-left">
            <ul className="space-y-3">
              <li>
                <a href="#checkup" onClick={(e) => handleLinkClick(e, 'checkup')} className="text-gray-700 hover:text-blue-600 transition-colors cursor-pointer">
                      Check-up
                </a>
              </li>
              <li>
                <a href="#news" onClick={(e) => handleLinkClick(e, 'news')} className="text-gray-700 hover:text-blue-600 transition-colors cursor-pointer">
                  Yangliklar
                </a>
              </li>
              <li>
                <a href="#contact" onClick={(e) => handleLinkClick(e, 'contact')} className="text-gray-700 hover:text-blue-600 transition-colors cursor-pointer">
                  Aloqa
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Section */}
          <div className="space-y-3 text-center sm:text-left">
            <a
              href="tel:+998905555500"
              className="block text-xl font-bold text-gray-900 hover:text-blue-600 transition-colors"
            >
              +998 90 555-55-00
            </a>
            <p className="text-sm text-gray-600">
              Dushanba - Juma
              <br />8:00 dan 18:00 gacha
            </p>
            <p className="text-sm text-gray-600">
               Shanba
              <br />8:00 dan 16:00 gacha
            </p>
            <a
              href="mailto:quvonch@clinics.uz"
              className="block text-sm text-gray-900 hover:text-blue-600 transition-colors"
            >
              quvonch@clinics.uz
            </a>
            <p className="text-xs text-gray-500">Hamkorlik uchun</p>
            <div className="space-y-2">
              <span className="text-sm text-gray-600">Bizga yozing</span>
              <div className="flex gap-3 justify-center sm:justify-start">
                <a
                  href="https://www.instagram.com/quvonch_medical_center/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="text-gray-600 hover:text-pink-500 transition-colors"
                >
                  <Instagram className="w-6 h-6" />
                </a>
                <a
                  href="https://t.me/quvonch_medical_center"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Telegram"
                  className="text-gray-600 hover:text-blue-400 transition-colors"
                >
                  <Send className="w-6 h-6" />
                </a>
                <a
                  href="https://www.facebook.com/quvonchmedicalcenter"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="text-gray-600 hover:text-blue-600 transition-colors"
                >
                  <Facebook className="w-6 h-6" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Appointment Modal */}
      <ApplicationForm
        open={isAppointmentModalOpen}
        onClose={() => setIsAppointmentModalOpen(false)}
        title="Qabulga yoziling"
      />

    </footer>
  )
}
