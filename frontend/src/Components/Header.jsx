import React, { useState } from 'react';
import { ChevronDown, AlignRight, X } from 'lucide-react';

const Header = () => {
  const [aboutCompanyOpen, setAboutCompanyOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 px-0 md:px-8 py-2 shadow-lg bg-neutral-100">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="font-bold text-xl px-2">
          <img
            src="./logo.png"
            alt="Logo"
            className="w-full h-[50px] object-cover rounded-lg"
          />
        </div>
        <div className="hidden md:flex space-x-8 text-custom-blue">
          <a href="/" className="font-xl">Dashboard</a>
          <div
            className="relative"
            onMouseEnter={() => setAboutCompanyOpen(true)}
            onMouseLeave={() => setAboutCompanyOpen(false)}
          >
            <button className="flex items-center space-x-1 font-xl">
              <span>Company</span>
              <ChevronDown className="w-4 h-4" />
            </button>
            {aboutCompanyOpen && (
              <div className="absolute left-0 mt-2 w-48 bg-white shadow-lg rounded-lg font-xl">
                <ul>
                  <li>
                    <a href="/company/overview" className="block px-4 py-2">Overview</a>
                  </li>
                  <li>
                    <a href="/company/mission" className="block px-4 py-2">Mission</a>
                  </li>
                  <li>
                    <a href="/company/team" className="block px-4 py-2">Our Team</a>
                  </li>
                </ul>
              </div>
            )}
          </div>
          <a href="/" className="font-xl">Pricing</a>
          <a href="/contact" className="font-xl">Contact</a>
        </div>


        <div className="md:hidden flex items-center space-x-4 px-2">
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <AlignRight className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden bg-white shadow-lg rounded-lg mt-2 p-4 space-y-4 flex flex-col items-center">
          <a href="/" className="block font-xl">Dashboard</a>        
          <div className="relative">
            <button
              onClick={() => setAboutCompanyOpen(!aboutCompanyOpen)}
              className="flex items-center space-x-1 font-xl"
            >
              <span>Company</span>
              <ChevronDown className="w-4 h-4" />
            </button>
            {aboutCompanyOpen && (
              <div className="absolute left-0 mt-2 w-48 bg-white shadow-lg rounded-lg font-xl">
                <ul>
                  <li>
                    <a href="/company/overview" className="block px-4 py-2">Overview</a>
                  </li>
                  <li>
                    <a href="/company/mission" className="block px-4 py-2">Mission</a>
                  </li>
                  <li>
                    <a href="/company/team" className="block px-4 py-2">Our Team</a>
                  </li>
                </ul>
              </div>
            )}
          </div>
          <a href="/" className="block font-xl">Pricing</a>
          <a href="/contact" className="block font-xl space-x-1">Contact</a>
          <div className="block space-y-4 font-xl space-x-2">
            <a href="/signin" className="px-6 py-2 border border-custom-blue bg-custom-blue text-neutral-100 rounded-3xl hover:bg-white hover:text-custom-blue">Sign In</a>
            <a href="/signup" className="px-6 py-2 border border-custom-orange bg-custom-orange text-neutral-100 rounded-3xl hover:bg-white hover:text-custom-orange">Sign Up</a>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
