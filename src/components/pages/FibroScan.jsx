import { useEffect } from 'react'
import Navbar from '../Navbar'
import Footer from '../Footer'
import Banner from '../../assets/fibroScan/fibobanner.png'
import FibroScan1 from '../../assets/fibroScan/1.png'
import FibroScan2 from '../../assets/fibroScan/2.png'
import Application from '../application/application'
import Puls from "../../assets/service/puls.png"
import Map from '../Map'

export default function FibroScan({ onNavigate }) {
  // Sahifa ochilganda yuqoriga scroll qilish
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])



  return (
    <div className="min-h-screen bg-white mt-24">
      <Navbar onNavigate={onNavigate} currentSection="fibro-scan" />

      {/* Hero Section */}
      <section className="pt-0 md:pt-16 pb-16">
        <div className="w-full md:max-w-8xl md:mx-auto px-4 md:px-8 lg:px-12">
          <div className="w-full bg-gradient-to-br from-blue-500 to-blue-600 rounded-3xl md:rounded-[3rem] overflow-hidden min-h-[40vh] md:min-h-[45vh] flex items-center relative">
            
            {/* Left Content - Blue Background (2/3) */}
            <div className="w-full md:w-2/3 p-8 md:p-16 flex flex-col justify-center h-full">
              <div className="text-white">
                <h1 className="text-4xl md:text-6xl font-bold mb-6 text-left">
                  FibroScan
                </h1>
                <p className="text-lg md:text-xl leading-relaxed mb-10 text-white/90 text-left">
                  Quvonch Medical Centerda jigarning noinvaziv tekshiruvi
                </p>

                <div className="flex items-center gap-2 text-sm text-white/80">
                  <button
                    onClick={() => onNavigate && onNavigate('home')}
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    Bosh Sahifa
                  </button>
                  <span>/</span>
                  <span className="font-medium text-white">FibroScan</span>
                </div>
              </div>
            </div>

            {/* Right Content - Medical Image (1/3) */}
            <div className="hidden md:block absolute right-0 top-0 w-1/3 h-full p-4">
              <div className="relative w-full h-full">
                <img
                  src={Banner}
                  alt="FibroScan Medical Examination"
                  className="w-full h-full object-cover rounded-r-[3rem] rounded-l-3xl"
                />
                {/* Overlay gradient for better text readability */}
                <div className="absolute inset-0 bg-gradient-to-l from-blue-500/20 to-transparent rounded-r-[3rem] rounded-l-3xl"></div>
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
                src={FibroScan1}
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



      <section className="py-12 bg-white">
         <div className="max-w-7xl mx-auto px-8">
           <div className="flex flex-col lg:flex-row-reverse items-center gap-8">
             {/* Image - 40% */}
             <div className="w-full lg:w-2/5">
               <img
                 src={FibroScan2}
                 alt="EKG"
                 className="w-3/4 h-auto rounded-xl object-cover mx-auto"
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
