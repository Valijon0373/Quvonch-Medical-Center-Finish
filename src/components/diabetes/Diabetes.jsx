import React from 'react';

const DiabetesCheckup = ({ isOpen, onClose, onRegister }) => {
  if (!isOpen) return null;

  const modalContent = (
    <div className="fixed inset-0 bg-white/50 backdrop-blur-sm flex justify-center items-center z-50" onClick={onClose}>
      <div className="bg-gray-100 p-5 rounded-4xl max-w-2xl max-h-[95vh] 
      overflow-y-auto backdrop-blur-md flex flex-col text-left" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-end mb-2">
          <button onClick={onClose} className="text-4xl font-bold bg-transparent border-none cursor-pointer hover:text-red-500 transition-colors">×</button>
        </div>
        <h1 className="text-3xl font-bold mb-5">CGM qurilmasi yordamida diabet monitoringini tekshiring</h1>

        <div className="flex items-center justify-center gap-4 mb-4">
          <span className="text-2xl font-bold text-blue-600">2 600 000 UZS</span>
          <span className="text-lg text-gray-400 line-through">2,824,000 UZS</span>
        </div>

        <p className="mb-4">Tashxis qo'yilgan va ularning ahvolini muntazam ravishda kuzatib boradiganlar uchun tekshiruv. Bu kompensatsiya darajasini va buyraklar, jigar, oshqozon osti bezi va yurak faoliyatini baholashga yordam beradi. Bu ixtisoslashgan mutaxassislar bilan maslahatlashuvlarni o'z ichiga oladi va kasalliklarni boshqarishning davom etayotgan jarayonini aniq tushunish imkonini beradi. Bu muntazam monitoring va zarur bo'lganda terapiyaga o'zgartirishlar kiritish uchun mos keladi.</p>
        
        <h3 className="text-xl font-semibold mt-4 mb-2">Tekshiruv nimani o'z ichiga oladi:</h3>
        <ul className="text-left max-w-2xl list-disc list-inside pl-5">
          <li>To'liq qon tahlili (XN-1000, Sysmex, Yaponiya)</li>
          <li>To'liq qon tahlili (20 ko'rsatkich)</li>
          <li>Siydikni to'liq tahlil qilish</li>
          <li>Genitouriya tizimining keng qamrovli ultratovush tekshiruvi (buyraklar, buyrak usti bezlari, siydik yo'llari, siydik pufagi)</li>
          <li>Qorin bo'shlig'i a'zolarining keng qamrovli ultratovush tekshiruvi (jigar, o't pufagi, oshqozon osti bezi, taloq)</li>
          <li>EKG (elektrokardiogramma)</li>
          <li>Glitserlangan gemoglobin</li>
          <li>Endokrinolog maslahati</li>
          <li>14 kun davomida CGM (uzluksiz glyukoza monitoringi) sensorini o'rnatish / Ilovani sozlash va bemorlarni o'qitish / Natijalar va shifokor xulosasini, shu jumladan parhez va turmush tarzi bo'yicha tavsiyalarni sharhlash</li>
          <li>Terapevt bilan maslahatlashuv</li>
        </ul>
        <button
          className="mt-6 self-start bg-blue-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-blue-700 transition-colors"
          onClick={onRegister}
        >
          Ro'yxatdan o'tish
        </button>
      </div>
    </div>
  );

  return modalContent;
};

export default DiabetesCheckup;
