
import { useState, useEffect } from 'react'
import Footer from '../Footer'
import Puls from "../../assets/service/puls.png"
import { formatPhoneNumber, handlePhoneInputChange } from '../../utils/phoneFormatter'
import Checkup1 from "../../assets/check-up/checkup1.png"
import Checkup2 from "../../assets/check-up/checkup2.png"
import Checkup3 from "../../assets/check-up/checkup3.png"
import Checkup12 from "../../assets/check-up/checkup12.png"
import Checkup6 from "../../assets/check-up/checkup6.png"
import Checkup7 from "../../assets/check-up/checkup7.png"
import Checkup8 from "../../assets/check-up/checkup8.png"
import Checkup9 from "../../assets/check-up/checkup9.png"
import Checkup10 from "../../assets/check-up/checkup10.png"
import Checkup11 from "../../assets/check-up/checkup11.png"
import Checkup13 from "../../assets/check-up/checkup13.png"
import Checkup22 from "../../assets/check-up/checkup22.png"
import MCheckup1 from "../../assets/check-up/mcheckup1.png"
import MCheckup2 from "../../assets/check-up/mcheckup2.png"
import Icon1 from "../../assets/check-up/Icon1.png"
import Icon2 from "../../assets/check-up/icon2.png"
import Icon3 from "../../assets/check-up/icon3.png"
import Icon4 from "../../assets/check-up/icon4.png"
import Doc1 from "../../assets/check-up/doc1.jpg"
import Doc2 from "../../assets/check-up/doc2.png"
import Doc3 from "../../assets/check-up/doc3.png"
import BgImage from "../../assets/check-up/bg.png"
import WomenCheckup from '../WomenCheckup/WomenCheckup'
import MenCheckup from '../MenCheckup/MenCheckup'
import TeenageBoy from '../TeengersCheckup/teenageBoy'
import TeenageGirl from '../TeengersCheckup/teenageGirl'
import DiabetesCheckup from '../diabetes/Diabetes'
import Youngcheckup from '../youngcheckup/Youngcheckup'
import GastroCheckup from '../Modalcheckups/gastrocheckup'
import KardioCheckup from '../Modalcheckups/kardiocheckup'
import AppointmentForm from '../appointment-form/appointment-form'
import FAQ from '../Faq'




