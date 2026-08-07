import Navbar from "../components/layout/Navbar";
import Hero from "../components/Home/Hero";

function Home() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Navbar />

      <main className="px-6 py-8">
        <Hero />
      </main>
    </div>
  );
}

export default Home;