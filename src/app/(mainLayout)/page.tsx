"use client";

import GCommunitySection from "@/app/(HomePageComponents)/(CommunitySection)/GCommunitySection.tsx";
import PopularCoursesSection from "@/app/(HomePageComponents)/(CourseCarousel)/PopularCoursesSection.tsx";
import HeroSection from "@/app/(HomePageComponents)/(HeroSection)/HeroSection";
import StatsSection from "@/app/(HomePageComponents)/(StatsSection)/StatsSection.tsx";
import { CategoriesSectionAnimated } from "@/app/(HomePageComponents)/CategoriesSectionAnimated";
import { CertificateSectionSimple } from "@/app/(HomePageComponents)/CertificateSectionSimple";
import { DiscoverBooksSectionCarousel } from "@/app/(HomePageComponents)/DiscoverBooksSectionCarousel";
import { InstructorsSectionAdvanced } from "@/app/(HomePageComponents)/InstructorsSectionAdvanced";
import { WhyLearnSectionAnimated } from "@/app/(HomePageComponents)/WhyLearnSectionAnimated";

import BackToTop from "@/components/shared/BackToTop";
import Newsletter from "@/components/shared/footer/Newsletter";
import MobileMenu from "@/components/shared/menu/MobileMenu";
import TabletDrawer from "@/components/shared/menu/TabletDrawer";
import { useState } from "react";
import ContactSection from "../(HomePageComponents)/(ContactSection)/ContactSection.tsx";
import TestimonialSlider from "../(HomePageComponents)/(TestimonialSection)/TestimonialSlider.tsx";

export default function HomePage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      {/* Page Sections */}
      {/* <div className='block xl:hidden mt-6'>
        <RightSidebar />
      </div> */}

      <HeroSection />

      {/* <SidebarAdBanner /> */}
      <StatsSection />
      <CategoriesSectionAnimated />
      <WhyLearnSectionAnimated />
      {/* <FeaturedCoursesCarousel courses={courses} /> */}
      <PopularCoursesSection />
      {/* <CourseCarousel /> */}
      <DiscoverBooksSectionCarousel />
      <InstructorsSectionAdvanced />
      <TestimonialSlider />
      {/* <CommunitySection /> */}
      <GCommunitySection />
      <CertificateSectionSimple />
      <ContactSection />
      {/* <ConsultationSection /> */}
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
