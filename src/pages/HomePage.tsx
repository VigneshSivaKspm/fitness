import Hero from '../components/Hero'
import OfferBar from '../components/OfferBar'
import InfoSection from '../components/InfoSection'
import FeatureSection from '../components/FeatureSection'
import TopCategories from '../components/TopCategories'
import StrengthBalance from '../components/StrengthBalance'
import ProductFeatureList from '../components/ProductFeatureList'
import BodybarsGrid from '../components/BodybarsGrid'
import ExperienceStrip from '../components/ExperienceStrip'

export default function HomePage(){
  return (
    <>
      <Hero />
      <OfferBar />
      <InfoSection />
      <FeatureSection />
      <TopCategories />
      <StrengthBalance />
      <ProductFeatureList />
      <BodybarsGrid />
      <ExperienceStrip />
    </>
  )
}
