import { useState, useRef, useEffect } from 'react'
import Navbar from '../Navbar'
import Footer from '../Footer'
import Puls from "../../assets/service/puls.png"
import Map from "../Map"
import { apiUrl, API_BASE_URL } from '../../utils/api'
import doctorLab from '../../assets/utt/DoctorUtt.png'

export default function Analysis({ onNavigate, onDoctorClick }) {
  const mapRef = useRef(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [minPrice, setMinPrice] = useState(17000)
  const [maxPrice, setMaxPrice] = useState(4800000)
  const [visibleCount, setVisibleCount] = useState(5)
  const [allServices, setAllServices] = useState([])
  const [servicesLoading, setServicesLoading] = useState(true)
  const [servicesError, setServicesError] = useState(null)
  const [doctors, setDoctors] = useState([])
  const [loadingDoctors, setLoadingDoctors] = useState(true)
  const [doctorError, setDoctorError] = useState(null)

  // Sahifa ochilganda yuqoriga scroll qilish
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  // Laboratoriya shifokorlarini API'dan yuklash
  useEffect(() => {
    let isCancelled = false

    const fetchDoctors = async () => {
      try {
        setLoadingDoctors(true)
        setDoctorError(null)

        let nextUrl = apiUrl('doctors/')
        const allDoctors = []

        while (nextUrl) {
          let urlToFetch = nextUrl

          // API qaytargan to'liq URL'ni bazaga moslashtirish
          if (nextUrl.startsWith('http')) {
            const urlObj = new URL(nextUrl)
            const path = urlObj.pathname.startsWith('/') ? urlObj.pathname.slice(1) : urlObj.pathname
            urlToFetch = `${API_BASE_URL}/${path}${urlObj.search || ''}`
          }

          const response = await fetch(urlToFetch)
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
          }

          const data = await response.json()

          const mapped = (data.results || []).map((doctor) => {
            const specialty =
              doctor.specialty_uz || doctor.specialty || doctor.specialty_ru || ''

            return {
              id: doctor.id,
              name: doctor.full_name_uz || doctor.full_name || doctor.full_name_ru,
              specialty,
              image: doctor.image || doctorLab
            }
          })

          // Faqat laboratoriya yo'nalishidagi shifokorlar
          const labDoctors = mapped.filter((doc) =>
            (doc.specialty || '').toLowerCase().includes('lab') ||
            (doc.specialty || '').toLowerCase().includes('analiz') ||
            (doc.specialty || '').toLowerCase().includes('laborator')
          )

          allDoctors.push(...labDoctors)
          nextUrl = data.next
        }

        if (!isCancelled) {
          setDoctors(allDoctors)
        }
      } catch (err) {
        console.error('Error fetching doctors:', err)
        if (!isCancelled) {
          setDoctorError("Doktorlar ma'lumotlarini yuklashda xatolik yuz berdi")
        }
      } finally {
        if (!isCancelled) {
          setLoadingDoctors(false)
        }
      }
    }

    fetchDoctors()

    return () => {
      isCancelled = true
    }
  }, [])

  // Fetch services from API
  useEffect(() => {
    let isMounted = true

    const fetchServices = async () => {
      try {
        setServicesLoading(true)
        setServicesError(null)
        let nextUrl = 'https://api.greentraver.uz/services/'
        const collected = []

        while (nextUrl) {
          let urlToFetch = nextUrl
          if (nextUrl.startsWith('http')) {
            const urlObj = new URL(nextUrl)
            const path = urlObj.pathname.startsWith('/') ? urlObj.pathname.slice(1) : urlObj.pathname
            urlToFetch = `https://api.greentraver.uz/${path}${urlObj.search || ''}`
          }

          const res = await fetch(urlToFetch)
          if (!res.ok) throw new Error("Serverdan ma'lumot olishda xatolik")
          const data = await res.json()
          const results = Array.isArray(data?.results) ? data.results : []
          collected.push(...results)
          nextUrl = data.next
        }

        // Filter services for analysis/lab tests (analiz, laboratoriya, lab, анализ)
        const hasAnalysis = (v) => typeof v === 'string' && /analiz|laboratoriya|lab|анализ|лаборатор/i.test(v)
        const analysisServices = collected
          .filter(s => {
            const title = s.type_uz || s.title_uz || s.title || s.title_ru || ''
            const category = s.category_uz || s.category || s.category_ru || ''
            return hasAnalysis(title) || hasAnalysis(category) || hasAnalysis(s.name || '')
          })
          .map((s, index) => ({
            id: s.id || index + 1,
            title: s.type_uz || s.title_uz || s.title || s.title_ru || s.name || 'Xizmat',
            price: parseFloat(s.price || s.cost || 0)
          }))

        if (isMounted) {
          if (analysisServices.length > 0) {
            setAllServices(analysisServices)
            // Update price range based on fetched services
            const prices = analysisServices.map(s => s.price).filter(p => p > 0)
            if (prices.length > 0) {
              setMinPrice(Math.min(...prices))
              setMaxPrice(Math.max(...prices))
            }
          } else {
            setAllServices([])
          }
        }
      } catch (e) {
        if (isMounted) {
          setServicesError(e.message || 'Xatolik yuz berdi')
          setAllServices([])
        }
      } finally {
        if (isMounted) setServicesLoading(false)
      }
    }

    fetchServices()
    return () => { isMounted = false }
  }, [])

  // ===== Slider State =====
  const sliderRef = useRef(null)
  const [dragging, setDragging] = useState(null)

  const prices = { min: 17000, max: 4800000, step: 10000 }

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

  const filteredServices = allServices.filter(
    (s) =>
      s.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      s.price >= minPrice &&
      s.price <= maxPrice
  )

  const visibleServices = filteredServices.slice(0, visibleCount)

  // Reset visible count when filters change
  useEffect(() => {
    setVisibleCount(5)
  }, [filteredServices.length])

  const formatPrice = (price) => price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") + " UZS"

  return (
    <div className="min-h-screen bg-white mt-24">
      <Navbar onNavigate={onNavigate} currentSection="analysis" />

      {/* Hero Section */}
      <section className="pt-0 md:pt-16 pb-16">
        <div className="max-w-8xl mx-auto px-4 md:px-8 lg:px-12">
          <div className="w-full max-w-8xl 
          bg-gradient-to-br from-blue-500 to-blue-600 
          rounded-3xl p-6 md:p-10 lg:p-16 shadow-2xl relative">
            {/* Mobile Layout - Centered Content */}
            <div className="md:hidden text-center text-white">
              <h1 className="text-2xl sm:text-3xl font-bold mb-6">
                Analiz Topshirish
              </h1>
              <p className="text-sm sm:text-base leading-relaxed mb-8 text-white/90 px-2">
                Analiz topshirish — bu salomatligingizni tekshirish va turli kasalliklarni erta aniqlash uchun muhim qadam. Bizning zamonaviy laboratoriyamizda yuqori sifatli tibbiy tekshiruvlar o'tkaziladi. Barcha analizlar xalqaro standartlarga mos keladi va tajribali mutaxassislar tomonidan bajariladi. Biz sizga tez va aniq natijalar taqdim etamiz.
              </p>
              <button className="bg-white text-gray-800 font-bold px-8 py-3 rounded-full text-lg hover:bg-gray-100 transition-colors mb-8">
                Qabulga Yoziling
              </button>
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
                  <span className="font-medium text-white">Analiz Topshirish</span>
                </div>
              </div>
            </div>

            {/* Desktop Layout - Original */}
            <div className="hidden md:flex flex-col lg:flex-row items-center gap-8">
              {/* Text Content */}
              <div className="flex-1 text-white">
                <h1 className="text-3xl lg:text-4xl font-bold mb-4">
                  Analiz Topshirish
                </h1>
                <p className="mt-10 text-base lg:text-lg max-w-4xl 
                leading-relaxed mb-6 text-white/90 text-left">
                  Analiz topshirish — bu salomatligingizni tekshirish va turli kasalliklarni erta aniqlash uchun muhim qadam. Bizning zamonaviy laboratoriyamizda yuqori sifatli tibbiy tekshiruvlar o'tkaziladi. Barcha analizlar xalqaro standartlarga mos keladi va tajribali mutaxassislar tomonidan bajariladi. Biz sizga tez va aniq natijalar taqdim etamiz.
                </p>
                <div className="flex items-center gap-2 text-sm text-white/80">
                  <button
                    onClick={() => onNavigate && onNavigate('home')}
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    Bosh Sahifa
                  </button>
                  <span>/</span>
                  <span className="font-medium text-white">Analiz Topshirish</span>
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
            <h2 className="text-3xl font-bold text-black mb-4">Bizning Laboratoriya Mutaxasislarimiz</h2>
            <p className="text-lg text-black">Sizning salomatligingiz – bizning eng katta qadriyatimiz</p>
          </div>

          {/* Doctor Cards - Mobile Carousel / Desktop Grid */}
          <div className="md:hidden">
            {loadingDoctors ? (
              <div className="text-center text-gray-600">Shifokorlar yuklanmoqda...</div>
            ) : doctorError ? (
              <div className="text-center text-red-600">{doctorError}</div>
            ) : doctors.length === 0 ? (
              <div className="text-center text-gray-600">Laboratoriya bo'yicha shifokorlar topilmadi</div>
            ) : (
              <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide" style={{scrollbarWidth: 'none', msOverflowStyle: 'none'}}>
                {doctors.map((doctor) => (
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
            )}
          </div>

          {/* Desktop Grid */}
          <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {loadingDoctors ? (
              <div className="col-span-full text-center text-gray-600">Shifokorlar yuklanmoqda...</div>
            ) : doctorError ? (
              <div className="col-span-full text-center text-red-600">{doctorError}</div>
            ) : doctors.length === 0 ? (
              <div className="col-span-full text-center text-gray-600">Laboratoriya bo'yicha shifokorlar topilmadi</div>
            ) : (
              doctors.map((doctor) => (
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
              ))
            )}
          </div>
        </div>
      </section>

      {/* ========= SEARCH AND FILTERS ========= */}
      <section id="services-section" className="py-10 bg-gray-50">
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
            {filteredServices.map((s, index) => {
              const isVisible = index < visibleCount
            return (
            <div
              key={s.id}
                className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 flex justify-between items-center gap-4 transition-all duration-2000 ease-out"
                style={
                isVisible
                ? { opacity: 1, transform: 'translateY(0) scale(1)', display: 'flex' }
                : { opacity: 0, transform: 'translateY(-2rem) scale(0.9)', display: 'none' }
                }
            >
                <span className="text-gray-800 flex-1 break-words">{s.title}</span>
                  <span className="font-bold text-blue-600 text-lg whitespace-nowrap flex-shrink-0">{formatPrice(s.price)}</span>
              </div>
            )
            })}

            {filteredServices.length === 0 && (
            <div className="bg-gray-100 p-4 text-center text-gray-500 rounded-lg">
            Hech narsa topilmadi
            </div>
            )}
            </div>
          </div>
        </div>

        {filteredServices.length > 5 && (
        <div className="flex justify-center py-10">
        <button
        onClick={() => {
        if (visibleCount >= filteredServices.length) {
        setVisibleCount(5)
        } else {
          setVisibleCount(prev => Math.min(prev + 5, filteredServices.length))
          }
        }}
          className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-xl shadow-md transition-all duration-300"
        >
          {visibleCount >= filteredServices.length ? 'Yopish ↑' : 'Batafsil ↓'}
          </button>
          </div>
        )}
      </section>

      <img className="mt-10 w-full mb-10" src={Puls} alt="plus" />

      <div className="text-center mb-12 rounded-[1rem]">
        <h2 
          className="text-3xl font-bold text-black mb-4 cursor-pointer hover:text-blue-500 transition-colors"
          onClick={() => {
            if (mapRef.current) {
              mapRef.current.scrollIntoView({ behavior: 'smooth' });
            }
          }}
        >
          Klinikamiz Filiallari
        </h2>
        <p className="text-lg text-black">Sizning salomatligingiz – bizning eng katta qadriyatimiz</p>
      </div>

      {/* Clinic Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-20 rounded-[1rem] max-w-7xl mx-auto px-4">
        <div className="bg-blue-500 text-white p-6 rounded-lg">
          <h3 className="font-bold text-lg mb-4">Urganch</h3>
          <div className="space-y-2 text-sm">
            <p className="underline cursor-pointer hover:text-blue-200">Xaritadan Ko'ring</p>
            <p>Urganch city</p>
            <p>Xonqa District,</p>
            <p className="font-semibold">Mo'ljal: Jana Post</p>
          </div>
        </div>

        <div className="bg-blue-500 text-white p-6 rounded-[1rem]">
          <h3 className="font-bold text-lg mb-4">Urganch</h3>
          <div className="space-y-2 text-sm">
            <p className="underline cursor-pointer hover:text-blue-200">Xaritadan Ko'ring</p>
            <p>Urganch city</p>
            <p>Xonqa District,</p>
            <p className="font-semibold">Mo'ljal: Jana Post</p>
          </div>
        </div>

        {/* Second Branch */}
        <div className="bg-blue-500 text-white p-6 rounded-[1rem]">
          <h3 className="font-bold text-lg mb-4">Urganch</h3>
          <div className="space-y-2 text-sm">
            <p className="underline cursor-pointer hover:text-blue-200">Xaritadan Ko'ring</p>
            <p>Urganch city</p>
            <p>Xonqa District,</p>
            <p className="font-semibold">Mo'ljal: Jana Post</p>
          </div>
        </div>

        <div className="bg-blue-500 text-white p-6 rounded-[1rem]">
          <h3 className="font-bold text-lg mb-4">Urganch</h3>
          <div className="space-y-2 text-sm">
            <p className="underline cursor-pointer hover:text-blue-200">Xaritadan Ko'ring</p>
            <p>Urganch city</p>
            <p>Xonqa District,</p>
            <p className="font-semibold">Mo'ljal: Jana Post</p>
          </div>
        </div>
      </div>
      
      <div ref={mapRef}>
        <Map />
      </div>
      <Footer onNavigate={onNavigate} />
    </div>
  )
}
