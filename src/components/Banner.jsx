import Top1 from '../assets/banner/Top.png'
import Top2 from '../assets/banner/under.png'
import Bg from '../assets/bg2.png'
import { useState } from 'react'
import { formatPhoneNumber, handlePhoneInputChange } from '../utils/phoneFormatter'


export default function Banner({ onNavigate }) {
  const [phoneNumber, setPhoneNumber] = useState('+998 ')

  const handlePhoneChange = (e) => {
    handlePhoneInputChange(e, setPhoneNumber)
  }

  return (
    <div className="relative max-w-7xl mx-auto overflow-hidden mt-4 md:mt-6 rounded-3xl">
      {/* Background: solid color on mobile, image on md+ */}
      {/* Mobile background color */}
      <div
        className="absolute top-0 left-0 right-0 block md:hidden rounded-3xl"
        style={{
          background: '#EDFBFF',
          minHeight: '500px', // Mobil uchun balandlik
          height: '100%', // was '100vh', now more reliable for mobile
          maxHeight: '700px',
        }}
      />
      {/* Desktop/Tablet background image */}
      <div
        className="absolute top-0 left-0 right-0 hidden md:block bg-no-repeat rounded-3xl"
        style={{
          backgroundImage: `url(${Bg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: '80vh',
        }}
      />

      {/* Main Content */}
      <div
        className="relative z-40 flex flex-col md:flex-row items-center justify-center md:justify-between px-0 py-2 w-full mx-auto"
        style={{ minHeight: '500px', height: 'auto', maxWidth: '100vw' }} // was '100vh', now 'auto' for mobile
      >
        {/* Left Content */}
        <div className="flex-1 max-w-4xl mt-4 md:mt-4 text-center md:text-left">
          {/* Logo - Mobile only */}
          <div className="flex flex-col items-center mb-8 mt-48 block md:hidden">
            <img src={Top1} alt="Heart with hands" className="h-32 w-auto mb-2" />
            <img src={Top2} alt="Quvonch Medical Center" className="h-16 w-auto" />
          </div>

          <div className="md:pl-12">
            <h1 className="text-2xl md:text-4xl font-bold text-black leading-tight relative z-30 text-center md:text-left block md:hidden">
              Chet Eldan Kelgan<br />
              Mutaxassislar va Shifokorlar
            </h1>
            <p className="text-gray-700 text-sm md:text-base mb-5 leading-relaxed text-center md:text-left block md:hidden">
              Bizning shifoxonamiz — bu ishonch, zamonaviy tibbiyot va g'amxo'rlik makoni bo'lib, ko'p yillik tajriba va
              insonlarga bo'lgan muhabbatga asoslangan.
            </p>
            <button
              onClick={() => onNavigate('about')}
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-4 px-8 rounded-full transition-colors mx-auto md:mx-0 block mb-20 md:mt-48 md:ml-8"
            >
              Batafsil →
            </button>
          </div>

          <div className="pt-12 mt-16 md:mt-56 mb-16 md:mb-0 bg-white/95 backdrop-blur-sm p-4 md:p-6 md:rounded-r-[70px] md:rounded-tl-[80px] relative z-[9999] w-full md:w-full -ml-0 md:-ml-0 block md:hidden">
            <div className="flex flex-col md:grid md:grid-cols-4 gap-6 md:gap-6 items-stretch h-full">
              {/* Block 1 */}
              <div className="text-center h-full flex flex-col justify-between">
                <h3 className="text-lg md:text-[18.23px] font-bold leading-[100%] text-center text-gray-800 mb-3 md:mb-2">
                  Yuqori Aniqlikdagi Tahlillar
                </h3>
                <p className="text-sm md:text-[10.13px] font-normal leading-[100%] text-center text-gray-600" style={{ fontWeight: 400, letterSpacing: '0%' }}>
                  Laboratoriya tekshiruvlari yuqori aniqlikdagi Yevropa uskunalari va reagentlarida amalga oshiriladi.
                </p>
              </div>
              {/* Block 2 */}
              <div className="text-center h-full flex flex-col justify-between">
                <h3 className="text-lg md:text-[18.23px] font-bold leading-[100%] text-center text-gray-800 mb-3 md:mb-2">
                  Barcha Tekshiruvlar 1 Kunda
                </h3>
                <p className="text-sm md:text-[10.13px] font-normal leading-[100%] text-center text-gray-600" style={{ fontWeight: 400, letterSpacing: '0%' }}>
                  Faqat bir tashrif davomida barcha tekshiruvlardan o'tasiz va natijaga ko'ra mutaxassis maslahat beradi.
                </p>
              </div>
              {/* Block 3 */}
              <div className="text-center h-full flex flex-col justify-between">
                <h3 className="text-lg md:text-[18.23px] font-bold leading-[100%] text-center text-gray-800 mb-3 md:mb-2">
                  Professional Yondashuv
                </h3>
                <p className="text-sm md:text-[10.13px] font-normal leading-[100%] text-center text-gray-600" style={{ fontWeight: 400, letterSpacing: '0%' }}>
                  Tajribali mutaxassislar tekshiruv natijalarining aniqligi va ishonchliligini kafolatlaydi.
                </p>
              </div>
              {/* Block 4 */}
              <div className="text-center h-full flex flex-col justify-between">
                <h3 className="text-lg md:text-[18.23px] font-bold leading-[100%] text-center text-gray-800 mb-3 md:mb-2">
                  7 Yildan Ortiq Tajriba
                </h3>
                <p className="text-sm md:text-[10.13px] font-normal leading-[100%] text-center text-gray-600" style={{ fontWeight: 400, letterSpacing: '0%' }}>
                  Shu vaqt ichida bizga 280 mingdan ortiq bemor ishonch bildirdi.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side Images (hidden on all screens) */}
        <div className="flex-1 relative h-100 hidden items-center justify-center">
          <div className="absolute z-20 top-40 md:top-10">
            <img src={Top1} alt="Heart with hands" className="w-60 md:w-90 h-auto" />
          </div>
          <div className="absolute z-30 top-20 md:top-60">
            <img src={Top2} alt="Quvonch Medical Center" className="w-80 md:w-100 h-auto" />
          </div>
        </div>
      </div>

      {/* Bottom Info Section */}
      <div className="relative py-0 md:py-4 mt-0 md:mt-25">
        {/* Call to Action Section */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 mt-2 md:mt-0">
          <div className="bg-blue-600 py-6 px-4 rounded-2xl">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              {/* Left Text */}
              <div className="text-white text-center md:text-left">
                <h2 className="text-2xl font-bold mb-1">Savollaringiz Bormi?</h2>
                <p className="text-blue-100 text-sm">Telefon raqamingizni qoldiring, biz tezda aloqamiz chiqamiz!</p>
              </div>

              {/* Right Input and Button */}
              <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
                <div className="relative w-full sm:w-64">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xl">🇺🇿</span>
                  <input
                    type="tel"
                    value={phoneNumber}
                    onChange={handlePhoneChange}
                    placeholder="+998 99 465 55 55"
                    className="w-full h-12 pl-12 pr-4 rounded-full bg-white/20 backdrop-blur-sm text-white placeholder:text-white border border-white/30 focus:outline-none focus:ring-2 focus:ring-white/50"
                  />
                </div>
                <button className="h-12 px-6 rounded-full bg-white text-blue-600 font-semibold hover:bg-blue-50 transition-colors whitespace-nowrap w-full sm:w-auto">
                  Menga Qo'ng'iroq Qiling
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
