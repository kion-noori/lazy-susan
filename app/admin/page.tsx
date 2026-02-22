'use client';

import { useState, useEffect } from 'react';
import { Restaurant } from '@/lib/types';

export default function AdminPage() {
  const [password, setPassword] = useState('');
  const [authenticated, setAuthenticated] = useState(false);
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [viewStatus, setViewStatus] = useState<'pending' | 'approved'>('pending');

  async function fetchRestaurants(pw: string, status: 'pending' | 'approved') {
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`/api/admin?status=${status}`, {
        headers: { 'x-admin-password': pw },
      });

      if (res.status === 401) {
        setAuthenticated(false);
        setError('Wrong password.');
        return;
      }

      if (!res.ok) {
        throw new Error('Failed to fetch');
      }

      const data = await res.json();
      setRestaurants(data);
      setAuthenticated(true);
    } catch {
      setError('Something went wrong. Check your connection.');
    } finally {
      setLoading(false);
    }
  }

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    fetchRestaurants(password, viewStatus);
  }

  useEffect(() => {
    if (authenticated) {
      fetchRestaurants(password, viewStatus);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [viewStatus]);

  async function handleAction(id: string, action: 'approve' | 'reject') {
    try {
      const res = await fetch('/api/admin', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-password': password,
        },
        body: JSON.stringify({ id, action }),
      });

      if (!res.ok) throw new Error('Failed');

      // Remove from list
      setRestaurants((prev) => prev.filter((r) => r.id !== id));
    } catch {
      setError('Failed to update restaurant.');
    }
  }

  if (!authenticated) {
    return (
      <div className="bg-cream min-h-screen flex items-center justify-center px-4">
        <div className="max-w-sm w-full">
          <h1 className="font-serif text-2xl font-bold text-charcoal mb-2 text-center">
            Admin
          </h1>
          <p className="text-warm-gray text-sm text-center mb-6">
            Enter the admin password to manage submissions.
          </p>
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full px-4 py-2.5 rounded-xl border border-cream-dark bg-white text-charcoal text-sm focus:outline-none focus:ring-2 focus:ring-terracotta/30 focus:border-terracotta"
            />
            {error && (
              <p className="text-red-600 text-sm">{error}</p>
            )}
            <button
              type="submit"
              className="w-full bg-charcoal text-white py-2.5 rounded-full text-sm font-medium hover:bg-charcoal/90 transition-colors"
            >
              Sign In
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-cream min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-serif text-3xl font-bold text-charcoal">
              Admin Dashboard
            </h1>
            <p className="text-warm-gray text-sm mt-1">
              Review and manage restaurant submissions.
            </p>
          </div>
          <button
            onClick={() => {
              setAuthenticated(false);
              setPassword('');
            }}
            className="text-warm-gray text-sm hover:text-terracotta transition-colors"
          >
            Sign out
          </button>
        </div>

        {/* Status Toggle */}
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setViewStatus('pending')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              viewStatus === 'pending'
                ? 'bg-terracotta text-white'
                : 'bg-cream-dark text-warm-gray hover:text-charcoal'
            }`}
          >
            Pending Review
          </button>
          <button
            onClick={() => setViewStatus('approved')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              viewStatus === 'approved'
                ? 'bg-forest text-white'
                : 'bg-cream-dark text-warm-gray hover:text-charcoal'
            }`}
          >
            Approved
          </button>
        </div>

        {error && (
          <div className="bg-red-50 text-red-700 rounded-xl p-4 text-sm mb-6">
            {error}
          </div>
        )}

        {loading ? (
          <div className="text-center py-16">
            <div className="w-8 h-8 border-2 border-terracotta border-t-transparent rounded-full animate-spin mx-auto"></div>
            <p className="text-warm-gray mt-4">Loading...</p>
          </div>
        ) : restaurants.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-warm-gray-light font-serif text-xl">
              {viewStatus === 'pending'
                ? 'No pending submissions'
                : 'No approved restaurants yet'}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {restaurants.map((restaurant) => (
              <div
                key={restaurant.id}
                className="bg-white rounded-2xl border border-cream-dark/50 p-5 sm:p-6"
              >
                <div className="flex flex-col sm:flex-row gap-4">
                  {/* Photo */}
                  {restaurant.photo_urls && restaurant.photo_urls.length > 0 ? (
                    <div className="w-full sm:w-32 h-32 rounded-xl overflow-hidden flex-shrink-0">
                      <img
                        src={restaurant.photo_urls[0]}
                        alt={restaurant.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ) : (
                    <div className="w-full sm:w-32 h-32 rounded-xl bg-cream-dark flex items-center justify-center flex-shrink-0">
                      <span className="text-warm-gray-light text-xs">No photo</span>
                    </div>
                  )}

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap gap-2 mb-1">
                      <span className="bg-forest/10 text-forest text-xs font-semibold px-2 py-0.5 rounded-full">
                        {restaurant.neighborhood}, {restaurant.borough}
                      </span>
                      <span className="bg-cream-dark text-warm-gray text-xs font-semibold px-2 py-0.5 rounded-full">
                        {restaurant.cuisine_type}
                      </span>
                      {restaurant.needs_support && (
                        <span className="bg-terracotta/10 text-terracotta text-xs font-semibold px-2 py-0.5 rounded-full">
                          Needs Support
                        </span>
                      )}
                    </div>

                    <h3 className="font-serif text-lg font-semibold text-charcoal">
                      {restaurant.name}
                    </h3>
                    <p className="text-warm-gray text-xs mt-0.5">
                      {restaurant.address}
                    </p>

                    <p className="text-warm-gray text-sm mt-2 line-clamp-2">
                      {restaurant.description}
                    </p>

                    {restaurant.why_support && (
                      <p className="text-terracotta text-sm mt-2 italic line-clamp-1">
                        &ldquo;{restaurant.why_support}&rdquo;
                      </p>
                    )}

                    <div className="flex items-center gap-3 mt-3 text-xs text-warm-gray-light">
                      {restaurant.submitted_by && (
                        <span>Submitted by {restaurant.submitted_by}</span>
                      )}
                      <span>
                        {new Date(restaurant.created_at).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                {viewStatus === 'pending' && (
                  <div className="flex gap-2 mt-4 pt-4 border-t border-cream-dark/50">
                    <button
                      onClick={() => handleAction(restaurant.id, 'approve')}
                      className="bg-forest text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-forest-light transition-colors"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleAction(restaurant.id, 'reject')}
                      className="bg-white text-red-600 border border-red-200 px-5 py-2 rounded-full text-sm font-medium hover:bg-red-50 transition-colors"
                    >
                      Reject
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
