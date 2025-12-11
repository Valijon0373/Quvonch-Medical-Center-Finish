import React, { useState } from 'react';
import { Phone } from 'lucide-react';
import { formatPhoneNumber, cleanPhoneNumber, handlePhoneInputChange } from '../utils/phoneFormatter';

// Custom styles for animations
const customStyles = `
  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-10px); }
  }
  
  @keyframes glow {
    0%, 100% { box-shadow: 0 0 20px rgba(255,255,255,0.3); }
    50% { box-shadow: 0 0 30px rgba(255,255,255,0.5); }
  }
  
  @keyframes helix-rotate {
    0% { transform: translateX(-50%) rotate(0deg); }
    100% { transform: translateX(-50%) rotate(360deg); }
  }
  
  .float-animation {
    animation: float 3s ease-in-out infinite;
  }
  
  .glow-animation {
    animation: glow 2s ease-in-out infinite;
  }
  
  .helix-rotate {
    animation: helix-rotate 20s linear infinite;
  }
`;

export default function CallToAction() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '+998 '
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "phone") {
      handlePhoneInputChange(e, (formattedValue) => {
        setFormData(prev => ({
          ...prev,
          phone: formattedValue
        }))
      })
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
    // Reset form
    setFormData({ name: '', phone: '+998 ' });
  };

  return (
    <>
      <style>{customStyles}</style>
      <section className="relative min-h-[600px] overflow-hidden">
        {/* Curved Background */}
        <div className="absolute inset-0">
          {/* White top section */}
          <div className="absolute top-0 left-0 w-full h-1/3 bg-white"></div>
          
          {/* Curved blue section */}
          <div 
            className="absolute bottom-0 left-0 w-full h-2/3"
            style={{
              background: 'linear-gradient(135deg, #4285F4 0%, #1a73e8 100%)',
              clipPath: 'polygon(0% 20%, 100% 0%, 100% 100%, 0% 100%)'
            }}
          ></div>
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 py-16 flex items-center justify-between min-h-[600px]">
          
          {/* Left - Female Doctor */}
          <div className="hidden lg:block relative -mb-8">
            <div className="relative float-animation">
              <img 
                src="/src/assets/advantage/doctor.png" 
                alt="Female Doctor" 
                className="w-80 h-auto object-contain"
              />
              {/* Lab coat logo effect */}
              <div className="absolute top-8 left-4 w-16 h-16 bg-white/20 rounded-full flex items-center justify-center glow-animation">
                <span className="text-white text-xs font-bold">Dr.</span>
              </div>
            </div>
          </div>

          {/* Center Content */}
          <div className="flex-1 text-center px-4 lg:px-8">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-white">
              Qo'ng'iroq buyurtma qiling
            </h1>
            <p className="text-lg md:text-xl mb-8 text-white/90 max-w-2xl mx-auto">
              Bizning Call Markazimiz siz bilan eng qisqa fursatda bog'lanadi.
            </p>
            
            {/* Action Form */}
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-4xl mx-auto">
              <input 
                type="text" 
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Ismingiz" 
                className="bg-white/20 backdrop-blur-sm text-white placeholder-white/70 px-6 py-4 rounded-xl font-medium border border-white/30 focus:bg-white/30 focus:outline-none transition-all w-full sm:w-auto min-w-[200px]"
                required
              />
              <div className="relative w-full sm:w-auto">
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 flex items-center">
                  <div className="w-6 h-4 bg-gradient-to-r from-blue-500 to-green-500 rounded-sm flex items-center justify-center">
                    <span className="text-white text-xs font-bold">UZ</span>
                  </div>
                </div>
                <input 
                  type="tel" 
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="+998 99 465 55 55" 
                  className="bg-white/20 backdrop-blur-sm text-white placeholder-white/70 pl-12 pr-6 py-4 rounded-xl font-medium border border-white/30 focus:bg-white/30 focus:outline-none transition-all w-full sm:w-auto min-w-[200px]"
                  required
                />
              </div>
              <button 
                type="submit"
                className="bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-all flex items-center gap-2 w-full sm:w-auto"
              >
                <Phone size={20} />
                Menga Qo'ng'iroq Qiling
              </button>
            </form>
          </div>

          {/* Right - DNA Helix and Bubbles */}
          <div className="hidden lg:block relative">
            <div className="relative w-64 h-96">
              {/* DNA Helix */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative w-40 h-80">
                  {/* DNA Double Helix Structure */}
                  <div className="absolute left-1/2 top-0 w-1 h-full bg-gradient-to-b from-white/40 to-white/20 transform -translate-x-1/2 rounded-full"></div>
                  <div className="absolute left-1/2 top-0 w-1 h-full bg-gradient-to-b from-white/30 to-white/10 transform -translate-x-1/2 rotate-12 rounded-full"></div>
                  
                  {/* Helix spirals with better styling */}
                  {[...Array(24)].map((_, i) => (
                    <div key={i} className="absolute" style={{ top: `${i * 4.2}%`, left: '50%', transform: 'translateX(-50%)' }}>
                      <div className="w-20 h-1 bg-gradient-to-r from-white/50 to-white/30 rounded-full transform rotate-12 shadow-sm"></div>
                      <div className="w-20 h-1 bg-gradient-to-r from-white/40 to-white/20 rounded-full transform -rotate-12 -mt-1 shadow-sm"></div>
                    </div>
                  ))}
                  
                  {/* Central connection lines */}
                  {[...Array(12)].map((_, i) => (
                    <div 
                      key={`conn-${i}`}
                      className="absolute w-1 h-2 bg-white/30 rounded-full"
                      style={{ 
                        top: `${i * 8.3 + 4}%`, 
                        left: '50%', 
                        transform: 'translateX(-50%) rotate(45deg)' 
                      }}
                    ></div>
                  ))}
                </div>
              </div>
              
              {/* Floating Bubbles with better animation */}
              {[...Array(12)].map((_, i) => (
                <div 
                  key={i}
                  className="absolute bg-white/20 rounded-full animate-bounce glow-animation"
                  style={{
                    width: `${Math.random() * 25 + 8}px`,
                    height: `${Math.random() * 25 + 8}px`,
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 3}s`,
                    animationDuration: `${Math.random() * 3 + 2}s`
                  }}
                ></div>
              ))}
              
              {/* Additional floating particles */}
              {[...Array(6)].map((_, i) => (
                <div 
                  key={`particle-${i}`}
                  className="absolute bg-white/10 rounded-full animate-ping"
                  style={{
                    width: `${Math.random() * 15 + 4}px`,
                    height: `${Math.random() * 15 + 4}px`,
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 4}s`,
                    animationDuration: `${Math.random() * 2 + 1}s`
                  }}
                ></div>
              ))}
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-20 right-20 w-32 h-32 bg-white/10 rounded-full blur-xl"></div>
        <div className="absolute bottom-20 left-20 w-24 h-24 bg-white/10 rounded-full blur-xl"></div>
      </section>
    </>
  );
}
