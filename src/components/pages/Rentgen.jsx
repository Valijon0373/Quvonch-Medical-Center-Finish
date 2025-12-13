import { useEffect, useRef } from 'react'
import Navbar from '../Navbar'
import Footer from '../Footer'
import boshsuyak from '../../assets/rentgen/boshsuyak.png'
import qolsuyaki from '../../assets/rentgen/qolsuyaki.png'
import suyak from '../../assets/rentgen/suyak.png'
import umurtqa from '../../assets/rentgen/umurtqa.png'
import rentgenIcon from '../../assets/rentgen/rentgen-icon.png'
import Map from '../Map'

export default function Rentgen({ onNavigate }) {
  const mapRef = useRef(null)
  // Sahifa ochilganda yuqoriga scroll qilish
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])
  const rentgenServices = [
    { id: 1, title: "Suyak va bo'g'imlarning rentgenografiyasi", price: "120 000 UZS", image: suyak },
    { id: 2, title: "Bosh suyagi rentgenografiyasi", price: "120 000 UZS", image: boshsuyak },
    { id: 3, title: "Umurtqa pog'onasi rentgenografiyasi", price: "120 000 UZS", image: umurtqa },
    { id: 4, title: "Qo'l suyagi rentgenografiyasi", price: "120 000 UZS", image: qolsuyaki },
    { id: 5, title: "Oyoq suyagi rentgenografiyasi", price: "120 000 UZS", image: suyak },
    { id: 6, title: "Ko'krak qafasi rentgenografiyasi", price: "120 000 UZS", image: umurtqa },
    { id: 7, title: "Kalchasi rentgenografiyasi", price: "120 000 UZS", image: boshsuyak },
    { id: 8, title: "Boshqa rentgen turlari", price: "120 000 UZS", image: qolsuyaki }
  ]

  const filiallar = [
    {
      id: 1,
      title: "Urganch",
      address: [
        "Xaritadan Ko'ring",
        "Urganch city",
        "Xonqa District,",
        "Mo'ljal: Jana Post"
      ]
    },
    {
      id: 2,
      title: "Urganch",
      address: [
        "Xaritadan Ko'ring",
        "Urganch city",
        "Xonqa District,",
        "Mo'ljal: Jana Post"
      ]
    },
    {
      id: 3,
      title: "Urganch",
      address: [
        "Xaritadan Ko'ring",
        "Urganch city",
        "Xonqa District,",
        "Mo'ljal: Jana Post"
      ]
    },
    {
      id: 4,
      title: "Urganch",
      address: [
        "Xaritadan Ko'ring",
        "Urganch city",
        "Xonqa District,",
        "Mo'ljal: Jana Post"
      ]
    }
  ]

  return (
    <div className="min-h-screen bg-white mt-24">
      <Navbar onNavigate={onNavigate} currentSection="rentgen" />

      {/* Hero Section */}
      <section className="pt-0 md:pt-16 pb-16">
        <div className="max-w-8xl mx-auto px-8 lg:px-12">
          <div className="w-full max-w-8xl bg-gradient-to-br from-blue-500 to-blue-600 rounded-3xl p-10 md:p-16 shadow-2xl">
            <div className="flex flex-col md:flex-row items-center gap-8">
              {/* Text Content */}
              <div className="flex-1 text-white">
                <h1 className="text-3xl md:text-5xl font-bold mb-4">
                  Quvonch Medicalda Rentgenografiya
                </h1>
                <p className="mt-10 text-base md:text-lg leading-relaxed mb-6 text-white/90 text-left">
                  Rentgenografiya — bu organ va to'qimalar kasalliklarini tashxislash usuli bo'lib,
                  u rentgen nurlaridan foydalanishga asoslangan. Rentgenografiya yordamida shifokor
                  organning yoki suyakning ko'rinishini, shaklini, joylashuvini va holatini aniqlashi mumkin.
                </p>
                <div className="flex items-center gap-2 text-sm text-white/80">
                  <button
                    onClick={() => onNavigate && onNavigate('home')}
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    Bosh Sahifa
                  </button>
                  <span>/</span>
                  <span className="font-medium text-white">Rentgenografiya</span>
                </div>
              </div>

              {/* Illustration */}
              <div className="flex-shrink-0">
                <div className="relative w-80 h-64 flex items-center justify-center">
                  <img
                    src={rentgenIcon}
                    alt="Rentgen Icon"
                    className="w-full h-full object-contain scale-125"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Rentgen Turlari Section */}
      <section className="py-16" style={{ backgroundColor: '#D6E6FF' }}>
        <div className="container mx-auto px-4">
          {/* Section Header */}
          <div className="text-left mb-16 px-8">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              <span className="bg-blue-500 text-white px-6 py-3 rounded-full text-2xl mr-4">Rentgen</span>
              <span className="text-gray-700">Turlari</span>
            </h2>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 px-8">
            {rentgenServices.map((service) => (
              <div
                key={service.id}
                className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-all duration-300 group flex flex-col items-center text-center w-64 h-80"
              >
                {/* Service Icon */}
                <div className="flex justify-center mb-6">
                  <div className="w-36 h-36 flex items-center justify-center">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-contain"
                    />
                  </div>
                </div>

                {/* Service Title */}
                <h3 className="text-gray-800 font-medium text-sm mb-2 leading-tight flex-1 flex items-center justify-center px-2">
                  {service.title}
                </h3>

                {/* Service Price */}
                <div className="text-center">
                  <span className="text-gray-800 font-bold text-base">
                    {service.price}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Klinikamiz Filiallari Section */}
      <section className="bg-gray-100 py-16 w-full">
        <div className="max-w-7xl mx-auto px-8">
          {/* Header */}
          <div className="text-left mb-16 px-4">
            <h2 
              className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4 cursor-pointer hover:opacity-80 transition-opacity"
              onClick={() => {
                if (mapRef.current) {
                  mapRef.current.scrollIntoView({ behavior: 'smooth' });
                }
              }}
            >
              <span className="bg-blue-500 text-white px-6 py-3 rounded-full text-2xl mr-4">Klinikamiz</span>
              <span className="text-gray-700">Filiallari</span>
            </h2>
          </div>

          {/* Filiallar Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {filiallar.map((filial) => (
              <div key={filial.id} className="flex flex-col">
                <h4 className="font-bold text-gray-800 text-lg mb-2">{filial.title}</h4>
                {filial.address.map((line, index) => (
                  <p key={index} className="text-gray-600 text-sm mb-1">{line}</p>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      <div ref={mapRef}>
        <Map />
      </div>

      <Footer onNavigate={onNavigate} />
    </div>
  )
}
