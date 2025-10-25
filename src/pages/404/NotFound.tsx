import { Home, RefreshCw, ArrowLeft } from 'lucide-react'
import { useState, useEffect } from 'react'

interface Star {
  id: number
  left: number
  top: number
  size: number
  animationDelay: number
  animationDuration: number
}

interface ShootingStar {
  id: number
  left: number
  top: number
}

export default function NotFound() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)
  const [stars, setStars] = useState<Star[]>([])
  const [shootingStars, setShootingStars] = useState<ShootingStar[]>([])
  const [glitchActive, setGlitchActive] = useState(false)

  // Generate random stars on mount
  useEffect(() => {
    const newStars = Array.from({ length: 100 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: Math.random() * 2 + 1,
      animationDelay: Math.random() * 3,
      animationDuration: Math.random() * 2 + 2
    }))
    setStars(newStars)

    // Generate shooting stars periodically
    const interval = setInterval(() => {
      const newShootingStar = {
        id: Date.now(),
        left: Math.random() * 100,
        top: Math.random() * 50
      }
      setShootingStars(prev => [...prev, newShootingStar])

      setTimeout(() => {
        setShootingStars(prev => prev.filter(star => star.id !== newShootingStar.id))
      }, 2000)
    }, 3000)

    // Random glitch effect
    const glitchInterval = setInterval(() => {
      setGlitchActive(true)
      setTimeout(() => setGlitchActive(false), 300)
    }, 5000)

    return () => {
      clearInterval(interval)
      clearInterval(glitchInterval)
    }
  }, [])

  // Track mouse position for parallax effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent ) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20
      })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <div className="relative w-screen h-screen bg-gradient-to-b from-[#0a0e27] via-[#1a1f3a] to-[#25344C] text-white overflow-hidden">
      {/* Animated stars background */}
      <div className="absolute inset-0">
        {stars.map(star => (
          <div
            key={star.id}
            className="absolute rounded-full bg-white animate-pulse"
            style={{
              left: `${star.left}%`,
              top: `${star.top}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              animationDelay: `${star.animationDelay}s`,
              animationDuration: `${star.animationDuration}s`,
              opacity: 0.8
            }}
          />
        ))}
      </div>

      {/* Shooting stars */}
      {shootingStars.map(star => (
        <div
          key={star.id}
          className="absolute w-1 h-1 bg-white rounded-full animate-shooting-star"
          style={{
            left: `${star.left}%`,
            top: `${star.top}%`
          }}
        >
          <div className="absolute w-20 h-0.5 bg-gradient-to-r from-white to-transparent -translate-y-0.5" />
        </div>
      ))}

      {/* Main content with parallax */}
      <div
        className="relative w-full h-full flex flex-col items-center justify-center transition-transform duration-200 ease-out px-4"
        style={{
          transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`
        }}
      >
        {/* Glowing orbs in background */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />

        {/* 404 with glitch effect */}
        <div className="relative mb-4">
          <h1
            className="text-[100px] sm:text-[120px] md:text-[150px] font-extrabold relative z-10 select-none"
            style={{
              textShadow: '0 0 20px rgba(253, 186, 38, 0.5), 0 0 40px rgba(253, 186, 38, 0.3)'
            }}
          >
            404
          </h1>
          {glitchActive && (
            <>
              <h1
                className="absolute top-0 left-0 text-[100px] sm:text-[120px] md:text-[150px] font-extrabold text-cyan-400 opacity-70"
                style={{
                  clipPath: 'polygon(0 0, 100% 0, 100% 45%, 0 45%)',
                  transform: 'translate(-2px, 2px)'
                }}
              >
                404
              </h1>
              <h1
                className="absolute top-0 left-0 text-[100px] sm:text-[120px] md:text-[150px] font-extrabold text-red-400 opacity-70"
                style={{
                  clipPath: 'polygon(0 55%, 100% 55%, 100% 100%, 0 100%)',
                  transform: 'translate(2px, -2px)'
                }}
              >
                404
              </h1>
            </>
          )}
        </div>

        {/* Error message */}
        <div className="text-center max-w-[500px] mb-8">
          <p className="text-xl md:text-2xl leading-relaxed font-light">
            <span className="inline-block animate-float">🚀</span> LOST IN{' '}
            <span className="relative inline-block">
              <span className="relative z-10 font-bold text-[#fdba26] px-2">SPACE</span>
              <span className="absolute inset-0 bg-[#fdba26]/20 blur-md animate-pulse" />
            </span>
          </p>
          <p className="mt-4 text-base md:text-lg text-gray-300 animate-fade-in">
            Chúng tôi gặp sự cố! Trang bạn đang tìm đã trôi vào hư không..
          </p>
        </div>

        {/* Floating astronaut with interactive hover */}
        <div
          className="relative w-32 h-32 mb-8 cursor-pointer"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
          style={{
            animation: 'float-slow 6s ease-in-out infinite'
          }}
        >
          <div
            className={`w-full h-full transition-all duration-500 ${isHovering ? 'scale-125 rotate-12' : 'scale-100'}`}
          >
            <div className="relative w-full h-full">
              {/* Astronaut body */}
              <div className="absolute inset-0 bg-white rounded-full shadow-lg shadow-blue-500/50" />
              {/* Helmet visor */}
              <div className="absolute top-1/4 left-1/4 w-1/2 h-1/3 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-full opacity-80">
                {isHovering && (
                  <div className="absolute inset-0 flex items-center justify-center text-2xl animate-bounce">
                    👋
                  </div>
                )}
              </div>
              {/* Reflection */}
              <div className="absolute top-1/3 left-1/3 w-1/4 h-1/6 bg-white rounded-full opacity-60" />
              {/* Antenna */}
              <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-1 h-4 bg-gray-300 rounded-full" />
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-3 h-3 bg-red-500 rounded-full animate-pulse" />
            </div>
          </div>
          {/* Floating particles */}
          <div className="absolute -top-4 -left-4 w-2 h-2 bg-[#fdba26] rounded-full animate-ping" />
          <div className="absolute -bottom-4 -right-4 w-2 h-2 bg-cyan-400 rounded-full animate-ping" style={{ animationDelay: '0.5s' }} />
          <div className="absolute top-0 -right-6 w-2 h-2 bg-pink-400 rounded-full animate-ping" style={{ animationDelay: '1s' }} />
        </div>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-4 items-center z-10">
          <a
            href="/"
            className="group cursor-pointer relative inline-flex items-center gap-2 bg-[#fdba26] text-[#0a0e27] px-6 py-3 rounded-full font-semibold overflow-hidden transition-all hover:scale-105 hover:shadow-lg hover:shadow-[#fdba26]/50"
          >
            <span className="absolute inset-0 w-0 bg-white transition-all duration-300 ease-out group-hover:w-full" />
            <Home className="w-5 h-5 relative z-10 group-hover:rotate-12 transition-transform" />
            <span className="relative z-10">Về nhà</span>
          </a>

          <button
            onClick={() => window.history.back()}
            className="group cursor-pointer inline-flex items-center gap-2 border-2 border-white/30 px-6 py-3 rounded-full text-white font-semibold backdrop-blur-sm hover:border-[#fdba26] hover:text-[#fdba26] transition-all hover:scale-105"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            Quay lại
          </button>

          <button
            onClick={() => window.location.reload()}
            className="group cursor-pointer inline-flex items-center gap-2 border-2 border-white/30 px-6 py-3 rounded-full text-white font-semibold backdrop-blur-sm hover:border-cyan-400 hover:text-cyan-400 transition-all hover:scale-105"
          >
            <RefreshCw className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" />
            Thử lại
          </button>
        </div>

        {/* Fun Easter egg message */}
        <p className="mt-8 text-sm text-gray-400 animate-pulse">
          💡 Tip: Hãy thử di chuyển chuột của bạn xung quanh và di chuột qua phi hành gia
        </p>

        {/* Scan lines effect */}
        <div className="absolute inset-0 pointer-events-none opacity-5">
          <div className="w-full h-full bg-gradient-to-b from-transparent via-white to-transparent animate-scan" />
        </div>
      </div>

      {/* Custom animations */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        @keyframes shooting-star {
          0% { transform: translate(0, 0); opacity: 1; }
          100% { transform: translate(-300px, 300px); opacity: 0; }
        }
        @keyframes scan {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        .animate-shooting-star {
          animation: shooting-star 2s ease-out forwards;
        }
        .animate-scan {
          animation: scan 8s linear infinite;
        }
        .animate-fade-in {
          animation: fade-in 0.8s ease-out forwards;
        }
      `}</style>
    </div>
  )
}