import { NextRequest, NextResponse } from 'next/server';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const page = searchParams.get('page') || '1';
  const limit = searchParams.get('limit') || '9';
  const category = searchParams.get('category');
  const area = searchParams.get('area');
  const q = searchParams.get('q');

  const params = new URLSearchParams({ page, limit });
  if (category) params.set('category', category);
  if (area) params.set('area', area);
  if (q) params.set('q', q);

  const res = await fetch(`${API_URL}/recipes?${params.toString()}`, {
    cache: 'no-store',
  });

  const data = await res.json();
  return NextResponse.json(data);
}
