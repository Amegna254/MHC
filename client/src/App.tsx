import Navbar from "./components/layout/Navbar";
import Hero from "./components/home/Hero";
import FeaturedArtwork from "./components/home/FeaturedArtwork";

function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Navigation */}
      <Navbar />

      {/* Main Content */}
      <main>
        <Hero />
        <FeaturedArtwork />
      </main>
    </div>
  );
}

export default App;