import { useState, useRef } from 'react'
import Navbar from '../Navbar'
import Footer from '../Footer'
import Puls from "../../assets/service/puls.png"
import Map from "../Map"

export default function Analysis({ onNavigate }) {
  const [searchTerm, setSearchTerm] = useState("")
  const [minPrice, setMinPrice] = useState(75000)
  const [maxPrice, setMaxPrice] = useState(350000)

  // ===== Slider State =====
  const sliderRef = useRef(null)
  const [dragging, setDragging] = useState(null)

  const prices = { min: 75000, max: 350000, step: 25000 }

  // ===== Drag Update =====
  const updatePrice = (clientX) => {
    if (!sliderRef.current) return
    const rect = sliderRef.current.getBoundingClientRect()
    const percent = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width))
    const value = Math.round((percent * (prices.max - prices.min) + prices.min) / prices.step) * prices.step

    if (dragging === 'min' && value < maxPrice) {
      setMinPrice(Math.max(prices.min, value))
    } else if (dragging === 'max' && value > minPrice) {
      setMaxPrice(Math.min(prices.max, value))
    }
  }

  const handleMouseMove = (e) => dragging && updatePrice(e.clientX)
  const handleTouchMove = (e) => dragging && updatePrice(e.touches[0].clientX)
  const handleMouseUp = () => setDragging(null)

  const allServices = [
    { id: 1, title: "Qorin bo'shlig'i organlarining kompleks UZI", price: 200000 },
    { id: 2, title: "Qon tahlili (umumiy)", price: 120000 },
    { id: 3, title: "EKG tekshiruv", price: 150000 },
    { id: 4, title: "Rentgen (ko'krak qafasi)", price: 180000 },
    { id: 5, title: "Jigar tekshiruvi", price: 250000 },
    { id: 6, title: "Oshqozon endoskopiyasi", price: 300000 },
  ]

  const filteredServices = allServices.filter(
    (s) =>
      s.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      s.price >= minPrice &&
      s.price <= maxPrice
  )

  const formatPrice = (price) => price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") + " UZS"

  return (
    <div className="min-h-screen bg-white mt-16">
      <Navbar onNavigate={onNavigate} currentSection="analysis" />

      {/* Hero Section */}
      <section className="pt-0 md:pt-16 pb-16">
        <div className="max-w-8xl mx-auto px-4 md:px-8 lg:px-12">
          <div className="w-full max-w-8xl 
          bg-gradient-to-br from-blue-500 to-blue-600 
          rounded-3xl p-6 md:p-10 lg:p-16 shadow-2xl relative">
            <div className="flex flex-col md:flex-row items-start gap-8">
              <div className="flex-1 text-white">
                <h1 className="text-3xl lg:text-4xl font-bold mb-4">
                  Analiz Topshirish
                </h1>
                <div className="flex items-center gap-2 text-sm text-white/80 justify-start">
                  <button
                    onClick={() => onNavigate && onNavigate('home')}
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    Bosh Sahifa
                  </button>
                  <span>/</span>
                  <span className="font-medium text-white">
                    Analiz Topshirish
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========= SEARCH AND FILTERS ========= */}
      <section className="py-10 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          {/* === Search Bar === */}
          <div className="flex gap-4 mb-6">
            <input
              type="text"
              placeholder="Qidirish"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 border border-gray-300 rounded-xl px-4 py-2.5"
            />
            <button className="hidden sm:inline-flex border-2 border-blue-500 text-blue-500 px-6 py-2.5 rounded-xl">
              Izlash
            </button>
          </div>

          {/* === Desktop Filters === */}
          <div className="flex gap-6">
            <div className="hidden md:block w-80 bg-blue-300 p-6 rounded-2xl">
              <h3 className="font-bold mb-4 text-gray-800 text-lg">Narx Filter</h3>

              {/* ====== SLIDER ====== */}
              <div
                ref={sliderRef}
                className="relative w-full h-6 flex items-center"
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleMouseUp}
              >
                <div className="absolute w-full h-1 bg-gray-300 rounded-full" />
                <div
                  className="absolute h-1 bg-blue-500 rounded-full"
                  style={{
                    left: `${((minPrice - prices.min) / (prices.max - prices.min)) * 100}%`,
                    right: `${100 - ((maxPrice - prices.min) / (prices.max - prices.min)) * 100}%`
                  }}
                />

                <div
                  className={`absolute w-5 h-5 bg-white border-2 border-blue-500 rounded-full shadow-md cursor-grab ${
                    dragging === "min" ? "scale-110 cursor-grabbing" : "hover:scale-110"
                  }`}
                  style={{ left: `calc(${((minPrice - prices.min) / (prices.max - prices.min)) * 100}% - 10px)` }}
                  onMouseDown={() => setDragging("min")}
                  onTouchStart={() => setDragging("min")}
                />
                <div
                  className={`absolute w-5 h-5 bg-white border-2 border-blue-500 rounded-full shadow-md cursor-grab ${
                    dragging === "max" ? "scale-110 cursor-grabbing" : "hover:scale-110"
                  }`}
                  style={{ left: `calc(${((maxPrice - prices.min) / (prices.max - prices.min)) * 100}% - 10px)` }}
                  onMouseDown={() => setDragging("max")}
                  onTouchStart={() => setDragging("max")}
                />
              </div>

              {/* === Input Values === */}
              <div className="flex justify-between mt-4">
                <input
                  type="number"
                  value={minPrice}
                  onChange={(e) =>
                    setMinPrice(Math.min(maxPrice - prices.step, Math.max(prices.min, +e.target.value)))
                  }
                  className="w-24 border rounded-lg px-2 py-1 text-center"
                />
                <input
                  type="number"
                  value={maxPrice}
                  onChange={(e) =>
                    setMaxPrice(Math.max(minPrice + prices.step, Math.min(prices.max, +e.target.value)))
                  }
                  className="w-24 border rounded-lg px-2 py-1 text-center"
                />
              </div>
            </div>

            {/* === SERVICES LIST === */}
            <div className="flex-1 space-y-4">
              {filteredServices.map((s) => (
                <div key={s.id} className="bg-gray-100 rounded-lg p-4 flex justify-between">
                  <span className="text-gray-800">{s.title}</span>
                  <span className="font-bold text-gray-900">{formatPrice(s.price)}</span>
                </div>
              ))}

              {filteredServices.length === 0 && (
                <div className="bg-gray-100 p-4 text-center text-gray-500 rounded-lg">
                  Hech narsa topilmadi
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="flex justify-center py-10">
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-xl shadow-md">
            Batafsil →
          </button>
        </div>
      </section>

      <img className="mt-10 w-full mb-10" src={Puls} alt="plus" />

      <div className="text-center mb-12 rounded-[1rem]">
        <h2 className="text-3xl font-bold text-black mb-4">Klinikamiz Filiallari</h2>
        <p className="text-lg text-black">Sizning salomatligingiz – bizning eng katta qadriyatimiz</p>
      </div>

      {/* Clinic Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-20 rounded-[1rem] max-w-7xl mx-auto px-4">
        <div className="bg-blue-500 text-white p-6 rounded-lg">
          <h3 className="font-bold text-lg mb-4">MIROBOT</h3>
          <div className="space-y-2 text-sm">
            <p className="underline cursor-pointer hover:text-blue-200">Xaritadan Ko'ring</p>
            <p>Tashkent City,</p>
            <p>Mirabad District,</p>
            <p>Avliyoota St., 1-2</p>
            <p className="font-semibold">Mo'ljal: Mirabad Market</p>
          </div>
        </div>

        <div className="bg-blue-500 text-white p-6 rounded-[1rem]">
          <h3 className="font-bold text-lg mb-4">MIROBOT</h3>
          <div className="space-y-2 text-sm">
            <p className="underline cursor-pointer hover:text-blue-200">Xaritadan Ko'ring</p>
            <p>Tashkent City,</p>
            <p>Mirabad District,</p>
            <p>Avliyoota St., 1-2</p>
            <p className="font-semibold">Mo'ljal: Mirabad Market</p>
          </div>
        </div>

        <div className="bg-blue-500 text-white p-6 rounded-[1rem]">
          <h3 className="font-bold text-lg mb-4">MIROBOT</h3>
          <div className="space-y-2 text-sm">
            <p className="underline cursor-pointer hover:text-blue-200">Xaritadan Ko'ring</p>
            <p>Tashkent City,</p>
            <p>Mirabad District,</p>
            <p>Avliyoota St., 1-2</p>
            <p className="font-semibold">Mo'ljal: Mirabad Market</p>
          </div>
        </div>

        <div className="bg-blue-500 text-white p-6 rounded-[1rem]">
          <h3 className="font-bold text-lg mb-4">MIROBOT</h3>
          <div className="space-y-2 text-sm">
            <p className="underline cursor-pointer hover:text-blue-200">Xaritadan Ko'ring</p>
            <p>Tashkent City,</p>
            <p>Mirabad District,</p>
            <p>Avliyoota St., 1-2</p>
            <p className="font-semibold">Mo'ljal: Mirabad Market</p>
          </div>
        </div>
      </div>
      
      <Map />
      <Footer onNavigate={onNavigate} />
    </div>
  )
}
