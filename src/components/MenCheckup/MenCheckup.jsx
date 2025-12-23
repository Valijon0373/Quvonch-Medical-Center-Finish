import React from 'react';

const MenCheckup = ({ isOpen, onClose, onRegister, ageGroup }) => {
  if (!isOpen) return null;

  const title =
    ageGroup === '50+'
      ? "Erkaklar uchun tekshiruv (50+ yosh)"
      : "Erkaklar uchun tekshiruv (18-50 yosh)";

  const description =
    "Ayollar tekshiruvi formatiga tenglashtirilgan keng qamrovli dastur: gormonal darajalar va vitaminlardan tortib, qalqonsimon bez, reproduktiv tizim va ichki organlargacha. Yillik profilaktika yoki alomatlar paydo bo'lganda to'liq tasavvur beradi.";

  const items = [
    "To'liq qon tahlili (XN-1000, Sysmex, Yaponiya)",
    "To'liq qon tahlili (20 ko'rsatkich)",
    "Asosiy koagulogramma (protrombin indeksi, INR, fibrinogen, APTT, trombin vaqti)",
    "HOMA insulin qarshiligini baholash: och qorninga glyukoza, och qorninga insulin, HOMA-IR ballari",
    "Qorin bo'shlig'i a'zolarining keng qamrovli ultratovush tekshiruvi (jigar, o't pufagi, oshqozon osti bezi, taloq)",
    "Qon tomirlarining rangli Doppler tekshiruvi bilan qalqonsimon bezning ultratovush tekshiruvi",
    "Genitouriya tizimining keng qamrovli ultratovush tekshiruvi (buyraklar, buyrak usti bezlari, siydik yo'llari, siydik pufagi)",
    "Periferik limfa tugunlari bilan sut bezlarining ultratovush tekshiruvi",
    "Chanoq a'zolarining ultratovush tekshiruvi",
    "PCR tamponini olish",
    "Urogenital mikroflora uchun smear tahlili (shisha ustida)",
    "Siydikni to'liq tahlil qilish",
    "Gepatit C virusiga qarshi antitelalar (Anti-HCV)",
    'Ferritin',
    'Homosistein',
    "D vitamini (25-OH D vitamini)",
    "Treponema pallidumga (sifilis) antikorlar",
    "Qalqonsimon bezni rag'batlantiruvchi gormon TSH (TSH 3-avlod)",
    'Bepul T3',
    'Bepul T4',
    'Prolaktin',
    'Gepatit B virusi sirt antigeni, HBsAg',
    'Femoflor - skrinshot',
    'Suyuqlikka asoslangan sitologiya Pap testi',
    "Barcha biomateriallardagi inson papillomavirusi 16,31,33,52,58,56,18,39,45,59,6,11,51,68 (HPV) miqdoriy ko'rsatkichi",
    "Glitserlangan gemoglobin",
    'Kolposkopiya',
    'Saraton antigeni CA 15-3',
    'Saraton antigeni CA 125 II',
    "Ko'krak qafasi rentgenogrammasi",
    'Terapevt bilan maslahatlashuv',
    'Ginekolog maslahati',
    'Oftalmolog tekshiruvi',
    "Tanlagan mutaxassisingiz bilan maslahatlashuv (nevrolog, endokrinolog, gastroenterolog)",
    "Shaxsiy sog'liqni saqlash kitobi",
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

        <h1 className="text-3xl font-bold mb-5 text-center">{title}</h1>

        <p className="mb-4">
          {description}
        </p>

        <h3 className="text-xl font-semibold mt-4 mb-2">Tekshiruv quyidagilarni o'z ichiga oladi:</h3>
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

export default MenCheckup;
