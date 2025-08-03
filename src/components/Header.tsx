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
              yoomoove
            </Link>
          </div>

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

          {/* Mobile - Show hamburger menu */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-primary-500"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation - Just Sign In now */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t border-gray-100">
              <button className="flex items-center space-x-2 px-3 py-2 text-gray-700 hover:text-primary-500 w-full text-left">
                <User size={20} />
                <span>Sign In</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
} 