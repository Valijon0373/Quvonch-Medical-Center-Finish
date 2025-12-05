
import { useState, useEffect } from 'react'
import Footer from '../Footer'
import Puls from "../../assets/service/puls.png"
import { formatPhoneNumber, handlePhoneInputChange } from '../../utils/phoneFormatter'
import { apiUrl } from '../../utils/api'
import Loader from '../loader/Loader'
import Checkup1 from "../../assets/check-up/checkup1.png"
import Checkup2 from "../../assets/check-up/checkup2.png"
import Checkup3 from "../../assets/check-up/checkup3.png"
import Checkup4 from "../../assets/check-up/checkup4.png"
import Checkup5 from "../../assets/check-up/checkup5.png"
import Checkup6 from "../../assets/check-up/checkup6.png"
import Checkup7 from "../../assets/check-up/checkup7.png"
import Checkup8 from "../../assets/check-up/checkup8.png"
import Icon1 from "../../assets/check-up/Icon1.png"
import Icon2 from "../../assets/check-up/icon2.png"
import Icon3 from "../../assets/check-up/icon3.png"
import Icon4 from "../../assets/check-up/icon4.png"
import Doc1 from "../../assets/check-up/doc1.jpg"
import Doc2 from "../../assets/check-up/doc2.png"
import Doc3 from "../../assets/check-up/doc3.png"
import BgImage from "../../assets/check-up/bg.png"




