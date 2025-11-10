import Navbar from '../Navbar'
import LeftImg from '../../assets/left.png';
import RightImg from '../../assets/right.png';
import DoctorImg from '../../assets/doc.png';
import Footer from '../Footer'
import CarImg from '../../assets/labaratoriya/car.png'
import Doctor1 from '../../assets/labaratoriya/doctor.png'
import Doctor2 from '../../assets/labaratoriya/doctor2.png'
import Phone from '../../assets/labaratoriya/phone.png'
import Vector from '../../assets/labaratoriya/Vector.png'


export default function Laboratory({ onNavigate }) {
  return (

  <div className="min-h-screen bg-white mt-24">
    <Navbar onNavigate={onNavigate} currentSection="laboratory" />
    <section className="w-full bg-gray-200 py-8 px-4 md:py-12 relative overflow-hidden">
      <div className="pt-10 max-w-7xl mx-auto flex flex-col md:flex-row gap-4 relative z-10">
        
        {/* Left Green Container */}
        <div className="flex-1 relative">
          {/* Green Organic Shape */}
          <div
            className="absolute inset-0 bg-no-repeat bg-cover rounded-3xl"
            style={{ backgroundImage: `url(${LeftImg})` }}
          ></div>
          
          {/* Content */}
          <div className="ml-24 relative z-10 p-8 md:p-12 min-h-[300px] flex flex-col justify-between">
            {/* Text Bubbles - positioned at top center-right */}
            <div className="flex flex-col items-center space-y-3 pt-4">
              <div className="inline-block bg-blue-200/95 backdrop-blur-sm rounded-full px-8 py-3 shadow-lg">
                <h1 className="text-lg md:text-xl font-bold text-gray-800">
                  Laboratoriya Endi O'z
                </h1>
              </div>
              <div className="ml-12 inline-block bg-blue-200/95 backdrop-blur-sm rounded-full px-8 py-3 shadow-lg">
                <h2 className="text-lg md:text-xl font-bold text-gray-800">
                  Laboratoriya Endi O'z Uyingizda
                </h2>
        
              </div>
            </div>
            
            {/* Button */}
        <div className="flex justify-start mt-26">
          <button className="group flex items-center gap-2 rounded-full bg-blue-500 px-8 py-3 font-semibold text-white shadow-lg transition-all hover:bg-blue-600 hover:shadow-xl">
            Batafsil
            <svg
              className="h-5 w-5 transition-transform group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
            <div className="pt-8 flex items-center gap-2 text-sm text-white/80">
                  <button
                    onClick={() => onNavigate && onNavigate('home')}
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    Bosh Sahifa
                  </button>
                  <span>/</span>
                  <span className="font-medium text-white">Uyga Labaratoriya chaqirish</span>
                </div>
          </div>
        </div>

        {/* Right Blue Container */}
        <div className="flex-1 relative">
     
          <div
            className="absolute inset-0 bg-no-repeat bg-cover rounded-3xl"
            style={{ backgroundImage: `url(${RightImg})` }}
          ></div>
          
          {/* Doctor Image */}
          <div className="relative z-10 p-8 md:p-12 min-h-[400px] flex items-center justify-center">
            <img
              src={DoctorImg}
              alt="Medical professional with supplies"
              className="w-[300px] h-[400px] md:w-[500px] md:h-[340px] object-contain drop-shadow-xl"
            />
          </div>
        </div>
      </div>

      {/* Pagination Dots */}
      <div className="flex justify-center mt-6 gap-2 relative z-10">
        <span className="w-2.5 h-2.5 bg-blue-500 rounded-full"></span>
        <span className="w-2.5 h-2.5 bg-gray-400 rounded-full"></span>
      </div>
    </section>


    <section className="bg-gray-300 py-16 w-full">
        <div className="max-w-6xl mx-auto px-8">
          <p className='text-left   text-xl'>Biz tahlillarni topshirish qiyin bo'lishi mumkinligini tushunamiz, 
            ayniqsa kasallik paytida, ish jadvali tig'iz bo'lsa yoki bola kasal bo'lsa.
            Ertalab turib, och qoringa klinikaga borish eng yoqimli ish emas.
            Sizning qulayligingiz uchun <span className='font-bolt'> Quvonch Medical Centerda </span> hamshirani uyga yoki 
            ofisga chaqirishingiz mumkin. U barcha kerakli tahlillarni oladi, 
            natijalarni esa onlayn tarzda olasiz, vaqt va kuchingizni tejaysiz!
          </p>

           <div className="w-full pt-6" >
            <div className="rounded-2xl shadow-lg p-8 flex items-center justify-between" style={{ backgroundColor: "#98B8FF" }}>
               <img src={CarImg} alt="Car" className="w-90 h-auto object-contain ml-8"/>

               <p className="text-center text-black font-semibold text-xl leading-snug">
              Toshkent bo‘ylab chiqish narxi — <br />
              <span className="font-bold text-2xl">79.000 so‘m</span>
            </p>
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
                src={Doctor1}
                alt="Doktor"
                className="w-full h-auto rounded-xl object-cover"
              />
            </div>

            {/* Text Content - 60% */}
            <div className="w-full lg:w-3/5">
          <h2 className="mb-12 text-left text-4xl font-bold text-gray-900 md:text-2xl">
          <span className="ml-10 inline-block rounded-full bg-blue-500 px-8 py-4 text-white shadow-lg">
                  Kimlar uchun qulay ? 
            </span>
          </h2>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p className="text-lg font-bold">
                  • Ish sababli tahlil topshira olmaydiganlar uchun.
                </p>
                <p className="text-lg font-bold">
                   • Sog‘lig‘i tufayli klinikaga bora olmaydigan bemorlar uchun.
                </p>
                   <p className="text-lg font-bold">
                   • Klinikaga borish qiyin bo‘lgan yoshi ulug‘ insonlar uchun.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      <div className="mx-auto max-w-7xl">
        {/* Main Title */}
        <h1 className="mb-12 text-left text-4xl font-bold text-gray-900 md:text-2xl">
          <span className="inline-block rounded-full bg-blue-500 px-8 py-4 text-white shadow-lg">
            Qanday Qo'ng'iroq Qilinadi?
          </span>
        </h1>

        {/* Content Card */}
        <div className="overflow-hidden rounded-3xl bg-white shadow-2xl">
          <div className="grid gap-0 md:grid-cols-2">
            {/* Left Side - Steps */}
            <div className="flex flex-col justify-center space-y-8 p-8 md:p-12">
              {/* Step 1 */}
              <div className="text-center pb-2">
                <div className="inline-block rounded-full bg-blue-200 px-6 py-3">
                  <h2 className="text-2xl font-bold text-gray-900">1- Qadam</h2>
                </div>
                <p className="text-center text-lg leading-relaxed text-gray-700">
                  Bizning call markazimizga qo'ng'iroq qiling va uyingizga tashrif buyurishini xohlayotganingizni ayting.
                </p>
              </div>

              {/* Step 2 */}
              <div className="text-center pb-2">
                <div className="inline-block rounded-full bg-blue-200 px-6 py-3">
                  <h2 className="text-2xl font-bold text-gray-900">2- Qadam</h2>
                </div>
                <p className="text-center text-lg leading-relaxed text-gray-700">
                  Testlar ro'yxati va hamshira tashrifi uchun qulay vaqtni
                  kelishib oling.
                </p>
              </div>

              {/* Step 3 */}
              <div className="text-center pb-2">
                <div className="inline-block rounded-full bg-blue-200 px-6 py-3">
                  <h2 className="text-2xl font-bold text-gray-900">3- Qadam</h2>
                </div>
                <p className="text-center text-lg text leading-relaxed text-gray-700">
                  Analizlarga tayyorlaning.
                </p>
              </div>
            </div>

            {/* Right Side - Phone Mockup */}
            <div className="relative bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 p-8 md:p-12 flex items-center justify-center">
                <img src={Phone} alt="" />
            </div>
          </div>
        </div>
      </div>
      </div>
    

    <section className="min-h-screen bg-white from-[#EAF0FF] to-white py-16 px-6">
      <h1 className="mb-12 text-left text-4xl font-bold text-gray-900 md:text-2xl">
        <span className="ml-24 inline-block rounded-full bg-blue-500 px-8 py-4 text-white shadow-lg">
          Analizga Qanday Tayyorlanish Kerak?
        </span>
      </h1>

      <div className="max-w-7xl mx-auto">
        <div className="relative bg-white rounded-3xl overflow-hidden shadow-2xl hover:shadow-blue-300/40 transition-shadow duration-500">
          {/* Background Vector */}
          <div className="absolute inset-0 opacity-100">
            <img src={Vector} alt="Vector" className="w-full h-full object-cover" />
          </div>

      
          <div className="relative flex flex-col lg:flex-row items-center gap-10 p-10">
      
            <div className="lg:w-1/2 w-full flex justify-center transform scale-x-[-1]">
              <img
                src={Doctor2}
                alt="Doctor with microscope"
                className="w-full max-w-[500px] h-auto rounded-2xl drop-shadow-2xl"
              />
            </div>

          
            <div className="lg:w-1/2 w-full text-[#1A1A1A]">
              <ul className="space-y-5 text-lg leading-relaxed">
                <li className="flex gap-3">
                  <span className="text-2xl text-blue-500">•</span>
                  <span>
                    <span className="font-semibold">Qon och qoringa topshiriladi:</span> testdan oldin ovqatlanmang,
                    suv ichishga va tishlaringizni yuymang. Oldindan og‘ir yoki yog‘li ovqatlardan saqlaning.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="text-2xl text-blue-500">•</span>
                  <span>
                    <span className="font-semibold">Stressdan saqlaning:</span> jismoniy zo‘riqish va hissiy stress
                    natijalarga ta’sir qilishi mumkin. Sinovdan oldin 10–15 daqiqa tinch holatda o‘tiring.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="text-2xl text-blue-500">•</span>
                  <span>
                    <span className="font-semibold">Najas yoki siydik tahlili:</span> steril idishdan foydalaning va
                    ko‘rsatmalarga qat’iy amal qiling.
                  </span>
                </li>
              </ul>

              <div className="mt-8 bg-blue-50 text-[#1A1A1A] rounded-2xl px-8 py-5 inline-block shadow-md">
                <p className="text-base md:text-lg leading-relaxed">
                  <span className="font-semibold">Eslatma:</span> Ba’zi testlar ma’lum vaqtlarda va faqat klinikada
                  o‘tkaziladi. Batafsil ma’lumot uchun bizning
                  <span className="font-bold text-blue-600 text-2xl ml-2">55 508 00 00</span> raqamiga murojaat qiling.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* Call to Action Button */}
    <section className="py-8 bg-gray-100">
      <div className="max-w-4xl mx-auto text-center">
        <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-4 px-12 rounded-full text-xl shadow-lg transition-all duration-300 hover:shadow-xl">
          Qo'ng'iroqqa Buyurtma
        </button>
      </div>
    </section>

    <Footer onNavigate={onNavigate} />
    </div>
    
  );
}

  
