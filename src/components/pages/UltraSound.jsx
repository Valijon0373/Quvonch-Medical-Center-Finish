import Navbar from '../Navbar'
import Footer from '../Footer'
import ultraSoundIcon from '../../assets/utt/main.png'
import doctorUtt from '../../assets/utt/DoctorUtt.png'
import Puls from '../../assets/service/puls.png'
import Map from '../Map'

export default function UltraSound({ onDoctorClick, onNavigate }) {
  const doctors = [
    {
      id: 1,
      name: "Salimova Karomat",
      specialty: "UTT",
      image: doctorUtt
    },
    {
      id: 2,
      name: "Salimova Karomat",
      specialty: "UTT",
      image: doctorUtt
    },
    {
      id: 3,
      name: "Salimova Karomat",
      specialty: "UTT",
      image: doctorUtt
    },
    {
      id: 4,
      name: "Valiyev Shuxrat",
      specialty: "Transplantolog",
      image: doctorUtt
    },
    {
      id: 5,
      name: "Salimova Karomat",
      specialty: "UTT",
      image: doctorUtt
    },
    {
      id: 6,
      name: "Salimova Karomat",
      specialty: "UTT",
      image: doctorUtt
    },
    {
      id: 7,
      name: "Valiyev Shuxrat",
      specialty: "Transplantolog",
      image: doctorUtt
    },
    {
      id: 8,
      name: "Salimova Karomat",
      specialty: "UTT",
      image: doctorUtt
    }
  ]

 
  return (
    <div className="min-h-screen bg-white mt-24">
      <Navbar onNavigate={onNavigate} currentSection="ultrasound" />

      {/* Hero Section */}
      <section className="pt-0 md:pt-16 pb-16">
        <div className="max-w-8xl mx-auto px-4 md:px-8 lg:px-12">
          <div className="w-full max-w-8xl 
          bg-gradient-to-br from-blue-500 to-blue-600 
          rounded-3xl p-6 md:p-10 lg:p-16 shadow-2xl relative">
            {/* Mobile Layout - Centered Content */}
            <div className="md:hidden text-center text-white">
              <h1 className="text-2xl sm:text-3xl font-bold mb-6">
                Ultaratovush Diagnostikasi
              </h1>
              <p className="text-sm sm:text-base leading-relaxed mb-8 text-white/90 px-2">
                Ultratovush diagnostikasi — bu to'qimalar va organlarning holatini ultratovush to'lqinlari yordamida tekshirish usuli. Ultratovush to'lqinlari to'qimalar chegarasidan o'tayotganda aks sado beradi. Bu o'zgarishlarni maxsus datchik qayd etadi va ular asosida tekshiruv davomida tasvir shakllanadi. UZI keng tarqalgan, chunki u bir qator afzalliklarga ega: to'qima va organlarga aralashuvsiz o'tkaziladi, bemor uchun mutlaqo xavfsiz va yuqori darajada ma'lumot beradi.
              </p>
              <button className="bg-white text-gray-800 font-bold px-8 py-3 rounded-full text-lg hover:bg-gray-100 transition-colors mb-8">
                Qabulga Yoziling
              </button>
              {/* Breadcrumbs at bottom left */}
              <div className="absolute bottom-4 left-4 text-sm text-white/80">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onNavigate && onNavigate('home')}
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    Bosh Sahifa
                  </button>
                  <span>/</span>
                  <span className="font-medium text-white">Ultaratovush Diagnostikasi</span>
                </div>
              </div>
            </div>

            {/* Desktop Layout - Original */}
            <div className="hidden md:flex flex-col lg:flex-row items-center gap-8">
              {/* Text Content */}
              <div className="flex-1 text-white">
                <h1 className="text-3xl lg:text-4xl font-bold mb-4">
                  Ultaratovush Diagnostikasi
                </h1>
                <p className="mt-10 text-base lg:text-lg max-w-4xl 
                leading-relaxed mb-6 text-white/90 text-left">
                  Ultratovush diagnostikasi — bu to'qimalar va organlarning holatini ultratovush to'lqinlari yordamida tekshirish usuli. Ultratovush to'lqinlari to'qimalar chegarasidan o'tayotganda aks sado beradi. Bu o'zgarishlarni maxsus datchik qayd etadi va ular asosida tekshiruv davomida tasvir shakllanadi. UZI keng tarqalgan, chunki u bir qator afzalliklarga ega: to'qima va organlarga aralashuvsiz o'tkaziladi, bemor uchun mutlaqo xavfsiz va yuqori darajada ma'lumot beradi.
                </p>
                <div className="flex items-center gap-2 text-sm text-white/80">
                  <button
                    onClick={() => onNavigate && onNavigate('home')}
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    Bosh Sahifa
                  </button>
                  <span>/</span>
                  <span className="font-medium text-white">Ultaratovush Diagnostikasi</span>
                </div>
              </div>

              {/* Illustration */}
              <div className="flex-shrink-0">
                <div className="relative w-80 h-70 flex items-center justify-center">
                  <img
                    src={ultraSoundIcon}
                    alt="Rentgen Icon"
                    className="w-full h-full rounded-3xl object-cover scale-120"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      
      {/* Doctors Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-black mb-4">Bizning UTT Mutaxasislarimiz</h2>
            <p className="text-lg text-black">Sizning salomatligingiz – bizning eng katta qadriyatimiz</p>
          </div>

          {/* Doctor Cards - Mobile Carousel / Desktop Grid */}
          <div className="md:hidden">
            {/* Mobile Carousel */}
            <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide" style={{scrollbarWidth: 'none', msOverflowStyle: 'none'}}>
              {doctors.map((doctor) => (
                <div 
                  key={doctor.id}
                  className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group flex-shrink-0 w-80"
                >
                  {/* Doctor Image */}
                  <div className="relative overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 aspect-[4/3]">
                    <img
                      src={doctor.image}
                      alt={doctor.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  {/* Doctor Info */}
                  <div className="p-4">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">
                      {doctor.name}
                    </h3>

                    <div className="mb-4">
                      <span className="bg-blue-500 text-white text-sm font-semibold px-3 py-1 rounded-full">
                        {doctor.specialty}
                      </span>
                    </div>

                    {/* Action Buttons */}
                    <div className="space-y-2">
                      <button 
                        onClick={() => onDoctorClick && onDoctorClick(doctor.id)}
                        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2.5 px-4 rounded-lg transition-colors duration-200"
                      >
                        Navbatga Yozilish
                      </button>
                      <button 
                        onClick={() => onDoctorClick && onDoctorClick(doctor.id)}
                        className="w-full bg-white border border-blue-500 text-blue-500 hover:bg-blue-50 font-medium py-2.5 px-4 rounded-lg transition-colors duration-200"
                      >
                        Ko'proq Ma'lumot
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Desktop Grid */}
          <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {doctors.map((doctor) => (
              <div 
                key={doctor.id}
                className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group"
              >
                {/* Doctor Image */}
                <div className="relative overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 aspect-[4/3]">
                  <img
                    src={doctor.image}
                    alt={doctor.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* Doctor Info */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {doctor.name}
                  </h3>

                  <div className="mb-4">
                    <span className="bg-blue-500 text-white text-sm font-semibold px-3 py-1 rounded-full">
                      {doctor.specialty}
                    </span>
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-2">
                    <button 
                      onClick={() => onDoctorClick && onDoctorClick(doctor.id)}
                      className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2.5 px-4 rounded-lg transition-colors duration-200"
                    >
                      Navbatga Yozilish
                    </button>
                    <button 
                      onClick={() => onDoctorClick && onDoctorClick(doctor.id)}
                      className="w-full bg-white border border-blue-500 text-blue-500 hover:bg-blue-50 font-medium py-2.5 px-4 rounded-lg transition-colors duration-200"
                    >
                      Ko'proq Ma'lumot
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>



      {/* Search and Filter Section */}
      <section className="py-8 md:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          {/* Mobile Layout */}
          <div className="md:hidden">
            {/* Primary Search */}
            <div className="mb-6">
              <div className="relative mb-4">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="Qidirish"
                  className="w-full pl-10 pr-4 py-3 bg-gray-100 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
              <button className="w-full border-2 border-blue-500 text-blue-500 bg-white hover:bg-blue-50 font-medium py-3 px-4 rounded-lg transition-colors">
                Izlash
              </button>
            </div>

            {/* Filter and Secondary Search */}
            <div className="flex gap-3 mb-6">
              <button className="w-12 h-12 bg-white border border-gray-300 rounded-lg flex items-center justify-center">
                <svg className="h-5 w-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                </svg>
              </button>
              <div className="flex-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder=""
                  className="w-full pl-10 pr-4 py-3 bg-gray-100 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
            </div>

            {/* Service Cards */}
            <div className="space-y-3 mb-6">
              {[
                {
                  title: "Qorin bo'shlig'i organlarining kompleks UZI (jigar, o't pufagi, oshqozon osti bezi, taloq)",
                  price: "200 000 UZS"
                },
                {
                  title: "Qorin bo'shlig'i organlarining kompleks UZI (jigar, o't pufagi, oshqozon osti bezi, taloq)",
                  price: "200 000 UZS"
                },
                {
                  title: "Qorin bo'shlig'i organlarining kompleks UZI (jigar, o't pufagi, oshqozon osti bezi, taloq)",
                  price: "200 000 UZS"
                },
                {
                  title: "Qorin bo'shlig'i organlarining kompleks UZI (jigar, o't pufagi, oshqozon osti bezi, taloq)",
                  price: "200 000 UZS"
                }
              ].map((service, index) => (
                <div key={index} className="bg-gray-100 rounded-lg p-4">
                  <p className="text-gray-800 text-sm mb-2">{service.title}</p>
                  <p className="font-bold text-gray-900">{service.price}</p>
                </div>
              ))}
            </div>

            {/* Batafsil Button */}
            <div className="mb-8">
              <button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-4 px-6 rounded-lg transition-colors">
                Batafsil →
              </button>
            </div>
          </div>

          {/* Desktop Layout */}
          <div className="hidden md:block">
            {/* Search Bar */}
            <div className="mb-8">
              <div className="flex gap-4 max-w-7xl justify-end">
                <div className="flex-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <input
                    type="text"
                    placeholder="Qidirish"
                    className="w-full pl-10 pr-4 py-3 bg-gray-100 border-0 rounded-full focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
                <button className="px-8 py-3 border-2 border-blue-500 text-blue-500 bg-white rounded-full font-medium hover:bg-blue-50 transition-colors">
                  Izlash
                </button>
              </div>
            </div>

            <div className="flex gap-8">
              {/* Filter Panel */}
              <div className="w-80 bg-blue-100 rounded-3xl p-6">
                {/* Price Filter */}
                <div className="mb-8">
                  <h4 className="font-bold text-black mb-4">Narx</h4>
                  <div className="space-y-4">
                    {/* Range Slider */}
                    <div className="relative">
                      <div className="w-full h-2 bg-gray-300 rounded-full relative">
                        <div className="absolute top-0 left-0 w-full h-2 bg-gray-300 rounded-full"></div>
                        <div className="absolute top-0 left-0 w-full h-1 bg-gray-500 rounded-full mt-0.5"></div>
                        <div className="absolute top-0 left-0 w-4 h-4 bg-gray-300 rounded-full border-2 border-white shadow-sm -mt-1"></div>
                        <div className="absolute top-0 right-0 w-4 h-4 bg-gray-300 rounded-full border-2 border-white shadow-sm -mt-1"></div>
                      </div>
                    </div>
                    {/* Price Inputs */}
                    <div className="flex gap-2">
                      <div className="flex-1 px-3 py-2 bg-gray-200 border-0 rounded-lg text-sm text-center text-black font-medium">
                        75 000
                      </div>
                      <div className="flex-1 px-3 py-2 bg-gray-200 border-0 rounded-lg text-sm text-center text-black font-medium">
                        350 000
                      </div>
                    </div>
                  </div>
                </div>

                {/* Analysis Type Filter */}
                <div>
                  <h4 className="font-bold text-black mb-4">Tahlil turi</h4>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <div className="w-4 h-4 border-2 border-gray-300 rounded-full mr-3 flex items-center justify-center">
                        <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                      </div>
                      <span className="text-sm text-black">Ultratovush tekshiruvlari (UZI)</span>
                    </label>
                  </div>
                </div>
              </div>

              {/* Service Cards */}
              <div className="flex-1">
                <div className="space-y-4">
                  {[
                    {
                      title: "Qorin bo'shlig'i organlarining kompleks UZI (jigar, o't pufagi, oshqozon osti bezi, taloq)",
                      price: "200 000 UZS"
                    },
                    {
                      title: "Qorin bo'shlig'i organlarining kompleks UZI (jigar, o't pufagi, oshqozon osti bezi, taloq)",
                      price: "200 000 UZS"
                    },
                    {
                      title: "Qorin bo'shlig'i organlarining kompleks UZI (jigar, o't pufagi, oshqozon osti bezi, taloq)",
                      price: "200 000 UZS"
                    },
                    {
                      title: "Qorin bo'shlig'i organlarining kompleks UZI (jigar, o't pufagi, oshqozon osti bezi, taloq)",
                      price: "200 000 UZS"
                    },
                    {
                      title: "Qorin bo'shlig'i organlarining kompleks UZI (jigar, o't pufagi, oshqozon osti bezi, taloq)",
                      price: "200 000 UZS"
                    },
                    {
                      title: "Qorin bo'shlig'i organlarining kompleks UZI (jigar, o't pufagi, oshqozon osti bezi, taloq)",
                      price: "200 000 UZS"
                    }
                  ].map((service, index) => (
                    <div key={index} className="bg-gray-100 rounded-lg p-4">
                      <p className="text-gray-800 text-sm mb-2">{service.title}</p>
                      <p className="font-bold text-gray-900">{service.price}</p>
                    </div>
                  ))}
                </div>
                
                {/* Batafsil Button */}
                <div className="mt-8 text-center">
                  <button className="bg-blue-500 hover:bg-blue-600 
                  text-white font-semibold px-8 py-4 rounded-lg
                   shadow-lg hover:shadow-xl transition-all 
                   duration-200 inline-flex items-center gap-2 
                   text-lg">
                  Batafsil →

                  </button>
                </div>
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

      <Footer onNavigate={onNavigate} />
    </div>
  )
}
