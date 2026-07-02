import Navbar from "../components/layout/Navbar";
import Hero from "../components/home/Hero";
import FeaturedArtwork from "../components/home/FeaturedArtwork";

function Home() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Navbar />

      <main>
        <Hero />
        <FeaturedArtwork />
      </main>
    </div>
  );
}

export default Home;