"use client"

import { useState } from "react"
import Puls from "../assets/service/puls.png";
import ApplicationForm from "./modal-form/modal-form";

export default function FAQ() {
  const [openIndexes, setOpenIndexes] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)

  const faqs = [

    {
      id:1,
      question: "Manzilimiz Qayerda?",
      answer:
        "Bizning tibbiyot markazimiz Xorazm viloyatida joylashgan. Aniq manzil: Xorazm viloyati, Urganch Shahar, Xonqa ko'chasi",
    },
    {
       id:1,
      question: "Ish Grafigi Qanday?",
      answer:
        "Biz Dushanba-Juma kunlari soat 8:00 dan 18:00 gacha, Shanba 8:00 dan 16:00 gacha ishlaymiz. Yakshanba kunlari dam olish kuni. Tez yordam xizmati 24/7 ishlaydi.",
    },
    {
       id:1,
      question: "Analiz qanday topshirish kerak?",
      answer:
        <>
          <div>
            <strong>Analizni qanday topshirish kerak:</strong>
            <br />    
            <p>Qon ertalab och qoringa yig'iladi. Analizdan oldin og'ir, achchiq yoki</p>
            <p>yog'li ovqatlardan saqlaning, spirtli ichimliklarni ichmang.</p>
            <p>Ba'zi gormonlar testlari (TSH, paratiroid gormoni) kunlik tebranishlarga duchor bo'ladi, shuning uchun ular faqat soat 11:00 dan oldin olinadi,</p>
            <p>shuningdek, test natijalariga ta'sir qilishi mumkin bo'lgan omillar, masalan, jismoniy zo'riqish (yugurish, zinapoyaga chiqish) va hissiy qo'zg'alish kabilarni istisno qilish kerak. Shuning uchun, protseduradan oldin, tinchlanish uchun kutish xonasida 10-15 daqiqa dam olishingiz kerak.</p>
            
            <br />
            
            <strong>Siydik va najasni tekshirishga qanday tayyorgarlik ko'rish kerak:</strong>
            
            <p>Qon namunalarini olish uchun klinikamizdan biopsiya namunasi uchun maxsus idishni oling.</p>
            <p>Analiz uchun siydikni yig'ishdan oldin gigiena protseduralarini bajarish kerak; aks holda, natijalar noto'g'ri bo'lishi mumkin.</p> <br/>
            
            <p>Analizdan bir kun oldin siydik va natijasi  rangini o'zgartirishi mumkin bo'lgan sabzavot va mevalardan (lavlagi, sabzi, temir va mis qo'shimchalari) va diuretiklarni qabul qilmaslik tavsiya etiladi.</p> <br />
            <p>Natijasni tekshirish uchun laksatiflardan qochish kerak.</p>
            
            <p>E'tibor bering, ba'zi testlar qo'shimcha tayyorgarlikni talab qiladi. Qo'shimcha ma'lumot olish uchun <button onClick={() => setIsModalOpen(true)} className="underline font-semibold hover:text-blue-200 transition-colors">so'rov yuboring</button> va qo'shimcha yordam olish uchun qo'ng'iroq markazimiz siz bilan bog'lanadi.</p>
          </div>
        </>,
    },
    {
       id:1,
      question: "Shifokorlarning Qabul Qilish Grafigi",
      answer:
        "Har bir shifokorning qabul vaqti har xil. Ushbu sahifadagi shifokorlardan birini tanlang va ariza qoldiring, bizning call-markaz siz bilan bog‘lanib, batafsil ma’lumot beradi.",
    },
  ]

  const toggleFAQ = (index) => {
    setOpenIndexes(prev => {
      if (prev.includes(index)) {
        // Remove index if already open
        return prev.filter(i => i !== index)
      } else {
        // Add index to open dropdowns
        return [...prev, index]
      }
    })
  }

  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
          <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            Eng ko’p so’raladigan savollar
          </h2>
          <p className="text-gray-600 text-lg">
            Sizning salomatligingiz — bizning eng katta qadriyatimiz
          </p>
        </div>

        {/* FAQ Grid */}
        <div className="grid md:grid-cols-2 gap-6 items-start">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-blue-500 rounded-2xl overflow-hidden">
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-5 text-left text-white font-medium text-lg flex items-center justify-between hover:bg-blue-600 transition-colors"
              >
                <span>{faq.question}</span>
                <svg
                  className={`w-5 h-5 transition-transform duration-300 flex-shrink-0 ml-4 ${
                    openIndexes.includes(index) ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

               {/* Answer - Creates space and pushes content down */}
               <div
                 className={`overflow-hidden transition-all duration-300 ease-in-out ${
                   openIndexes.includes(index) ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0"
                 }`}
               >
                 <div className="px-6 pb-5 text-white/90 leading-relaxed border-t border-blue-400/30">
                   {faq.answer}
                 </div>
               </div>
               
               {/* Spacer for bottom margin when open */}
               {openIndexes.includes(index) && (
                 <div className="h-4"></div>
               )}
            </div>
          ))}
        </div>
      
      </div>
      
           <div className="relative w-full h-30 flex items-center justify-center  mt-20">
                  <img src={Puls} alt="plus" />
            </div>
      
      {/* Appointment Modal */}
      <ApplicationForm
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Qabulga Yozilish"
      />
    </section>
  )
}
