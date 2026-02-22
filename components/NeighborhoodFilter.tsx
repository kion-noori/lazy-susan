'use client';

import { BOROUGHS, NEIGHBORHOODS } from '@/lib/types';

interface NeighborhoodFilterProps {
  selectedBorough: string;
  selectedNeighborhood: string;
  onBoroughChange: (borough: string) => void;
  onNeighborhoodChange: (neighborhood: string) => void;
}

export default function NeighborhoodFilter({
  selectedBorough,
  selectedNeighborhood,
  onBoroughChange,
  onNeighborhoodChange,
}: NeighborhoodFilterProps) {
  const neighborhoods = selectedBorough
    ? NEIGHBORHOODS[selectedBorough] || []
    : [];

  return (
    <div className="flex flex-col sm:flex-row gap-3">
      <select
        value={selectedBorough}
        onChange={(e) => {
          onBoroughChange(e.target.value);
          onNeighborhoodChange('');
        }}
        className="px-4 py-2.5 rounded-xl border border-cream-dark bg-white text-charcoal font-medium text-sm focus:outline-none focus:ring-2 focus:ring-terracotta/30 focus:border-terracotta"
      >
        <option value="">All Boroughs</option>
        {BOROUGHS.map((b) => (
          <option key={b} value={b}>
            {b}
          </option>
        ))}
      </select>

      <select
        value={selectedNeighborhood}
        onChange={(e) => onNeighborhoodChange(e.target.value)}
        disabled={!selectedBorough}
        className="px-4 py-2.5 rounded-xl border border-cream-dark bg-white text-charcoal font-medium text-sm focus:outline-none focus:ring-2 focus:ring-terracotta/30 focus:border-terracotta disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <option value="">All Neighborhoods</option>
        {neighborhoods.map((n) => (
          <option key={n} value={n}>
            {n}
          </option>
        ))}
      </select>
    </div>
  );
}
