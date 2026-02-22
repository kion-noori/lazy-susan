'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-cream border-b border-cream-dark">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center gap-2">
            <span className="font-serif text-2xl font-bold text-terracotta">
              Lazy Susan
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              href="/browse"
              className="text-warm-gray hover:text-terracotta transition-colors font-medium"
            >
              Browse
            </Link>
            <Link
              href="/about"
              className="text-warm-gray hover:text-terracotta transition-colors font-medium"
            >
              About
            </Link>
            <Link
              href="/submit"
              className="bg-terracotta text-white px-5 py-2 rounded-full hover:bg-terracotta-dark transition-colors font-medium"
            >
              Submit a Restaurant
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 text-warm-gray"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div className="md:hidden pb-4 border-t border-cream-dark pt-4 flex flex-col gap-4">
            <Link
              href="/browse"
              className="text-warm-gray hover:text-terracotta transition-colors font-medium"
              onClick={() => setIsOpen(false)}
            >
              Browse
            </Link>
            <Link
              href="/about"
              className="text-warm-gray hover:text-terracotta transition-colors font-medium"
              onClick={() => setIsOpen(false)}
            >
              About
            </Link>
            <Link
              href="/submit"
              className="bg-terracotta text-white px-5 py-2 rounded-full hover:bg-terracotta-dark transition-colors font-medium text-center"
              onClick={() => setIsOpen(false)}
            >
              Submit a Restaurant
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
