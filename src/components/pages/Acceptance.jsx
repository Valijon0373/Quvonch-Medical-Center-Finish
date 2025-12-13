"use client"

import { useState, useEffect, useRef } from "react"
import { ChevronDown, Search, Filter } from "lucide-react"
import Map from "../Map"
import Footer from "../Footer"
import DoctorProfile from "./DoctorProfile"
import Puls from "../../assets/service/puls.png"
import { apiUrl } from "../../utils/api"
import Loader from "../loader/Loader"

export default function DoctorAcceptance({ onNavigate, onDoctorClick }) {
  const mapRef = useRef(null)
  const [doctorData, setDoctorData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedSpecialty, setSelectedSpecialty] = useState("")
  const [selectedDoctorId, setSelectedDoctorId] = useState(null)
  const [showMobileFilter, setShowMobileFilter] = useState(false)
  const [showMobileSearch, setShowMobileSearch] = useState(false)

  // Sahifa ochilganda yuqoriga scroll qilish
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  // Fetch doctors from API
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        setLoading(true)
        setError(null)
        
        const response = await fetch(apiUrl('doctors/'))
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        
        const data = await response.json()
        
        // Map API response to component format
        const mappedDoctors = data.results?.map((doctor) => ({
          id: doctor.id,
          name: doctor.full_name_uz || doctor.full_name || doctor.full_name_ru,
          specialty: doctor.specialty_uz || doctor.specialty || doctor.specialty_ru,
          image: doctor.image || "/placeholder.svg",
          experience: doctor.experience || 0,
        })) || []
        
        setDoctorData(mappedDoctors)
      } catch (err) {
        console.error('Error fetching doctors:', err)
        setError('Doktorlar ma\'lumotlarini yuklashda xatolik yuz berdi')
      } finally {
        setLoading(false)
      }
    }
    
    fetchDoctors()
  }, [])

  const filteredDoctors = doctorData.filter((doctor) => {
    const matchesSearch =
      doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doctor.specialty.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesSpecialty = !selectedSpecialty || doctor.specialty === selectedSpecialty
    return matchesSearch && matchesSpecialty
  })

  const specialties = [...new Set(doctorData.map((d) => d.specialty))]

  const handleDoctorClick = (doctorId) => {
    if (onDoctorClick) {
      onDoctorClick(doctorId)
    } else {
      setSelectedDoctorId(doctorId)
    }
  }

  const handleBackToAcceptance = () => {
    setSelectedDoctorId(null)
  }

  const handleNavigate = (page) => {
    if (onNavigate) {
      onNavigate(page)
    }
    if (page === 'acceptance') {
      setSelectedDoctorId(null)
    }
  }

  // If a doctor is selected, show the doctor profile
  if (selectedDoctorId) {
    return (
      <DoctorProfile 
        doctorId={selectedDoctorId}
        onBack={handleBackToAcceptance}
        onNavigate={handleNavigate}
      />
    )
  }

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 mt-24 flex items-center justify-center">
        <Loader fullScreen={false} size={60} />
      </div>
    )
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 mt-24 flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg text-red-600 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Qayta Urinib Ko'ring
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 mt-24">
      {/* Header */}
      <div className="max-w-8xl mx-auto px-4 md:px-8 lg:px-12 pt-0 md:pt-16">
        <div className="w-full max-w-8xl bg-gradient-to-br from-blue-500 to-blue-600 
        rounded-3xl p-6 md:p-10 lg:p-16 shadow-2xl">
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-3xl lg:text-4xl font-bold text-white">Doktor Qabuliga</h1>
            <span className="bg-white text-blue-600 px-4 py-1 rounded-full font-semibold text-sm">Yozilish</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-white/80">
            <button 
              onClick={() => onNavigate && onNavigate('home')}
              className="hover:text-white cursor-pointer transition-colors"
            >
              Bosh Sahifa
            </button>
            <span>/</span>
            <span className="font-medium text-white">Doktor Qabuliga Yozilish</span>
          </div>
        </div>
      </div>

      {/* Mobile Specialists Section */}
      <div className="block md:hidden px-4 py-6">
        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-black mb-2">
            <span className="inline-block">Bizning</span> <span className="inline-block">Mutaxasislarimiz</span>
          </h2>
          <p className="text-sm text-black">Sizning salomatligingiz — bizning eng katta qadriyatimiz</p>
        </div>

        {/* Action Buttons - Hidden on Mobile */}
        <div className="hidden flex items-center justify-between mb-6">
          <button 
            onClick={() => setShowMobileFilter(!showMobileFilter)}
            className="w-10 h-10 bg-white rounded-lg shadow-md flex items-center justify-center flex-shrink-0 hover:shadow-lg transition-all duration-200 hover:scale-105"
          >
            <Filter className="w-5 h-5 text-gray-600" />
          </button>
          
          {showMobileSearch ? (
            <div className="relative animate-in slide-in-from-right-5 duration-300 ease-out">
              <input
                type="text"
                placeholder="Doktor yoki mutaxassislik bo'yicha qidirish..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-64 bg-white border border-gray-300 rounded-lg px-4 py-3 pr-12 text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                autoFocus
              />
              <button 
                onClick={() => setShowMobileSearch(false)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 w-6 h-6 flex items-center justify-center hover:bg-gray-100 rounded-full transition-colors duration-200"
              >
                <Search className="w-4 h-4 text-gray-400" />
              </button>
            </div>
          ) : (
            <button 
              onClick={() => setShowMobileSearch(true)}
              className="w-10 h-10 bg-white rounded-lg shadow-md flex items-center justify-center flex-shrink-0 hover:shadow-lg transition-all duration-200 hover:scale-105"
            >
              <Search className="w-5 h-5 text-gray-600" />
            </button>
          )}
        </div>

        {/* Mobile Filter Dropdown - Hidden on Mobile */}
        {false && (
          <div className="mb-6 space-y-3 animate-in slide-in-from-top-2 duration-300 ease-out">
            {/* Mutaxassislik */}
            <div className="relative">
              <select
                value={selectedSpecialty}
                onChange={(e) => setSelectedSpecialty(e.target.value)}
                className="w-full appearance-none bg-white border border-gray-300 rounded-lg px-4 py-3 pr-10 text-gray-700 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Mutaxassislik</option>
                {specialties.map((specialty) => (
                  <option key={specialty} value={specialty}>
                    {specialty}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-600 pointer-events-none" />
            </div>

            {/* Yo'nalishlar */}
            <div className="relative">
              <select className="w-full appearance-none bg-white border border-gray-300 rounded-lg px-4 py-3 pr-10 text-gray-700 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="">Yo'nalishlar</option>
                <option value="kardiologiya">Kardiologiya</option>
                <option value="nevrologiya">Nevrologiya</option>
                <option value="dermatologiya">Dermatologiya</option>
                <option value="oftalmologiya">Oftalmologiya</option>
                <option value="pediatriya">Pediatriya</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-600 pointer-events-none" />
            </div>

            {/* Narxlar */}
            <div className="relative">
              <select className="w-full appearance-none bg-white border border-gray-300 rounded-lg px-4 py-3 pr-10 text-gray-700 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="">Narxlar</option>
                <option value="0-50000">0 - 50,000 so'm</option>
                <option value="50000-100000">50,000 - 100,000 so'm</option>
                <option value="100000-200000">100,000 - 200,000 so'm</option>
                <option value="200000+">200,000+ so'm</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-600 pointer-events-none" />
            </div>

            {/* Saralash */}
            <div className="relative">
              <select className="w-full appearance-none bg-white border border-gray-300 rounded-lg px-4 py-3 pr-10 text-gray-700 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="Eng Tajribali">Saralash: Eng Tajribali</option>
                <option value="Eng Arzon">Saralash: Eng Arzon</option>
                <option value="Eng Qimmat">Saralash: Eng Qimmat</option>
                <option value="Eng Yaqin">Saralash: Eng Yaqin</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-600 pointer-events-none" />
            </div>
          </div>
        )}


        {/* Horizontal Scrollable Doctor Cards */}
        <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          {doctorData.slice(0, 6).map((doctor) => (
            <div
              key={doctor.id}
              onClick={() => handleDoctorClick(doctor.id)}
              className="flex-shrink-0 w-64 bg-white rounded-2xl shadow-md overflow-hidden cursor-pointer"
            >
              {/* Doctor Image */}
              <div className="h-48 bg-gray-200 overflow-hidden">
                <img
                  src={doctor.image || "/placeholder.svg"}
                  alt={doctor.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Doctor Info */}
              <div className="p-4">
                <h3 className="font-bold text-gray-900 text-lg mb-3">{doctor.name}</h3>
                <div className="mb-3">
                  <span className="inline-block bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold">
                    {doctor.specialty}
                  </span>
                </div>
                <button className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold flex items-center justify-center gap-2">
                  Batafsil
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Desktop Filters and Search */}
      <div className="hidden md:block px-4 py-6 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-8">
          <div className="flex flex-col md:flex-row gap-3 flex-1">
            {/* Specialty Filter */}
            <div className="relative">
              <select
                value={selectedSpecialty}
                onChange={(e) => setSelectedSpecialty(e.target.value)}
                className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-10 text-gray-700 cursor-pointer hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Mutaxassislik</option>
                {specialties.map((specialty) => (
                  <option key={specialty} value={specialty}>
                    {specialty}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-600 pointer-events-none" />
            </div>

            {/* Additional Filters */}
            <div className="relative">
              <select className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-10 text-gray-700 cursor-pointer hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>Yo'nalishlar</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-600 pointer-events-none" />
            </div>

            <div className="relative">
              <select className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-10 text-gray-700 cursor-pointer hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>Narxlar</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-600 pointer-events-none" />
            </div>

            <div className="relative">
              <select className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-10 text-gray-700 cursor-pointer hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>Saralash</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-600 pointer-events-none" />
            </div>
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-auto">
            <input
              type="text"
              placeholder="Qidirish"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full md:w-48 bg-white border border-gray-300 rounded-lg px-4 py-2 pl-4 text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          </div>
        </div>

        {/* Doctor Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredDoctors.map((doctor) => (
            <div
              key={doctor.id}
              onClick={() => handleDoctorClick(doctor.id)}
              className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer"
            >
              {/* Doctor Image */}
              <div className="relative h-48 bg-gray-200 overflow-hidden">
                <img
                  src={doctor.image || "/placeholder.svg"}
                  alt={doctor.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Doctor Info */}
              <div className="p-4">
                <h3 className="font-bold text-gray-900 text-lg mb-2">{doctor.name}</h3>
                <span className="inline-block bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  {doctor.specialty}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredDoctors.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">Hech qanday doktor topilmadi</p>
          </div>
        )}
      </div>

            <img className="mt-10 mb-10" src={Puls} alt="plus" />

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
              {/* Urganch Branch */}
              <div className="bg-blue-500 text-white p-6 rounded-lg">
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

              {/* Third Branch */}
              <div className="bg-blue-500 text-white p-6 rounded-[1rem]">
                <h3 className="font-bold text-lg mb-4">Urganch</h3>
                <div className="space-y-2 text-sm">
                  <p className="underline cursor-pointer hover:text-blue-200">Xaritadan Ko'ring</p>
                  <p>Urganch city</p>
                  <p>Xonqa District,</p>
                  <p className="font-semibold">Mo'ljal: Jana Post</p>
                </div>
              </div>

              {/* Fourth Branch */}
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
