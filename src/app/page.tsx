import HeroSection from '@/components/sections/HeroSection'
import AboutSection from '@/components/sections/AboutSection'
import ServicesSection from '@/components/sections/ServicesSection'
import GallerySection from '@/components/sections/GallerySection'
import AccessSection from '@/components/sections/AccessSection'
import CtaSection from '@/components/sections/CtaSection'
import { getGalleryItems } from '@/lib/microcms'

export default async function HomePage() {
  const galleryItems = await getGalleryItems()

  return (
    <>
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <GallerySection items={galleryItems} />
      <AccessSection />
      <CtaSection />
    </>
  )
}
