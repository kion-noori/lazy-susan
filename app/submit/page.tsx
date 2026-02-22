'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { BOROUGHS, NEIGHBORHOODS, CUISINE_TYPES } from '@/lib/types';

export default function SubmitPage() {
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    borough: '',
    neighborhood: '',
    cuisine_type: '',
    description: '',
    why_support: '',
    submitted_by: '',
    needs_support: false,
  });
  const [photos, setPhotos] = useState<File[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const neighborhoods = formData.borough
    ? NEIGHBORHOODS[formData.borough] || []
    : [];

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    const { name, value } = e.target;
    setFormData((prev) => {
      if (name === 'borough') {
        return { ...prev, borough: value, neighborhood: '' };
      }
      return { ...prev, [name]: value };
    });
  }

  function handlePhotoChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files) {
      setPhotos(Array.from(e.target.files).slice(0, 5));
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError('');

    try {
      // Upload photos
      const photoUrls: string[] = [];
      for (const photo of photos) {
        const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}-${photo.name}`;
        const { error: uploadError } = await supabase.storage
          .from('photos')
          .upload(fileName, photo);

        if (uploadError) throw uploadError;

        const { data: urlData } = supabase.storage
          .from('photos')
          .getPublicUrl(fileName);

        photoUrls.push(urlData.publicUrl);
      }

      // Insert restaurant
      const { error: insertError } = await supabase
        .from('restaurants')
        .insert({
          ...formData,
          photo_urls: photoUrls,
          status: 'pending',
        });

      if (insertError) throw insertError;

      setSubmitted(true);
    } catch (err) {
      console.error('Submission error:', err);
      setError(
        'Something went wrong submitting your restaurant. Please try again.'
      );
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div className="bg-cream min-h-screen flex items-center justify-center px-4">
        <div className="max-w-md text-center">
          <div className="w-16 h-16 bg-forest/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-forest" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="font-serif text-3xl font-bold text-charcoal mb-3">
            Thank you!
          </h1>
          <p className="text-warm-gray leading-relaxed mb-6">
            Your submission has been received. We&apos;ll review it and get this
            restaurant on the map soon. You might just be the reason they stay open.
          </p>
          <a
            href="/browse"
            className="text-terracotta font-medium hover:text-terracotta-dark transition-colors underline underline-offset-4"
          >
            Browse restaurants &rarr;
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-cream min-h-screen">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="mb-8">
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-charcoal">
            Submit a Restaurant
          </h1>
          <p className="text-warm-gray mt-2 leading-relaxed">
            Know a family-owned restaurant that&apos;s struggling to get
            noticed? Put it on the map. This platform is for the spots that
            need visibility the most — the ones that might not make it
            without a little help from their community.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Restaurant Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-semibold text-charcoal mb-1.5">
              Restaurant Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g. Mama Rosa's Kitchen"
              className="w-full px-4 py-2.5 rounded-xl border border-cream-dark bg-white text-charcoal text-sm focus:outline-none focus:ring-2 focus:ring-terracotta/30 focus:border-terracotta placeholder:text-warm-gray-light"
            />
          </div>

          {/* Address */}
          <div>
            <label htmlFor="address" className="block text-sm font-semibold text-charcoal mb-1.5">
              Address *
            </label>
            <input
              type="text"
              id="address"
              name="address"
              required
              value={formData.address}
              onChange={handleChange}
              placeholder="e.g. 1234 Myrtle Ave, Brooklyn, NY"
              className="w-full px-4 py-2.5 rounded-xl border border-cream-dark bg-white text-charcoal text-sm focus:outline-none focus:ring-2 focus:ring-terracotta/30 focus:border-terracotta placeholder:text-warm-gray-light"
            />
          </div>

          {/* Borough & Neighborhood */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="borough" className="block text-sm font-semibold text-charcoal mb-1.5">
                Borough *
              </label>
              <select
                id="borough"
                name="borough"
                required
                value={formData.borough}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-xl border border-cream-dark bg-white text-charcoal text-sm focus:outline-none focus:ring-2 focus:ring-terracotta/30 focus:border-terracotta"
              >
                <option value="">Select borough</option>
                {BOROUGHS.map((b) => (
                  <option key={b} value={b}>{b}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="neighborhood" className="block text-sm font-semibold text-charcoal mb-1.5">
                Neighborhood *
              </label>
              <select
                id="neighborhood"
                name="neighborhood"
                required
                value={formData.neighborhood}
                onChange={handleChange}
                disabled={!formData.borough}
                className="w-full px-4 py-2.5 rounded-xl border border-cream-dark bg-white text-charcoal text-sm focus:outline-none focus:ring-2 focus:ring-terracotta/30 focus:border-terracotta disabled:opacity-50"
              >
                <option value="">Select neighborhood</option>
                {neighborhoods.map((n) => (
                  <option key={n} value={n}>{n}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Cuisine Type */}
          <div>
            <label htmlFor="cuisine_type" className="block text-sm font-semibold text-charcoal mb-1.5">
              Cuisine Type *
            </label>
            <select
              id="cuisine_type"
              name="cuisine_type"
              required
              value={formData.cuisine_type}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-xl border border-cream-dark bg-white text-charcoal text-sm focus:outline-none focus:ring-2 focus:ring-terracotta/30 focus:border-terracotta"
            >
              <option value="">Select cuisine type</option>
              {CUISINE_TYPES.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          {/* Description / Story */}
          <div>
            <label htmlFor="description" className="block text-sm font-semibold text-charcoal mb-1.5">
              Tell us about this place *
            </label>
            <p className="text-warm-gray-light text-xs mb-2">
              What makes it special? What&apos;s the vibe like? What should someone order?
            </p>
            <textarea
              id="description"
              name="description"
              required
              rows={5}
              value={formData.description}
              onChange={handleChange}
              placeholder="This Dominican spot has been run by the same family since 1993..."
              className="w-full px-4 py-2.5 rounded-xl border border-cream-dark bg-white text-charcoal text-sm focus:outline-none focus:ring-2 focus:ring-terracotta/30 focus:border-terracotta placeholder:text-warm-gray-light resize-none"
            />
          </div>

          {/* Why Support */}
          <div>
            <label htmlFor="why_support" className="block text-sm font-semibold text-charcoal mb-1.5">
              Why does this restaurant need support right now? *
            </label>
            <p className="text-warm-gray-light text-xs mb-2">
              Are they struggling with foot traffic? In danger of closing? Been overlooked for years?
            </p>
            <textarea
              id="why_support"
              name="why_support"
              required
              rows={3}
              value={formData.why_support}
              onChange={handleChange}
              placeholder="They've been on this corner for 20 years but the block has changed and nobody new knows they're here..."
              className="w-full px-4 py-2.5 rounded-xl border border-cream-dark bg-white text-charcoal text-sm focus:outline-none focus:ring-2 focus:ring-terracotta/30 focus:border-terracotta placeholder:text-warm-gray-light resize-none"
            />
          </div>

          {/* Needs Support Checkbox */}
          <div className="bg-terracotta/5 border border-terracotta/20 rounded-xl p-4">
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.needs_support}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, needs_support: e.target.checked }))
                }
                className="mt-1 w-4 h-4 rounded border-terracotta/30 text-terracotta focus:ring-terracotta/30"
              />
              <div>
                <span className="text-sm font-semibold text-charcoal">
                  This restaurant is struggling and needs more customers
                </span>
                <p className="text-warm-gray-light text-xs mt-0.5">
                  Check this if the restaurant is at risk, has empty tables, or is in danger of closing. We&apos;ll make sure it gets extra visibility.
                </p>
              </div>
            </label>
          </div>

          {/* Photos */}
          <div>
            <label htmlFor="photos" className="block text-sm font-semibold text-charcoal mb-1.5">
              Photos
            </label>
            <p className="text-warm-gray-light text-xs mb-2">
              Upload up to 5 photos — the food, the storefront, the people behind the counter.
            </p>
            <input
              type="file"
              id="photos"
              accept="image/*"
              multiple
              onChange={handlePhotoChange}
              className="w-full text-sm text-warm-gray file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-medium file:bg-terracotta/10 file:text-terracotta hover:file:bg-terracotta/20 file:cursor-pointer"
            />
            {photos.length > 0 && (
              <p className="text-warm-gray-light text-xs mt-1">
                {photos.length} photo{photos.length !== 1 ? 's' : ''} selected
              </p>
            )}
          </div>

          {/* Your Name */}
          <div>
            <label htmlFor="submitted_by" className="block text-sm font-semibold text-charcoal mb-1.5">
              Your Name
            </label>
            <input
              type="text"
              id="submitted_by"
              name="submitted_by"
              value={formData.submitted_by}
              onChange={handleChange}
              placeholder="Optional — but we'd love to give you credit"
              className="w-full px-4 py-2.5 rounded-xl border border-cream-dark bg-white text-charcoal text-sm focus:outline-none focus:ring-2 focus:ring-terracotta/30 focus:border-terracotta placeholder:text-warm-gray-light"
            />
          </div>

          {error && (
            <div className="bg-red-50 text-red-700 rounded-xl p-4 text-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-terracotta text-white py-3 rounded-full text-lg font-medium hover:bg-terracotta-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {submitting ? 'Submitting...' : 'Submit This Restaurant'}
          </button>

          <p className="text-warm-gray-light text-xs text-center">
            All submissions are reviewed before going live to make sure
            every listing is a restaurant that truly needs the spotlight.
          </p>
        </form>
      </div>
    </div>
  );
}
