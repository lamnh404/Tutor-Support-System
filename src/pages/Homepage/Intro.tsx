import { Link } from 'react-router-dom'
import Cycle from './Cycle'

export default function Intro() {
  return (
    <section className="text-center py-20 mt-16 relative overflow-hidden">
      {/* Background Carousel Component */}
      <Cycle />

      {/* The container is now layered on top of the carousel */}
      <div className="container mx-auto p-8 rounded-lg bg-black/60 max-w-5/10 relative z-10">
        <h2 className="text-4xl sm:text-5xl font-extrabold text-white mb-4 leading-tight">
          HCMUT <br />
          Tutor Support System
        </h2>
        <p className="text-lg text-white mb-8 max-w-2xl mx-auto">
          The Tutor/Mentor program has now been implemented to support students in their academic journey and skill development.
        </p>
        <Link to="/login">
          <button className="bg-blue-600 text-white font-bold py-3 px-8 rounded-full text-lg hover:bg-blue-700 transition-colors">
          Log In Using BKeID
          </button>
        </Link>
      </div>
    </section>
  )
}