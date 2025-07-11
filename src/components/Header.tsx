'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X, User } from 'lucide-react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold text-primary-500">
              openmove
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link 
              href="/" 
              className="text-gray-700 hover:text-primary-500 transition-colors font-medium"
            >
              Browse Properties
            </Link>
            <Link 
              href="/how-it-works" 
              className="text-gray-700 hover:text-primary-500 transition-colors font-medium"
            >
              How It Works
            </Link>
            <Link 
              href="/pricing" 
              className="text-gray-700 hover:text-primary-500 transition-colors font-medium"
            >
              Pricing
            </Link>
            <Link 
              href="/support" 
              className="text-gray-700 hover:text-primary-500 transition-colors font-medium"
            >
              Support
            </Link>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <button className="flex items-center space-x-2 text-gray-700 hover:text-primary-500 transition-colors">
              <User size={20} />
              <span>Sign In</span>
            </button>
            <Link 
              href="/list-property"
              className="bg-gradient-to-r from-primary-500 to-primary-700 text-white px-6 py-2 rounded-lg font-semibold hover:from-primary-600 hover:to-primary-800 transition-all duration-200 shadow-lg"
            >
              List Your Property
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-primary-500"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t border-gray-100">
              <Link 
                href="/" 
                className="block px-3 py-2 text-gray-700 hover:text-primary-500 font-medium"
              >
                Browse Properties
              </Link>
              <Link 
                href="/how-it-works" 
                className="block px-3 py-2 text-gray-700 hover:text-primary-500 font-medium"
              >
                How It Works
              </Link>
              <Link 
                href="/pricing" 
                className="block px-3 py-2 text-gray-700 hover:text-primary-500 font-medium"
              >
                Pricing
              </Link>
              <Link 
                href="/support" 
                className="block px-3 py-2 text-gray-700 hover:text-primary-500 font-medium"
              >
                Support
              </Link>
              <div className="pt-3 border-t border-gray-100">
                <button className="flex items-center space-x-2 px-3 py-2 text-gray-700 hover:text-primary-500 w-full text-left">
                  <User size={20} />
                  <span>Sign In</span>
                </button>
                <Link 
                  href="/list-property"
                  className="mt-2 mx-3 bg-gradient-to-r from-primary-500 to-primary-700 text-white px-6 py-2 rounded-lg font-semibold w-[calc(100%-1.5rem)] hover:from-primary-600 hover:to-primary-800 transition-all duration-200 block text-center"
                >
                  List Your Property
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
} 