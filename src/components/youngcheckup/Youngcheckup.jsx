import React from 'react';

const Youngcheckup = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const modalContent = (
    <div
      className="fixed inset-0 bg-white/50 backdrop-blur-sm flex justify-center items-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-gray-100 p-5 rounded-lg max-w-4xl max-h-[90vh] overflow-y-auto text-center backdrop-blur-md"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-5">
          <div></div>
          <h1 className="flex-1 text-3xl font-bold">Bolalar tekshiruvi</h1>
          <button
            onClick={onClose}
            className="text-4xl font-bold bg-transparent border-none cursor-pointer hover:text-red-500 transition-colors"
          >
            ×
          </button>
        </div>

        <div className="flex items-center justify-center gap-4 mb-4">
          <span className="text-2xl font-bold text-blue-600">2 200 000 UZS</span>
          <span className="text-lg text-gray-400 line-through">2,554,000 UZS</span>
        </div>

        <p className="mb-4">
          Yillik bolalar salomatligini tekshirish uchun mos keladi. Ichki organlar faoliyati,
          metabolik jarayonlar, immun tizimi va qalqonsimon bez faoliyati haqida umumiy ma'lumot beradi.
          Agar siz shunchaki hamma narsa tartibda ekanligiga ishonch hosil qilishingiz yoki biron bir
          anomaliyani erta sezishingiz kerak bo'lsa, yaxshi boshlang'ich nuqta.
        </p>

        <h3 className="text-xl font-semibold mt-4 mb-2">Tekshiruv tarkibi:</h3>
        <ul className="text-left mx-auto max-w-md list-disc list-inside space-y-1">
          <li>To'liq qon tahlili (XN-1000, Sysmex, Yaponiya)</li>
          <li>Asosiy biokimyoviy qon tahlili (13 ko'rsatkich)</li>
          <li>Kaltsiy</li>
          <li>Umumiy IgE</li>
          <li>Ferritin</li>
          <li>D vitamini (25-OH D vitamini)</li>
          <li>Siydikni to'liq tahlil qilish</li>
          <li>Qalqonsimon bezni rag'batlantiruvchi gormon TSH (TSH 3-avlod)</li>
          <li>Bepul T4</li>
          <li>Umumiy najas tahlili</li>
          <li>PARASEP usuli yordamida gelmintiyoz uchun najas tahlili</li>
          <li>
            Qorin bo'shlig'i a'zolarining keng qamrovli ultratovush tekshiruvi
            (jigar, o't pufagi, oshqozon osti bezi, taloq)
          </li>
          <li>
            Genitouriya tizimining keng qamrovli ultratovush tekshiruvi
            (buyraklar, buyrak usti bezlari, siydik yo'llari, siydik pufagi)
          </li>
          <li>Rangli Doppler qon tomir skanerlashi bilan qalqonsimon bez ultratovush tekshiruvi</li>
          <li>Pediatr bilan maslahatlashuv</li>
          <li>Shaxsiy sog'liqni saqlash kitobi</li>
        </ul>
      </div>
    </div>
  );

  return modalContent;
};

export default Youngcheckup;
