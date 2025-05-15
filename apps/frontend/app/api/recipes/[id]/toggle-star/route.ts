import { NextResponse } from 'next/server';

const API_URL = process.env.NEXT_API_URL || 'http://localhost:3001';

export async function POST(_: Request, { params }: { params: { id: string } }) {
  const res = await fetch(`${API_URL}/api/recipes/toggle-star/${params.id}`, {
    method: 'POST',
  });

  const data = await res.json();
  return NextResponse.json(data, { status: res.status });
}
