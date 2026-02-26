import React from 'react'
import HeroSection from './home/HeroSection'
import StatsStrip from './home/StatsStrip'

import { StatsSection } from './home/StatsSection'
import { ServicesSection } from './home/ServicesSection'
import { FleetSection } from './home/FleetSection'
import { FeaturesSection } from './home/FeaturesSection'
import { TariffsSection } from './home/TariffsSection'
import { HelpSection } from './home/HelpSection'
import { DownloadSection } from './home/DownloadSection'
import { TestimonialsSection } from './home/TestimonialsSection'
import { CallToActionSection } from './home/CallToActionSection'
import BookingSection from './home/BookingSection'
import { BookingStepsSection } from './home/BookingStepsSection'





const Home = () => {
  return (
    <div style={{ overflowX: "hidden" }}>
      <HeroSection />
      {/* <BookingSection/> */}
      {/* <StatsStrip/> */}
      <div className="-mt-48 sm:-mt-32 lg:mt-0 relative z-40">
        <BookingSection />
      </div>
      <StatsSection />
      <ServicesSection />
      <BookingStepsSection/>
      <FleetSection />
      <FeaturesSection />
      <TariffsSection />
      <HelpSection />
      <DownloadSection />
      <TestimonialsSection />
      <CallToActionSection />
    </div>
  )
}

export default Home