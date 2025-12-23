import React from "react";
import Puls from "../assets/service/puls.png";
import Service1 from "../assets/service/service1.png";
import Service2 from "../assets/service/service2.png";
import Service3 from "../assets/service/service3.png";
import Service4 from "../assets/service/service4.png";
import Service6 from "../assets/service/service6.png";
import Service7 from "../assets/service/service7.png"; 

export default function Services({ onNavigate }) {
  const services = [
    {
      id: 1,
      title: "Doktor Qabuliga Yozilish",
      image: Service1, 
    },
    {
      id: 2,
      title: "UZI Tekshiruvi",
      image: Service2,
    },
    {
      id: 3,
      title: "Analiz Topshirish",
      image: Service3,
    },
    {
      id: 4,
      title: "Check-up",
      image: Service4,
    },
    {
      id: 6,
      title: "Funksional Diagnostika",
      image: Service6,
    },
  ];

  return (
    <section id="services-section" className="py-16 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            Bizning Xizmatlarimiz
          </h2>
          <p className="text-gray-600 text-lg">
            Sizning salomatligingiz — bizning eng katta qadriyatimiz
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {services.map((service) => (
            <div
              key={service.id}
              className="group flex flex-col overflow-hidden rounded-[2rem] border border-blue-300 bg-blue-500 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer"
              onClick={() => {
                if (service.title === "Doktor Qabuliga Yozilish") {
                  onNavigate('acceptance')
                } else if (service.title === "UZI Tekshiruvi") {
                  onNavigate('uzi')
                } else if (service.title === "Analiz Topshirish") {
                  onNavigate('analysis')
                } else if (service.title === "Funksional Diagnostika") {
                  onNavigate('functional-diagnostika')
                } else if (service.title === "Ultra Tovush Tekshiruvi") {
                  onNavigate('ultrasound')
                } else if (service.title === "Check-up") {
                  onNavigate('check-up')
                }
              }}
            >
              {/* <div className="bg-blue-500 relative h-56 w-full overflow-hidden rounded-t-[2rem]"> */}
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover"
                />
              {/* </div> */}
              {/* <div className="bg-blue-500 rounded-b-[2rem] px-5 py-4 min-h-[80px] flex items-center justify-center"> */}
                <h3 className="text-white font-semibold text-lg leading-snug text-center mb-5">
                  {service.title}
                </h3>
              {/* </div> */}
            </div>
          ))}
        </div>

      </div>
              {/* ECG Line Decoration */}
        <div className="relative w-full h-30 flex items-center justify-center overflow-hidden">
          <img src={Puls} alt="plus" />
        </div>
    </section>
  );
}
