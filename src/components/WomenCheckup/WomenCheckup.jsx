import React from 'react';

const WomenCheckup = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const modalContent = (
    <div className="fixed inset-0 bg-white/50 backdrop-blur-sm flex justify-center items-center z-50" onClick={onClose}>
      <div className="bg-gray-100 p-5 rounded-lg max-w-4xl max-h-[90vh] overflow-y-auto text-center backdrop-blur-md" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-5">
          <div></div>
          <h1 className="flex-1 text-3xl font-bold">Ayollar uchun tekshiruv</h1>
          <button onClick={onClose} className="text-4xl font-bold bg-transparent border-none cursor-pointer hover:text-red-500 transition-colors">×</button>
        </div>

        <p>Ayollar salomatligini baholashning asosiy sohalarini qamrab oluvchi tekshiruv: gormonal darajalar va vitaminlardan tortib, qalqonsimon bez, reproduktiv tizim va ichki organlargacha. Yillik profilaktik yordam, homiladorlikka tayyorgarlik ko'rish yoki alomatlar paydo bo'lganda mos keladi. Qulay format har bir alohida testdan o'tmasdan to'liq tasavvurga ega bo'lish imkonini beradi.</p>
        <h3 className="text-xl font-semibold mt-4 mb-2">Tekshiruv quyidagilarni o'z ichiga oladi:</h3>
        <ul className="text-left mx-auto max-w-md list-disc list-inside">
          <li>To'liq qon tahlili (XN-1000, Sysmex, Yaponiya)</li>
          <li>To'liq qon tahlili (20 ko'rsatkich)</li>
          <li>Asosiy koagulogramma (protrombin indeksi, INR, fibrinogen, APTT, trombin vaqti)</li>
          <li>HOMA insulin qarshiligini baholash: och qorninga glyukoza, och qorninga insulin, HOMA-IR ballari</li>
          <li>Qorin bo'shlig'i a'zolarining keng qamrovli ultratovush tekshiruvi (jigar, o't pufagi, oshqozon osti bezi, taloq)</li>
          <li>Qon tomirlarining rangli Doppler tekshiruvi bilan qalqonsimon bezning ultratovush tekshiruvi</li>
          <li>Genitouriya tizimining keng qamrovli ultratovush tekshiruvi (buyraklar, buyrak usti bezlari, siydik yo'llari, siydik pufagi)</li>
          <li>Periferik limfa tugunlari bilan sut bezlarining ultratovush tekshiruvi</li>
          <li>Chanoq a'zolarining ultratovush tekshiruvi (transvaginal skanerlash)</li>
          <li>PCR tamponini olish</li>
          <li>Urogenital mikroflora uchun smear tahlili (shisha ustida)</li>
          <li>Siydikni to'liq tahlil qilish</li>
          <li>Gepatit C virusiga qarshi antitelalar (Anti-HCV)</li>
          <li>Ferritin</li>
          <li>Homosistein</li>
          <li>D vitamini (25-OH D vitamini)</li>
          <li>Treponema pallidumga (sifilis) antikorlar</li>
          <li>Qalqonsimon bezni rag'batlantiruvchi gormon TSH (TSH 3-avlod)</li>
          <li>Bepul T3</li>
          <li>Bepul T4</li>
          <li>Prolaktin</li>
          <li>Gepatit B virusi sirt antigeni, HBsAg</li>
          <li>Femoflor - skrinshot</li>
          <li>Suyuqlikka asoslangan sitologiya Pap testi</li>
          <li>Barcha biomateriallardagi inson papillomavirusi 16,31,33,52,58,56,18,39,45,59,6,11,51,68 (HPV) miqdoriy ko'rsatkichi</li>
          <li>Glitserlangan gemoglobin</li>
          <li>Kolposkopiya</li>
          <li>Saraton antigeni CA 15-3</li>
          <li>Saraton antigeni CA 125 II</li>
          <li>Ko'krak qafasi rentgenogrammasi</li>
          <li>Terapevt bilan maslahatlashuv</li>
          <li>Ginekolog maslahati</li>
          <li>Oftalmolog tekshiruvi</li>
          <li>Tanlagan mutaxassisingiz bilan maslahatlashuv (nevrolog, endokrinolog, gastroenterolog)</li>
          <li>Shaxsiy sog'liqni saqlash kitobi</li>
        </ul>
      </div>
    </div>
  );

  return modalContent;
};

export default WomenCheckup;
