import { useState, useRef, useEffect } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import Banner from './components/Banner'
import Service from './components/Service'
import Advantage from './components/Advantage'
// import About from './components/about'
import FAQ from "./components/Faq"
import Stuffs from './components/Stuffs'
import News from "./components/News"
import Footer from "./components/Footer"
import Rentgen from './components/pages/Rentgen'
import Acceptance from './components/pages/Acceptance'
import DoctorProfile from './components/pages/DoctorProfile'
import UltraSound from './components/pages/UltraSound'
import Analysis from './components/pages/Analysis'
import FunctionalD from './components/pages/FunctionalD'
import FibroScan from './components/pages/FibroScan'
import Emsella from './components/pages/Emsella'
import Laboratory from './components/pages/Laboratory'
import Vacancy from './components/pages/Vacancy'
import VacancyApplication from './components/vacancy-application/Vacancy-application'
import CheckUp from './components/pages/Check-up'
import About from './components/pages/About'
import Loader from './components/loader/Loader'
import Neurology from './components/pages/Neurology'

function App() {
  const [currentSection, setCurrentSection] = useState('home')
  const [selectedDoctorId, setSelectedDoctorId] = useState(null)
  const [showAboutInHome, setShowAboutInHome] = useState(false)
  const [isPageLoading, setIsPageLoading] = useState(false)
  const shouldScrollToServices = useRef(false)
  const previousSection = useRef('home')
  const isPopState = useRef(false)

  // URL hash'dan sahifani o'qish
  useEffect(() => {
    const hash = window.location.hash.slice(1) || 'home'
    if (hash.startsWith('doctor-')) {
      const doctorId = parseInt(hash.replace('doctor-', ''))
      setSelectedDoctorId(doctorId)
      setCurrentSection('doctor-profile')
    } else if (hash === 'about') {
      setCurrentSection('home')
      setShowAboutInHome(true)
    } else if (hash && hash !== 'home') {
      setCurrentSection(hash)
    }
  }, [])

  // Browser orqaga/oldinga tugmalari
  useEffect(() => {
    const handlePopState = () => {
      isPopState.current = true
      const hash = window.location.hash.slice(1) || 'home'
      
      if (hash.startsWith('doctor-')) {
        const doctorId = parseInt(hash.replace('doctor-', ''))
        setSelectedDoctorId(doctorId)
        setCurrentSection('doctor-profile')
      } else if (hash === 'about') {
        setCurrentSection('home')
        setShowAboutInHome(true)
      } else {
        setCurrentSection(hash)
        setShowAboutInHome(false)
        setSelectedDoctorId(null)
      }
      
      setTimeout(() => {
        isPopState.current = false
      }, 100)
    }

    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  const handleNavigation = (section) => {
    // Agar sahifa o'zgarmoqchi bo'lsa, loading ko'rsat
    if (section !== currentSection && section !== 'services' && section !== 'about') {
      setIsPageLoading(true)
    }
    
    if (section === 'services') {
      // Set flag to scroll and navigate to home
      shouldScrollToServices.current = true
      setCurrentSection('home')
      setShowAboutInHome(false)
    } else if (section === 'about') {
      // Show about component in place of banner
      setCurrentSection('home')
      setShowAboutInHome(true)
      if (!isPopState.current) {
        window.history.pushState(null, '', '#about')
      }
    } else if (section === 'home') {
      setCurrentSection('home')
      setShowAboutInHome(false)
    } else {
      setCurrentSection(section)
      setShowAboutInHome(false)
      if (!isPopState.current) {
        window.history.pushState(null, '', `#${section}`)
      }
    }
    setSelectedDoctorId(null) // Reset doctor selection when navigating
  }

  const handleDoctorClick = (doctorId) => {
    setIsPageLoading(true)
    setSelectedDoctorId(doctorId)
    setCurrentSection('doctor-profile')
    if (!isPopState.current) {
      window.history.pushState(null, '', `#doctor-${doctorId}`)
    }
  }
    
  const handleBackFromDoctor = () => {
    setIsPageLoading(true)
    setSelectedDoctorId(null)
    setCurrentSection('acceptance')
    if (!isPopState.current) {
      window.history.pushState(null, '', '#acceptance')
    }
  }

  // Handle scrolling to services section when flag is set
  useEffect(() => {
    if (shouldScrollToServices.current && currentSection === 'home') {
      shouldScrollToServices.current = false
      setTimeout(() => {
        const servicesElement = document.querySelector('[data-section="services"]')
        if (servicesElement) {
          servicesElement.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
          })
        }
      }, 100)
    }
  }, [currentSection])

  // Sahifa o'zgarganda loading'ni yopish
  useEffect(() => {
    if (previousSection.current !== currentSection) {
      previousSection.current = currentSection
      // Qisqa kechikishdan keyin loading'ni yopish
      const timer = setTimeout(() => {
        setIsPageLoading(false)
      }, 300)
      return () => clearTimeout(timer)
    }
  }, [currentSection])

  const renderContent = () => {
    switch(currentSection) {
      case 'vacancy':
        return <Vacancy onNavigate={handleNavigation} />
      case 'vacancy-application':
        return <VacancyApplication onNavigate={handleNavigation} />
      case 'acceptance':
        return <Acceptance onDoctorClick={handleDoctorClick} onNavigate={handleNavigation} />
      case 'doctor-profile':
        return <DoctorProfile doctorId={selectedDoctorId} onBack={handleBackFromDoctor} onNavigate={handleNavigation} />
      case 'rentgen':
        return <Rentgen onNavigate={handleNavigation} />
      case 'ultrasound':
        return <UltraSound onDoctorClick={handleDoctorClick} onNavigate={handleNavigation} />
      case 'analysis':
        return <Analysis onNavigate={handleNavigation} />
      case 'functional-diagnostika':
        return <FunctionalD onNavigate={handleNavigation} />
      case 'fibro-scan':
        return <FibroScan onNavigate={handleNavigation} />
      case 'emsella':
        return <Emsella onNavigate={handleNavigation} />
      case 'laboratory':
        return <Laboratory onNavigate={handleNavigation} />
      case 'check-up':
        return <CheckUp onNavigate={handleNavigation} onDoctorClick={handleDoctorClick} />
      case 'neurology':
        return <Neurology onNavigate={handleNavigation} onDoctorClick={handleDoctorClick} />
      case 'home':
      default:
        return (
          <div className="pt-0 md:pt-40">
            {showAboutInHome ? (
              <About onNavigate={handleNavigation}/>
            ) : (
              <Banner onNavigate={handleNavigation}/>
            )}
            <div data-section="services">
              <Service onNavigate={handleNavigation}/>
            </div>
            <Advantage/>
            <Stuffs onDoctorClick={handleDoctorClick}/>
            <FAQ />
            <News />
            <Footer onNavigate={handleNavigation} />
          </div>
        )
    }
  }

  return (
      <>
        <Navbar onNavigate={handleNavigation} currentSection={showAboutInHome ? 'about' : currentSection} />
        {isPageLoading && <Loader fullScreen={true} />}
        {renderContent()}
      </>
  )
}

export default App
