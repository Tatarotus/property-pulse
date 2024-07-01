import Hero from "@/components/Hero";
import InfoBoxes from "@/components/InfoBoxes";
import Footer from "@/components/Footer";
import HomeProperties from "@/components/HomeProperties";
import FeaturedProperties from "@/components/FeaturedProperties";

function HomePage() {
  return (
    <main>
      <Hero />
      <InfoBoxes />
      <FeaturedProperties />
      <HomeProperties />
      <Footer />
    </main>
  );
}

export default HomePage;
