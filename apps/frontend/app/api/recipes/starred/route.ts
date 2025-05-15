export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';

const API_URL = process.env.NEXT_API_URL || 'http://localhost:3001';

export async function GET() {
  try {
    const res = await fetch(`${API_URL}/api/recipes/starred`, {
      cache: 'no-store',
    });
    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch (error) {
    console.error('Error fetching starred recipes:', error);
    return NextResponse.json({ error: 'Failed to fetch starred recipes' }, { status: 500 });
  }
}
