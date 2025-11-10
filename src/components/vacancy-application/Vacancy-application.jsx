import { useState } from 'react'
import Footer from '../Footer'
import { apiUrl } from '../../utils/api'
import { formatPhoneNumber, cleanPhoneNumber, handlePhoneInputChange } from '../../utils/phoneFormatter'

export default function VacancyApplication({ onNavigate }) {
  const [formData, setFormData] = useState({
    fullName: '',
    diplomaId: '',
    email: '',
    phone: '+998 ',
    comment: ''
  })
  const [showSuccess, setShowSuccess] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    if (name === "phone") {
      handlePhoneInputChange(e, (formattedValue) => {
        setFormData(prev => ({
          ...prev,
          phone: formattedValue
        }))
      })
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    // Telefon raqamini formatlash
    const phoneNumber = cleanPhoneNumber(formData.phone)

    // ✅ API ga yuboriladigan format
    const payload = {
      vakansiya: 1, // kerakli id ni backenddan bilish kerak bo'ladi
      vakansiya_title: 'Frontend Dasturchi', // Agar kerak bo'lsa, dynamic qilish mumkin
      full_name_uz: formData.fullName.trim(),
      full_name_ru: formData.fullName.trim(), // Agar alohida ruscha input bo'lsa, uni qo'shing
      diplom_id: formData.diplomaId.trim(),
      phone: phoneNumber,
      email: formData.email.trim(),
      cover_letter_uz: formData.comment.trim() || '',
      cover_letter_ru: formData.comment.trim() || '' // Agar alohida ruscha input bo'lsa, uni qo'shing
    }

    try {
      const response = await fetch(apiUrl('vakansiya-arizalari/'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      })

      if (!response.ok) {
        throw new Error(`Xatolik: ${response.status}`)
      }

      const data = await response.json()
      console.log('Yuborildi:', data)

      setShowSuccess(true)
      setFormData({
        fullName: '',
        diplomaId: '',
        email: '',
        phone: '+998 ',
        comment: ''
      })
    } catch (error) {
      console.error('Ariza yuborishda xatolik:', error)
      alert("Ariza yuborishda muammo yuz berdi, keyinroq urinib ko‘ring.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-white mt-24">
      {/* Hero Section */}
      <section className="pt-16 pb-10">
        <div className="max-w-8xl mx-auto px-8 lg:px-12">
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-3xl p-10 md:p-16 ">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="flex-1 text-white">
                <h1 className="text-5xl font-bold mb-4">
                  Vakansiyalarimiz
                </h1>
                <div className="flex items-center gap-2 text-sm text-white/80">
                  <button
                    onClick={() => onNavigate && onNavigate('home')}
                    className="hover:text-white transition-colors"
                  >
                    Bosh Sahifa
                  </button>
                  <span>/</span>
                  <button
                    onClick={() => onNavigate && onNavigate('vacancy')}
                    className="hover:text-white transition-colors"
                  >
                    Vakansiya
                  </button>
                  <span>/</span>
                  <span className="font-medium text-white">
                    Ariza Qoldirish
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Form */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-2xl mx-auto px-8 lg:px-12">
          <div className="bg-white rounded-2xl p-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Ariza Qoldiring
              </h2>
              <p className="text-gray-600">
                Biz uni ko‘rib chiqamiz va siz bilan tez fursatda bog‘lanamiz.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                placeholder="Ism Familya"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                required
              />

              <input
                type="text"
                name="diplomaId"
                value={formData.diplomaId}
                onChange={handleInputChange}
                placeholder="Diplom ID Raqami"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                required
              />

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Email"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                required
              />

              <div className="relative">
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 flex items-center gap-2">
                  <span className="text-lg">🇺🇿</span>
                  <span className="text-gray-600 text-sm">+998</span>
                </div>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="99 465 55 55"
                  className="w-full pl-20 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <textarea
                name="comment"
                value={formData.comment}
                onChange={handleInputChange}
                placeholder="Izoh Qoldiring"
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 resize-none"
              />

              <button
                type="submit"
                disabled={loading}
                className={`w-full py-3 px-6 rounded-lg text-white font-medium text-lg transition-colors ${
                  loading
                    ? 'bg-blue-400 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700'
                }`}
              >
                {loading ? 'Yuborilmoqda...' : "Jo'natish"}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Success Modal */}
      {showSuccess && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
          onClick={() => setShowSuccess(false)}
        >
          <div
            className="bg-white rounded-[28px] shadow-2xl px-8 py-10 max-w-md w-[90%] text-center relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowSuccess(false)}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
            >
              <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <h3 className="text-xl md:text-2xl font-extrabold text-gray-900 mb-4">
              Ariza Muvaffaqiyatli Topshirildi!
            </h3>
            <p className="text-gray-700 leading-relaxed mb-6">
              Biz uni ko‘rib chiqamiz va siz bilan tez fursatda bog‘lanamiz.
            </p>
            <button
              onClick={() => setShowSuccess(false)}
              className="inline-flex items-center justify-center px-6 py-2.5 rounded-full bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors"
            >
              Yopish
            </button>
          </div>
        </div>
      )}

      <Footer onNavigate={onNavigate} />
    </div>
  )
}
