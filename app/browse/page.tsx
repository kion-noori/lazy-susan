'use client';

import { useState, useEffect, useRef } from 'react';
import RestaurantCard from '@/components/RestaurantCard';
import NeighborhoodFilter from '@/components/NeighborhoodFilter';
import { Restaurant, CUISINE_TYPES } from '@/lib/types';
import { SEED_RESTAURANTS } from '@/lib/seed-data';

function getSeedAsRestaurants(): Restaurant[] {
  return SEED_RESTAURANTS.map((r, i) => ({
    ...r,
    id: `seed-${i}`,
    created_at: new Date().toISOString(),
  })) as Restaurant[];
}

function sortByNeedsSupport(restaurants: Restaurant[]): Restaurant[] {
  return [...restaurants].sort((a, b) => {
    if (a.needs_support && !b.needs_support) return -1;
    if (!a.needs_support && b.needs_support) return 1;
    return 0;
  });
}

export default function BrowsePage() {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedBorough, setSelectedBorough] = useState('');
  const [selectedNeighborhood, setSelectedNeighborhood] = useState('');
  const [selectedCuisine, setSelectedCuisine] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Debounce search input
  useEffect(() => {
    if (debounceTimer.current) clearTimeout(debounceTimer.current);
    debounceTimer.current = setTimeout(() => {
      setDebouncedSearch(searchQuery);
    }, 300);
    return () => {
      if (debounceTimer.current) clearTimeout(debounceTimer.current);
    };
  }, [searchQuery]);

  useEffect(() => {
    async function fetchRestaurants() {
      setLoading(true);
      let useSupabase = false;
      try {
        // Try Supabase first
        const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
        if (supabaseUrl && supabaseUrl !== 'your-supabase-url-here') {
          const { supabase } = await import('@/lib/supabase');
          let query = supabase
            .from('restaurants')
            .select('*')
            .eq('status', 'approved')
            .order('needs_support', { ascending: false })
            .order('created_at', { ascending: false });

          if (selectedBorough) query = query.eq('borough', selectedBorough);
          if (selectedNeighborhood) query = query.eq('neighborhood', selectedNeighborhood);
          if (selectedCuisine) query = query.eq('cuisine_type', selectedCuisine);
          if (debouncedSearch) {
            query = query.or(
              `name.ilike.%${debouncedSearch}%,description.ilike.%${debouncedSearch}%`
            );
          }

          const { data, error } = await query;
          if (!error && data) {
            useSupabase = true;
            setRestaurants(data as Restaurant[]);
            return;
          }
        }
      } catch {
        // Fall through to seed data
      }

      if (!useSupabase) {
        // Fall back to seed data with client-side filtering
        let filtered = getSeedAsRestaurants();
        if (selectedBorough) {
          filtered = filtered.filter((r) => r.borough === selectedBorough);
        }
        if (selectedNeighborhood) {
          filtered = filtered.filter((r) => r.neighborhood === selectedNeighborhood);
        }
        if (selectedCuisine) {
          filtered = filtered.filter((r) => r.cuisine_type === selectedCuisine);
        }
        if (debouncedSearch) {
          const q = debouncedSearch.toLowerCase();
          filtered = filtered.filter(
            (r) =>
              r.name.toLowerCase().includes(q) ||
              r.description.toLowerCase().includes(q)
          );
        }
        setRestaurants(sortByNeedsSupport(filtered));
      }

      setLoading(false);
    }

    fetchRestaurants();
  }, [selectedBorough, selectedNeighborhood, selectedCuisine, debouncedSearch]);

  return (
    <div className="bg-cream min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-charcoal">
            Browse Restaurants
          </h1>
          <p className="text-warm-gray mt-2">
            Discover family-owned spots in Brooklyn and Queens that need your support.
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl p-4 sm:p-6 mb-8 shadow-sm border border-cream-dark/50">
          <div className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Search by name or keyword..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-cream-dark bg-cream/50 text-charcoal text-sm focus:outline-none focus:ring-2 focus:ring-terracotta/30 focus:border-terracotta placeholder:text-warm-gray-light"
            />
            <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
              <NeighborhoodFilter
                selectedBorough={selectedBorough}
                selectedNeighborhood={selectedNeighborhood}
                onBoroughChange={setSelectedBorough}
                onNeighborhoodChange={setSelectedNeighborhood}
              />
              <select
                value={selectedCuisine}
                onChange={(e) => setSelectedCuisine(e.target.value)}
                className="px-4 py-2.5 rounded-xl border border-cream-dark bg-white text-charcoal font-medium text-sm focus:outline-none focus:ring-2 focus:ring-terracotta/30 focus:border-terracotta"
              >
                <option value="">All Cuisines</option>
                {CUISINE_TYPES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Results */}
        {loading ? (
          <div className="text-center py-16">
            <div className="w-8 h-8 border-2 border-terracotta border-t-transparent rounded-full animate-spin mx-auto"></div>
            <p className="text-warm-gray mt-4">Finding restaurants...</p>
          </div>
        ) : restaurants.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-warm-gray-light font-serif text-2xl mb-2">
              No restaurants found
            </p>
            <p className="text-warm-gray">
              Try adjusting your filters, or{' '}
              <a href="/submit" className="text-terracotta underline underline-offset-2">
                submit a restaurant
              </a>{' '}
              you think should be here.
            </p>
          </div>
        ) : (
          <>
            <p className="text-warm-gray text-sm mb-4">
              {restaurants.length} restaurant{restaurants.length !== 1 ? 's' : ''} found
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {restaurants.map((restaurant) => (
                <RestaurantCard key={restaurant.id} restaurant={restaurant} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
