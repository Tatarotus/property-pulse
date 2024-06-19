import Hero from "@/components/Hero";
import InfoBoxes from "@/components/InfoBoxes";
import Footer from "@/components/Footer";
import HomeProperties from "@/components/HomeProperties";

function HomePage() {
  console.log(process.env.MONGODB_URI);
  return (
    <main>
      <Hero />
      <InfoBoxes  />
      <HomeProperties />
      <Footer />
    </main>
  );
}

export default HomePage;
