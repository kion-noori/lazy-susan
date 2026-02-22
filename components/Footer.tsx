import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-charcoal text-cream">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-6">
            <Link href="/" className="font-serif text-lg font-bold text-terracotta-light">
              Lazy Susan
            </Link>
            <nav className="flex items-center gap-5">
              <Link href="/browse" className="text-cream-dark/70 hover:text-terracotta-light transition-colors text-sm">
                Browse
              </Link>
              <Link href="/submit" className="text-cream-dark/70 hover:text-terracotta-light transition-colors text-sm">
                Submit
              </Link>
              <Link href="/about" className="text-cream-dark/70 hover:text-terracotta-light transition-colors text-sm">
                About
              </Link>
              <a href="mailto:lazysusannyc@gmail.com" className="text-cream-dark/70 hover:text-terracotta-light transition-colors text-sm">
                Contact
              </a>
            </nav>
          </div>
          <p className="text-cream-dark/40 text-xs">
            Made with heart in Brooklyn &amp; Queens.
          </p>
        </div>
      </div>
    </footer>
  );
}
