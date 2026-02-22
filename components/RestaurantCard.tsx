import Link from 'next/link';
import { Restaurant } from '@/lib/types';

export default function RestaurantCard({ restaurant }: { restaurant: Restaurant }) {
  return (
    <Link
      href={`/restaurant/${restaurant.id}`}
      className="group block bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 border border-cream-dark/50"
    >
      <div className="aspect-[4/3] bg-cream-dark relative overflow-hidden">
        {restaurant.photo_urls && restaurant.photo_urls.length > 0 ? (
          <img
            src={restaurant.photo_urls[0]}
            alt={restaurant.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-warm-gray-light">
            <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
        )}
        <div className="absolute top-3 left-3">
          <span className="bg-forest text-white text-xs font-semibold px-3 py-1 rounded-full">
            {restaurant.neighborhood}
          </span>
        </div>
      </div>

      <div className="p-5">
        {restaurant.needs_support && (
          <p className="text-terracotta text-xs font-semibold uppercase tracking-wider mb-2">
            Needs support
          </p>
        )}
        <h3 className="font-serif text-xl font-semibold text-charcoal group-hover:text-terracotta transition-colors">
          {restaurant.name}
        </h3>
        <p className="text-warm-gray text-sm mt-1">{restaurant.cuisine_type}</p>
        {restaurant.why_support && (
          <p className="text-warm-gray-light text-sm mt-3 italic line-clamp-2 leading-relaxed">
            &ldquo;{restaurant.why_support}&rdquo;
          </p>
        )}
      </div>
    </Link>
  );
}
