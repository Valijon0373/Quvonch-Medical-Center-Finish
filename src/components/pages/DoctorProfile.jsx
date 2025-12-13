import { useState, useEffect, useRef } from 'react'
import { ArrowLeft, Star, Calendar, Clock, Phone, Mail, MapPin, ChevronDown, Search } from 'lucide-react'
import Footer from "../Footer"
import Puls from "../../assets/service/puls.png"
import { apiUrl } from "../../utils/api"
import ApplicationForm from "../modal-form/modal-form"
import Loader from "../loader/Loader"

export default function DoctorProfile({ doctorId, onBack, onNavigate }) {
  const mapRef = useRef(null)
  const [isAppointmentOpen, setIsAppointmentOpen] = useState(false)
  const [selectedService, setSelectedService] = useState(null)
  const [doctor, setDoctor] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [servicePrices, setServicePrices] = useState([])
  const [pricesLoading, setPricesLoading] = useState(false)
  
  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        setLoading(true)
        setError(null)
        
        // Fetch all doctors from API
        const response = await fetch(apiUrl('doctors/'))
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        
        const data = await response.json()
        
        // Find the doctor with matching ID
        const foundDoctor = data.results?.find(d => d.id === doctorId)
        
        if (foundDoctor) {
          // Parse description into work history (split by \r\n or \n)
          const workHistory = foundDoctor.description_uz
            ? foundDoctor.description_uz
                .split(/\r\n|\n/)
                .map(line => line.trim())
                .filter(line => line.length > 0)
            : []
          
          // Map API data to component structure
          const mappedDoctor = {
            id: foundDoctor.id,
            name: foundDoctor.full_name_uz || foundDoctor.full_name,
            specialty: foundDoctor.specialty_uz || foundDoctor.specialty,
            fullTitle: `${foundDoctor.specialty_uz || foundDoctor.specialty} shifokor`,
            experience: `${foundDoctor.experience || 0} yil`,
            image: foundDoctor.image || '',
            workHistory: workHistory,
            // Default values for fields not in API
            consultationPrice: "150,000 so'm",
            workingHours: "Dushanba - Juma: 08:00 - 18:00",
            phone: "+998 90 123-45-67",
            email: "",
            address: "Toshkent shahar, Chilonzor tumani, Navoiy ko'chasi, 15-uy"
          }
          
          setDoctor(mappedDoctor)
        } else {
          setError('Doktor topilmadi')
        }
      } catch (err) {
        console.error('Error fetching doctor:', err)
        setError('Doktor ma\'lumotlarini yuklashda xatolik yuz berdi')
      } finally {
        setLoading(false)
      }
    }
    
    if (doctorId) {
      fetchDoctor()
    }
  }, [doctorId])

  // Fetch service prices for the current doctor
  useEffect(() => {
    const fetchServicePrices = async () => {
      if (!doctorId) return
      
      try {
        setPricesLoading(true)
        const response = await fetch(apiUrl('service-prices/'))
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        
        const data = await response.json()
        
        // Filter prices by current doctor ID
        const doctorPrices = data.results?.filter(price => price.doctor === doctorId) || []
        
        // Format prices with proper number formatting
        const formattedPrices = doctorPrices.map(price => ({
          ...price,
          formattedPrice: parseFloat(price.price).toLocaleString('uz-UZ', {
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
          })
        }))
        
        setServicePrices(formattedPrices)
      } catch (err) {
        console.error('Error fetching service prices:', err)
        // Don't set error state, just log it - prices are not critical
        setServicePrices([])
      } finally {
        setPricesLoading(false)
      }
    }
    
    if (doctorId) {
      fetchServicePrices()
    }
  }, [doctorId])
  
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <Loader fullScreen={false} size={60} />
      </div>
    )
  }
  
  if (error || !doctor) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">{error || 'Doktor topilmadi'}</h2>
          <button 
            onClick={onBack}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Orqaga qaytish
          </button>
        </div>
      </div>
    )
  }

  return (
    
    <div className="pt-16 sm:pt-35 min-h-screen bg-grey-100">
      {/* Header Banner */}
      <div className="bg-blue-500 text-white">
        <div className="max-w-7xl mx-auto px-4 py-6">
          {/* Main Header Content */}
          <div className="flex items-center gap-4 mb-4">
            {/* Title */}
            <h1 className="text-2xl sm:text-3xl font-bold text-white">Doktor Qabuliga</h1>
            
            {/* Yozilish Button */}
            <button 
              onClick={() => setIsAppointmentOpen(true)}
              className="bg-white text-blue-600 px-6 py-3 rounded-full font-bold text-sm sm:text-base hover:bg-blue-50 transition-colors"
            >
              Yozilish
            </button>
          </div>
          
          {/* Breadcrumbs */}
          <div className="flex items-center gap-1 text-sm text-white">
            <button 
              onClick={() => onNavigate('home')}
              className="hover:text-blue-200 cursor-pointer transition-colors"
            >
              Bosh Sahifa
            </button>
            <span>/</span>
            <button 
              onClick={() => onNavigate('acceptance')}
              className="hover:text-blue-200 cursor-pointer transition-colors"
            >
              Doktor Qabuliga Yozilish
            </button>
            <span>/</span>
            <span className="text-white">
              {doctor.name.split(' ').map((part, index) => 
                index === 0 ? part : part.charAt(0)
              ).join(' ')}
            </span>
          </div>
        </div>
      </div>

      {/* Mobile-Responsive Filter and Search Bar */}
      <div className="bg-white py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Mobile Layout - Hidden on Mobile */}
          <div className="hidden space-y-4">
            {/* Search Bar - Full Width on Mobile */}
            <div className="relative">
              <input
                type="text"
                placeholder="Qidirish"
                className="w-full bg-white border border-gray-300 rounded-lg pl-4 pr-10 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
              />
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
            </div>
            
            {/* Filter Dropdowns - Stacked on Mobile */}
            <div className="grid grid-cols-2 gap-3">
              <div className="relative">
                <select className="w-full appearance-none bg-white border border-gray-300 rounded-lg px-3 py-2 text-gray-800 font-medium pr-8 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm">
                  <option>Mutaxasislik</option>
                </select>
                <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-800 pointer-events-none" />
              </div>
              <div className="relative">
                <select className="w-full appearance-none bg-white border border-gray-300 rounded-lg px-3 py-2 text-gray-800 font-medium pr-8 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm">
                  <option>Yo'nalishlar</option>
                </select>
                <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-800 pointer-events-none" />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <div className="relative">
                <select className="w-full appearance-none bg-white border border-gray-300 rounded-lg px-3 py-2 text-gray-800 font-medium pr-8 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm">
                  <option>Narxlar</option>
                </select>
                <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-800 pointer-events-none" />
              </div>
              <div className="relative">
                <select className="w-full appearance-none bg-white border border-gray-300 rounded-lg px-3 py-2 text-gray-800 font-medium pr-8 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm">
                  <option>Eng Tajribali</option>
                </select>
                <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-800 pointer-events-none" />
              </div>
            </div>
          </div>
          
          {/* Desktop Layout */}
          <div className="hidden sm:flex items-center justify-between">
            <div className="flex items-center gap-6">
              <div className="relative">
                <select className="appearance-none bg-transparent border-none text-gray-800 font-medium pr-8 cursor-pointer focus:outline-none hover:text-blue-500 transition-colors duration-200">
                  <option>Mutaxasislik</option>
                </select>
                <ChevronDown className="absolute right-0 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-800 pointer-events-none" />
              </div>
              <div className="relative">
                <select className="appearance-none bg-transparent border-none text-gray-800 font-medium pr-8 cursor-pointer focus:outline-none hover:text-blue-500 transition-colors duration-200">
                  <option>Yo'nalishlar</option>
                </select>
                <ChevronDown className="absolute right-0 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-800 pointer-events-none" />
              </div>
              <div className="relative">
                <select className="appearance-none bg-transparent border-none text-gray-800 font-medium pr-8 cursor-pointer focus:outline-none hover:text-blue-500 transition-colors duration-200">
                  <option>Narxlar</option>
                </select>
                <ChevronDown className="absolute right-0 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-800 pointer-events-none" />
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-700">Saralash:</span>
                <div className="relative">
                  <select className="appearance-none bg-transparent border-none text-gray-800 font-medium pr-6 cursor-pointer focus:outline-none text-sm hover:text-blue-500 transition-colors duration-200">
                    <option>Eng Tajribali</option>
                  </select>
                  <ChevronDown className="absolute right-0 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-800 pointer-events-none" />
                </div>
              </div>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Qidirish"
                  className="bg-white border border-gray-300 rounded-lg pl-4 pr-10 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent w-56"
                />
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile-Optimized Doctor Profile Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        <div className="bg-gray-100 rounded-xl sm:rounded-2xl p-4 sm:p-8">
          <div className="flex flex-col lg:flex-row gap-6 sm:gap-8">
            {/* Left Side - Doctor Image */}
            <div className="lg:w-1/3 flex items-center justify-center">
              <div className="w-64 h-64 sm:w-80 sm:h-80 rounded-xl sm:rounded-2xl overflow-hidden shadow-lg">
                <img
                  src={doctor.image}
                  alt={doctor.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Right Side - Doctor Information */}
            <div className="lg:w-2/3">
              {/* Basic Info */}
              <div className="mb-4 sm:mb-6">
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-2">{doctor.name}</h2>
                <p className="text-sm sm:text-base lg:text-lg text-gray-700 mb-3 sm:mb-4">{doctor.fullTitle}</p>
                
                <div className="flex items-center gap-2 mb-3 sm:mb-4">
                  <Star className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-500" />
                  <span className="text-sm sm:text-base text-gray-600">Ish Tajribasi - {doctor.experience}</span>
                </div>
              </div>

              {/* Professional History */}
              <div className="space-y-2 sm:space-y-3">
                <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-3">Ish Tarixi</h3>
                {doctor.workHistory.map((work, index) => (
                  <div key={index} className="flex items-start gap-2 sm:gap-3">
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">{work}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white">
        <div className="mx-auto max-w-7xl py-4 sm:py-8 px-4">
          {/* Header */}
          <div className="text-center mb-6 sm:mb-12">
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-black mb-2 sm:mb-4">Xizmat Narxlari</h2>
            <p className="text-sm sm:text-base lg:text-lg text-black">Sizning salomatligingiz – bizning eng katta qadriyatimiz</p>
          </div>

          {/* Mobile-Responsive Services Card */}
          <div className="rounded-xl sm:rounded-3xl bg-blue-200 p-4 sm:p-8">
            {pricesLoading ? (
              <div className="text-center py-8">
                <Loader fullScreen={false} size={40} />
              </div>
            ) : servicePrices.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-600">Hozircha xizmat narxlari mavjud emas</p>
              </div>
            ) : (
              <>
                {/* Mobile Layout */}
                <div className="block sm:hidden space-y-3">
                  {servicePrices.map((service) => (
                    <div key={service.id} className="bg-blue-100 rounded-lg p-4 hover:bg-white hover:shadow-md transition-all duration-200">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-base font-semibold text-gray-800">{service.service_name_uz || service.service_name}</h3>
                        <span className="text-base font-semibold text-gray-800">{service.formattedPrice} UZS</span>
                      </div>
                      <button 
                        onClick={() => {
                          setSelectedService(service)
                          setIsAppointmentOpen(true)
                        }}
                        className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                      >
                        Buyurtma Berish
                      </button>
                    </div>
                  ))}
                </div>

                {/* Desktop Layout */}
                <div className="hidden sm:block">
                  {/* Table Header */}
                  <div className="mb-6 grid grid-cols-[2fr_1fr_auto] gap-4">
                    <div className="text-xl font-semibold text-gray-800 text-left">Xizmatlar</div>
                    <div className="text-xl font-semibold text-gray-800 text-center">Narxlar</div>
                    <div></div>
                  </div>

                  {/* Service Rows */}
                  <div className="space-y-3">
                    {servicePrices.map((service) => (
                      <div key={service.id} className="grid grid-cols-[2fr_1fr_auto] items-center gap-4 bg-blue-100 rounded-xl px-4 py-3 hover:bg-white hover:shadow-md transition-all duration-200">
                        <div className="text-lg text-gray-700 text-left">{service.service_name_uz || service.service_name}</div>
                        <div className="text-lg text-gray-700 text-center">{service.formattedPrice} UZS</div>
                        <button 
                          onClick={() => {
                            setSelectedService(service)
                            setIsAppointmentOpen(true)
                          }}
                          className="whitespace-nowrap text-lg font-semibold text-gray-800 hover:text-blue-600"
                        >
                          Buyurtma Berish
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Appointment Form Modal */}
      <ApplicationForm
        open={isAppointmentOpen}
        onClose={() => {
          setIsAppointmentOpen(false)
          setSelectedService(null)
        }}
        title="Qabulga Yozilish"
        doctorId={doctorId}
        doctorName={doctor?.name}
        serviceId={selectedService?.id}
        serviceName={selectedService?.service_name_uz || selectedService?.service_name}
      />

          <img className="mt-10 w-full mb-10" src={Puls} alt="plus" />

     

          <div className="text-center mb-6 sm:mb-12">
            <h2 
              className="text-xl sm:text-2xl lg:text-3xl font-bold text-black mb-2 sm:mb-4 cursor-pointer hover:text-blue-500 transition-colors"
              onClick={() => {
                if (mapRef.current) {
                  mapRef.current.scrollIntoView({ behavior: 'smooth' });
                }
              }}
            >
              Klinikamiz Filiallari
            </h2>
            <p className="text-sm sm:text-base lg:text-lg text-black">Sizning salomatligingiz – bizning eng katta qadriyatimiz</p>
          </div>

          {/* Mobile-Responsive Clinic Cards */}
          <div className="grid grid-cols-1 
          sm:grid-cols-2 lg:grid-cols-4 gap-4 
          sm:gap-6 lg:gap-8 max-w-7xl
           mx-auto px-4 pb-6">
            {/* Urganch Branch */}
            <div className="bg-blue-500 text-white p-4 sm:p-6 rounded-lg">
              <h3 className="font-bold text-base sm:text-lg mb-3 sm:mb-4">Urganch</h3>
              <div className="space-y-1 sm:space-y-2 text-xs sm:text-sm">
                <p className="underline cursor-pointer hover:text-blue-200">Xaritadan Ko'ring</p>
                <p>Urganch city</p>
                <p>Xonqa District,</p>
                <p className="font-semibold">Mo'ljal: Jana Post</p>
              </div>
            </div>

            {/* Second Branch */}
            <div className="bg-blue-500 text-white p-4 sm:p-6 rounded-lg">
              <h3 className="font-bold text-base sm:text-lg mb-3 sm:mb-4">Urganch</h3>
              <div className="space-y-1 sm:space-y-2 text-xs sm:text-sm">
                <p className="underline cursor-pointer hover:text-blue-200">Xaritadan Ko'ring</p>
                <p>Urganch city</p>
                <p>Xonqa District,</p>
                <p className="font-semibold">Mo'ljal: Jana Post</p>
              </div>
            </div>

            {/* Third Branch */}
            <div className="bg-blue-500 text-white p-4 sm:p-6 rounded-lg">
              <h3 className="font-bold text-base sm:text-lg mb-3 sm:mb-4">Urganch</h3>
              <div className="space-y-1 sm:space-y-2 text-xs sm:text-sm">
                <p className="underline cursor-pointer hover:text-blue-200">Xaritadan Ko'ring</p>
                <p>Urganch city</p>
                <p>Xonqa District,</p>
                <p className="font-semibold">Mo'ljal: Jana Post</p>
              </div>
            </div>

            {/* Fourth Branch */}
            <div className="bg-blue-500 text-white p-4 sm:p-6 rounded-lg">
              <h3 className="font-bold text-base sm:text-lg mb-3 sm:mb-4">Urganch</h3>
              <div className="space-y-1 sm:space-y-2 text-xs sm:text-sm">
                <p className="underline cursor-pointer hover:text-blue-200">Xaritadan Ko'ring</p>
                <p>Urganch city</p>
                <p>Xonqa District,</p>
                <p className="font-semibold">Mo'ljal: Jana Post</p>
              </div>
            </div>
          </div>
      <Footer onNavigate={onNavigate} />
    </div>
  )
}
