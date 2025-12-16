import { X, Phone, User } from "lucide-react"
import { useEffect, useState } from "react"
import axios from "axios"

const API_BASE_URL = "https://api.greentraver.uz/"

export default function ApplicationForm({ 
  open, 
  onClose, 
  title = "Qabulga yoziling",
  doctorId,
  doctorName,
  serviceId,
  serviceName
}) {
  const [formData, setFormData] = useState({
    name: "",
    phone: ""
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    function onKeyDown(e) {
      if (e.key === "Escape") onClose?.()
    }
    if (open) {
      document.addEventListener("keydown", onKeyDown)
      document.body.style.overflow = "hidden"
    }
    return () => {
      document.removeEventListener("keydown", onKeyDown)
      document.body.style.overflow = ""
    }
  }, [open, onClose])

  useEffect(() => {
    if (!open) {
      setFormData({ name: "", phone: "" })
      setError("")
      setSuccess(false)
    }
  }, [open])

  const handlePhoneChange = (e) => {
    const value = e.target.value
    // Faqat raqamlarni qabul qilish
    const digits = value.replace(/\D/g, '')
    // Maksimal 9 ta raqam
    const limitedDigits = digits.slice(0, 9)
    
    // Formatlash: XX XXX XX XX
    let formatted = ''
    if (limitedDigits.length > 0) {
      formatted = limitedDigits.slice(0, 2)
    }
    if (limitedDigits.length > 2) {
      formatted += ' ' + limitedDigits.slice(2, 5)
    }
    if (limitedDigits.length > 5) {
      formatted += ' ' + limitedDigits.slice(5, 7)
    }
    if (limitedDigits.length > 7) {
      formatted += ' ' + limitedDigits.slice(7, 9)
    }
    
    setFormData(prev => ({
      ...prev,
      phone: formatted
    }))
    setError("")
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    if (name === "phone") {
      handlePhoneChange(e)
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }))
    }
    setError("")
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setSuccess(false)

    // Validate form
    if (!formData.name.trim()) {
      setError("Ismni kiriting")
      return
    }
    if (!formData.phone.trim()) {
      setError("Telefon raqamini kiriting")
      return
    }

    setLoading(true)

    try {
      const digits = formData.phone.replace(/\D/g, '')
      const phoneNumber = `+998${digits}`

      const apiData = {
        name_uz: formData.name.trim(),
        name_ru: formData.name.trim(),
        phone: phoneNumber,
      }

      const response = await axios.post(`${API_BASE_URL}call-orders/`, apiData)

      if (response.status === 200 || response.status === 201) {
        setSuccess(true)
        setTimeout(() => {
          setFormData({ name: "", phone: "" })
          setSuccess(false)
          onClose?.()
        }, 2000)
      }
    } catch (err) {
      console.error("API Error:", err)
      setError(err.response?.data?.message || err.response?.data?.error || "Xatolik yuz berdi. Qayta urinib ko'ring.")
    } finally {
      setLoading(false)
    }
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40 animate-modal-overlay" onClick={onClose} />

      <div className="relative z-10 w-[90%] max-w-2xl rounded-3xl bg-white p-6 sm:p-8 shadow-2xl animate-modal-pop">
        <button
          aria-label="Close"
          className="absolute right-4 top-4 inline-flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200"
          onClick={onClose}
        >
          <X className="h-5 w-5" />
        </button>

        <div className="text-center space-y-3 mb-6 pt-6 sm:pt-8">
          <h2 className="text-2xl font-extrabold text-gray-900">{title}</h2>
          {doctorName && (
            <p className="text-gray-600 font-medium">
              Doktor: {doctorName}
            </p>
          )}
          {serviceName && (
            <p className="text-gray-600 font-medium">
              Xizmat: {serviceName}
            </p>
          )}
          <p className="text-gray-600 max-w-md mx-auto">
            biz uni tezda ko'rib chiqamiz va siz uchun qulay vaqtda bog'lanamiz.
          </p>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          {error && (
            <div className="rounded-full bg-red-50 border border-red-200 px-4 py-3 text-red-700 text-sm">
              {error}
            </div>
          )}

          {success && (
            <div className="rounded-full bg-green-50 border border-green-200 px-4 py-3 text-green-700 text-sm">
              Muvaffaqiyatli jo'natildi!
            </div>
          )}

          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-gray-400">
              <User className="h-5 w-5" />
            </div>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Ismingiz"
              className="w-full rounded-full border border-gray-200 pl-11 pr-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              disabled={loading}
              required
            />
          </div>

          <div className="relative">
            <div className="absolute left-3 inset-y-0 flex items-center gap-2 text-gray-400">
              <Phone className="h-5 w-5" />
              <span className="text-sm font-semibold text-gray-500">+998</span>
            </div>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="99 465 55 55"
              className="w-full rounded-full border border-gray-200 pl-24 pr-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              disabled={loading}
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-full bg-blue-600 text-white font-semibold py-3 hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Jo'natilmoqda..." : "Jo'natish"}
          </button>
        </form>
      </div>
    </div>
  )
}



