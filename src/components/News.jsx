import { useState, useEffect } from "react";
import { apiUrl } from "../utils/api";
import Loader from "./loader/Loader";

export default function ClinicNews() {
  const [newsItems, setNewsItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAll, setShowAll] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
        const response = await fetch(apiUrl('news/'));
        
        if (!response.ok) {
          throw new Error("Ma'lumotlarni yuklab bo'lmadi");
        }
        
        const data = await response.json();
        
        // Faqat nashr qilingan yangiliklarni filter qilish
        // va eng yangi yangiliklarni birinchi bo'lib ko'rsatish
        const publishedNews = data.results
          .filter((item) => item.is_published)
          .sort(
            (a, b) =>
              new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
          )
          .map((item) => ({
            id: item.id,
            title: item.title_uz || item.title,
            label: item.title_uz || item.title,
            date: new Date(item.created_at).toLocaleDateString("uz-UZ", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
            }),
            image: item.image,
          }));
        
        setNewsItems(publishedNews);
        setError(null);
      } catch (err) {
        setError(err.message);
        console.error("Yangiliklar yuklashda xatolik:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  const handleShowMore = () => {
    setShowAll(true);
  };

  const handleShowLess = () => {
    setIsClosing(true);
    // Animatsiya tugagach showAll ni false qilish
    setTimeout(() => {
      setShowAll(false);
      setIsClosing(false);
    }, 1200 + (newsItems.length - 6) * 200); // Eng uzoq animatsiya vaqti
  };

  return (
    <section id="news-section" className="min-h-screen bg-gray-100 px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
                Klinikamiz yangiliklari
            </h2>
            <p className="text-gray-600 text-lg">
              Sizning salomatligingiz — bizning eng katta qadriyatimiz
            </p>
        </div>
        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-12">
            <Loader fullScreen={false} size={50} />
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="flex justify-center items-center py-12">
            <div className="text-red-600 text-lg">{error}</div>
          </div>
        )}

        {/* News Grid */}
        {!loading && !error && (
          <div className="mb-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {newsItems.length > 0 ? (
              newsItems.slice(0, showAll || isClosing ? newsItems.length : 6).map((item, index) => {
                const isExtraItem = index >= 6;
                const shouldAnimate = isExtraItem && (showAll || isClosing);
                const animationType = isClosing ? 'fadeOutUp' : 'fadeInUp';
                const animationDuration = isClosing ? 1.2 : 0.8;
                const animationDelay = isExtraItem ? (index - 6) * (isClosing ? 0.2 : 0.15) : 0;
                
                return (
                <article
                  key={item.id}
                  className="group overflow-hidden rounded-3xl bg-white shadow-md transition-all duration-700 hover:shadow-xl"
                  style={{
                    animation: shouldAnimate ? `${animationType} ${animationDuration}s ease-out ${animationDelay}s forwards` : "none",
                    opacity: isExtraItem && !showAll && !isClosing ? 0 : isExtraItem && isClosing ? 1 : 1
                  }}
                >
                  {/* Image Container */}
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={item.title}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                      onError={(e) => {
                        e.target.src = "/placeholder.svg";
                      }}
                    />
                    {/* Label Overlay */}
                    <div className="absolute left-4 top-4 rounded-full bg-white px-4 py-2 text-sm font-semibold text-gray-800 shadow-md">
                      {item.label}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h2 className="mb-2 text-xl font-bold text-gray-800">{item.title}</h2>
                    <p className="text-sm text-gray-600">{item.date}</p>
                  </div>
                </article>
                );
              })
            ) : (
              <div className="col-span-full text-center py-12 text-gray-600">
                Yangiliklar topilmadi
              </div>
            )}
          </div>
        )}

        {/* CTA Buttons */}
        {!loading && !error && newsItems.length > 6 && (
          <div className="flex justify-center">
            <div className="text-center">
              {!showAll ? (
                <button
                  onClick={handleShowMore}
                  className="
                  bg-blue-500 
                  hover:bg-blue-600 text-white 
                  font-semibold px-24 py-4 rounded-lg 
                  shadow-lg hover:shadow-xl transition-all 
                  duration-200 inline-flex items-center gap-2 text-lg"
                >
                  Ko'proq →
                </button>
              ) : (
                <button
                  onClick={handleShowLess}
                  disabled={isClosing}
                  className="
                  bg-blue-500 
                  hover:bg-blue-600 text-white 
                  font-semibold px-24 py-4 rounded-lg 
                  shadow-lg hover:shadow-xl transition-all 
                  duration-200 inline-flex items-center gap-2 text-lg
                  disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  ← Ortga
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
