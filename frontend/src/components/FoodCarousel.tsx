import useEmblaCarousel from "embla-carousel-react"
import Autoplay from "embla-carousel-autoplay"
import { useRef } from "react"

const images = [
  "https://images.unsplash.com/photo-1504674900247-0877df9cc836",
  "https://images.unsplash.com/photo-1512621776951-a57141f2eefd",
  "https://images.unsplash.com/photo-1551782450-a2132b4ba21d",
  "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe"
]

export default function FoodCarousel() {

  const autoplay = useRef(
    Autoplay({
      delay: 2500,           // slide every 2.5 seconds
      stopOnInteraction: false
    })
  )

  const [emblaRef] = useEmblaCarousel(
    { loop: true },
    [autoplay.current]
  )

  return (
    <div className="overflow-hidden rounded-xl mb-8" ref={emblaRef}>
      <div className="flex">

        {images.map((img, index) => (
          <div key={index} className="min-w-full">
            <img
              src={img}
              alt="food banner"
              className="w-full h-[320px] object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  )
}
