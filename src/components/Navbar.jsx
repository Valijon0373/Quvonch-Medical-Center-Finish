"use client"

import { useState } from "react"
import { Instagram, Send, Facebook, Heart, Menu, X } from "lucide-react"
import Logo1 from '../assets/LOGO1.png'
import Top1 from '../assets/banner/Top.png'
import ApplicationForm from './modal-form/modal-form'

export default function Navbar({ onNavigate, currentSection }) {
  const [isOpen, setIsOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  return (
    <nav className="fixed top-0 left-0 right-0 w-full bg-white shadow-sm z-50">
      {/* Top Bar - White Background with Social Links - Hidden on Mobile */}
      <div className="bg-white border-b border-gray-200 hidden md:block">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-end py-2">
            {/* Right Side - Social Links */}
            <div className="flex items-center gap-4 px-8">
              <span className="font-bold text-sm text-gray-700">Bizga yozing:</span>
              <a href="#" className="text-gray-600 hover:text-pink-500 transition-colors cursor-pointer">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-600 hover:text-blue-400 transition-colors cursor-pointer">
                <Send className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors cursor-pointer">
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar - Blue Background with Logo, Navigation, Contact Info, and Button */}
      <div className="bg-blue-500 w-full">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between py-3 md:py-4">
            {/* Logo Section */}
            <img 
              src={Logo1} 
              alt="Logo" 
              onClick={() => {
                onNavigate('home')
                setTimeout(() => {
                  window.scrollTo({ 
                    top: 0,
                    behavior: 'smooth'
                  })
                }, 100)
              }}
              className="bg-white 
              rounded-full 
              p-2 md:p-3 w-28 h-10
              md:w-36 md:h-14 object-cover cursor-pointer hover:opacity-80 transition-opacity" 
            />

            {/* Desktop Navigation Links - Hidden on Mobile */}
            <div className="hidden lg:flex items-center gap-6 text-md flex-1 ml-8">
              <button 
                onClick={() => {
                  onNavigate('home')
                  setTimeout(() => {
                    window.scrollTo({ 
                      top: 0,
                      behavior: 'smooth'
                    })
                  }, 100)
                }} 
                className={`font-bold whitespace-nowrap transition-colors cursor-pointer text-white hover:text-blue-200 ${
                  currentSection === 'home' 
                    ? 'text-blue-200' 
                    : 'text-white'
                }`}
              >
                Bosh sahifa
              </button>
              <button 
                onClick={() => onNavigate('about')} 
                className={`font-bold whitespace-nowrap transition-colors cursor-pointer text-white hover:text-blue-200 ${
                  currentSection === 'about' 
                    ? 'text-blue-200' 
                    : 'text-white'
                }`}
              >
                Biz haqimizda
              </button>
              <button 
                onClick={() => {
                  onNavigate('home')
                  setTimeout(() => {
                    const servicesElement = document.getElementById('services-section')
                    if (servicesElement) {
                      servicesElement.scrollIntoView({ 
                        behavior: 'smooth',
                        block: 'start'
                      })
                    }
                  }, 100)
                }} 
                className={`font-bold whitespace-nowrap transition-colors cursor-pointer text-white hover:text-blue-200 ${
                  currentSection === 'services' 
                    ? 'text-blue-200' 
                    : 'text-white'
                }`}
              >
                Xizmatlar
              </button>
              <button 
                onClick={() => {
                  onNavigate('home')
                  setTimeout(() => {
                    const specialistsElement = document.getElementById('specialists-section')
                    if (specialistsElement) {
                      specialistsElement.scrollIntoView({ 
                        behavior: 'smooth',
                        block: 'start'
                      })
                    }
                  }, 100)
                }} 
                className={`font-bold whitespace-nowrap transition-colors cursor-pointer text-white hover:text-blue-200 ${
                  currentSection === 'home' 
                    ? 'text-blue-200' 
                    : 'text-white'
                }`}
              >
                Mutaxassislar
              </button>
              <button 
                onClick={() => onNavigate('check-up')} 
                className={`font-bold whitespace-nowrap transition-colors cursor-pointer text-white hover:text-blue-200 ${
                  currentSection === 'acceptance' 
                    ? 'text-blue-200' 
                    : 'text-white'
                }`}
              >
                Check-up
              </button>
              <button 
                onClick={() => {
                  onNavigate('home')
                  setTimeout(() => {
                    const newsElement = document.getElementById('news-section')
                    if (newsElement) {
                      newsElement.scrollIntoView({ 
                        behavior: 'smooth',
                        block: 'start'
                      })
                    }
                  }, 100)
                }} 
                className={`font-bold whitespace-nowrap transition-colors cursor-pointer text-white hover:text-blue-200 ${
                  currentSection === 'home' 
                    ? 'text-blue-200' 
                    : 'text-white'
                }`}
              >
                Yangiliklar
              </button>
              <button 
                onClick={() => onNavigate('vacancy')}
                className={`font-bold whitespace-nowrap transition-colors cursor-pointer text-white hover:text-blue-200 ${
                  currentSection === 'vacancy' 
                    ? 'text-blue-200' 
                    : 'text-white'
                }`}
              >
                Vakansiyalar
              </button>
            </div>

            {/* Desktop Contact Info and Registration Button - Hidden on Mobile */}
            <div className="hidden lg:flex items-center gap-6">
              <div className="flex flex-col items-center text-white">
                <a
                  href="tel:+998994655555"
                  className="text-sm font-bold hover:text-blue-200 transition-colors cursor-pointer"
                >
                  +998 99 465-55-55
                </a>
                <a
                  href="mailto:quvonch@clinics.uz"
                  className="text-sm hover:text-blue-200 transition-colors cursor-pointer"
                >
                  quvonch@clinics.uz
                </a>
              </div>
              <button 
                onClick={() => setIsOpen(true)} 
                className="
                
                px-2 py-2 
                bg-white text-gray-800 
                rounded-full font-bold 
                hover:bg-gray-100 
                transition-colors
                cursor-pointer
                h-13
                flex items-center justify-center whitespace-nowrap"
              >
                Qabulga Yozilish
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden text-white p-2 cursor-pointer"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {/* Animate from right to left with slower transition */}
      <div
        className={`fixed top-0 right-0 h-full w-2/3 bg-blue-200 z-50 lg:hidden transform transition-transform transition-opacity duration-700 ease-in-out ${isMobileMenuOpen ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}`}
      >
        <div className="flex flex-col h-full p-6">
          {/* Close Button */}
          <div className="flex justify-end mb-8">
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-black hover:text-gray-600 transition-colors cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-col space-y-6 mb-8">
            <button 
              onClick={() => {
                setIsMobileMenuOpen(false)
                onNavigate('home')
                setTimeout(() => {
                  window.scrollTo({ 
                    top: 0,
                    behavior: 'smooth'
                  })
                }, 100)
              }} 
              className="font-bold transition-colors cursor-pointer text-black hover:text-gray-600 text-left"
            >
              Bosh sahifa
            </button>
            <button 
              onClick={() => {
                onNavigate('about')
                setIsMobileMenuOpen(false)
              }} 
              className="font-bold transition-colors cursor-pointer text-black hover:text-gray-600 text-left"
            >
              Biz haqimizda
            </button>
            <button 
              onClick={() => {
                onNavigate('home')
                setIsMobileMenuOpen(false)
                setTimeout(() => {
                  const servicesElement = document.getElementById('services-section')
                  if (servicesElement) {
                    servicesElement.scrollIntoView({ 
                      behavior: 'smooth',
                      block: 'start'
                    })
                  }
                }, 100)
              }} 
              className="font-bold transition-colors cursor-pointer text-black hover:text-gray-600 text-left"
            >
              Xizmatlar
            </button>
            <button 
              onClick={() => {
                onNavigate('home')
                setIsMobileMenuOpen(false)
                setTimeout(() => {
                  const specialistsElement = document.getElementById('specialists-section')
                  if (specialistsElement) {
                    specialistsElement.scrollIntoView({ 
                      behavior: 'smooth',
                      block: 'start'
                    })
                  }
                }, 100)
              }} 
              className="font-bold transition-colors cursor-pointer text-black hover:text-gray-600 text-left"
            >
              Mutaxassislar
            </button>
            <button 
              onClick={() => {
                onNavigate('check-up')
                setIsMobileMenuOpen(false)
              }} 
              className="font-bold transition-colors cursor-pointer text-black hover:text-gray-600 text-left"
            >
              Check-up
            </button>
            <button 
              onClick={() => {
                onNavigate('home')
                setIsMobileMenuOpen(false)
                setTimeout(() => {
                  const newsElement = document.getElementById('news-section')
                  if (newsElement) {
                    newsElement.scrollIntoView({ 
                      behavior: 'smooth',
                      block: 'start'
                    })
                  }
                }, 100)
              }} 
              className="font-bold transition-colors cursor-pointer text-black hover:text-gray-600 text-left"
            >
              Yangiliklar
            </button>
            <button 
              onClick={() => {
                onNavigate('vacancy')
                setIsMobileMenuOpen(false)
              }}
              className="font-bold transition-colors cursor-pointer text-black hover:text-gray-600 text-left"
            >
              Vakansiyalar
            </button>
          </div>

          {/* Social Media Section */}
          <div className="mt-auto mb-6">
            <div className="mb-4">
              <span className="font-bold text-black">Bizga yozing:</span>
            </div>
            <div className="flex items-center gap-4">
              <a href="#" className="text-black hover:text-gray-600 transition-colors cursor-pointer">
                <Instagram className="w-6 h-6" />
              </a>
              <a href="#" className="text-black hover:text-gray-600 transition-colors cursor-pointer">
                <Send className="w-6 h-6" />
              </a>
              <a href="#" className="text-black hover:text-gray-600 transition-colors cursor-pointer">
                <Facebook className="w-6 h-6" />
              </a>
            </div>
          </div>

        </div>
      </div>
      <ApplicationForm open={isOpen} onClose={() => setIsOpen(false)} />
    </nav>
  )
}