export default function CheckUp({ onNavigate, onDoctorClick }) {
  const [phoneNumber, setPhoneNumber] = useState('+998 ')
  const [name, setName] = useState('')
  const [doctors, setDoctors] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const handlePhoneChange = (e) => {
    handlePhoneInputChange(e, setPhoneNumber)
  }

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
        
        setDoctors(mappedDoctors)
      } catch (err) {
        console.error('Error fetching doctors:', err)
        setError('Doktorlar ma\'lumotlarini yuklashda xatolik yuz berdi')
      } finally {
        setLoading(false)
      }
    }
    
    fetchDoctors()
  }, [])
  
    const services = [
        {
          id: 1,
          title: "Diabetga Tekshiruv",
          image: Checkup1, 
        },
        {
          id: 2,
          title: "Ayollar Tekshiruvi",
          image: Checkup2,
        },
        {
          id: 3,
          title: "Analiz Topshirish",
          image: Checkup3,
        },
        {
          id: 4,
          title: "Tibbiy Ko'rik",
          image: Checkup4,
        },
        {
          id: 5,
          title: "FibroScan Yordamida Jigarni Tekshirish",
          image: Checkup5,
        },
        {
          id: 6,
          title: "Funksional Diagnostika",
          image: Checkup6,
        },
        {
          id: 7,
          title: "Ultra Tovush Tekshiruvi",
          image: Checkup7,
        },
        {
          id: 8,
          title: "Nevrologiya",
          image:Checkup8,
        },
      ];

   


  return (
    <div className="min-h-screen bg-white mt-8 md:mt-12">
      {/* Hero Section */}
      <section className="pt-0 md:pt-16 pb-16">
        <div className="max-w-8xl mx-auto px-4 md:px-8 lg:px-12">
          <div className="w-full max-w-8xl 
          bg-gradient-to-br from-blue-500 to-blue-600 
          rounded-3xl p-6 md:p-10 lg:p-16 shadow-2xl relative">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="flex-1 text-white">
                <h1 className="text-3xl lg:text-4xl font-bold mb-4">
                  Bizda Yangilangan <span className="bg-white text-blue-500 px-4 py-2 rounded-xl inline-block">Tibbiy Ko'riklar!</span>
                </h1>
                
                {/* Navigation Breadcrumb */}
                <div className="flex items-center justify-start gap-2 text-sm text-white/80">
                  <button
                    onClick={() => onNavigate && onNavigate('home')}
                    className="hover:text-white transition-colors"
                  >
                    Bosh Sahifa
                  </button>
                  <span>/</span>
                  <span className="font-medium text-white">
                    Check-Up
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      <section className="py-10 md:py-16 px-4 bg-white">
      <div className="max-w-7xl mx-auto">

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-4">
          {services.map((service) => (
            <div
              key={service.id}
              className="group flex flex-col overflow-hidden rounded-[2rem] border border-blue-300 bg-blue-500 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer"
              onClick={() => {
                if (service.title === "Doktor Qabuliga Yozilish") {
                  onNavigate('acceptance')
                } else if (service.title === "Analiz Topshirish") {
                  onNavigate('analysis')
                } else if (service.title === "Funksional Diagnostika") {
                  onNavigate('functional-diagnostika')
                } else if (service.title === "Ultra Tovush Tekshiruvi") {
                  onNavigate('ultrasound')
                } else if (service.title === "FibroScan Yordamida Jigarni Tekshirish") {
                  onNavigate('fibro-scan')
                } else if (service.title === "Tibbiy Ko'rik") {
                  onNavigate('check-up')
                }
              }}
            >
              {/* <div className="bg-blue-500 relative h-56 w-full overflow-hidden rounded-t-[2rem]"> */}
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover"
                />
              {/* </div> */}
              {/* <div className="bg-blue-500 rounded-b-[2rem] px-5 py-4 min-h-[80px] flex items-center justify-center"> */}
                <h3 className="text-white font-semibold text-lg leading-snug text-center mb-5">
                  {service.title}
                </h3>
              {/* </div> */}
            </div>
          ))}
        </div>

      </div>

    </section>

      {/* Nega Aynan Biz Section */}
      <section className="py-10 md:py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              Nega Aynan Biz?
            </h2>
            <p className="text-gray-600 text-lg">
              Sizning salomatligingiz — bizning eng katta qadriyatimiz
            </p>
          </div>

          {/* Content Blocks */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Block 1 - Professional Approach */}
            <div className="text-center">
              <div className="mb-6 flex justify-center">
                <img 
                  src={Icon1} 
                  alt="Professional Approach" 
                  className="w-30 h-30 object-contain"
                />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Professional <br /> Yondashuv
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Tajribali Mutaxassislar Tekshiruv Natijalarining Aniqligi Va Ishonchliligini Kafolatlaydi.
              </p>
            </div>

            {/* Block 2 - 7+ Years Experience */}
            <div className="text-center">
              <div className="mb-6 flex justify-center">
                <img 
                  src={Icon2} 
                  alt="7+ Years Experience" 
                  className="w-30 h-30 object-contain"
                />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                7 Yildan Ortiq <br /> Tajriba
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Shu Vaqt Ichida Bizga 280 Mingdan Ortiq Bemor Ishonch Bildirdi.
              </p>
            </div>

            {/* Block 3 - High-Accuracy Analyses */}
            <div className="text-center">
              <div className="mb-6 flex justify-center">
                <img 
                  src={Icon3} 
                  alt="High-Accuracy Analyses" 
                  className="w-30 h-30 object-contain"
                />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Yuqori Aniqlikdagi <br /> Tahlillar
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Laboratoriya Tekshiruvlari Yuqori Aniqlikdagi Yevropa Uskunalari Va Reagentlarida Amalga Oshiriladi.
              </p>
            </div>

            {/* Block 4 - All Examinations in 1 Day */}
            <div className="text-center">
              <div className="mb-6 flex justify-center">
                <img 
                  src={Icon4} 
                  alt="All Examinations in 1 Day" 
                  className="w-30 h-30 object-contain"
                />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Barcha Tekshiruvlar <br /> 1 Kunda
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Faqat Bir Tashrif Davomida Barcha Tekshiruvlardan O'tasiz Va Natijaga Ko'ra Mutaxassis Maslahat Beradi.
              </p>
            </div>
          </div>
        </div>
      </section>



      <img className="mt-10 w-full mb-10" src={Puls} alt="plus" />
        
                {/* Detailed Information Section */}
      <section className="py-10 md:py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          {/* Main Title */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-blue-900 mb-4">
              Takshiruvlar Haqida Batafsil Ma'lumot
            </h1>
            <p className="text-gray-500 text-lg">
              Sizning salomatligingiz – bizning eng katta qadriyatimiz
            </p>
          </div>

          {/* Top Section - Title and First Doctor */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            <div className="flex justify-center">
              <img 
                src={Doc1} 
                alt="Doctor" 
                className="w-full max-w-md h-auto object-cover rounded-2xl shadow-lg"
              />
            </div>
            <div className="flex flex-col justify-center">
              <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-6">
                Quvonch Klinikasidagi Chek-Aplar Ro'yxati
              </h2>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Ayollar Uchun Chek-Ap (18-50 Yosh)
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Ayollar Uchun Chek-Ap (50 Yoshdan Yuqori)
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Erkaklar Uchun Chek-Ap (18-50 Yosh)
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Erkaklar Uchun Chek-Ap (50 Yoshdan Yuqori)
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Bolalar Uchun Chek-Ap
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Qandli Diabet Tashxis Chek-Api
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Qandli Diabet Monitoring Chek-Api
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Kardiologik Chek-Ap
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Gastroenterologik Chek-Ap
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Homiladorlar Uchun Chek-Ap
                </li>
              </ul>
            </div>
          </div>

          {/* Middle Section - Two Columns */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-6">
                Yaqin Bir Necha Yilga Sog'lig'ingiz "Prognozini" Qanday Olish Mumkin?
              </h2>
              <div className="flex items-start mb-4">
                <span className="text-green-500 text-xl mr-3">✓</span>
                <p className="text-gray-700 text-lg">
                  Quvonch Klinikasida Chek-Apdan O'ting
                </p>
              </div>
              <p className="text-gray-600 leading-relaxed">
                Chek-Ap – Bu Organizm A'zolari Va Tizimlarining Umumiy Holatini Baholash Hamda Kasalliklarni Erta Aniqlash Uchun Mo'ljallangan Kompleks Tekshiruvdir.
              </p>
            </div>
            <div className="flex justify-center">
              <img 
                src={Doc2} 
                alt="Female Doctor" 
                className="w-full max-w-md h-auto rounded-2xl shadow-lg"
              />
            </div>
          </div>

          {/* Bottom Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="flex justify-center">
              <img 
                src={Doc3} 
                alt="Doctor with Clipboard" 
                className="w-full max-w-md h-[300px] object-cover rounded-2xl shadow-lg"
              />
            </div>
            <div className="flex flex-col justify-center space-y-6">
              <p className="text-gray-600 leading-relaxed text-lg">
                Tahlil Natijalarini Olganingizdan So'ng, Siz Darhol Sog'liq Ko'rsatkichlaringizning Aniq Qiymatlarini Ko'rishingiz Mumkin Bo'ladi.
              </p>
              <p className="text-gray-600 leading-relaxed text-lg">
                Ushbu Natijalarga Asoslanib, Shifokor Tanangizda Kechayotgan Jarayonlar Haqida Obyektiv Ma'lumotga Ega Bo'ladi va Zarur Bo'lsa, Mos Davolanishni Belgilaydi
              </p>
            </div>
          </div>
        </div>
      </section>

            {/* Promotional Background Section */}
            <section className="relative py-20 px-4 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${BgImage})`,
            filter: 'blur(2px)',
          }}
        />
        <div className="absolute inset-0 bg-blue-900/60" />
        
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
            Barcha Tekshiruvlar — 1 Kunda!
          </h2>
          <p className="text-lg md:text-xl text-white/90 mb-8 leading-relaxed">
            Ariza Qoldiring Va Kompleks Tekshiruvga 10% Chegirmaga Ega Bo'ling!
          </p>
          <button className="bg-white text-blue-600 px-8 py-4 rounded-full font-semibold text-lg hover:bg-blue-50 transition-colors duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
            Chegirma Olish
          </button>
   
        </div>
      </section>

      
        

      




      {/* Gift Certificate Section */}
      <section className="py-8  px-4 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-white rounded-2xl  p-8 md:p-12">
            <h2 className="text-3xl md:text-4xl font-bold text-blue-600 mb-6 leading-tight">
              Yaqinlaringiz Haqida G'amxo'rlik Qiling<br />
              Bu Eng Katta Tuhfa!
            </h2>
            <p className="text-gray-800 text-lg leading-relaxed mb-4">
              Endi siz yaqinlaringiz va seviklilaringiz uchun kompleks tekshiruvlarga <strong>sovg'a</strong><br />
              <strong>sertifikatlarini</strong> xarid qilishingiz mumkin! Biz sertifikatni rasmiylashtirib, bepul kuryer
              orqali yetkazib beramiz yoki elektron pochta orqali yuboramiz. Sertifikat sotib olish
              yoki qo'shimcha ma'lumot olish uchun quyidagi shaklda telefon raqamingizni
              qoldiring.
            </p>

          </div>
        </div>
      </section>

      {/* Order Form Section */}
      <section className="px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg p-8 md:p-12">
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              {/* Name Input */}
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ismingiz"
                className="flex-1 px-4 py-3 border border-blue-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              
              {/* Phone Input */}
              <div className="flex-1 relative">
                <div className="flex items-center border border-blue-300 rounded-full overflow-hidden focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent">
                  {/* Flag */}
                  <div className="flex items-center px-4 py-3 bg-gray-50">
                    <img 
                      src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAyNCAxNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjI0IiBoZWlnaHQ9IjE2IiByeD0iMiIgZmlsbD0iIzAwOUNGRiIvPgo8cmVjdCB5PSI1LjMzMzMzIiB3aWR0aD0iMjQiIGhlaWdodD0iNS4zMzMzMyIgZmlsbD0iI0ZGRkZGRiIvPgo8cmVjdCB5PSIxMC42NjY2NyIgd2lkdGg9IjI0IiBoZWlnaHQ9IjUuMzMzMzMiIGZpbGw9IiMwMEE1NDAiLz4KPGNpcmNsZSBjeD0iNiIgY3k9IjgiIHI9IjEuNSIgZmlsbD0iI0ZGRkZGRiIvPgo8cGF0aCBkPSJNOCA4QzggNiA5IDUgMTAgNUgxNEMxNSA1IDE2IDYgMTYgOEMxNiAxMCAxNSAxMSAxNCAxMUgxMEM5IDExIDggMTAgOCA4WiIgZmlsbD0iI0ZGRkZGRiIvPgo8L3N2Zz4K" 
                      alt="Uzbekistan Flag" 
                      className="w-6 h-4 mr-2"
                    />
                  </div>
                  {/* Phone Input */}
                  <input
                    type="tel"
                    value={phoneNumber}
                    onChange={handlePhoneChange}
                    placeholder="+998 99 465 55 55"
                    className="flex-1 px-4 py-3 bg-gray-50 focus:outline-none"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button className="bg-blue-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-blue-700 transition-colors duration-300 whitespace-nowrap">
                Buyurtma Qoldirish
              </button>
            </div>
            
            {/* Privacy Policy Text */}
            <div className="text-center">
              <p className="text-gray-600 text-sm mb-2">
                Tugmani Bosish Orqali Siz Shaxsiy Ma'lumotlaringizni Qayta Ishlashga Rozilik Bildirasiz Va Maxfiylik Siyosati Bilan Tanishganingizni Tasdiqlaysiz.
              </p>
              <a 
                href="#" 
                className="text-gray-600 text-sm underline hover:text-blue-600 transition-colors"
              >
                Maxfiylik Siyosati
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Doctors Section */}
      <section className="py-10 md:py-16 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Bizning Mutaxasislarimiz
            </h2>
            <p className="text-gray-600 text-lg">
              Sizning salomatligingiz — bizning eng katta qadriyatimiz
            </p>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="flex justify-center items-center py-12">
              <Loader fullScreen={false} size={60} />
            </div>
          )}

          {/* Error State */}
          {error && !loading && (
            <div className="text-center py-12">
              <p className="text-red-600 text-lg mb-4">{error}</p>
              <button 
                onClick={() => window.location.reload()}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Qayta Urinib Ko'ring
              </button>
            </div>
          )}

          {/* Doctors Grid */}
          {!loading && !error && doctors.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {doctors.map((doctor) => (
                <div
                  key={doctor.id}
                  onClick={() => onDoctorClick && onDoctorClick(doctor.id)}
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
                    {doctor.experience > 0 && (
                      <p className="text-gray-600 text-sm mt-2">
                        {doctor.experience} yil tajriba
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* No Doctors */}
          {!loading && !error && doctors.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">Hozircha doktorlar mavjud emas</p>
            </div>
          )}
        </div>
      </section>

      <Footer onNavigate={onNavigate} />
    </div>
  )
}
