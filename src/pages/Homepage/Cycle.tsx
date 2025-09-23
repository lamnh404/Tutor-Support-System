import React, { useState, useEffect } from 'react'

// 1. Import local images directly
import slbkImage from '~/assets/home/slbk.jpg'
import sanbongImage from '~/assets/home/sanbong.jpeg'
import slbktvImage from '~/assets/home/slbktv.jpg'

// 2. Use the imported variables in the array
const images = [
  slbkImage,
  sanbongImage,
  slbktvImage
]

const Cycle: React.FC = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  // Preload the next image
  useEffect(() => {
    const nextImageIndex = (currentImageIndex + 1) % images.length
    const nextImage = new Image()
    nextImage.src = images[nextImageIndex]
  }, [currentImageIndex])

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length)
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="absolute inset-0 overflow-hidden">
      <div
        className="flex h-full w-full transition-transform duration-1000 ease-in-out"
        style={{ transform: `translateX(-${currentImageIndex * 100}%)` }}
      >
        {images.map((image, index) => (
          <div
            key={index}
            className="flex-shrink-0 w-full h-full bg-cover bg-center"
            // Use the image variable here
            style={{ backgroundImage: `url(${image})` }}
          />
        ))}
      </div>
    </div>
  )
}

export default Cycle