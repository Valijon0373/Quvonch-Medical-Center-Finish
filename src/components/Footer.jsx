"use client"

import { useState } from "react"
import { Instagram, Send, Facebook } from "lucide-react"
import Logo from "../assets/logo.png"
import { formatPhoneNumber, handlePhoneInputChange } from "../utils/phoneFormatter"
import ApplicationForm from "./modal-form/modal-form"

export default function MedicalFooter() {
  const [phoneNumber, setPhoneNumber] = useState("+998 ")
  const [isAppointmentModalOpen, setIsAppointmentModalOpen] = useState(false)

  const handlePhoneChange = (e) => {
    handlePhoneInputChange(e, setPhoneNumber)
  }

  return (
    <footer className="w-full">
      {/* Top Banner */}
      <div className="max-w bg-blue-600 py-6 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-white text-center md:text-left">
            <h2 className="text-2xl font-bold mb-1">Savollaringiz Bormi?</h2>
            <p className="text-blue-100 text-sm">Telefon raqamingizni qoldiring, biz tezda aloqamiz chiqamiz!</p>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
            <div className="relative w-full sm:w-64">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xl">🇺🇿</span>
              <input
                type="tel"
                value={phoneNumber}
                onChange={handlePhoneChange}
                placeholder="+998 99 465 55 55"
                className="w-full h-12 pl-12 pr-4 rounded-full bg-white/20 backdrop-blur-sm text-white placeholder:text-gray-900 border border-white/30 focus:outline-none focus:ring-2 focus:ring-white/50"
              />
            </div>
            <button className="h-12 px-6 rounded-full bg-white text-blue-600 font-semibold hover:bg-blue-50 transition-colors whitespace-nowrap w-full sm:w-auto">
              Menga Qo'ng'iroq Qiling
            </button>
          </div>
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
                <a href="#home" className="text-gray-700 hover:text-blue-600 transition-colors">
                  Bosh sahifa
                </a>
              </li>
              <li>
                <a href="#about" className="text-gray-700 hover:text-blue-600 transition-colors">
                  Biz haqimizda
                </a>
              </li>
              <li>
                <a href="#services" className="text-gray-700 hover:text-blue-600 transition-colors">
                  Xizmatlar
                </a>
              </li>
              <li>
                <a href="#specialists" className="text-gray-700 hover:text-blue-600 transition-colors">
                  Mutaxassislar
                </a>
              </li>
            </ul>
          </div>

          {/* Navigation Links - Column 2 */}
          <div className="text-center sm:text-left">
            <ul className="space-y-3">
              <li>
                <a href="#checkup" className="text-gray-700 hover:text-blue-600 transition-colors">
                      Tibbiy Ko‘rik
                </a>
              </li>
              <li>
                <a href="#news" className="text-gray-700 hover:text-blue-600 transition-colors">
                  Yangliklar
                </a>
              </li>
              <li>
                <a href="#contact" className="text-gray-700 hover:text-blue-600 transition-colors">
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
              Dushanba - Shanba
              <br />9 dan 20 gacha
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
                  href="#instagram"
                  aria-label="Instagram"
                  className="text-gray-600 hover:text-pink-500 transition-colors"
                >
                  <Instagram className="w-6 h-6" />
                </a>
                <a
                  href="#telegram"
                  aria-label="Telegram"
                  className="text-gray-600 hover:text-blue-400 transition-colors"
                >
                  <Send className="w-6 h-6" />
                </a>
                <a
                  href="#facebook"
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
