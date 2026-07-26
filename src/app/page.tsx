import Loader from '@/components/Loader';
import Hero from '@/components/Hero';
import Portfolio from '@/components/Portfolio';
import BeforeAfter from '@/components/BeforeAfter';
import Events from '@/components/Events';

import Process from '@/components/Process';
import ClientShowcase from '@/components/ClientShowcase';
import Testimonials from '@/components/Testimonials';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <>
      {/* Creative Initial Screen Loader */}
      <Loader />

      {/* Floating Background Glow Blobs */}
      <div className="bg-blobs-container">
        <div className="blob-1"></div>
        <div className="blob-2"></div>
        <div className="blob-3"></div>
      </div>

      {/* Main Page Layout */}
      <main>
        {/* Navigation & Hero Showcase (includes Trust Bar) */}
        <Hero />

        {/* Featured Work - Portfolio First Gallery */}
        <Portfolio />

        {/* Signature Events Showcase */}
        <Events />


        {/* Before / After Transformation Slider */}
        <BeforeAfter />

        {/* Concept to Installation workflow timeline */}
        <Process />

        {/* Infinite Scrolling Client Marquee */}
        <ClientShowcase />

        {/* What Our Clients Say (Google Reviews Grid) */}
        <Testimonials />

        {/* Contact and Quote Request Forms */}
        <Contact />
      </main>

      {/* Footer Details */}
      <Footer />
    </>
  );
}
