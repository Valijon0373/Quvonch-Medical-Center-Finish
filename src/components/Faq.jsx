"use client"

import { useState } from "react"
import Puls from "../assets/service/puls.png";

export default function FAQ() {
  const [openIndexes, setOpenIndexes] = useState([])

  const faqs = [

    {
      id:1,
      question: "Manzilimiz Qayerda?",
      answer:
        "Bizning tibbiyot markazimiz Toshkent shahrida joylashgan. Aniq manzil: Amir Temur ko'chasi, 123-uy. Metro bekatidan 5 daqiqa masofada.",
    },
    {
       id:1,
      question: "Ish Grafigi Qanday?",
      answer:
        "Biz dushanba-shanba kunlari soat 9:00 dan 20:00 gacha ishlaymiz. Yakshanba kunlari dam olish kuni. Tez yordam xizmati 24/7 ishlaydi.",
    },
    {
       id:1,
      question: "Analizlar Qanday O'tkaziladi?",
      answer:
        "Analizlar uchun oldindan ro'yxatdan o'tish talab etiladi. Qon tahlili uchun och qoringa kelish kerak. Natijalar 1-2 kun ichida tayyor bo'ladi.",
    },
    {
       id:1,
      question: "Shifokorlarning Qabul Qilish Grafigi",
      answer:
        "Shifokorlar dushanba-juma kunlari soat 9:00 dan 18:00 gacha qabul qilishadi. Shanba kuni 9:00 dan 14:00 gacha. Qabulga oldindan yozilish tavsiya etiladi.",
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
                   openIndexes.includes(index) ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
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
      
    </section>
  )
}
