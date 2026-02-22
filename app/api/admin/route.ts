import { createClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';

// Create a Supabase client for admin operations
function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}

function isAuthorized(request: NextRequest): boolean {
  const password = request.headers.get('x-admin-password');
  return password === process.env.ADMIN_PASSWORD;
}

// GET: Fetch all pending restaurants
export async function GET(request: NextRequest) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const supabase = getSupabase();
  const { searchParams } = new URL(request.url);
  const statusFilter = searchParams.get('status') || 'pending';

  const { data, error } = await supabase
    .from('restaurants')
    .select('*')
    .eq('status', statusFilter)
    .order('created_at', { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}

// PATCH: Approve or reject a restaurant
export async function PATCH(request: NextRequest) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const supabase = getSupabase();
  const body = await request.json();
  const { id, action } = body;

  if (!id || !action) {
    return NextResponse.json({ error: 'Missing id or action' }, { status: 400 });
  }

  if (action === 'approve') {
    const { error } = await supabase
      .from('restaurants')
      .update({ status: 'approved' })
      .eq('id', id);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  }

  if (action === 'reject') {
    const { error } = await supabase
      .from('restaurants')
      .delete()
      .eq('id', id);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  }

  return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
}