export default function CheckUp({ onNavigate, onDoctorClick }) {
  const [phoneNumber, setPhoneNumber] = useState('+998 ')
  const [name, setName] = useState('')
  const [showWomenModal, setShowWomenModal] = useState(false)
  const [showDiabetesModal, setShowDiabetesModal] = useState(false)
  const [showYoungModal, setShowYoungModal] = useState(false)
  const [showGastroModal, setShowGastroModal] = useState(false)
  const [showKardioModal, setShowKardioModal] = useState(false)
  const [showAppointmentFromDiabetes, setShowAppointmentFromDiabetes] = useState(false)
  const [showAppointmentFromGastro, setShowAppointmentFromGastro] = useState(false)
  const [showAppointmentFromKardio, setShowAppointmentFromKardio] = useState(false)
  const [showAppointmentFromWomen, setShowAppointmentFromWomen] = useState(false)
  const [showAppointmentFromMen, setShowAppointmentFromMen] = useState(false)
  const [selectedMenAgeGroup, setSelectedMenAgeGroup] = useState(null)
  const [showMenModal18_50, setShowMenModal18_50] = useState(false)
  const [showMenModal50Plus, setShowMenModal50Plus] = useState(false)
  const [showWomenModal18_50, setShowWomenModal18_50] = useState(false)
  const [showWomenModal50Plus, setShowWomenModal50Plus] = useState(false)
  const [showTeenModal, setShowTeenModal] = useState(false)
  const [showAppointmentFromTeens, setShowAppointmentFromTeens] = useState(false)
  const [showTeenBoyModal, setShowTeenBoyModal] = useState(false)
  const [showTeenGirlModal, setShowTeenGirlModal] = useState(false)
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768)

  const handlePhoneChange = (e) => {
    handlePhoneInputChange(e, setPhoneNumber)
  }

  const handleServiceClick = (serviceTitle) => {
    if (serviceTitle === "Doktor Qabuliga Yozilish") {
      onNavigate('acceptance')
    } else if (serviceTitle === "Analiz Topshirish") {
      onNavigate('analysis')
    } else if (serviceTitle === "Funksional Diagnostika") {
      onNavigate('functional-diagnostika')
    } else if (serviceTitle === "UZI check-up") {
      onNavigate('uzi')
    } else if (serviceTitle === "Ultra Tovush Tekshiruvi") {
      onNavigate('ultrasound')
    } else if (serviceTitle === "Ayollar Tekshiruvi") {
      setShowWomenModal(true)
    } else if (serviceTitle === "Diabetga Tekshiruv") {
      setShowDiabetesModal(true)
    } else if (serviceTitle === "Bolalar Tekshiruvi") {
      setShowYoungModal(true)
    } else if (serviceTitle === "Gastro Check-up") {
      setShowGastroModal(true)
    } else if (serviceTitle === "Kardio Check-up") {
      setShowKardioModal(true)
    }
  }

  // Sahifa ochilganda yuqoriga scroll qilish
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    
    // Handle responsive image on window resize
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Modal ochilganda orqa fon scroll bo'lmasin
  useEffect(() => {
    const isAnyModalOpen = showWomenModal || showDiabetesModal || showYoungModal || showGastroModal || showKardioModal ||
                           showAppointmentFromDiabetes || showAppointmentFromWomen || showAppointmentFromGastro || showAppointmentFromKardio ||
                           showAppointmentFromMen || showMenModal18_50 || showMenModal50Plus || 
                           showWomenModal18_50 || showWomenModal50Plus || showTeenBoyModal || 
                           showTeenGirlModal || showAppointmentFromTeens
    
    if (isAnyModalOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [showWomenModal, showDiabetesModal, showYoungModal, showGastroModal, showKardioModal, showAppointmentFromDiabetes, 
      showAppointmentFromWomen, showAppointmentFromGastro, showAppointmentFromKardio, showAppointmentFromMen, showMenModal18_50, showMenModal50Plus, 
      showWomenModal18_50, showWomenModal50Plus, showTeenBoyModal, showTeenGirlModal, showAppointmentFromTeens])

  const services = [
      {
        id: 1,
        title: "Diabet chek-up",
        image: Checkup9, 
      },
      {
         id: 2,
         title: "UZI check-up",
         image: Checkup2,
       },

      {
        id: 3,
        title: "Analiz Topshirish",
        image: Checkup3,
      },
      {
        id: 4,
        title: "Funksional Diagnostika",
        image: Checkup6,
      },
      ];

   


  return (
    <div className="min-h-screen bg-white mt-24">
      {/* Hero Section */}
      <section className="pt-0 md:pt-16 pb-16">
        <div className="max-w-8xl mx-auto px-4 md:px-8 lg:px-12">
          <div className="w-full max-w-8xl 
          bg-gradient-to-br from-blue-500 to-blue-600 
          rounded-3xl p-6 md:p-10 lg:p-16 shadow-2xl relative">
            <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="flex-1 text-white">
                <h1 className="text-3xl lg:text-4xl font-bold mb-4">
                  Bizda Yangilangan <span className="bg-white text-blue-500 px-4 py-2 rounded-xl inline-block">Check-up lar!</span>
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

      {/* Men's and Women's Check-up Cards Section */}
      <section className="py-4 md:py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:grid lg:grid-cols-2 gap-6 mb-8">
            {/* Men's Check-up Card */}
             <div className="group flex flex-col overflow-hidden rounded-[3.2rem] 
             border border-blue-300 bg-blue-500 shadow-lg hover:shadow-xl transition-all 
             duration-300 hover:scale-105">
               <div className="relative h-96 overflow-hidden rounded-tl-[2rem] 
               bg-blue-500 flex items-start justify-end pt-0 pr-0">
                  <img
                    src={isMobile ? MCheckup2 : Checkup1}
                    alt="Men's Check-up"
                    className="w-full h-full object-cover scale-x-[1.017]"
                  />
                 <div className="absolute inset-0 "></div>
                 {/* Title Overlay - Hidden on mobile, visible on desktop */}
                 <div className="hidden md:flex absolute inset-0 items-center justify-start pl-6">
                   <h2 className="text-2xl font-bold text-white px-4 py-2 
                   text-left backdrop-blur-md bg-black/20 rounded-full">
                      Erkaklar check-up
                   </h2>
                 </div>
               </div>
               {/* Title above buttons - Visible on mobile, hidden on desktop */}
               <div className="md:hidden -mt-16 pt-4 pb-2 px-6 bg-blue-500 relative z-20 rounded-t-full">
                 <h2 className="text-2xl font-bold text-white text-center">
                   Erkaklar check-up
                 </h2>
               </div>
               {/* Buttons */}
                   <div className="mt-10 md:-mt-4 py-4 px-6 
                   flex flex-col md:flex-row gap-3 md:gap-6 rounded-t-full md:rounded-full rounded-b-[2rem]
                   bg-blue-500 relative z-20">
                <button
                  onClick={() => setShowMenModal18_50(true)}
                  className="flex-1 bg-white hover:bg-gray-100  
                  text-blue-700 font-semibold py-2 px-4 rounded-full transition-colors 
                  duration-300 flex items-center justify-center gap-2"
                >
                  <span>18 dan 50 yoshgacha</span>
                  <span>→</span>
                </button>
                <button
                  onClick={() => setShowMenModal50Plus(true)}
                  className="flex-1 bg-white hover:bg-gray-100 text-blue-700 
                  font-semibold py-2 px-4 rounded-full transition-colors duration-300 
                  flex items-center justify-center gap-2"
                >
                  <span>50+ yoshdan yuqori</span>
                  <span>→</span>
                </button>
              </div>
              </div>

            {/* Women's Check-up Card */}
             <div className="group flex flex-col overflow-hidden rounded-[3.2rem] 
             border border-blue-300 bg-blue-500 shadow-lg hover:shadow-xl transition-all 
             duration-300 hover:scale-105">
               <div className="relative h-96 overflow-hidden rounded-tl-[2rem] 
               bg-blue-500 flex items-start justify-end pt-0 pr-0">
                  <img
                    src={isMobile ? MCheckup1 : Checkup22}
                    alt="Women's Check-up"
                    className="w-full h-full object-cover"
                  />
                 <div className="absolute inset-0 "></div>
                 {/* Title Overlay - Hidden on mobile, visible on desktop */}
                 <div className="hidden md:flex absolute inset-0 items-center justify-start pl-6">
                   <h2 className="text-2xl font-bold text-white px-4 py-2 
                   text-left backdrop-blur-md bg-black/20 rounded-full">
                      Ayollar check-up
                   </h2>
                 </div>
               </div>
               {/* Title above buttons - Visible on mobile, hidden on desktop */}
               <div className="md:hidden -mt-16 pt-4 pb-2 px-6 bg-blue-500 relative z-20 rounded-t-full">
                 <h2 className="text-2xl font-bold text-white text-center">
                   Ayollar check-up
                 </h2>
               </div>
               {/* Buttons */}
                   <div className="mt-10 md:-mt-4 py-4 px-6 
                   flex flex-col md:flex-row gap-3 md:gap-6 rounded-t-full md:rounded-full rounded-b-[2rem]
                   bg-blue-500 relative z-20">
                <button
                  onClick={() => setShowWomenModal18_50(true)}
                  className="flex-1 bg-white hover:bg-gray-100 
                  text-blue-700 font-semibold py-2 px-4 rounded-full transition-colors 
                  duration-300 flex items-center justify-center gap-2"
                >
                  <span>18 dan 50 yoshgacha</span>
                  <span>→</span>
                </button>
                <button
                  onClick={() => setShowWomenModal50Plus(true)}
                  className="flex-1 bg-white hover:bg-gray-100 text-blue-700 
                  font-semibold py-2 px-4 rounded-full transition-colors duration-300 
                  flex items-center justify-center gap-2"
                >
                  <span>50+ yoshdan yuqori</span>
                  <span>→</span>
                </button>
              </div>
              </div>
              {/* O'smirlar Tekshiruvi */}
              <div className="group flex flex-col overflow-hidden rounded-[3.2rem] 
              border border-blue-300 bg-blue-500 shadow-lg hover:shadow-xl transition-all 
              duration-300 hover:scale-105">
               <div className="relative h-80 md:h-[520px] overflow-hidden rounded-tl-[2rem] bg-blue-500 flex items-center justify-end pt-0 pr-0">
                   <img
                     src={isMobile ? MCheckup1 : Checkup13}
                     alt="O'smirlar Tekshiruvi"
                     className="w-full h-full object-cover"
                   />
                 <div className="absolute inset-0 "></div>
                 {/* Title Overlay - Hidden on mobile, visible on desktop */}
                 <div className="hidden md:flex absolute inset-0 items-center justify-start pl-6">
                   <h2 className="text-2xl font-bold text-white px-4 py-2 
                   text-left backdrop-blur-md bg-black/20 rounded-full">
                      O'smirlar check-up
                   </h2>
                 </div>
               </div>
               {/* Title above buttons - Visible on mobile, hidden on desktop */}
               <div className="md:hidden -mt-16 pt-4 pb-2 px-6 bg-blue-500 relative z-20 rounded-t-full">
                 <h2 className="text-2xl font-bold text-white text-center">
                   O'smirlar check-up
                 </h2>
               </div>
               {/* Buttons */}
                   <div className="mt-10 md:-mt-4 py-4 px-6 
                   flex flex-col md:flex-row gap-3 md:gap-6 rounded-t-full md:rounded-full rounded-b-[2rem]
                   bg-blue-500 relative z-20">
                <button
                  onClick={() => setShowTeenBoyModal(true)}
                  className="flex-1 bg-white hover:bg-gray-100 
                  text-blue-700 font-semibold py-2 px-4 rounded-full transition-colors 
                  duration-300 flex items-center justify-center gap-2"
                >
                  <span>Erkaklar</span>
                  <span>→</span>
                </button>
                <button
                  onClick={() => setShowTeenGirlModal(true)}
                  className="flex-1 bg-white hover:bg-gray-100 text-blue-700 
                  font-semibold py-2 px-4 rounded-full transition-colors duration-300 
                  flex items-center justify-center gap-2"
                >
                  <span>Ayollar</span>
                  <span>→</span>
                </button>
               </div>
               </div>

              {/* Kardio va Gastro Check-up Cards - Vertical Stack */}
              <div className="flex flex-col gap-6">
                {/* Kardio Check-up */}
                <div className="group flex flex-col overflow-hidden rounded-[3.2rem] 
               border border-blue-300 bg-blue-500 shadow-lg hover:shadow-xl transition-all 
               duration-300 hover:scale-105 cursor-pointer"
               onClick={() => handleServiceClick("Kardio Check-up")}>
                 <div className="relative flex-1 overflow-hidden rounded-tl-[2rem] bg-blue-500 flex items-center justify-center pt-0 pr-0">
                     <img
                       src={Checkup12}
                       alt="Kardio Check-up"
                       className="w-full h-full object-cover"
                     />
                   <div className="absolute inset-0 "></div>
                 </div>
                 {/* Buttons */}
                     <div className="-mt-8 md:-mt-7 py-3 px-4 
                     flex flex-col md:flex-row gap-2 md:gap-3 rounded-t-full rounded-b-[2rem]
                     bg-blue-500 relative z-20">
                  <button
                    className="flex-1 bg-blue-500
                    text-white font-semibold py-2 px-3 rounded-full transition-colors 
                    duration-300 flex items-center justify-center gap-2 text-lg"
                  >
                    <span>Kardio Check-up</span>
              
                  </button>
                </div>
                </div>

                {/* Gastro Check-up */}
                <div className="group flex flex-col overflow-hidden rounded-[3.2rem] 
                border border-blue-300 bg-blue-500 shadow-lg hover:shadow-xl transition-all 
                duration-300 hover:scale-105 cursor-pointer"
                onClick={() => handleServiceClick("Gastro Check-up")}>
                 <div className="relative flex-1 overflow-hidden rounded-tl-[2rem] bg-blue-500 flex items-center justify-center pt-0 pr-0">
                     <img
                       src={Checkup10}
                       alt="Gastro Check-up"
                       className="w-full h-full object-cover"
                     />
                   <div className="absolute inset-0 "></div>
                 </div>
                 {/* Buttons */}
                     <div className="-mt-8 md:-mt-7 py-3 px-4 
                     flex flex-col md:flex-row gap-2 md:gap-3 rounded-t-full rounded-b-[2rem]
                     bg-blue-500 relative z-20">
                  <button
                    className="flex-1 bg-blue-500 
                    text-white font-semibold py-2 px-3 rounded-full transition-colors 
                    duration-300 flex items-center justify-center gap-2 text-"
                  >
                    <span>Gastro check-up</span>
                 
                  </button>
                </div>
                </div>
              </div>
              

              </div>
              </div>
              </section>

      <section className="py-0 md:py-0 px-4 bg-white -mt-2">
      <div className="max-w-7xl mx-auto">

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-4">
          {services.map((service) => (
            <div
              key={service.id}
              className="group flex flex-col overflow-hidden rounded-[3.2rem] border border-blue-300 bg-blue-500 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer"
              onClick={() => handleServiceClick(service.title)}
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

      <FAQ />

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
                Quvonch Klinikasidagi Chek-uplar Ro'yxati
              </h2>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Ayollar Uchun chek-Ap (18-50 Yosh)
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Ayollar Uchun chek-up (50 Yoshdan Yuqori)
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Erkaklar Uchun check-up (18-50 Yosh)
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Erkaklar Uchun chek-up (50 Yoshdan Yuqori)
                </li>

                <li className="flex items-start">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Qandli Diabet Tashxis chek-up
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Kardiologik chek-Ap
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Gastroenterologik chek-up
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Homiladorlar Uchun UZI check-up
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

      <WomenCheckup 
        isOpen={showWomenModal} 
        onClose={() => setShowWomenModal(false)} 
        onRegister={() => {
          setShowAppointmentFromWomen(true)
        }}
      />
      <WomenCheckup 
        isOpen={showWomenModal18_50} 
        onClose={() => setShowWomenModal18_50(false)} 
        onRegister={() => {
          setShowAppointmentFromWomen(true)
        }}
      />
      <AppointmentForm
        open={showAppointmentFromWomen && showWomenModal18_50}
        onClose={() => {
          setShowAppointmentFromWomen(false)
          setShowWomenModal18_50(false)
        }}
        doctorId={null}
        doctorName={null}
        serviceId={null}
        serviceName="Ayollar uchun chek-ap (18-50 yosh)"
      />
      <WomenCheckup 
        isOpen={showWomenModal50Plus} 
        onClose={() => setShowWomenModal50Plus(false)} 
        onRegister={() => {
          setShowAppointmentFromWomen(true)
        }}
      />
      <AppointmentForm
        open={showAppointmentFromWomen && showWomenModal50Plus}
        onClose={() => {
          setShowAppointmentFromWomen(false)
          setShowWomenModal50Plus(false)
        }}
        doctorId={null}
        doctorName={null}
        serviceId={null}
        serviceName="Ayollar uchun chek-ap (50+ yosh)"
      />
      <DiabetesCheckup 
        isOpen={showDiabetesModal} 
        onClose={() => setShowDiabetesModal(false)} 
        onRegister={() => {
          setShowAppointmentFromDiabetes(true)
        }}
      />
      <GastroCheckup 
        isOpen={showGastroModal} 
        onClose={() => setShowGastroModal(false)} 
        onRegister={() => {
          setShowAppointmentFromGastro(true)
        }}
      />
      <KardioCheckup 
        isOpen={showKardioModal} 
        onClose={() => setShowKardioModal(false)} 
        onRegister={() => {
          setShowAppointmentFromKardio(true)
        }}
      />
      <Youngcheckup isOpen={showYoungModal} onClose={() => setShowYoungModal(false)} />

      <AppointmentForm
        open={showAppointmentFromDiabetes}
        onClose={() => setShowAppointmentFromDiabetes(false)}
        doctorId={null}
        doctorName={null}
        serviceId={null}
        serviceName="Qandli diabet monitoring chek-ap"
      />
      <AppointmentForm
        open={showAppointmentFromGastro}
        onClose={() => {
          setShowAppointmentFromGastro(false)
          setShowGastroModal(false)
        }}
        doctorId={null}
        doctorName={null}
        serviceId={null}
        serviceName="Gastro chek-ap"
      />
      <AppointmentForm
        open={showAppointmentFromKardio}
        onClose={() => {
          setShowAppointmentFromKardio(false)
          setShowKardioModal(false)
        }}
        doctorId={null}
        doctorName={null}
        serviceId={null}
        serviceName="Kardio tekshiruvi"
      />
      <MenCheckup
        isOpen={showMenModal18_50}
        onClose={() => setShowMenModal18_50(false)}
        onRegister={() => {
          setSelectedMenAgeGroup('18-50')
          setShowAppointmentFromMen(true)
        }}
        ageGroup="18-50"
      />
      <AppointmentForm
        open={showAppointmentFromMen && showMenModal18_50}
        onClose={() => {
          setShowAppointmentFromMen(false)
          setShowMenModal18_50(false)
        }}
        doctorId={null}
        doctorName={null}
        serviceId={null}
        serviceName="Erkaklar uchun chek-ap (18-50 yosh)"
      />
      <MenCheckup
        isOpen={showMenModal50Plus}
        onClose={() => setShowMenModal50Plus(false)}
        onRegister={() => {
          setSelectedMenAgeGroup('50+')
          setShowAppointmentFromMen(true)
        }}
        ageGroup="50+"
      />
      <AppointmentForm
        open={showAppointmentFromMen && showMenModal50Plus}
        onClose={() => {
          setShowAppointmentFromMen(false)
          setShowMenModal50Plus(false)
        }}
        doctorId={null}
        doctorName={null}
        serviceId={null}
        serviceName="Erkaklar uchun chek-ap (50+ yosh)"
      />
      <TeenageBoy 
        isOpen={showTeenBoyModal}
        onClose={() => setShowTeenBoyModal(false)}
        onRegister={() => {
          setShowAppointmentFromTeens(true)
        }}
      />
      <TeenageGirl 
        isOpen={showTeenGirlModal}
        onClose={() => setShowTeenGirlModal(false)}
        onRegister={() => {
          setShowAppointmentFromTeens(true)
        }}
      />
      <AppointmentForm
        open={showAppointmentFromTeens && showTeenBoyModal}
        onClose={() => {
          setShowAppointmentFromTeens(false)
          setShowTeenBoyModal(false)
        }}
        doctorId={null}
        doctorName={null}
        serviceId={null}
        serviceName="O'smirlar uchun chek-ap (erkaklar)"
      />
      <AppointmentForm
        open={showAppointmentFromTeens && showTeenGirlModal}
        onClose={() => {
          setShowAppointmentFromTeens(false)
          setShowTeenGirlModal(false)
        }}
        doctorId={null}
        doctorName={null}
        serviceId={null}
        serviceName="O'smirlar uchun chek-ap (qizlar)"
      />

      <section className="py-10 md:py-20 px-4 bg-gradient-to-b from-white to-gray-50 border-t border-gray-200 mt-6 md:mt-12">
        <div className="max-w-7xl mx-auto">
          <Footer onNavigate={onNavigate} />
        </div>
      </section>
    </div>
  )
}
