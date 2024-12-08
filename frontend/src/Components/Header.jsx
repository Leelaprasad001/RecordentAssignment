import React, { useState } from 'react';
import { Link } from "react-router";
import { ChevronDown, AlignRight, X } from 'lucide-react';
import { useAuth } from '../Utils/AuthContext';

const Header = () => {
  const [aboutCompanyOpen, setAboutCompanyOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { auth, logout } = useAuth(); 

  return (
    <header className="sticky top-0 z-50 px-0 md:px-8 py-2 shadow-lg bg-neutral-100">
      <div className="container mx-auto flex justify-between items-center">
        <div className="font-bold text-xl px-2">
          <img
            src="./logo.png"
            alt="Logo"
            className="w-full h-[50px] object-cover rounded-lg"
          />
        </div>
        <div className="hidden md:flex items-center space-x-8 text-custom-blue">
          <Link href="/" className="font-xl">Dashboard</Link>
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
                    <Link href="/company/overview" className="block px-4 py-2">Overview</Link>
                  </li>
                  <li>
                    <Link href="/company/mission" className="block px-4 py-2">Mission</Link>
                  </li>
                  <li>
                    <Link href="/company/team" className="block px-4 py-2">Our Team</Link>
                  </li>
                </ul>
              </div>
            )}
          </div>
          <Link href="/" className="font-xl">Pricing</Link>
          <Link href="/contact" className="font-xl">Contact</Link>
          <div className="block space-y-4 font-xl space-x-2">
            {auth && ( 
              <button
                onClick={logout}
                className="px-6 py-2 border border-custom-orange bg-custom-orange text-neutral-100 rounded-3xl hover:bg-white hover:text-custom-orange"
              >
                Logout
              </button>
            )}
          </div>
        </div>


        <div className="md:hidden flex items-center space-x-4 px-2">
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <AlignRight className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden bg-white shadow-lg rounded-lg mt-2 p-4 space-y-4 flex flex-col items-center">
          <Link href="/" className="block font-xl">Dashboard</Link>        
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
                    <Link href="/company/overview" className="block px-4 py-2">Overview</Link>
                  </li>
                  <li>
                    <Link href="/company/mission" className="block px-4 py-2">Mission</Link>
                  </li>
                  <li>
                    <Link href="/company/team" className="block px-4 py-2">Our Team</Link>
                  </li>
                </ul>
              </div>
            )}
          </div>
          <Link href="/" className="block font-xl">Pricing</Link>
          <Link href="/contact" className="block font-xl space-x-1">Contact</Link>
          <div className="block space-y-4 font-xl space-x-2">
            {auth && ( 
              <button
                onClick={logout}
                className="px-6 py-2 border border-custom-orange bg-custom-orange text-neutral-100 rounded-3xl hover:bg-white hover:text-custom-orange"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
