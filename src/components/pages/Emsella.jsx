import Navbar from '../Navbar'
import Footer from '../Footer'
import Banner from '../../assets/emsella/banner.png'
import Application from '../application/application'
import BgImg from '../../assets/emsella/bg.png'
import CardImg from '../../assets/emsella/1.png'

export default function Emsella({ onNavigate }) {
  return (
    <div className="min-h-screen bg-white mt-24">
      <Navbar onNavigate={onNavigate} currentSection="emsella" />

      {/* Hero Section */}
      <section className="pt-24 pb-16">
        <div className="max-w-8xl mx-auto px-6 lg:px-12">
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-3xl p-10 md:p-16 shadow-2xl">
            <div className="flex flex-col md:flex-row items-center gap-10">

            
              <div className="flex-1 text-white text-center md:text-left">
                <h1 className="text-4xl md:text-5xl font-bold mb-6">
                  BTL Emsella
                </h1>
                <p className="text-lg leading-relaxed mb-8 text-white/90">
                  Taz salomatligi: ayollar va erkaklar uchun yechimlar 
                  <br /> Quvonch Medical Centerda
                </p>

                <button className="mx-auto md:mx-0 mb-6 bg-white text-black px-8 py-3 rounded-full font-medium flex items-center gap-2 justify-center transition-opacity duration-300 hover:opacity-50">
                  Ro'yxatdan o'tish <span className="text-lg">→</span>
                </button>

                <div className="flex justify-center md:justify-start items-center gap-2 text-sm text-white/80">
                  <button
                    onClick={() => onNavigate && onNavigate('home')}
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    Bosh Sahifa
                  </button>
                  <span>/</span>
                  <span className="font-medium text-white">Emsella</span>
                </div>
              </div>

    
              <div className="flex-shrink-0">
                <div className="relative w-72 h-60 flex items-center justify-center">
                  <img
                    src={Banner}
                    alt="Emsella"
                    className="w-full h-full object-contain scale-x-[-1]" // rasm o‘ng tomonga qaraydi
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
       {/* Text section */}
      <section className='conatainer max-w-8xl mx-auto px-6 lg:px-48' >
                <div className="space-y-4 text-gray-700 leading-relaxed">
                <p className="text-2xl">
                  Chanoq tubi mushaklarini mustahkamlash va nozik muammolarni invaziv muolajalarsiz 
                  hamda charchatadigan mashqlarsiz hal qilish mumkinmi?⁣⁣

                </p>
                <p className="text-2xl">     
                     Ha, agar siz Emsella kreslosida kursdan o‘tsangiz.
                    Har bir muolaja davomida EMSELLA apparati yordamida chanoq tubi mushaklari minglab 
                    supra-maksimal qisqarishlarni amalga oshiradi. 
                    Bu esa bemorlarda nerv-mushak tizimini qayta o‘rgatishda juda muhim jarayon hisoblanadi.

                </p>
              </div>
      </section>

      <section className="py-12 bg-gray-50">
            <div className="max-w-7xl mx-auto px-8">
                <div className="relative rounded-2xl shadow-xl overflow-hidden bg-cover bg-center"
                style={{ backgroundImage: `url(${BgImg})` }} >
                <div className="relative flex flex-col lg:flex-row items-center gap-8 p-8">
            {/* Image */}
            <div className="w-full lg:w-3/5">
            <img
                src={Banner}
                alt="emsella"
                className="w-3/4 h-auto rounded-xl"
            />
            </div>
            {/* Text Content */}
            <div className="w-full lg:w-2/5">
            <h2 className="text-3xl lg:text-4xl font-bold text-black mb-6">
                U qanday ishlaydi?
            </h2>
            <div className="space-y-4 text-white leading-relaxed">
                <p className="text-lg">
                EMSELLA tos bo'shlig'i mushaklarini chuqur rag'batlantirish va
                nerv-mushak nazoratini tiklash uchun yuqori intensivlikdagi
                fokuslangan elektromagnit (HIFEM) texnologiyasidan foydalanadi.
                Uning samaradorligi, birinchi navbatda, yo'naltirilgan
                elektromagnit energiyaning chuqur kirib borishi va tos
                bo'shlig'ining butun maydonini rag'batlantirish bilan bog'liq.
                </p>
            </div>
            </div>
        </div>
        </div>
        </div>
      </section>

      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-8">
            <div className="flex flex-col-reverse lg:flex-row items-center gap-8">
            
            {/* Chapdagi card (Matn) */}
            <div className="w-full lg:w-3/5">
                <div
                className="rounded-2xl shadow-lg p-8"
                style={{ backgroundColor: "#98B8FF" }}
                >
                <h2 className="text-white text-3xl lg:text-4xl font-bold mb-6">
                    Protsedura davomiyligi
                </h2>
                <p className="text-lg leading-relaxed">
                    Har bir muolaja faqat 28 daqiqa davom etadi. Bu birinchi ijobiy
                    o'zgarishlarni ko'rish uchun etarli vaqt. Mutaxassis har bir bemor
                    uchun individual mezonlar, jumladan, ko'rsatkichlar, sog'liq
                    holati, yoshi va boshqa omillarga asoslangan seanslar sonini
                    belgilaydi.
                </p>
                </div>
            </div>

            {/* O‘ngdagi rasm */}
            <div className="w-full lg:w-2/5 flex justify-center">
                <img
                src={CardImg}
                alt="Emsella"
                className="w-full h-auto max-w-[400px]"
                />
            </div>
            </div>
        </div>
      </section>

      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-8">
          <div className="flex flex-col-reverse lg:flex-row items-center gap-8">
            
            {/* Chapdagi card (Matn) */}
            <div className="w-full lg:w-3/5">
                <div
                className="rounded-2xl shadow-lg p-8"
                style={{ backgroundColor: "#98B8FF" }}
                >
                <h2 className="text-white text-3xl lg:text-4xl font-bold mb-6">
                    Protsedura davomiyligi
                </h2>
                <p className="text-lg leading-relaxed">
                   O'rtacha davolash kursi 6 dan 10 seansni o'z ichiga oladi, 
                   seanslar orasidagi interval 2-3 kun.
                   Seanslarning aniq soni shifokor tomonidan belgilanadi.
                </p>
                </div>
            </div>

            {/* O‘ngdagi rasm */}
            <div className="w-full lg:w-2/5 flex justify-center">
                <div className="rounded-2xl shadow-lg p-8"
                style={{ backgroundColor: "#98B8FF" }} >
                <h2 className="text-white text-3xl lg:text-4xl font-bold mb-6">
                    Reabilitatsiya
                </h2>
                <p className="text-lg leading-relaxed">
                    EmSella kafedrasida protseduradan so'ng maxsus reabilitatsiya yoki 
                    tiklanish talab etilmaydi.
                </p>
                </div>
            </div>
            </div>
        </div>
      </section>




      {/* Application form */}
      <Application />

      <Footer onNavigate={onNavigate} />
    </div>
  )
}
