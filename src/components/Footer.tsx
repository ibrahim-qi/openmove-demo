import Link from 'next/link';
import Image from 'next/image';
import { Home } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-primary-500 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Footer Content */}
        <div className="py-6">
          {/* Footer Links */}
          <div className="space-y-4 mb-6">
            <Link href="/about" className="block text-white text-sm hover:text-white/80 transition-colors">
              Who are yoomoove?
            </Link>
            <Link href="/terms" className="block text-white text-sm hover:text-white/80 transition-colors">
              Terms of Use
            </Link>
            <Link href="/privacy" className="block text-white text-sm hover:text-white/80 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/contact" className="block text-white text-sm hover:text-white/80 transition-colors">
              Insert page
            </Link>
          </div>

          {/* Bottom section with rights and logo */}
          <div className="flex items-end justify-between pt-6 border-t border-primary-400/40">
            <div className="text-white/90 text-xs font-medium">
              All rights reserved.
            </div>
            <div className="flex items-center group">
              <img
                src="/footer.png"
                alt="yoomoove - Property Search Platform"
                className="h-10 w-auto max-w-[140px] sm:h-11 sm:max-w-[160px] md:h-12 md:max-w-[180px] lg:h-13 lg:max-w-[200px] transition-all duration-300 group-hover:scale-105 group-hover:brightness-110"
                style={{ 
                  imageRendering: 'crisp-edges',
                  filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2))'
                }}
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
} 