import Header from "../components/landing/Header.jsx";
import Hero from "../components/landing/Hero.jsx";
import Features from "../components/landing/Features.jsx";
import GridFlowPreview from "../components/landing/GridFlowPreview.jsx";
import HowItWorks from "../components/landing/HowItWorks.jsx";
import ImpactTracker from "../components/landing/ImpactTracker.jsx";
import FAQ from "../components/landing/FAQ.jsx";
import Footer from "../components/landing/Footer.jsx";

export default function Landing() {
  return (
    <div className="min-h-screen bg-slate-50/50 font-body text-slate-800 antialiased selection:bg-emerald-500 selection:text-white">
      <Header />
      <main>
        <Hero />
        <Features />
        <GridFlowPreview />
        <HowItWorks />
        <ImpactTracker />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
}
