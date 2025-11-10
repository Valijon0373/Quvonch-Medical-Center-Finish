import { useState } from 'react'
import Navbar from '../Navbar'
import Footer from '../Footer'
import Puls from "../../assets/service/puls.png"
import Map from "../Map"

export default function Analysis({ onNavigate }) {


  const allServices = [
    { title: "Qorin bo'shlig'i organlarining kompleks UZI", price: 200000 },
    { title: "Qon tahlili (umumiy)", price: 120000 },
    { title: "EKG tekshiruv", price: 150000 },
    { title: "Rentgen (ko‘krak qafasi)", price: 180000 },
    { title: "Jigar tekshiruvi", price: 250000 },
    { title: "Oshqozon endoskopiyasi", price: 300000 },
  ]

  const [searchTerm, setSearchTerm] = useState("")
  const [minPrice, setMinPrice] = useState(75000)
  const [maxPrice, setMaxPrice] = useState(350000)
  const [analysisType, setAnalysisType] = useState("uzi")
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)

  // Filtering
  const filteredServices = allServices.filter(
    (s) =>
      s.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      s.price >= minPrice &&
      s.price <= maxPrice
  )

  return (
  <div className="min-h-screen bg-white mt-16">
    <Navbar onNavigate={onNavigate} currentSection="analysis" />

      {/* Hero Section */}
      <section className="pt-20 pb-10">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          
          <div className="bg-gradient-to-br from-blue-500
           to-blue-600 rounded-3xl p-12 md:p-20 ">
            <div className="flex flex-col md:flex-row items-start gap-8">
              <div className="flex-1 text-white">
                <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-4 text-left whitespace-nowrap">
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

      {/* Search & Services Section */}
      <section className={`py-8 md:py-16 bg-gray-50`}>
        <div className="max-w-7xl container mx-auto px-4">

          {/* Search Bar - Mobile first */}
          <div className="flex justify-start mb-6 md:mb-8">
            <div className="flex items-center gap-3 md:gap-4 w-full max-w-7xl">
              {/* Filter button - shown on mobile as icon, hidden on md where sidebar exists */}
              <button
                aria-label="Filterlar"
                className="inline-flex md:hidden items-center justify-center w-10 h-10 rounded-lg border border-gray-300 bg-white"
                onClick={() => setMobileFiltersOpen(true)}
              >
                <svg className="w-5 h-5 text-gray-700" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M7 12h10M10 18h6" />
                </svg>
              </button>

              <div className="relative flex-1">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="Qidirish"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 md:py-3 border border-gray-300 rounded-xl md:rounded-full focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <button
                className="hidden sm:inline-flex border-2 border-blue-500 text-blue-500 font-medium px-6 md:px-10 py-2.5 md:py-3 gap-4 rounded-xl md:rounded-full hover:bg-blue-500 hover:text-white transition-colors duration-200"
              >
                Izlash
              </button>
            </div>
          </div>

          {/* Mobile collapsible filters directly under search */}
          <div className={`md:hidden overflow-hidden transition-all duration-300 ${mobileFiltersOpen ? 'max-h-[520px] mt-2' : 'max-h-0'}`}>
            <div className="w-full rounded-2xl bg-blue-300 p-6 shadow">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-800">Filterlar</h3>
                <button
                  aria-label="Yopish"
                  className="w-9 h-9 inline-flex items-center justify-center rounded-full bg-white text-gray-700"
                  onClick={() => setMobileFiltersOpen(false)}
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Price Filter */}
              <div className="mb-6">
                <h4 className="font-bold text-gray-700 mb-3">Narx</h4>
                <div className="space-y-3">
                  <div className="bg-white rounded-2xl py-3 px-4">
                    <input
                      type="range"
                      min="75000"
                      max="350000"
                      step="25000"
                      value={maxPrice}
                      onChange={(e) => setMaxPrice(parseInt(e.target.value))}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    />
                  </div>
                  <div className="flex justify-between">
                    <input
                      type="number"
                      value={minPrice}
                      onChange={(e) => setMinPrice(parseInt(e.target.value))}
                      className="w-28 text-center bg-white border border-gray-300 rounded-xl px-2 py-2"
                    />
                    <input
                      type="number"
                      value={maxPrice}
                      onChange={(e) => setMaxPrice(parseInt(e.target.value))}
                      className="w-28 text-center bg-white border border-gray-300 rounded-xl px-2 py-2"
                    />
                  </div>
                </div>
              </div>

              {/* Analysis Type Filter */}
              <div className="mb-2">
                <h4 className="font-bold text-gray-700 mb-3">Tahlil turi</h4>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="mobile-analysis-type"
                    value="uzi"
                    checked={analysisType === 'uzi'}
                    onChange={() => setAnalysisType('uzi')}
                    className="text-blue-500"
                  />
                  <span className="text-sm text-gray-800">Ultratovush tekshiruvlari (UZI)</span>
                </label>
              </div>

              <div className="mt-6 flex gap-3">
                <button
                  className="flex-1 bg-white text-gray-800 px-4 py-3 rounded-xl"
                  onClick={() => setMobileFiltersOpen(false)}
                >
                  Bekor qilish
                </button>
                <button
                  className="flex-1 bg-blue-600 text-white px-4 py-3 rounded-xl"
                  onClick={() => setMobileFiltersOpen(false)}
                >
                  Qo'llash
                </button>
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-start gap-6 md:gap-8">
            {/* Filter Panel */}
            <div className="hidden md:block w-80 bg-blue-300 rounded-2xl p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-6">Filterlar</h3>

              {/* Price Filter */}
              <div className="mb-6">
                <h4 className="font-bold text-gray-700 mb-3">Narx</h4>
                <div className="space-y-3">
                  <input
                    type="range"
                    min="75000"
                    max="350000"
                    step="25000"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(parseInt(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between text-sm text-gray-600">
                    <input
                      type="number"
                      value={minPrice}
                      onChange={(e) => setMinPrice(parseInt(e.target.value))}
                      className="w-20 text-center border border-gray-300 rounded px-1 py-1"
                    />
                    <input
                      type="number"
                      value={maxPrice}
                      onChange={(e) => setMaxPrice(parseInt(e.target.value))}
                      className="w-20 text-center border border-gray-300 rounded px-1 py-1"
                    />
                  </div>
                </div>
              </div>

              {/* Analysis Type Filter */}
              <div>
                <h4 className="font-bold text-gray-700 mb-3">Tahlil turi</h4>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="analysis-type"
                      value="uzi"
                      defaultChecked
                      className="mr-2 text-blue-500"
                    />
                    <span className="text-sm text-gray-700">Ultratovush tekshiruvlari (UZI)</span>
                  </label>
                </div>
              </div>
            </div>
            
            {/* Service Cards */}
            <div className="w-full max-w-5xl">
              <div className="space-y-3 md:space-y-4">
                {filteredServices.map((service, index) => (
                  <div key={index} className="bg-gray-100 rounded-xl md:rounded-lg p-4 md:p-4 flex justify-between items-center">
                    <div className="flex-1">
                      <p className="text-gray-800 text-sm md:text-base mb-2">{service.title}</p>
                      <p className="font-bold text-gray-900">{service.price.toLocaleString()} UZS</p>
                    </div>
                    <button className="hidden md:inline-flex bg-blue-500 text-white px-8 py-2 rounded-full text-base hover:bg-blue-600 transition-colors">
                      Qo'shish
                    </button>
                  </div>
                ))}
    
              </div>
            </div>
          </div>
        </div>

          {/* Batafsil Button - Bottom Center */}
      <div className="flex justify-center py-8 md:py-12">
        <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 md:px-8 py-3 md:py-4 rounded-xl md:rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 inline-flex items-center gap-2 text-base md:text-lg">
          Batafsil →
        </button>
      </div>
      </section>
      {/* Mobile Filters Modal removed in favor of inline collapsible panel */}
      


      <img className="mt-10 w-full mb-10" src={Puls} alt="plus" />



      <div className="text-center mb-12 rounded-[1rem]">
        <h2 className="text-3xl font-bold text-black mb-4">Klinikamiz Filiallari</h2>
        <p className="text-lg text-black">Sizning salomatligingiz – bizning eng katta qadriyatimiz</p>
      </div>

      {/* Clinic Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-20 rounded-[1rem] max-w-7xl mx-auto px-4">
        {/* MIROBOT Branch */}
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

        {/* Second Branch */}
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

        {/* Third Branch */}
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

        {/* Fourth Branch */}
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
