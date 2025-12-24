import React from 'react';

const KardioCheckup = ({ isOpen, onClose, onRegister }) => {
  if (!isOpen) return null;

  const title = "Kardio tekshiruvi";

  const price = "3 200 000 UZS";
  const originalPrice = "3,638,000 UZS";

  const description =
    "Yoshlik davrida yurak-qon tomir kasalliklarining oldini olish uchun skrining. Lipid profili, metabolizm, gormonal darajalar, yurak va qon tomirlarining faoliyati baholanadi. Stress, jismoniy mashqlar, qon bosimining o'zgarishi yoki oilaviy yurak kasalligi tarixiga ega bo'lgan shaxslar uchun mos keladi. Dinamik tasvirni taqdim etish uchun 24 soatlik EKG monitoringi va yurak ultratovush tekshiruvini o'z ichiga oladi.";

  const items = [
    "To'liq qon tahlili (XN-1000, Sysmex, Yaponiya)",
    "Lipid profili (Triglitseridlar; Umumiy xolesterin; HDL; LDL; Aterogen indeks) kompleksi",
    "HOMA insulin qarshiligini baholash: och qoringa glyukoza, och qoringa insulin, HOMA-IR ballari",
    "Asosiy biokimyoviy qon tahlili (13 ko'rsatkich)",
    "Asosiy koagulogramma (protrombin indeksi, INR, fibrinogen, APTT, trombin vaqti)",
    "Najasli yashirin qon tekshiruvi (FOB)",
    "Siydikni to'liq tahlil qilish",
    "Homosistein",
    "Qalqonsimon bezni rag'batlantiruvchi gormon TSH (TSH 3-avlod)",
    "Bepul T4",
    "D vitamini (25-OH D vitamini)",
    "EKG (elektrokardiogramma)",
    "Ekokardiografiya (yurak ultratovush tekshiruvi)",
    "24 soatlik (Xolter) EKG monitoringi",
    "Qon tomirlarining rangli Doppler tekshiruvi bilan qalqonsimon bezning ultratovush tekshiruvi",
    "Qorin bo'shlig'i a'zolarining keng qamrovli ultratovush tekshiruvi (jigar, o't pufagi, oshqozon osti bezi, taloq)",
    "Bo'yin va bosh tomirlarining dopplerografiyasi (BCA va TCDG)",
    "Jigar va o't pufagining ultratovush tekshiruvi",
    "Taloqning ultratovush tekshiruvi",
    "Kardiolog maslahati",
  ];

  const modalContent = (
    <div
      className="fixed inset-0 bg-white/50 backdrop-blur-sm flex justify-center items-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-gray-100 p-5 rounded-4xl max-w-2xl max-h-[95vh] overflow-y-auto backdrop-blur-md flex flex-col text-left"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-end mb-2">
          <button
            onClick={onClose}
            className="text-4xl font-bold bg-transparent border-none cursor-pointer hover:text-red-500 transition-colors"
          >
            ×
          </button>
        </div>

        <h1 className="text-3xl font-bold mb-3 text-center">{title}</h1>

        {/* Price Section */}
        <div className="text-center mb-4">
          <div className="flex items-center justify-center gap-3">
            <span className="text-2xl font-bold text-blue-600">{price}</span>
            <span className="text-lg text-gray-400 line-through">{originalPrice}</span>
          </div>
        </div>

        <p className="mb-4 text-gray-700 leading-relaxed">
          {description}
        </p>

        <h3 className="text-xl font-semibold mt-4 mb-2">Tekshiruv komponentlari:</h3>
        <ul className="text-left max-w-2xl list-disc list-inside pl-5">
          {items.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
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

export default KardioCheckup;
