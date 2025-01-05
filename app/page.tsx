import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import HowItWorks from "./components/HowItWorks";
import Campaigns from "./components/Campaigns";
import Footer from "./components/Footer";
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <Navbar />
      <Hero />
      <HowItWorks />
      <Campaigns />
      <Footer />
    </main>
  );
}
