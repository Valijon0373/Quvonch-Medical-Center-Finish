import Navbar from '../Navbar'

import Footer from '../Footer'
import Banner from "../../assets/functionalD/banner.png"
import FunctionalImage1 from '../../assets/functionalD/1.png'
import FunctionalImage2 from '../../assets/functionalD/2.png'
import FunctionalImage3 from '../../assets/functionalD/3.png'
import Application from '../application/application'
import Map from '../Map'
import Puls from '../../assets/service/puls.png'

export default function FunctionalD({ onNavigate }) {

  const filiallar = [
    {
      id: 1,
      title: "MIROBOT",
      address: [
        "Xaritadan Ko'ring",
        "Tashkent City,",
        "Mirabad District,",
        "Avliyoota St., 1-2",
        "Mo'ljal: Mirabad Market"
      ]
    },
    {
      id: 2,
      title: "MIROBOT",
      address: [
        "Xaritadan Ko'ring",
        "Tashkent City,",
        "Mirabad District,",
        "Avliyoota St., 1-2",
        "Mo'ljal: Mirabad Market"
      ]
    },
    {
      id: 3,
      title: "MIROBOT",
      address: [
        "Xaritadan Ko'ring",
        "Tashkent City,",
        "Mirabad District,",
        "Avliyoota St., 1-2",
        "Mo'ljal: Mirabad Market"
      ]
    },
    {
      id: 4,
      title: "MIROBOT",
      address: [
        "Xaritadan Ko'ring",
        "Tashkent City,",
        "Mirabad District,",
        "Avliyoota St., 1-2",
        "Mo'ljal: Mirabad Market"
      ]
    }
  ]

  return (
    <div className="min-h-screen bg-white mt-24">
      <Navbar onNavigate={onNavigate} currentSection="functional-diagnostika" />

      {/* Hero Section */}
      <section className="md:pt-16 pb-0">
        <div className="max-w-8xl mx-auto px-4 md:px-8 lg:px-12">
          {/* Blue Section with Text and Button */}
          <div className="w-full max-w-8xl bg-gradient-to-br from-blue-500 to-blue-600 rounded-3xl p-6 md:p-10 lg:p-16 shadow-2xl">
            <div className="flex flex-col items-center text-center gap-6 md:flex-row md:text-left md:gap-8">
              
              {/* Text Content */}
              <div className="flex-1 text-white">
                <h1 className="text-2xl md:text-3xl lg:text-5xl font-bold mb-4 text-center md:text-left">
                  Funksional Diagnostika
                </h1>
                <p className="text-sm md:text-base lg:text-lg leading-relaxed mb-6 text-white/90 text-center md:text-left">
                  Yurak va qon tomirlaringiz holatini Quvonch medical centerda tekshiring
                </p>

                <div className="flex justify-center md:justify-start mb-6">
                  <button className="bg-white text-gray-800 px-6 py-3 md:px-8 md:py-3 rounded-full font-semibold text-sm md:text-base transition-opacity duration-300 hover:opacity-90">
                    Qabulga Yoziling
                  </button>
                </div>

                <div className="flex items-center justify-center md:justify-start gap-2 text-xs md:text-sm text-white/80">
                  <button
                    onClick={() => onNavigate && onNavigate('home')}
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    Bosh Sahifa
                  </button>
                  <span>/</span>
                  <span className="font-medium text-white">Funksional Diagnostika</span>
                </div>
              </div>

              {/* Illustration - Hidden on mobile, shown on larger screens */}
              <div className="hidden md:flex flex-shrink-0">
                <div className="relative w-90 h-80 flex items-center justify-center">
                  <img
                    src={Banner}
                    alt="Funksional Diagnostika Icon"
                    className="w-[500px] h-[300px] object-cover rounded-3xl scale-100"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Image Left - Text Right Section */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-8">
          <div className="flex flex-col lg:flex-row items-center gap-8">
            {/* Image - 40% */}
            <div className="w-full lg:w-2/5">
              <img
                src={FunctionalImage1}
                alt="ExoKG"
                className="w-full h-auto rounded-xl transform scale-x-[-1]"
              />
            </div>

            {/* Text Content - 60% */}
            <div className="w-full lg:w-3/5">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                ExoKG (Ehokardiyografiya)
              </h2>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p className="text-lg">
                  ExoKG — bu yurakni o‘rganish usuli bo‘lib, uning ishlash faoliyati 
                  haqida batafsil ma’lumot olish imkonini beradi. Tekshiruv ultratovush 
                  to‘lqinlari yordamida o‘tkaziladi, ular yurakdan aks etib, ekran orqali tasvirga aylantiriladi.
                </p>
                <p className="text-lg">
                  ExoKG yurak kasalliklarini aniqlashda qo‘llaniladi, jumladan: 
                  yurak klapanlari buzilishlari, qorinchalararo to‘siqdagi nuqsonlar, 
                  kardiomiopatiya va boshqa kasalliklar. Shuningdek, bu usul yurakning 
                  umumiy ishlashini, hajmi va funksiyasini yurak siklining har bir bosqichida baholash imkonini beradi.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Text Left - Image Right Section */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-8">
          <div className="flex flex-col lg:flex-row-reverse items-center gap-8">
            {/* Image - 40% */}
            <div className="w-full lg:w-2/5">
              <img
                src={FunctionalImage2}
                alt="EKG"
                className="w-full h-[300px] rounded-xl object-cover"
              />
            </div>

            {/* Text Content - 60% */}
            <div className="w-full lg:w-3/5">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                EKG (Elektrokardiografiya)
              </h2>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p className="text-lg">
                  Elektrokardiografiya (EKG) — yurak faoliyatini o‘rganishning eng oddiy va 
                  samarali usullaridan biridir. U yurak impulslarining elektr faolligini qayd etadi.
                </p>
                <p className="text-lg">
                  EKG yurak ritmidagi o‘zgarishlarni, ishemiya, infarkt yoki boshqa yurak 
                  kasalliklarini aniqlashda muhim vositadir. Tekshiruv og‘riqsiz, tez 
                  va har qanday yoshdagi bemorlar uchun xavfsizdir.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

         <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-8">
          <div className="flex flex-col lg:flex-row items-center gap-8">
            {/* Image - 40% */}
            <div className="w-full lg:w-2/5">
              <img
                src={FunctionalImage3}
                alt="ExoKG"
                className="w-full h-auto rounded-xl object-cover"
              />
            </div>

            {/* Text Content - 60% */}
            <div className="w-full lg:w-3/5">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                ExoKG (Ehokardiyografiya)
              </h2>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p className="text-lg">
                  ExoKG — bu yurakni o‘rganish usuli bo‘lib, uning ishlash faoliyati 
                  haqida batafsil ma’lumot olish imkonini beradi. Tekshiruv ultratovush 
                  to‘lqinlari yordamida o‘tkaziladi, ular yurakdan aks etib, ekran orqali tasvirga aylantiriladi.
                </p>
                <p className="text-lg">
                  ExoKG yurak kasalliklarini aniqlashda qo‘llaniladi, jumladan: 
                  yurak klapanlari buzilishlari, qorinchalararo to‘siqdagi nuqsonlar, 
                  kardiomiopatiya va boshqa kasalliklar. Shuningdek, bu usul yurakning 
                  umumiy ishlashini, hajmi va funksiyasini yurak siklining har bir bosqichida baholash imkonini beradi.
                </p>
              </div>
            </div>
          </div>
        </div>


        
      </section>
      <img className="mt-10 w-full mb-10" src={Puls} alt="plus" />

      <div className="text-center mb-12 rounded-[1rem]">
        <h2 className="text-3xl font-bold text-black mb-4">Klinikamiz Filiallari</h2>
        <p className="text-lg text-black">Sizning salomatligingiz – bizning eng katta qadriyatimiz</p>
      </div>

      {/* Clinic Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-20 rounded-[1rem] max-w-7xl mx-auto px-4">
        {/* MIROBOT Branch */}
        <div className="bg-blue-500 text-white p-6 rounded-lg">
          <h3 className="font-bold text-lg mb-4">MIROBOT</h3>
          <div className="space-y-2 text-sm">
            <p className="underline cursor-pointer hover:text-blue-200">Xaritadan Ko'ring</p>
            <p>Tashkent City,</p>
            <p>Mirabad District,</p>
            <p>Avliyoota St., 1-2</p>
            <p className="font-semibold">Mo'ljal: Mirabad Market</p>
          </div>
        </div>

        {/* Second Branch */}
        <div className="bg-blue-500 text-white p-6 rounded-[1rem]">
          <h3 className="font-bold text-lg mb-4">MIROBOT</h3>
          <div className="space-y-2 text-sm">
            <p className="underline cursor-pointer hover:text-blue-200">Xaritadan Ko'ring</p>
            <p>Tashkent City,</p>
            <p>Mirabad District,</p>
            <p>Avliyoota St., 1-2</p>
            <p className="font-semibold">Mo'ljal: Mirabad Market</p>
          </div>
        </div>

        {/* Third Branch */}
        <div className="bg-blue-500 text-white p-6 rounded-[1rem]">
          <h3 className="font-bold text-lg mb-4">MIROBOT</h3>
          <div className="space-y-2 text-sm">
            <p className="underline cursor-pointer hover:text-blue-200">Xaritadan Ko'ring</p>
            <p>Tashkent City,</p>
            <p>Mirabad District,</p>
            <p>Avliyoota St., 1-2</p>
            <p className="font-semibold">Mo'ljal: Mirabad Market</p>
          </div>
        </div>

        {/* Fourth Branch */}
        <div className="bg-blue-500 text-white p-6 rounded-[1rem]">
          <h3 className="font-bold text-lg mb-4">MIROBOT</h3>
          <div className="space-y-2 text-sm">
            <p className="underline cursor-pointer hover:text-blue-200">Xaritadan Ko'ring</p>
            <p>Tashkent City,</p>
            <p>Mirabad District,</p>
            <p>Avliyoota St., 1-2</p>
            <p className="font-semibold">Mo'ljal: Mirabad Market</p>
          </div>
        </div>
      </div>
      

       <Map />
      <Application />
      <Footer onNavigate={onNavigate} />
    </div>
  )
}
