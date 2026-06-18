import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/home/Hero";
import FeatureDuo from "@/components/home/FeatureDuo";
import CreationsGrid from "@/components/home/CreationsGrid";
import HeritageSplit from "@/components/home/HeritageSplit";
import CollectionBanner from "@/components/home/CollectionBanner";
import EngagementSplit from "@/components/home/EngagementSplit";
import InstagramSection from "@/components/home/InstagramSection";
import ServicesSection from "@/components/home/ServicesSection";
import BoutiqueSection from "@/components/home/BoutiqueSection";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <FeatureDuo />
        <CreationsGrid />
        <HeritageSplit />
        <CollectionBanner />
        <EngagementSplit />
        <InstagramSection />
        <ServicesSection />
        <BoutiqueSection />
      </main>
      <Footer />
    </>
  );
}
