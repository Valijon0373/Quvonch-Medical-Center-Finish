import Navbar from '../Navbar'
import Footer from '../Footer'
import Puls from '../../assets/service/puls.png'
import Map from '../Map'
import { useEffect, useMemo, useState } from 'react'
import { apiUrl, API_BASE_URL } from '../../utils/api.js'
import Loader from '../loader/Loader'

export default function Neurology({ onDoctorClick, onNavigate }) {
  const [allDoctors, setAllDoctors] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Sahifa ochilganda yuqoriga scroll qilish
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  useEffect(() => {
    let isMounted = true

    const fetchDoctors = async () => {
      try {
        setLoading(true)
        setError(null)
        let nextUrl = apiUrl('doctors/')
        const collected = []

        while (nextUrl) {
          let urlToFetch = nextUrl
          if (nextUrl.startsWith('http')) {
            const urlObj = new URL(nextUrl)
            const path = urlObj.pathname.startsWith('/') ? urlObj.pathname.slice(1) : urlObj.pathname
            urlToFetch = `${API_BASE_URL}/${path}${urlObj.search || ''}`
          }

          const res = await fetch(urlToFetch)
          if (!res.ok) throw new Error('Serverdan ma’lumot olishda xatolik')
          const data = await res.json()
          const results = Array.isArray(data?.results) ? data.results : []
          collected.push(...results)
          nextUrl = data.next
        }

        if (isMounted) setAllDoctors(collected)
      } catch (e) {
        if (isMounted) setError(e.message || 'Xatolik yuz berdi')
      } finally {
        if (isMounted) setLoading(false)
      }
    }

    fetchDoctors()
    return () => { isMounted = false }
  }, [])

  const doctors = useMemo(() => {
    const hasNevro = (v) => typeof v === 'string' && /nevro|neuro|невро|невролог/i.test(v)
    return allDoctors
      .filter(d => hasNevro(d?.specialty) || hasNevro(d?.specialty_uz) || hasNevro(d?.specialty_ru))
      .map(d => ({
        id: d.id,
        name: d.full_name_uz || d.full_name || d.full_name_ru || 'Shifokor',
        specialty: d.specialty_uz || d.specialty || d.specialty_ru || 'Nevrolog',
        image: d.image || '/placeholder.svg',
      }))
  }, [allDoctors])

  // Services and price filter state (Neurology)
  const services = [
    { title: "Nevrolog qabul (birlamchi konsultatsiya)", price: 150000 },
    { title: "Nevrolog qabul (takroriy konsultatsiya)", price: 120000 },
    { title: "EEG — Elektroensefalografiya", price: 250000 },
    { title: "ENMG — Elektroneyromiografiya", price: 300000 },
    { title: "UZDG — Miya va bo'yin tomirlari doppleri", price: 220000 },
    { title: "Bosh og'riqlar bo'yicha kompleks maslahat", price: 180000 },
  ]

  const minServicePrice = useMemo(() => Math.min(...services.map(s => s.price)), [services])
  const maxServicePrice = useMemo(() => Math.max(...services.map(s => s.price)), [services])
  const [maxPrice, setMaxPrice] = useState(maxServicePrice)

  const handleMaxChange = (value) => {
    const clamped = Math.min(Math.max(value, minServicePrice), maxServicePrice)
    setMaxPrice(clamped)
  }

  const formatPrice = (v) => new Intl.NumberFormat('uz-UZ').format(v) + ' UZS'

  const filteredServices = services.filter(s => s.price >= minServicePrice && s.price <= maxPrice)

 
  return (
    <div className="min-h-screen bg-white mt-24">
      <Navbar onNavigate={onNavigate} currentSection="neurology" />

      {/* Hero Section */
      }
      <section className="pt-0 md:pt-16 pb-16">
        <div className="max-w-8xl mx-auto px-4 md:px-8 lg:px-12">
          <div className="w-full max-w-8xl 
          bg-gradient-to-br from-blue-500 to-blue-600 
          rounded-3xl p-6 md:p-10 lg:p-16 shadow-2xl relative">
            {/* Mobile Layout - Centered Content */}
            <div className="md:hidden text-center text-white">
              <h1 className="text-2xl sm:text-3xl font-bold mb-6">
                Nevrologiya
              </h1>
              <p className="text-sm sm:text-base leading-relaxed mb-8 text-white/90 px-2">
                Asab yollarizda shamollash bosa bizara yatavara
              </p>
              
              {/* Breadcrumbs at bottom left */}
              <div className="absolute bottom-4 left-4 text-sm text-white/80">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onNavigate && onNavigate('home')}
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    Bosh Sahifa
                  </button>
                  <span>/</span>
                  <span className="font-medium text-white">Nevrologiya</span>
                </div>
              </div>
            </div>

            {/* Desktop Layout - Original */}
            <div className="hidden md:flex flex-col lg:flex-row items-center gap-8">
              {/* Text Content */}
              <div className="flex-1 text-white">
                <h1 className="text-3xl lg:text-4xl font-bold mb-4">
                  Nevrologiya
                </h1>
                <p className="mt-10 text-base lg:text-lg max-w-4xl 
                leading-relaxed mb-6 text-white/90 text-left">
                  Nevrologiya — markaziy va periferik asab tizimi kasalliklarini tashxislash va davolash yo'nalishi. Bizning mutaxassislar bosh og'rig'i, bosh aylanishi, uyqusizlik, nevralgiyalar, insult oqibatlari kabi holatlarda yordam ko'rsatadi.
                </p>
                <div className="flex items-center gap-2 text-sm text-white/80">
                  <button
                    onClick={() => onNavigate && onNavigate('home')}
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    Bosh Sahifa
                  </button>
                  <span>/</span>
                  <span className="font-medium text-white">Nevrologiya</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      
      {/* Doctors Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-black mb-4">Bizning Nevrolog Mutaxasislarimiz</h2>
            <p className="text-lg text-black">Sizning salomatligingiz – bizning eng katta qadriyatimiz</p>
          </div>

          {/* Doctor Cards - Mobile Carousel / Desktop Grid */}
          <div className="md:hidden">
            {/* Mobile Carousel */}
            <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide" style={{scrollbarWidth: 'none', msOverflowStyle: 'none'}}>
              {loading ? (
                <div className="text-center w-full py-8 flex justify-center">
                  <Loader fullScreen={false} size={50} />
                </div>
              ) : error ? (
                <div className="text-center w-full py-8 text-red-600">{error}</div>
              ) : doctors.length === 0 ? (
                <div className="text-center w-full py-8 text-gray-600">Nevrolog shifokorlar topilmadi</div>
              ) : doctors.map((doctor) => (
                <div 
                  key={doctor.id}
                  className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group flex-shrink-0 w-80"
                >
                  {/* Doctor Image */}
                  <div className="relative overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 aspect-[4/3]">
                    <img
                      src={doctor.image}
                      alt={doctor.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  {/* Doctor Info */}
                  <div className="p-4">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">
                      {doctor.name}
                    </h3>

                    <div className="mb-4">
                      <span className="bg-blue-500 text-white text-sm font-semibold px-3 py-1 rounded-full">
                        {doctor.specialty}
                      </span>
                    </div>

                    {/* Action Buttons */}
                    <div className="space-y-2">
                      <button 
                        onClick={() => onDoctorClick && onDoctorClick(doctor.id)}
                        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2.5 px-4 rounded-lg transition-colors duration-200"
                      >
                        Navbatga Yozilish
                      </button>
                      <button 
                        onClick={() => onDoctorClick && onDoctorClick(doctor.id)}
                        className="w-full bg-white border border-blue-500 text-blue-500 hover:bg-blue-50 font-medium py-2.5 px-4 rounded-lg transition-colors duration-200"
                      >
                        Ko'proq Ma'lumot
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Desktop Grid */}
          <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {loading ? (
              <div className="col-span-full text-center py-8 flex justify-center">
                <Loader fullScreen={false} size={50} />
              </div>
            ) : error ? (
              <div className="col-span-full text-center py-8 text-red-600">{error}</div>
            ) : doctors.length === 0 ? (
              <div className="col-span-full text-center py-8 text-gray-600">Nevrolog shifokorlar topilmadi</div>
            ) : doctors.map((doctor) => (
              <div 
                key={doctor.id}
                className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group"
              >
                {/* Doctor Image */}
                <div className="relative overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 aspect-[4/3]">
                  <img
                    src={doctor.image}
                    alt={doctor.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* Doctor Info */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {doctor.name}
                  </h3>

                  <div className="mb-4">
                    <span className="bg-blue-500 text-white text-sm font-semibold px-3 py-1 rounded-full">
                      {doctor.specialty}
                    </span>
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-2">
                    <button 
                      onClick={() => onDoctorClick && onDoctorClick(doctor.id)}
                      className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2.5 px-4 rounded-lg transition-colors duration-200"
                    >
                      Navbatga Yozilish
                    </button>
                    <button 
                      onClick={() => onDoctorClick && onDoctorClick(doctor.id)}
                      className="w-full bg-white border border-blue-500 text-blue-500 hover:bg-blue-50 font-medium py-2.5 px-4 rounded-lg transition-colors duration-200"
                    >
                      Ko'proq Ma'lumot
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>



      {/* Search and Filter Section */}
      <section className="py-8 md:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          {/* Mobile Layout */}
          <div className="md:hidden">
            {/* Primary Search */}
            <div className="mb-6">
              <div className="relative mb-4">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="Qidirish"
                  className="w-full pl-10 pr-4 py-3 bg-gray-100 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
              <button className="w-full border-2 border-blue-500 text-blue-500 bg-white hover:bg-blue-50 font-medium py-3 px-4 rounded-lg transition-colors">
                Izlash
              </button>
            </div>

            {/* Filter and Secondary Search */}
            <div className="flex gap-3 mb-6">
              <button className="w-12 h-12 bg-white border border-gray-300 rounded-lg flex items-center justify-center">
                <svg className="h-5 w-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                </svg>
              </button>
              <div className="flex-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder=""
                  className="w-full pl-10 pr-4 py-3 bg-gray-100 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
            </div>

            {/* Service Cards (Neurology) */}
            <div className="space-y-3 mb-6">
              {[
                { title: "Nevrolog qabul (birlamchi konsultatsiya)", price: "150 000 UZS" },
                { title: "Nevrolog qabul (takroriy konsultatsiya)", price: "120 000 UZS" },
                { title: "EEG — Elektroensefalografiya", price: "250 000 UZS" },
                { title: "ENMG — Elektroneyromiografiya", price: "300 000 UZS" }
              ].map((service, index) => (
                <div key={index} className="bg-gray-100 rounded-lg p-4">
                  <p className="text-gray-800 text-sm mb-2">{service.title}</p>
                  <p className="font-bold text-gray-900">{service.price}</p>
                </div>
              ))}
            </div>

            {/* Batafsil Button */}
            <div className="mb-8">
              <button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-4 px-6 rounded-lg transition-colors">
                Batafsil →
              </button>
            </div>
          </div>

          {/* Desktop Layout */}
          <div className="hidden md:block">
            {/* Search Bar */}
            <div className="mb-8">
              <div className="flex gap-4 max-w-7xl justify-end">
                <div className="flex-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <input
                    type="text"
                    placeholder="Qidirish"
                    className="w-full pl-10 pr-4 py-3 bg-gray-100 border-0 rounded-full focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
                <button className="px-8 py-3 border-2 border-blue-500 text-blue-500 bg-white rounded-full font-medium hover:bg-blue-50 transition-colors">
                  Izlash
                </button>
              </div>
            </div>

            <div className="flex gap-8">
              {/* Filter Panel */}
              <div className="w-80 bg-blue-100 rounded-3xl p-6">
                {/* Price Filter */}
                <div className="mb-8">
                  <h4 className="font-bold text-black mb-4">Narx Filteri</h4>
                  <div className="space-y-4">
                    {/* Single Range Slider (max price) */}
                    <div className="space-y-3">
                      <input
                        type="range"
                        min={minServicePrice}
                        max={maxServicePrice}
                        step={5000}
                        value={maxPrice}
                        onChange={(e) => handleMaxChange(Number(e.target.value))}
                        className="w-full accent-blue-500"
                      />
                      <div className="flex gap-2">
                        <div className="flex-1 px-3 py-2 bg-gray-200 border-0 rounded-lg text-sm text-center text-black font-medium">
                          {formatPrice(minServicePrice)}
                        </div>
                        <div className="flex-1 px-3 py-2 bg-gray-200 border-0 rounded-lg text-sm text-center text-black font-medium">
                          {formatPrice(maxPrice)}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Analysis Type Filter */}
 
              </div>

              {/* Service Cards */}
              <div className="flex-1">
                <div className="space-y-4">
                  {filteredServices.map((service, index) => (
                    <div key={index} className="bg-gray-100 
                    rounded-lg p-4 transition-opacity transition-transform duration-300 ease-out">
                      <p className="text-gray-800 text-sm mb-2">{service.title}</p>
                      <p className="font-bold text-gray-900">{formatPrice(service.price)}</p>
                    </div>
                  ))}
                </div>
                
                {/* Batafsil Button */}
                <div className="mt-8 text-center">
                  <button className="bg-blue-500 hover:bg-blue-600 
                  text-white font-semibold px-8 py-4 rounded-lg
                   shadow-lg hover:shadow-xl transition-all 
                   duration-200 inline-flex items-center gap-2 
                   text-lg">
                  Batafsil →

                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


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
