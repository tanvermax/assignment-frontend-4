import { BookShowcase } from './Section1/Section1'
import { NewsletterSignup } from './Section1/Section2'
import { HeroSlider } from './Section1/Banner'

export default function Home() {
  return (
    <div>
        <HeroSlider/>
        <BookShowcase/>
        <NewsletterSignup/>
    </div>
  )
}
