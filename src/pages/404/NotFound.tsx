// src/pages/NotFound.tsx
import { Link } from 'react-router-dom'
import { Home } from 'lucide-react'
import PlanetSvg from '~/assets/404/planet.svg'
import AstronautSvg from '~/assets/404/astronaut.svg'

export default function NotFound() {
  return (
    <div className="w-screen h-screen bg-[#25344C] text-white flex items-center justify-center">
      <div
        className="w-full h-full flex flex-col items-center justify-center bg-center bg-repeat bg-contain animate-stars"
        style={{ backgroundImage: 'url("/src/assets/404/particles.png")' }}
      >
        {/* Error code */}
        <h1 className="text-[100px] font-extrabold">404</h1>

        {/* Error message */}
        <p className="text-[18px] leading-[25px] font-normal max-w-[350px] text-center">
    LOST IN{' '}
          <span className="relative after:absolute after:left-0 after:top-1/2 after:w-full after:border-b-[3px] after:border-[#fdba26]">
            {' '}SPACE{' '}
          </span>{' '}
          <span className="text-[#fdba26] font-medium">Tutor-Support-System</span>?
          <br />
    Hmm, looks like that page doesn&apos;t exist.
        </p>

        {/* Astronaut + Planet */}
        <div className="relative w-[390px] h-[390px] mt-6">
          <img
            src={AstronautSvg}
            alt="Astronaut"
            className="absolute top-5 right-6 w-[50px] h-[50px] animate-spin-slow"
          />
          <img src={PlanetSvg} alt="Planet" />
        </div>

        {/* Back home button */}
        <Link
          to="/"
          className="mt-6 inline-flex items-center gap-2 border border-white px-4 py-2 rounded-lg text-white hover:text-[#fdba26] hover:border-[#fdba26] transition-colors"
        >
          <Home className="w-5 h-5" />
    Go Home
        </Link>
      </div>
    </div>
  )
}
