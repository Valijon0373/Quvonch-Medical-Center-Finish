import { useState, useEffect } from "react";
import { Search, ChevronDown, ChevronUp } from "lucide-react";
import axios from "axios";
import { apiUrl, API_BASE_URL } from "../utils/api";
import Loader from "./loader/Loader";

// Doctor Card (ichki component)
function DoctorCard({ doctor, onDoctorClick }) {
  return (
    <div 
      onClick={() => onDoctorClick(doctor.id)}
      className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group cursor-pointer"
    >
      <div className="relative overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 aspect-[4/3]">
        <img
          src={doctor.image}
          alt={doctor.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
          {doctor.name}
        </h3>

        <div className="inline-block">
          <span className="bg-blue-500 text-white text-sm font-semibold px-4 py-1.5 rounded-full">
            {doctor.specialty}
          </span>
        </div>
      </div>
    </div>
  );
}

// Main Component
export default function Stuff({ onDoctorClick }) {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("all");
  const [selectedRegion, setSelectedRegion] = useState("all");
  const [selectedDirection, setSelectedDirection] = useState("all");
  const [selectedPrice, setSelectedPrice] = useState("all");
  const [selectedSort, setSelectedSort] = useState("experience");
  const [visibleDoctors, setVisibleDoctors] = useState(3);

  // Fetch doctors from API with pagination support
  useEffect(() => {
    const fetchAllDoctors = async () => {
      try {
        setLoading(true);
        let allDoctors = [];
        let nextUrl = apiUrl('doctors/');
        
        // Fetch all pages if pagination exists
        while (nextUrl) {
          // If nextUrl is a full URL from API, convert it to use our API helper
          let urlToFetch = nextUrl;
          if (nextUrl.startsWith('http')) {
            // Extract path from full URL and convert to use our API base URL
            const urlObj = new URL(nextUrl);
            const pathWithoutSlash = urlObj.pathname.startsWith('/') ? urlObj.pathname.slice(1) : urlObj.pathname;
            urlToFetch = `${API_BASE_URL}/${pathWithoutSlash}${urlObj.search || ''}`;
          }
          
          const response = await axios.get(urlToFetch);
          
          // Map API response to component format
          const mappedDoctors = response.data.results.map((doctor) => ({
            id: doctor.id,
            name: doctor.full_name_uz || doctor.full_name || doctor.full_name_ru,
            specialty: doctor.specialty_uz || doctor.specialty || doctor.specialty_ru,
            image: doctor.image,
            experience: doctor.experience || 0,
            description: doctor.description_uz || doctor.description || doctor.description_ru,
            region: "Toshkent", 
          }));
          
          allDoctors = [...allDoctors, ...mappedDoctors];
          nextUrl = response.data.next; // Get next page URL if exists
        }
        
        setDoctors(allDoctors);
        setError(null);
      } catch (err) {
        console.error("Error fetching doctors:", err);
        setError("Doktorlar ma'lumotlarini yuklashda xatolik yuz berdi");
      } finally {
        setLoading(false);
      }
    };

    fetchAllDoctors();
  }, []);

  const specialties = ["all", ...Array.from(new Set(doctors.map((d) => d.specialty)))];
  const directions = ["all", "Kattalar", "Bolalar", "O'smirlar", "Qariyalar"];
  const prices = ["all", "0-50,000", "50,000-100,000", "100,000-200,000", "200,000+"];
  const sortOptions = [
    { value: "experience", label: "Eng Tajribali" },
    { value: "name", label: "Ism bo'yicha" },
    { value: "specialty", label: "Mutaxasislik bo'yicha" }
  ];

  const filteredAndSortedDoctors = doctors
    .filter((doctor) => {
      const matchesSearch =
        doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doctor.specialty.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesSpecialty =
        selectedSpecialty === "all" || doctor.specialty === selectedSpecialty;
      const matchesRegion =
        selectedRegion === "all" || doctor.region === selectedRegion;
      const matchesDirection =
        selectedDirection === "all" || true; // Add direction logic based on your data structure
      const matchesPrice =
        selectedPrice === "all" || true; // Add price logic based on your data structure

      return matchesSearch && matchesSpecialty && matchesRegion && matchesDirection && matchesPrice;
    })
    .sort((a, b) => {
      switch (selectedSort) {
        case "name":
          return a.name.localeCompare(b.name);
        case "specialty":
          return a.specialty.localeCompare(b.specialty);
        case "experience":
        default:
          // Sort by experience from API
          return (b.experience || 0) - (a.experience || 0);
      }
    });

  const handleShowMore = () => {
    setVisibleDoctors(prev => prev + 3);
  };

  const handleReset = () => {
    setVisibleDoctors(3);
  };

  const remainingDoctors = filteredAndSortedDoctors.length - visibleDoctors;

  // Loading state
  if (loading) {
    return (
      <div id="specialists-section" className="min-h-screen bg-gray-50">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex justify-center items-center py-12">
            <Loader fullScreen={false} size={60} />
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div id="specialists-section" className="min-h-screen bg-gray-50">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <p className="text-lg text-red-600">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div id="specialists-section" className="min-h-screen bg-gray-50">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-2xl font-bold text-black mb-4">
            Bizning Mutaxasislarimiz
          </h1>
          <p className="text-lg text-black">
            Sizning salomatligingiz — bizning eng katta qadriyatimiz
          </p>
        </div>

        {/* Blue Filter Bar - Hidden on Mobile */}
        <div className="hidden sm:block bg-blue-500 rounded-lg p-4 sm:p-6 mb-12">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-center gap-4">
            {/* Centered filters */}
            <div className="flex flex-col sm:flex-row sm:flex-wrap items-stretch
             sm:items-center justify-center gap-3 sm:gap-4 lg:gap-6">
              {/* Specialty Filter */}
              <div className="relative flex-1 sm:flex-none">
                <select
                  value={selectedSpecialty}
                  onChange={(e) => setSelectedSpecialty(e.target.value)}
                  className="w-full appearance-none bg-blue-400 hover:bg-blue-300 
                  text-white font-medium px-3 sm:px-4 py-2 pr-8 rounded-lg cursor-pointer 
                  focus:outline-none focus:ring-2 focus:ring-blue-200 transition-all 
                  duration-200 min-w-[180px] sm:min-w-[200px]"
                >
                  <option value="all" className="text-gray-800">Mutaxasislik</option>
                  {specialties
                    .filter((s) => s !== "all")
                    .map((specialty) => (
                      <option key={specialty} value={specialty} className="text-gray-800">
                        {specialty}
                      </option>
                    ))}
                </select>
                <ChevronDown className="absolute right-2 top-1/2 transform 
                -translate-y-1/2 w-4 h-4 text-white pointer-events-none" />
              </div>

              {/* Direction Filter */}
              <div className="relative flex-1 sm:flex-none">
                <select
                  value={selectedDirection}
                  onChange={(e) => setSelectedDirection(e.target.value)}
                  className="w-full appearance-none
                   bg-blue-400 hover:bg-blue-300 text-white 
                   font-medium px-3 sm:px-4 py-2 pr-8 rounded-lg 
                   cursor-pointer focus:outline-none focus:ring-2 
                   focus:ring-blue-200 transition-all duration-200 
                   min-w-[180px] sm:min-w-[200px]"
                >
                  <option value="all" className="text-gray-800">Yo'nalishlar</option>
                  {directions
                    .filter((d) => d !== "all")
                    .map((direction) => (
                      <option key={direction} value={direction} className="text-gray-800">
                        {direction}
                      </option>
                    ))}
                </select>
                <ChevronDown className="absolute right-2 top-1/2 transform 
                -translate-y-1/2 w-4 h-4 text-white pointer-events-none" />
              </div>

              {/* Price Filter */}
              <div className="relative flex-1 sm:flex-none">
                <select
                  value={selectedPrice}
                  onChange={(e) => setSelectedPrice(e.target.value)}
                  className="w-full appearance-none 
                  bg-blue-400 hover:bg-blue-300 text-white 
                  font-medium px-3 sm:px-4 py-2 pr-8 rounded-lg 
                  cursor-pointer focus:outline-none focus:ring-2 
                  focus:ring-blue-200 transition-all duration-200 
                  min-w-[180px] sm:min-w-[200px]"
                >
                  <option value="all" className="text-gray-800">Narxlar</option>
                  {prices
                    .filter((p) => p !== "all")
                    .map((price) => (
                      <option key={price} value={price} className="text-gray-800">
                        {price}
                      </option>
                    ))}
                </select>
                <ChevronDown className="absolute right-2 top-1/2 transform 
                -translate-y-1/2 w-4 h-4 text-white pointer-events-none" />
              </div>

              {/* Sort Filter */}
              <div className="relative flex-1 sm:flex-none">
                <select
                  value={selectedSort}
                  onChange={(e) => setSelectedSort(e.target.value)}
                  className="w-full appearance-none bg-blue-400 
                  hover:bg-blue-300 text-white font-medium px-3 
                  sm:px-4 py-2 pr-8 rounded-lg cursor-pointer focus:outline-none 
                  focus:ring-2 focus:ring-blue-200 transition-all duration-200 
                  min-w-[180px] sm:min-w-[200px]"
                >
                  {sortOptions.map((option) => (
                    <option key={option.value} value={option.value} className="text-gray-800">
                      Saralash: {option.label}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white pointer-events-none" />
              </div>
              {/* Search */}
              <div className="relative w-full sm:w-auto">
                <input
                  type="text"
                  placeholder="Qidirish"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-white border border-gray-300 rounded-lg 
                  pl-4 pr-10 py-2 text-gray-900 focus:outline-none focus:ring-2 
                  focus:ring-blue-400 focus:border-transparent sm:w-56 shadow-sm"
                />
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>
            </div>
          </div>
        </div>

        {/* Doctor Cards Grid */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {filteredAndSortedDoctors.slice(0, visibleDoctors).map((doctor) => (
            <DoctorCard key={doctor.id} doctor={doctor} onDoctorClick={onDoctorClick} />
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center">
          <div className="text-center flex flex-col sm:flex-row gap-4">
            {/* Show More Button */}
            {remainingDoctors > 0 && (
              <button 
                onClick={handleShowMore}
                className="bg-blue-500 
                hover:bg-blue-600 text-white font-semibold px-24 py-4 rounded-lg
                 shadow-lg hover:shadow-xl transition-all 
                 duration-200 inline-flex items-center gap-2 
                 text-lg"
              >
                Batafsil →
              </button>
            )}
            
            {/* Reset Button - Show when more than 3 doctors are visible */}
            {visibleDoctors > 3 && (
              <button 
                onClick={handleReset}
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-8 py-4 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 inline-flex items-center gap-2 text-lg"
              >
                ← Oratga
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
