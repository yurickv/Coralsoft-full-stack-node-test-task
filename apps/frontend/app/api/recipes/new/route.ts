import { NextRequest, NextResponse } from 'next/server';

const API_URL = process.env.NEXT_API_URL || 'http://localhost:3001/api';

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();

    const res = await fetch(`${API_URL}/recipes`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const errorBody = await res.text();
      return NextResponse.json(
        { error: 'Failed to create recipe', details: errorBody },
        { status: res.status }
      );
    }

    const created = await res.json();
    return NextResponse.json(created, { status: 201 });
  } catch (error) {
    console.error('Error in /api/recipes/new:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
