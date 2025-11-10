import { X, Phone, User, Calendar } from "lucide-react"
import { useEffect, useState } from "react"
import axios from "axios"
import { apiUrl } from "../../utils/api"

export default function AppointmentForm({ 
  open, 
  onClose, 
  doctorId, 
  doctorName, 
  serviceId, 
  serviceName 
}) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    comment: "",
    date: "",
    time: ""
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
      // Reset form when modal closes
      setFormData({ name: "", phone: "", comment: "", date: "", time: "" })
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
      // Format phone number - +998 qo'shish
      const digits = formData.phone.replace(/\D/g, '')
      const phoneNumber = `+998${digits}`

      // Prepare data according to API format
      const apiData = {
        doctor: doctorId,
        service_price: serviceId,
        name_uz: formData.name.trim(),
        name_ru: formData.name.trim(),
        phone: phoneNumber,
        comment: formData.comment.trim() || "",
        preferred_date: formData.date || null,
        preferred_time: formData.time || null
      }

      // Send POST request to API
      // Note: Update the endpoint based on your actual API endpoint for appointments
      const response = await axios.post(apiUrl('appointments/'), apiData)

      if (response.status === 200 || response.status === 201) {
        setSuccess(true)
        // Reset form after 2 seconds
        setTimeout(() => {
          setFormData({ name: "", phone: "", comment: "", date: "", time: "" })
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

  // Get today's date in YYYY-MM-DD format for min date
  const today = new Date().toISOString().split('T')[0]

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />

      <div className="relative z-10 w-[90%] max-w-2xl rounded-3xl bg-white p-6 sm:p-8 shadow-2xl">
        <button
          aria-label="Close"
          className="absolute right-4 top-4 inline-flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200"
          onClick={onClose}
        >
          <X className="h-5 w-5" />
        </button>

        <div className="text-center space-y-3 mb-6">
          <h2 className="text-2xl font-extrabold text-gray-900">Qabulga Yozilish</h2>
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
          <p className="text-gray-600 max-w-md mx-auto text-sm">
            Ma'lumotlarni to'ldiring va biz sizga tez orada qo'ng'iroq qilamiz
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
              Muvaffaqiyatli jo'natildi! Tez orada sizga qo'ng'iroq qilamiz.
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

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-gray-400">
                <Calendar className="h-5 w-5" />
              </div>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                min={today}
                className="w-full rounded-full border border-gray-200 pl-11 pr-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                disabled={loading}
              />
            </div>

            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-gray-400">
                <Calendar className="h-5 w-5" />
              </div>
              <input
                type="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
                className="w-full rounded-full border border-gray-200 pl-11 pr-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                disabled={loading}
              />
            </div>
          </div>

          <textarea
            name="comment"
            value={formData.comment}
            onChange={handleChange}
            placeholder="Izoh Qoldiring (ixtiyoriy)"
            rows="3"
            className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 resize-none"
            disabled={loading}
          />

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


