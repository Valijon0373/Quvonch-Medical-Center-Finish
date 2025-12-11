import React, { useState } from 'react';
import axios from 'axios';

import RightImg from "../assets/advantage/right.png";
import BgImg from "../assets/news/bg-3.png";
import doc from "../assets/advantage/doctor.png"
import { ArrowRight } from "lucide-react";
import { cleanPhoneNumber, handlePhoneInputChange } from "../utils/phoneFormatter";
import { apiUrl } from "../utils/api";


export default function HealthcareServices() {
  const [phoneNumber, setPhoneNumber] = useState('+998 ')
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const handlePhoneChange = (e) => {
    handlePhoneInputChange(e, (formatted) => setPhoneNumber(formatted))
    setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess(false)

    if (!name.trim()) {
      setError("Ismni kiriting")
      return
    }
    if (!phoneNumber.trim()) {
      setError("Telefon raqamini kiriting")
      return
    }

    setLoading(true)
    try {
      const phone = cleanPhoneNumber(phoneNumber)
      await axios.post(apiUrl('call-orders/'), {
        name_uz: name.trim(),
        name_ru: name.trim(),
        phone
      })
      setSuccess(true)
      setName('')
      setPhoneNumber('+998 ')
      setTimeout(() => setSuccess(false), 2500)
    } catch (err) {
      setError(err?.response?.data?.message || err?.response?.data?.error || "Xatolik yuz berdi. Qayta urinib ko'ring.")
    } finally {
      setLoading(false)
    }
  }

  const services = [
    {
      image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=300&fit=crop",
      title: "Ortiqcha ovqagarchilikni qalay servisi",
      description: "Biz bilan siz har doim o'tiboz mahsulotlar bo'ladiz. Oziqlanish ekspertimizni qilish. Sizga qulay vaqtni tanlao beramiz mutaxassislarimiz professional maslahat berishadi."
    },
    {
      image: "https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=400&h=300&fit=crop",
      title: "Laboratoriya va klinika — bir joyda",
      description: "Biz o'deyiz va halol formulayor amal qilamiz: arxal diagnostika — keyini davolash. Bunday yondashiv davolash murakkab kasalliklarni kafolatlanadi kamaytirildi"
    },
    {
      image: "https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=400&h=300&fit=crop",
      title: "Sifat kafolati",
      description: "Markamiz mutaxassis Germanya va Yaponiya oziqlantirish zamonavi uskunalarida diagnostika va davolash amalga oshirilgan yuqori"
    }
  ];

  return (
    <div className="min-h-screen">  
      {success && (
        <div className="fixed top-4 left-1/2 z-[60] -translate-x-1/2 bg-green-500 text-white px-5 py-3 rounded-full shadow-lg animate-bounce">
          Muvaffaqiyatli jo'natildi!
        </div>
      )}
      {/* Header */}
      <header className="bg-white  px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
                  Bizning afzalliklarimiz
          </h2>
          <p className="text-gray-600 text-lg">
            Sizning salomatligingiz — bizning eng katta qadriyatimiz
          </p>
        </div>
      </header>

      {/* Services Section */}
      <section className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {services.map((service, index) => (
            <div 
            
              key={index}
              className="bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300"
            >
              {/* Image */}
              <div className="aspect-video overflow-hidden bg-gray-200">
                <img 
                  src={service.image} 
                  alt={service.title}
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Content */}
              <div className="p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-3">
                  {service.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {service.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

  
      <section 
        className="relative min-h-[600px] overflow-visible max-w-[1920px] mx-auto"
        style={{
          backgroundImage: `url(${BgImg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >

        <div className="relative z-10 max-w-[1920px] mx-auto px-4 py-16 flex items-end justify-between min-h-[600px]">
          
           {/* Left Character - Female Doctor */}
           <div className="hidden lg:block absolute left-0 bottom-[-65px] z-30 -ml-39">
             <img 
               src={doc} 
               alt="Female Doctor" 
               className="w-150 h-[800px] object-contain scale-x-[-1] object-center"
             />
           </div>

          {/* Center Content */}
          <div className="flex-1 text-center px-4 lg:px-8 z-20 mt-35 sm:mt-0">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-white">
              Qo'ng'iroq buyurtma qiling
            </h1>
            <p className="text-lg md:text-xl mb-8 text-white/90">
              Bizning Call-Markazimiz siz bilan eng qisqa fursatda bog'lanadi.
            </p>
            {error && (
              <div className="mb-4 text-red-100 bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-sm">
                {error}
              </div>
            )}
            {success && (
              <div className="mb-4 text-green-50 bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-sm">
                Muvaffaqiyatli jo'natildi! Tez orada siz bilan bog'lanamiz.
              </div>
            )}
            
            {/* Action Form */}
            <form 
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full max-w-md mx-auto sm:max-w-none"
            >
              <input 
                type="text" 
                value={name}
                onChange={(e) => { setName(e.target.value); setError('') }}
                placeholder="Ism" 
                className="w-full sm:w-auto bg-white/20
                 backdrop-blur-sm text-white 
                 placeholder-white/70 px-8 py-3 
                 rounded-full font-medium border
                 border-white/30 focus:bg-white/30 
                focus:outline-none transition-all relative z-40"
                required
              />
              <input 
                type="tel" 
                value={phoneNumber}
                onChange={handlePhoneChange}
                placeholder="+998 99 465 55 55" 
                className="w-full sm:w-auto bg-white/20 backdrop-blur-sm text-white 
                placeholder-white/70 px-4 py-3 rounded-full font-medium
                border border-white/30 focus:bg-white/30 focus:outline-none
                transition-all"
                required
              />
              <button 
                type="submit"
                disabled={loading}
                className="w-full sm:w-auto bg-white text-blue-600 
                px-8 py-3 rounded-full font-medium hover:bg-gray-100
                transition-all disabled:opacity-70 disabled:cursor-not-allowed">
                {loading ? "Yuborilmoqda..." : "Menga Qo'ng'iroq Qiling"}
              </button>
            </form>
          </div>

          {/* Right Character - Elderly Man */}
           {/* Right Character - DNA Helix */}
           <div className="hidden lg:block absolute right-0 bottom-0 z-10 -mr-30">
             <img 
               src={RightImg} 
               alt="DNA Helix" 
               className="w-150 h-[600px] object-contain object-bottom"
             />
           </div>
        </div>
      </section>


      {/* Bottom Spacing */}
       <div className="bg-background py-0 sm:py-12 px-4 sm:px-6 lg:px-8 flex justify-center">
        <button className="bg-primary hover:bg-primary/90 text-white px-8 py-3 rounded-lg font-semibold flex items-center gap-2 transition-colors">
          Batafsil
          <ArrowRight size={20} />
        </button>
      </div>
    </div>
  );
}


