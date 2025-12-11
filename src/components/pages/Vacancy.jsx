import { useState, useEffect } from "react"
import Footer from "../Footer"
import Puls from "../../assets/service/puls.png"
import Application from "../application/application"
import { ChevronDown, Settings2, Search, ChevronLeft, ChevronRight } from "lucide-react"
import { apiUrl } from "../../utils/api"
import Loader from "../loader/Loader"


export default function Vacancy({ onNavigate }) {
  const [expandedRows, setExpandedRows] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("Kategoriyalar")
  const [selectedWorkType, setSelectedWorkType] = useState("Ishlash Turi")
  const [currentPage, setCurrentPage] = useState(1)
  const [vacancies, setVacancies] = useState([])
  const [categories, setCategories] = useState([])
  const [workTypes, setWorkTypes] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const PAGE_SIZE = 6

  // Sahifa ochilganda yuqoriga scroll qilish
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  // Vacancy Section
  useEffect(() => {
    const fetchVacancies = async () => {
      try {
        const response = await fetch(apiUrl('vakansiyalar/'))
        if (!response.ok) throw new Error("Serverdan javob kelmadi")
        const data = await response.json()
        setVacancies(data.results || [])
      } catch (err) {
        console.error("API yuklashda xatolik:", err)
        setError("Vakansiyalarni yuklashda xatolik yuz berdi.")
      } finally {
        setLoading(false)
      }
    }
    fetchVacancies()
  }, [])

  // Categories section
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(apiUrl('categories/'))
        if (!response.ok) throw new Error("Kategoriyalarni yuklashda xatolik")
        const data = await response.json()
        // Support both paginated { results: [...] } and plain array responses
        setCategories(Array.isArray(data) ? data : (data.results || []))
      } catch (err) {
        console.error("Kategoriya yuklashda xatolik:", err)
      }
    }
    fetchCategories()
  }, [])

  // Take worktypes from https://api.greentraver.uz/work-types/
  useEffect(() => {
    const fetchWorkTypes = async () => {
      try {
        const response = await fetch(apiUrl('work-types/'))
        if (!response.ok) throw new Error("Ishlash turlarini yuklashda xatolik")
        const data = await response.json()
        // API returns: { count, next, previous, results: [{ id, name, name_uz, name_ru, created_at }] }
        // Support both paginated { results: [...] } and plain array responses
        setWorkTypes(Array.isArray(data) ? data : (data.results || []))
      } catch (err) {
        console.error("Ishlash turi yuklashda xatolik:", err)
      }
    }
    fetchWorkTypes()
  }, [])

  // Row toggle
  const toggleRow = (id) => {
    setExpandedRows((prev) =>
      prev.includes(id) ? prev.filter((r) => r !== id) : [...prev, id]
    )
  }

  // Search + Filtr
  const filteredData = vacancies.filter((row) => {
    const matchSearch = row.title_uz?.toLowerCase().includes(searchTerm.toLowerCase())
    const matchCategory =
      selectedCategory === "Kategoriyalar" ||
      categories.find((c) => c.id === row.category)?.name_uz?.toLowerCase() ===
        selectedCategory.toLowerCase()
    const matchWorkType =
      selectedWorkType === "Ishlash Turi" ||
      workTypes.find((w) => w.id === row.work_type)?.name_uz?.toLowerCase() ===
        selectedWorkType.toLowerCase()
    return matchSearch && matchCategory && matchWorkType
  })

  //  Pagination
  const totalRows = filteredData.length
  const totalPages = Math.max(1, Math.ceil(totalRows / PAGE_SIZE))
  const safePage = Math.min(Math.max(1, currentPage), totalPages)
  const startIndex = (safePage - 1) * PAGE_SIZE
  const endIndex = Math.min(startIndex + PAGE_SIZE, totalRows)
  const startLabel = totalRows === 0 ? 0 : startIndex + 1
  const endLabel = endIndex
  const paginatedData = filteredData.slice(startIndex, endIndex)

  if (loading) {
    return (
      <div className="min-h-screen bg-white mt-24 flex items-center justify-center">
        <Loader fullScreen={false} size={60} />
      </div>
    )
  }

  if (error) {
    return <div className="text-center py-20 text-red-500">{error}</div>
  }

  return (
    <div className="min-h-screen bg-white mt-24">
      {/* Hero Section */}
      <section className="pt-0 md:pt-16 pb-16">
        <div className="max-w-8xl mx-auto px-4 md:px-8 lg:px-12">
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg md:rounded-3xl p-6 md:p-10 lg:p-16 shadow-2xl">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-8">
              <div className="flex-1 text-white">
                <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-2 md:mb-4">Vakansiyalar</h1>
                <div className="flex items-center gap-2 text-xs md:text-sm text-white/80">
                  <button onClick={() => onNavigate && onNavigate('home')} className="hover:text-white transition-colors cursor-pointer">
                    Bosh Sahifa
                  </button>
                  <span>/</span>
                  <span className="font-medium text-white">Vakansiya</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filter + Table */}
      <div className="min-h-screen bg-gray-50 p-4 md:p-6">
        <div className="max-w-8xl mx-auto bg-white rounded-2xl shadow-sm p-4 md:p-6 md:px-12">
          {/* Filter Section */}
          <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-4 mb-6">
            <div className="flex items-center gap-3 md:gap-4 w-full md:w-auto">
              <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition">
                <Settings2 size={20} className="text-gray-600" />
              </button>

              {/* Search Bar */}
              <div className="flex-1 md:flex-none md:ml-auto flex items-center gap-2 bg-gray-100 border border-gray-300 rounded-full px-4 py-2 md:w-72">
                <Search size={18} className="text-gray-500" />
                <input
                  type="text"
                  placeholder="Kalit so'z bilan qidirish"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="outline-none bg-transparent text-gray-700 placeholder-gray-400 w-full"
                />
              </div>
            </div>

            {/* Category Filter */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full md:w-auto px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 hover:border-gray-400 transition"
            >
              <option>Kategoriyalar</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.name_uz || cat.name}>
                  {cat.name_uz || cat.name}
                </option>
              ))}
            </select>

            {/* Work Type Filter */}
            <select
              value={selectedWorkType}
              onChange={(e) => setSelectedWorkType(e.target.value)}
              className="w-full md:w-auto px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 hover:border-gray-400 transition"
            >
              <option>Ishlash Turi</option>
              {workTypes.map((type) => (
                <option key={type.id} value={type.name_uz || type.name}>
                  {type.name_uz || type.name}
                </option>
              ))}
            </select>
          </div>

          {/*  Table Section */}
          <div className="space-y-3">
            {paginatedData.map((row) => {
              const categoryObj = categories.find((c) => c.id === row.category)
              const workTypeObj = workTypes.find((w) => w.id === row.work_type)

              return (
                <div
                  key={row.id}
                  className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-4 p-4">
                    <div className="flex items-center gap-3 flex-1">
                      <button
                        onClick={() => toggleRow(row.id)}
                        className="flex-shrink-0 p-1 hover:bg-gray-100 rounded transition"
                      >
                        <ChevronDown
                          size={20}
                          className={`text-gray-600 transition-transform ${
                            expandedRows.includes(row.id) ? "rotate-180" : ""
                          }`}
                        />
                      </button>

                      <div className="flex-1 min-w-0">
                        <p className="text-blue-600 hover:text-blue-800 font-semibold truncate">
                          {row.title_uz || "Nomlanmagan vakansiya"}
                        </p>
                        <p className="text-sm text-gray-500">ID: {row.id}</p>
                      </div>
                    </div>

                    <div className="hidden md:flex items-center gap-12 flex-1">
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Kategoriya</p>
                        <p className="text-sm font-medium text-gray-900">
                          {categoryObj?.name_uz || categoryObj?.name || "Noma’lum"}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Ish turi</p>
                        <p className="text-sm font-medium text-gray-900">
                          {workTypeObj?.name_uz || workTypeObj?.name || "Noma’lum"}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Muddati</p>
                        <p className="text-sm font-medium text-gray-900">{row.expiring_date}</p>
                      </div>
                    </div>

                    <button
                      onClick={() => onNavigate && onNavigate("vacancy-application")}
                      className="w-full md:w-auto flex-shrink-0 px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-lg transition"
                    >
                      Ariza Qoldirish
                    </button>
                  </div>

                  {expandedRows.includes(row.id) && (
                    <div className="border-t border-gray-200 bg-gray-50 p-4 animate-fadeIn">
                      <p className="text-sm text-gray-700 mb-2">
                        <strong>Tavsif:</strong> {row.description_uz || "Tavsif mavjud emas"}
                      </p>
                      <p className="text-sm text-gray-700">
                        <strong>Talablar:</strong> {row.requirements_uz || "Talablar ko‘rsatilmagan"}
                      </p>
                    </div>
                  )}
                </div>
              )
            })}

            {/* Pagination */}
            <div className="flex items-center justify-center md:justify-end gap-3 pt-4">
              <div className="px-4 py-2 bg-gray-100 rounded-xl text-sm text-gray-700">
                {startLabel}-{endLabel} / {totalRows}
              </div>
              <button
                className="group w-9 h-9 rounded-full border border-gray-300 flex items-center justify-center hover:bg-blue-600 hover:border-blue-600 disabled:opacity-40"
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={safePage === 1}
              >
                <ChevronLeft size={18} className="text-gray-700 group-hover:text-white" />
              </button>
              <button
                className="group w-9 h-9 rounded-full border border-gray-300 flex items-center justify-center hover:bg-blue-600 hover:border-blue-600 disabled:opacity-40"
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={safePage === totalPages}
              >
                <ChevronRight size={18} className="text-gray-700 group-hover:text-white" />
              </button>
            </div>
          </div>
        </div>

        <img className="mt-10 w-full mb-10" src={Puls} alt="plus" />
      </div>

      <Application />
      <Footer onNavigate={onNavigate} />
    </div>
  )
}
