# Lazy Susan

**A platform to help struggling family-owned restaurants in Brooklyn & Queens get discovered — before they disappear.**

---

## The Problem

Some of the best restaurants in New York City are dying quietly. Family-owned spots that have been feeding neighborhoods for decades are closing — not because the food isn't incredible, but because nobody knows they're there. They can't afford ads. They don't have Instagram strategies. They're just a person in a kitchen, cooking the way their parents taught them, hoping someone walks through the door.

## The Solution

Lazy Susan is a community-powered directory that gives these restaurants the visibility they've never had. No star ratings. No reviews. Just real stories about real people and the food they pour their lives into.

Anyone can submit a restaurant they think deserves attention. We review every submission, write up their story, and put them on the map — with struggling restaurants prioritized so the spots that need help the most get seen first.

## How It Works

1. **Someone submits a restaurant** — a neighbor, a regular, anyone who knows a spot that's struggling
2. **We review and publish their story** — not a rating, a real narrative about the people behind the food
3. **People discover them and show up** — no delivery apps, no middlemen, just a customer walking through the door

## Features

- **Browse & Search** — filter restaurants by borough, neighborhood, and cuisine type
- **Needs Support** — struggling restaurants are flagged and prioritized so they get seen first
- **Community Submissions** — anyone can submit a restaurant with their story and photos
- **Admin Review** — every submission is reviewed before going live
- **Restaurant Stories** — each listing tells the story behind the food, not just a menu

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **Database:** Supabase (PostgreSQL)
- **Storage:** Supabase Storage (photo uploads)
- **Deployment:** Vercel (recommended)

## Architecture & Data Flow

**Data model:** The app centers on a single `restaurants` table in Supabase. Each row has: `id`, `name`, `address`, `borough`, `neighborhood`, `cuisine_type`, `description`, `why_support`, `submitted_by`, `photo_urls` (array of public URLs), `needs_support` (boolean), `status` (`'pending'` or `'approved'`), and `created_at`. Public browse and detail pages only ever read rows with `status = 'approved'`.

**Submission flow:**

1. **Submit** — A user fills out the form at `/submit`, optionally uploads up to 5 photos to the Supabase Storage bucket `photos`. The app inserts a new row into `restaurants` with `status: 'pending'`. Photos are stored in Supabase Storage; their public URLs are saved in `photo_urls`.
2. **Review** — An admin signs in at `/admin` with a password (validated via `ADMIN_PASSWORD` in env). The admin API (`/api/admin`) lists restaurants by `status` (pending or approved). Pending submissions are shown for review.
3. **Publish or reject** — Approving updates the row to `status: 'approved'` (it then appears on browse and detail pages). Rejecting deletes the row from the database.

Until Supabase is configured, the app falls back to in-memory seed data for the homepage and browse; submit and admin require a live Supabase project and env vars.

## Getting Started

```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
```

Add the following to `.env.local`:

- `NEXT_PUBLIC_SUPABASE_URL` — your Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` — your Supabase anon (public) key
- `ADMIN_PASSWORD` — password used to sign in at `/admin` (any non-empty string; keep this secret)

**Supabase setup** (required for submit and admin; optional for browse with seed data):

1. Create a project at [supabase.com](https://supabase.com) and copy the project URL and anon key into `.env.local`.
2. In the Supabase SQL editor, create the `restaurants` table. Columns should match the app’s usage: `id` (uuid, primary key, default `gen_random_uuid()`), `name`, `address`, `borough`, `neighborhood`, `cuisine_type`, `description`, `why_support`, `submitted_by` (text), `photo_urls` (text[]), `needs_support` (boolean), `status` (text, e.g. `'pending'` or `'approved'`), `created_at` (timestamptz, default `now()`). If you enable Row Level Security (RLS), add policies so the anon role can select, insert, update, and delete on `restaurants`.
3. In Storage, create a **public** bucket named `photos` so submission uploads and public image URLs work.

```bash
# Run the dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app. Without Supabase configured, you’ll see seed data on the home and browse pages; configure Supabase and the env vars above to use submit and admin.

## Currently Covering

Brooklyn & Queens — expanding to other boroughs as the community grows.

---

*Made with heart in Brooklyn & Queens.*
