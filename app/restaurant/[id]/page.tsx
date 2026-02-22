import Link from 'next/link';
import { Restaurant } from '@/lib/types';
import { SEED_RESTAURANTS } from '@/lib/seed-data';
import { notFound } from 'next/navigation';

async function getRestaurant(id: string): Promise<Restaurant | null> {
  // Try Supabase first
  try {
    if (
      process.env.NEXT_PUBLIC_SUPABASE_URL &&
      process.env.NEXT_PUBLIC_SUPABASE_URL !== 'your-supabase-url-here'
    ) {
      const { supabase } = await import('@/lib/supabase');
      const { data, error } = await supabase
        .from('restaurants')
        .select('*')
        .eq('id', id)
        .eq('status', 'approved')
        .single();

      if (!error && data) return data as Restaurant;
    }
  } catch {
    // Fall through to seed data
  }

  // Check seed data
  if (id.startsWith('seed-')) {
    const index = parseInt(id.replace('seed-', ''), 10);
    const seed = SEED_RESTAURANTS[index];
    if (seed) {
      return {
        ...seed,
        id,
        created_at: new Date().toISOString(),
      } as Restaurant;
    }
  }

  return null;
}

export default async function RestaurantPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const restaurant = await getRestaurant(id);

  if (!restaurant) {
    notFound();
  }

  return (
    <div className="bg-cream min-h-screen">
      {/* Hero Image */}
      <div className="w-full h-64 sm:h-80 md:h-96 bg-cream-dark relative">
        {restaurant.photo_urls && restaurant.photo_urls.length > 0 ? (
          <img
            src={restaurant.photo_urls[0]}
            alt={restaurant.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-warm-gray-light">
            <svg className="w-24 h-24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
        )}
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Breadcrumb */}
        <div className="mb-6">
          <Link
            href="/browse"
            className="text-terracotta text-sm hover:text-terracotta-dark transition-colors"
          >
            &larr; Back to all restaurants
          </Link>
        </div>

        {/* Restaurant Info */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2 mb-3">
            <span className="bg-forest text-white text-xs font-semibold px-3 py-1 rounded-full">
              {restaurant.neighborhood}
            </span>
            <span className="bg-cream-dark text-warm-gray text-xs font-semibold px-3 py-1 rounded-full">
              {restaurant.cuisine_type}
            </span>
            <span className="bg-cream-dark text-warm-gray text-xs font-semibold px-3 py-1 rounded-full">
              {restaurant.borough}
            </span>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-charcoal leading-tight">
            {restaurant.name}
          </h1>

          <p className="text-warm-gray mt-3 flex items-center gap-1.5">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {restaurant.address}
          </p>
        </div>

        {/* Why Support */}
        {restaurant.why_support && (
          <div className="bg-terracotta/5 border-l-4 border-terracotta rounded-r-xl p-5 mb-8">
            <p className="text-sm font-semibold text-terracotta uppercase tracking-wider mb-1">
              Why this spot needs you
            </p>
            <p className="text-charcoal leading-relaxed italic">
              &ldquo;{restaurant.why_support}&rdquo;
            </p>
          </div>
        )}

        {/* Story */}
        <div className="prose prose-lg max-w-none mb-10">
          <div className="text-warm-gray leading-relaxed whitespace-pre-wrap text-base sm:text-lg">
            {restaurant.description}
          </div>
        </div>

        {/* Photo Gallery */}
        {restaurant.photo_urls && restaurant.photo_urls.length > 1 && (
          <div className="mb-10">
            <h2 className="font-serif text-2xl font-semibold text-charcoal mb-4">
              Photos
            </h2>
            <div className="grid grid-cols-2 gap-3">
              {restaurant.photo_urls.slice(1).map((url, i) => (
                <div key={i} className="aspect-square rounded-xl overflow-hidden bg-cream-dark">
                  <img
                    src={url}
                    alt={`${restaurant.name} photo ${i + 2}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Submitted by */}
        {restaurant.submitted_by && (
          <p className="text-warm-gray-light text-sm italic">
            Submitted by {restaurant.submitted_by}
          </p>
        )}

        {/* Owner CTA */}
        <div className="mt-10 bg-cream-dark rounded-2xl p-6 text-center">
          <p className="font-serif text-xl font-semibold text-charcoal mb-2">
            Is this your restaurant?
          </p>
          <p className="text-warm-gray text-sm mb-4">
            We&apos;d love to hear from you. Reach out and we&apos;ll help you
            update your info, add photos, and tell your story in your own words.
          </p>
          <a
            href="mailto:lazysusannyc@gmail.com?subject=I%20own%20this%20restaurant%20-%20{encodeURIComponent(restaurant.name)}"
            className="bg-forest text-white px-6 py-2.5 rounded-full text-sm font-medium hover:bg-forest-light transition-colors inline-block"
          >
            Get in Touch
          </a>
        </div>
      </div>
    </div>
  );
}
