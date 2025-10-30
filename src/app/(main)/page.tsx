"use client";

import HeroSection from "@/app/(HomePageComponents)/(HeroSection)/HeroSection";
import { CategoriesSectionAnimated } from "@/app/(HomePageComponents)/CategoriesSectionAnimated";
import { CertificateSectionSimple } from "@/app/(HomePageComponents)/CertificateSectionSimple";
import CommunitySection from "@/app/(HomePageComponents)/CommunitySection";
import ConsultationSection from "@/app/(HomePageComponents)/ConsultationSection";
import { DiscoverBooksSectionCarousel } from "@/app/(HomePageComponents)/DiscoverBooksSectionCarousel";
import GCommunitySection from "@/app/(HomePageComponents)/GCommunitySection";
import { InstructorsSectionAdvanced } from "@/app/(HomePageComponents)/InstructorsSectionAdvanced";
import PopularCoursesSection from "@/app/(HomePageComponents)/PopularCoursesSection";
import { WhyLearnSectionAnimated } from "@/app/(HomePageComponents)/WhyLearnSectionAnimated";
import StatsSection from "@/components/StatsSection";
import BackToTop from "@/components/shared/BackToTop";
import Newsletter from "@/components/shared/footer/Newsletter";
import MobileMenu from "@/components/shared/menu/MobileMenu";
import TabletDrawer from "@/components/shared/menu/TabletDrawer";
import { useState } from "react";

export default function HomePage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      {/* Page Sections */}
      {/* <div className='block xl:hidden mt-6'>
        <RightSidebar />
      </div> */}

      <HeroSection />
      <CategoriesSectionAnimated />
      <StatsSection />

      <WhyLearnSectionAnimated />
      <PopularCoursesSection />
      <DiscoverBooksSectionCarousel />
      <InstructorsSectionAdvanced />
      <CommunitySection />
      <GCommunitySection />
      <CertificateSectionSimple />
      <ConsultationSection />
      <Newsletter />

      {/* Mobile/Tablet Components (Page-specific) */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
      <TabletDrawer />
      <BackToTop />
    </>
  );
}
