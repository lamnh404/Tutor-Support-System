import React from 'react'
import Features from './Features'
import Trending from './Trending'
import Library from './Library' // Change the import name and path
import Footer from './Footer'
import Intro from './Intro'


const Home: React.FC = () => {
  return (
    <div className="font-sans">
      <Intro />
      <Features />
      <Trending />
      <Library />
      <Footer />
    </div>
  )
}

export default Home