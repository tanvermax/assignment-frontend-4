import { motion } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"

interface Slide {
  id: number
  bookImage: string
  authorImage: string
  title: string
  subtitle: string
  description: string
  ctaText: string
}

export function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0)

  const slides: Slide[] = [
    {
      id: 1,
      bookImage: "https://target.scene7.com/is/image/Target/GUEST_b6a1122a-07bf-4768-be72-649f7925b207",
      authorImage: "https://t1.gstatic.com/licensed-image?q=tbn:ANd9GcSlFX-ExdVPj7S9l1hXwTg1uuYP2T8Q1zszVPOi6jhpKNg6lxXikzEI08vEdF5Umd7eow9T7iGPFF2aSxqg",
      title: "The Midnight Library",
      subtitle: "Discover Infinite Possibilities",
      description: "Between life and death there is a library where each book represents a different path your life could have taken.",
      ctaText: "Explore Now"
    },
    {
      id: 2,
      bookImage: "https://target.scene7.com/is/image/Target/GUEST_0035cc74-7206-485d-aa04-83b3b7cf8db7?wid=800&hei=800&qlt=80&fmt=webp",
      authorImage: "https://www.jordanharbinger.com/wp-content/uploads/2018/10/108-james-clear-showart.jpg",
      title: "Atomic Habits",
      subtitle: "Build Good Habits & Break Bad Ones",
      description: "Learn how tiny changes can grow into life-altering outcomes with this groundbreaking book.",
      ctaText: "Read Excerpt"
    },
    {
      id: 3,
      bookImage: "https://images.randomhouse.com/cover/d/9780593640333",
      authorImage: "https://www.historylink.org/Content/Media/Photos/Large/Frank-Herbert-September-27-1982.jpg",
      title: "Dune",
      subtitle: "The Sci-Fi Masterpiece",
      description: "Journey to the desert planet Arrakis in this epic tale of politics, religion, and ecology.",
      ctaText: "View Series"
    }
  ]

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1))
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1))
  }

  return (
    <section className="relative h-[70vh] w-full overflow-hidden">
      {/* Background Images (Split Screen) */}
      <div className="absolute inset-0 flex">
        <div className="w-1/2 h-full relative">
          <motion.img
            key={`book-${slides[currentSlide].id}`}
            src={slides[currentSlide].bookImage}
            alt="Book Cover"
            className="h-full w-full "
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent" />
        </div>
        <div className="w-1/2 h-full relative">
          <motion.img
            key={`author-${slides[currentSlide].id}`}
            src={slides[currentSlide].authorImage}
            alt="Author"
            className="w-full h-full object-cover object-left"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          />
          <div className="absolute inset-0 bg-gradient-to-l from-black/30 to-transparent" />
        </div>
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 h-full flex items-center justify-center">
        <div className="container mx-auto px-6">
          <motion.div
            key={`content-${slides[currentSlide].id}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="max-w-2xl text-center"
          >
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-2">
              {slides[currentSlide].title}
            </h1>
            <h2 className="text-xl md:text-2xl text-primary mb-6">
              {slides[currentSlide].subtitle}
            </h2>
            <p className="text-lg text-white/90 mb-8">
              {slides[currentSlide].description}
            </p>
            <Button size="lg" className="px-8 py-6 text-lg">
              {slides[currentSlide].ctaText}
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-black/30 hover:bg-black/50 transition-colors"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-8 h-8 text-white" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-black/30 hover:bg-black/50 transition-colors"
        aria-label="Next slide"
      >
        <ChevronRight className="w-8 h-8 text-white" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-2 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentSlide ? "bg-primary w-6" : "bg-white/50"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  )
}