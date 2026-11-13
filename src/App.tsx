import React, { useState } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { Header } from './components/layout/Header';
import { HeroSection } from './components/sections/HeroSection';
import { AboutSection } from './components/sections/AboutSection';
import { WhyChooseUs } from './components/sections/WhyChooseUs';
import { CoursesSection } from './components/sections/CoursesSection';
import { PackagesSection } from './components/sections/PackagesSection';
import { HowItWorks } from './components/sections/HowItWorks';
import { ReviewsSection } from './components/sections/ReviewsSection';
import { InstructorsSection } from './components/sections/InstructorsSection';
import { GallerySection } from './components/sections/GallerySection';
import { ContactSection } from './components/sections/ContactSection';
import { Footer } from './components/layout/Footer';
import { FloatingActions } from './components/common/FloatingActions';
import { CustomCursor } from './components/common/CustomCursor';
import { BookingModal } from './components/common/BookingModal';
import { CourseAdvisorModal } from './components/sections/CourseAdvisorModal';
import { AnimatedRoadDivider } from './components/common/AnimatedRoadDivider';

export const AppContent: React.FC = () => {
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [bookingTarget, setBookingTarget] = useState<string>('General Enquiry');
  const [advisorModalOpen, setAdvisorModalOpen] = useState(false);

  const handleOpenBooking = (courseOrPackage?: string) => {
    setBookingTarget(courseOrPackage || 'General Enquiry');
    setBookingModalOpen(true);
  };

  const handleOpenAdvisor = () => {
    setAdvisorModalOpen(true);
  };

  const handleAdvisorSelect = (item: string) => {
    setBookingTarget(item);
    setBookingModalOpen(true);
  };

  const handleExploreCourses = () => {
    const el = document.getElementById('courses');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen relative overflow-x-hidden transition-colors duration-700">
      {/* Desktop Custom Cursor */}
      <CustomCursor />

      {/* Floating Action Buttons (WhatsApp & Call) */}
      <FloatingActions />

      {/* Sticky Header & Nav */}
      <Header
        onOpenBooking={handleOpenBooking}
        onOpenAdvisor={handleOpenAdvisor}
      />

      <main>
        {/* Hero Section with Cinematic 3D Canvas */}
        <HeroSection
          onOpenBooking={() => handleOpenBooking('15 Days Confidence Builder (Popular)')}
          onExploreCourses={handleExploreCourses}
        />

        {/* Animated Road Divider to About */}
        <AnimatedRoadDivider checkpointLabel="MILESTONE 01 • MAYYIL, KANNUR" />

        {/* About A ONE Motors */}
        <AboutSection onOpenBooking={() => handleOpenBooking('About Section Enquiry')} />

        {/* Animated Road Divider to Why Choose Us */}
        <AnimatedRoadDivider checkpointLabel="MILESTONE 02 • SAFETY & CONTROLS" />

        {/* Why Choose Us */}
        <WhyChooseUs />

        {/* Animated Road Divider to Courses */}
        <AnimatedRoadDivider checkpointLabel="MILESTONE 03 • DRIVING CURRICULUM" />

        {/* Courses Section */}
        <CoursesSection
          onOpenBooking={handleOpenBooking}
          onOpenAdvisor={handleOpenAdvisor}
        />

        {/* Animated Road Divider to Packages */}
        <AnimatedRoadDivider checkpointLabel="MILESTONE 04 • TRAINING PACKAGES" />

        {/* Packages Section */}
        <PackagesSection onOpenBooking={handleOpenBooking} />

        {/* How It Works Road Timeline */}
        <HowItWorks onOpenBooking={() => handleOpenBooking('Step 01 Onboarding')} />

        {/* Animated Road Divider to Reviews */}
        <AnimatedRoadDivider checkpointLabel="MILESTONE 05 • 6,049+ GOOGLE REVIEWS" />

        {/* Reviews Section */}
        <ReviewsSection />

        {/* Instructors Section */}
        <InstructorsSection onOpenBooking={handleOpenBooking} />

        {/* Gallery Section */}
        <GallerySection />

        {/* Contact Section & Map */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Booking Modal */}
      <BookingModal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
        defaultCourseOrPackage={bookingTarget}
      />

      {/* AI Course Advisor Modal */}
      <CourseAdvisorModal
        isOpen={advisorModalOpen}
        onClose={() => setAdvisorModalOpen(false)}
        onSelectPackageOrCourse={handleAdvisorSelect}
      />
    </div>
  );
};

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}
