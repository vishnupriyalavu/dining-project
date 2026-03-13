import { useRef } from "react"
import { ChevronLeft, ChevronRight, Sparkles } from "lucide-react"
import useEmblaCarousel from "embla-carousel-react"
import Autoplay from "embla-carousel-autoplay"

const slides = [
  {
    image:
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1400&q=80",
    title: "Weekend Feast Deals",
    description: "Comfort food combos, premium desserts, and quick delivery.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=1400&q=80",
    title: "Fresh Bowls & Salads",
    description: "Balanced meals packed with color, crunch, and flavor.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1551782450-a2132b4ba21d?auto=format&fit=crop&w=1400&q=80",
    title: "Burgers Worth Reordering",
    description: "Stacked, juicy, and made for fast cravings at any hour.",
  },
]

export default function FoodCarousel() {
  const autoplay = useRef(
    Autoplay({
      delay: 3200,
      stopOnInteraction: false,
    })
  )

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    autoplay.current,
  ])

  return (
    <section className="relative overflow-hidden rounded-[36px] shadow-2xl shadow-[#70193d]/20">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {slides.map((slide) => (
            <div key={slide.title} className="relative min-w-full">
              <img
                src={slide.image}
                alt={slide.title}
                className="h-[340px] w-full object-cover sm:h-[420px]"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900/65 to-slate-900/10" />
              <div className="absolute inset-0 flex items-end p-6 sm:p-8 lg:p-10">
                <div className="max-w-lg text-white">
                  <p className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-[#f6d7e3] backdrop-blur">
                    <Sparkles className="h-4 w-4" />
                    Chef specials
                  </p>
                  <h2 className="mt-4 text-3xl font-black tracking-tight sm:text-4xl lg:text-5xl">
                    {slide.title}
                  </h2>
                  <p className="mt-3 text-sm leading-6 text-slate-200 sm:text-base">
                    {slide.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-5 right-5 flex gap-2">
        <button
          type="button"
          onClick={() => emblaApi?.scrollPrev()}
          className="rounded-full bg-white/85 p-3 text-slate-900 shadow-lg backdrop-blur transition hover:scale-105"
          aria-label="Previous slide"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          type="button"
          onClick={() => emblaApi?.scrollNext()}
          className="rounded-full bg-white/85 p-3 text-slate-900 shadow-lg backdrop-blur transition hover:scale-105"
          aria-label="Next slide"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    </section>
  )
}
