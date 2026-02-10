import dynamic from "next/dynamic";

import PopularCoursesSection from "@/app/(HomePageComponents)/(CourseCarousel)/PopularCoursesSection.tsx";
import HeroSection from "@/app/(HomePageComponents)/(HeroSection)/HeroSection";
import StatsSection from "@/app/(HomePageComponents)/(StatsSection)/StatsSection.tsx";
// import { CategoriesSectionAnimated } from "@/app/(HomePageComponents)/CategoriesSectionAnimated";
// import { CertificateSectionSimple } from "@/app/(HomePageComponents)/CertificateSectionSimple";
import { DiscoverBooksSectionCarousel } from "@/app/(HomePageComponents)/DiscoverBooksSectionCarousel";
import { InstructorsSectionAdvanced } from "@/app/(HomePageComponents)/InstructorsSectionAdvanced";
// import { WhyLearnSectionAnimated } from "@/app/(HomePageComponents)/WhyLearnSectionAnimated";

import BackToTop from "@/components/shared/BackToTop";
import TabletDrawer from "@/components/shared/menu/TabletDrawer";
// import GCommunitySection from "../(HomePageComponents)/(CommunitySection)/GCommunitySection.tsx";
// import ContactSection from "../(HomePageComponents)/(ContactSection)/ContactSection.tsx";
// import FAQStickyStack from "../(HomePageComponents)/FAQStickyStack.tsx";
// import MobileMenuWrapper from "../(HomePageComponents)/MobileMenuWrapper.tsx";
// import ProcessPerfect from "../(HomePageComponents)/Process.tsx";

const TestimonialSlider = dynamic(
  () => import("../(HomePageComponents)/(TestimonialSection)/TestimonialSlider")
);

const StdTestimonials = dynamic(() => import("../(HomePageComponents)/StdTestimonials.tsx"));

const ProcessPerfect = dynamic(() => import("../(HomePageComponents)/Process.tsx"));

const MobileMenuWrapper = dynamic(() => import("../(HomePageComponents)/MobileMenuWrapper.tsx"));

const FAQStickyStack = dynamic(() => import("../(HomePageComponents)/FAQStickyStack.tsx"));

const ContactSection = dynamic(
  () => import("../(HomePageComponents)/(ContactSection)/ContactSection.tsx")
);

const GCommunitySection = dynamic(
  () => import("../(HomePageComponents)/(CommunitySection)/GCommunitySection.tsx")
);

const WhyLearnSectionAnimated = dynamic(
  () =>
    import("@/app/(HomePageComponents)/WhyLearnSectionAnimated").then(
      mod => mod.WhyLearnSectionAnimated
    ),
  {
    loading: () => <div className='h-64' />,
  }
);

const CertificateSectionSimple = dynamic(
  () =>
    import("@/app/(HomePageComponents)/CertificateSectionSimple").then(
      mod => mod.CertificateSectionSimple
    ),
  {
    loading: () => <div className='h-64' />,
  }
);

const CategoriesSectionAnimated = dynamic(
  () =>
    import("@/app/(HomePageComponents)/CategoriesSectionAnimated").then(
      mod => mod.CategoriesSectionAnimated
    ),
  {
    loading: () => <div className='h-64' />,
  }
);

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <StatsSection />
      <CategoriesSectionAnimated />
      <WhyLearnSectionAnimated />
      <PopularCoursesSection />
      <DiscoverBooksSectionCarousel />
      <InstructorsSectionAdvanced />
      <StdTestimonials />
      <ProcessPerfect />
      <FAQStickyStack />
      <TestimonialSlider />
      <GCommunitySection />
      <CertificateSectionSimple />
      <ContactSection />
      {/* <Newsletter /> */}
      <MobileMenuWrapper />
      <TabletDrawer />
      <BackToTop />
    </>
  );
}
