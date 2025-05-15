import { NextRequest, NextResponse } from 'next/server';

const API_URL = process.env.NEXT_API_URL || 'http://localhost:3001';

export async function GET(req: NextRequest) {
  try {
    const res = await fetch(`${API_URL}/api/recipes/random`);

    if (!res.ok) {
      const errorBody = await res.text();
      return NextResponse.json(
        { error: 'Failed to fetch random recipe', details: errorBody },
        { status: res.status }
      );
    }

    const recipe = await res.json();
    return NextResponse.json(recipe);
  } catch (error) {
    console.error('Error in /api/recipes/random:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
