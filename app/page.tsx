import Link from 'next/link';
import RestaurantCard from '@/components/RestaurantCard';
import { Restaurant } from '@/lib/types';
import { SEED_RESTAURANTS } from '@/lib/seed-data';

async function getFeaturedRestaurants(): Promise<Restaurant[]> {
  // Try Supabase first, fall back to seed data
  try {
    if (
      process.env.NEXT_PUBLIC_SUPABASE_URL &&
      process.env.NEXT_PUBLIC_SUPABASE_URL !== 'your-supabase-url-here'
    ) {
      const { supabase } = await import('@/lib/supabase');
      const { data, error } = await supabase
        .from('restaurants')
        .select('*')
        .eq('status', 'approved')
        .order('needs_support', { ascending: false })
        .order('created_at', { ascending: false })
        .limit(6);

      if (!error && data && data.length > 0) {
        return data as Restaurant[];
      }
    }
  } catch {
    // Fall through to seed data
  }

  // Return seed data as fallback
  return SEED_RESTAURANTS.slice(0, 6).map((r, i) => ({
    ...r,
    id: `seed-${i}`,
    created_at: new Date().toISOString(),
  })) as Restaurant[];
}

export default async function Home() {
  const featured = await getFeaturedRestaurants();

  return (
    <div className="bg-cream">
      {/* Hero Section */}
      <section className="pt-16 sm:pt-24 pb-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-charcoal leading-tight">
            Every neighborhood has a restaurant{' '}
            <span className="text-terracotta italic">worth saving.</span>
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-warm-gray max-w-2xl mx-auto leading-relaxed">
            Family-owned restaurants are the soul of our neighborhoods. But too
            many are struggling — not because the food isn&apos;t incredible,
            but because nobody knows they&apos;re there. Until now.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/browse"
              className="bg-terracotta text-white px-8 py-3 rounded-full text-lg font-medium hover:bg-terracotta-dark transition-colors"
            >
              Find a Restaurant
            </Link>
            <Link
              href="/submit"
              className="border-2 border-terracotta text-terracotta px-8 py-3 rounded-full text-lg font-medium hover:bg-terracotta hover:text-white transition-colors"
            >
              Submit a Spot You Love
            </Link>
          </div>
        </div>
      </section>

      {/* Bridge */}
      <section className="py-12 px-4">
        <div className="max-w-xl mx-auto text-center">
          <p className="font-serif text-xl sm:text-2xl text-charcoal leading-relaxed">
            Someone told us about them. We wrote down their story.
            Now all they need is{' '}
            <span className="text-terracotta italic">you walking through the door.</span>
          </p>
        </div>
      </section>

      {/* Featured Restaurants */}
      {featured.length > 0 && (
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="font-serif text-3xl font-bold text-charcoal">
                Restaurants That Need You
              </h2>
              <p className="text-warm-gray mt-2">
                These spots are the real deal. They just need more people to know about them.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {featured.map((restaurant) => (
                <RestaurantCard key={restaurant.id} restaurant={restaurant} />
              ))}
            </div>
            <div className="text-center mt-10">
              <Link
                href="/browse"
                className="text-terracotta font-medium hover:text-terracotta-dark transition-colors underline underline-offset-4"
              >
                Browse all restaurants &rarr;
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto text-center bg-forest rounded-3xl p-10 sm:p-14">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white mb-4">
            Know a spot that deserves a chance?
          </h2>
          <p className="text-sage text-lg mb-8 leading-relaxed">
            If there&apos;s a family restaurant in your neighborhood that&apos;s
            struggling to get noticed, put it on the map. You might be the
            reason they stay open.
          </p>
          <Link
            href="/submit"
            className="bg-terracotta text-white px-8 py-3 rounded-full text-lg font-medium hover:bg-terracotta-light transition-colors inline-block"
          >
            Submit a Restaurant
          </Link>
        </div>
      </section>
    </div>
  );
}
