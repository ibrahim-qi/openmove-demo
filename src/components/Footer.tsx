import Link from 'next/link';
import { Home } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-primary-500 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Footer Content */}
        <div className="py-8">
          {/* Insert page links - matching Figma */}
          <div className="space-y-3 mb-8">
            <div className="text-white text-sm">Insert page</div>
            <div className="text-white text-sm">Insert page</div>
            <div className="text-white text-sm">Insert page</div>
            <div className="text-white text-sm">Insert page</div>
          </div>

          {/* Bottom section with logo and rights */}
          <div className="flex items-center justify-between pt-4 border-t border-primary-400">
            <div className="text-white text-sm">
              All rights reserved.
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                <Home className="w-4 h-4 text-primary-500" />
              </div>
              <span className="text-white text-sm font-medium">yoomoove</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
} 