import React from 'react';

const TeenageGirl = ({ isOpen, onClose, onRegister }) => {
  if (!isOpen) return null;

  const title = "O'smirlar uchun chek-ap (qizlar)";

  const description =
    "Qiz bolalarda yoshga xos o'zgarishlarni inobatga olgan holda ishlab chiqilgan tibbiy tekshiruv. Balog'at davrida rejalashtirilgan nazorat, hayz siklining beqarorligi, energiya pasayishi yoki boshqa individual holatlarda mos keladi.";

  const items = [
    "Qonning umumiy kengaytirilgan tahlili (XN-1000, Sysmex, Yaponiya)",
    "Qonning biokimyoviy tahlili (asosiy) – 13 ko'rsatkich",
    "Najasning umumiy tahlili",
    "Siydikning umumiy kengaytirilgan tahlili",
    "Umumiy IgE",
    "Tireotrop gormon – TSH (3-avlod)",
    "Erkin T4 (Free T4)",
    "Tireoperoksidazaga qarshi antitanachalar (Anti-TPO)",
    "Umumiy testosteron (Total Testosterone)",
    "Follikulostimullovchi gormon – FSH",
    "Lyuteinlashtiruvchi gormon – LH",
    "17-gidroksiprogesteron (17-OPG)",
    "Degidroepiandrosteron-sulfat (DHEA-S)",
    "Prolaktin",
    "Jinsiy gormonlarni bog'lovchi globulin (SHBG)",
    "Vitamin D (25-OH vitamin D)",
    "Foliy kislotasi (Folic Acid)",
    "Vitamin B12",
    "Kalsiy (Calcium)",
    "Ferritin",
    "EKG (elektrokardiogramma)",
    "Exokardiografiya (yurak UZI)",
    "Qalqonsimon bez UZI (rangli doppler tekshiruvi bilan)",
    "Qorin bo'shlig'i a'zolarining kompleks UZI (jigar, o't pufagi, oshqozon osti bezi, taloq)",
    "Siydik-jinsiy tizim a'zolarining kompleks UZI (buyraklar, buyrak usti bezlari, siydik yo'llari, siydik pufagi)",
    "Kichik chanoq a'zolari UZI (transabdominal tekshiruv)",
    "Pediatr konsultatsiyasi",
    "Tor mutaxassislar konsultatsiyasi – tanlov asosida 5 ta: nevrolog, kardio-revmatolog, endokrinolog, bolalar ginekologi, urolog, gastroenterolog, oftalmolog, LOR, ortoped, allergolog",
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
          Narxi: 4 800 000 UZS <span className="line-through text-gray-500 ml-2">5 585 000 UZS</span>
        </p>

        <p className="mb-4">
          {description}
        </p>

        <h3 className="text-xl font-semibold mt-4 mb-2">Chek-ap tarkibi:</h3>
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

export default TeenageGirl;
