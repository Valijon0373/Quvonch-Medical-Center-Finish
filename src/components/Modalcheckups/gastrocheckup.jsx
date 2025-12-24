import React from 'react';

const GastroCheckup = ({ isOpen, onClose, onRegister, ageGroup }) => {
  if (!isOpen) return null;

  const title = "Gastro chek-ap";

  const description =
    "Ushbu tekshiruv apparati oshqozon-ichak trakti holatini tekshirish, gastrit, yara kasalligi, pankreatit kabi xavf omillarini aniqlash, shuningdek, davolash jarayonini baholash va tavsiyalar olish uchun yaratilgan.";

  const items = [
    "Umumiy qon tahlili",
    "Oshqozon-ichak kasalliklarida qonning biokimyoviy tahlili",
    "Gastrin - 17",
    "Pepsinogen 1",
    "Pepsinogen 2",
    "Glyukoza",
    "Alfa-amilaza",
    "Pankreatik amilaza",
    "Lipaza",
    "Najasdagi elastaza",
    "Alaninaminotransferaza (ALT)",
    "Aspartataminotransferaza (AST)",
    "Gammaglutamiltransferaza (GGT)",
    "Bilirubin fraksiyalari bilan",
    "Ishqoriy fosfataza",
    "Laktatdegidrogenaza",
    "Fekal kalprotektin",
    "Najasning umumiy tahlili",
    "Najasdagi yashirin qon tahlili",
    "Parasep usulida gelmintlarga najasi",
    "Qorin bo'shlig'i a'zolarining ultratovush tekshiruvi UZI (jigar, o't pufagi, oshqozon osti bezi, taloq)",
    "EGDFS va kolonoskopiya (qo'shma tekshiruv)",
    "Kombinatsiyalangan tekshiruvda medikamentoz uyqu",
    "EKG",
    "Helicobacter pylorini aniqlash uchun ureaza nafas olish testi",
    "Gastroenterolog maslahati",
    "Terapevt maslahati",
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

export default GastroCheckup;
