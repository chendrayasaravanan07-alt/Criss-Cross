import React from "react";
import { Link2, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white">
      {/* Navbar */}
      <nav className="flex justify-between items-center px-10 py-6 border-b border-white/20">
        <div className="flex items-center gap-2 text-2xl font-semibold">
          <Link2 size={28} />
          <span>Criss-Cross</span>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center text-center px-6 mt-24">
        <h1 className="text-6xl md:text-7xl font-bold mb-6">
          Discover Your Next
        </h1>

        <div className="bg-white text-blue-600 px-8 py-4 rounded-2xl mb-8">
          <h2 className="text-5xl md:text-6xl font-bold">
            Hackathon Adventure
          </h2>
        </div>

        <p className="max-w-3xl text-lg md:text-xl text-white/90 mb-12">
          The centralized platform connecting students with amazing hackathons
          and empowering organizers to create unforgettable events
        </p>
        <Link to="/selection">
          <button className="flex items-center gap-2 bg-white text-blue-600 px-8 py-4 rounded-2xl text-lg font-medium hover:scale-105 transition duration-300">
            Explore Platform
            <ArrowRight size={20} />
          </button>
        </Link>
      </div>
    </div>
  );
};

export default LandingPage;
