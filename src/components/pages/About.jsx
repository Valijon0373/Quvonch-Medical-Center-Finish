import { useEffect, useState } from 'react'
import axios from 'axios'
import { apiUrl } from '../../utils/api'
import Loader from '../loader/Loader'

export default function About({ onNavigate, isInHome = false }) {
  const [aboutData, setAboutData] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  // Sahifa ochilganda yuqoriga scroll qilish
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  useEffect(() => {
    let isMounted = true

    const fetchAbout = async () => {
      try {
        setIsLoading(true)
        setError(null)

        const response = await axios.get(apiUrl('aboutus/'), { withCredentials: false })

        if (!isMounted) return

        // Backenddan kelgan struktura: { results: [ { description_uz, description_ru } ] }
        const data = response?.data?.results?.[0]
        setAboutData(data)
      } catch (err) {
        if (!isMounted) return
        console.error(err)
        setError('Maʼlumotlarni yuklashda xatolik yuz berdi.')
      } finally {
        if (!isMounted) return
        setIsLoading(false)
      }
    }

    fetchAbout()
    return () => { isMounted = false }
  }, [])

  return (
    <div className={`bg-white ${isInHome ? 'mt-4' : 'mt-8 min-h-screen'}`}>
      {/* Hero Section */}
      <section className={`pt-0 ${isInHome ? 'pb-0' : 'pb-4'}`}>
        <div className="max-w-8xl mx-auto px-4 md:px-8 lg:px-12">
          <div className="w-full max-w-8xl 
          bg-gradient-to-br from-blue-500 to-blue-600 
          rounded-3xl p-6 md:p-10 lg:p-16 relative">

            {/* Mobile Layout */}
            <div className="md:hidden text-center text-white">
              <h1 className="text-2xl sm:text-3xl font-bold mb-6">
                Biz Haqimizda
              </h1>

              <p className="text-sm sm:text-base leading-relaxed mb-8 text-white/90 px-2">
                {isLoading && (
                  <div className="flex justify-center py-4">
                    <Loader fullScreen={false} size={40} />
                  </div>
                )}
                {!isLoading && error && error}
                {!isLoading && !error && (
                  aboutData?.description_uz ||
                  `Qandaydir xato bor?`
                )}
              </p>

              

              <button className="bg-white text-gray-800 font-bold px-8 py-3 rounded-full text-lg hover:bg-gray-100 transition-colors mb-8">
                Qabulga Yoziling
              </button>

              <div className="absolute bottom-4 left-4 text-sm text-white/80">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onNavigate && onNavigate('home')}
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    Bosh Sahifa
                  </button>
                  <span>/</span>
                  <span className="font-medium text-white">Biz Haqimizda</span>
                </div>
              </div>
            </div>

            {/* Desktop Layout */}
            <div className="hidden md:flex flex-col lg:flex-row items-center gap-8">
              <div className="flex-1 text-white">
                <h1 className="text-3xl lg:text-4xl font-bold mb-4">
                  Biz Haqimizda
                </h1>

                <p className="mt-10 text-base lg:text-lg max-w-6xl 
                leading-relaxed mb-6 text-white/90 text-left">
                  {isLoading && (
                    <div className="flex justify-center py-4">
                      <Loader fullScreen={false} size={40} />
                    </div>
                  )}
                  {!isLoading && error && error}
                  {!isLoading && !error && (
                    aboutData?.description_uz ||
                    `Qandaydir xato bor`
                  )}
                </p>

                <div className="flex items-center gap-2 text-sm text-white/80">
                  <button
                    onClick={() => onNavigate && onNavigate('home')}
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    Bosh Sahifa
                  </button>
                  <span>/</span>
                  <span className="font-medium text-white">Biz Haqimizda</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  )
}
