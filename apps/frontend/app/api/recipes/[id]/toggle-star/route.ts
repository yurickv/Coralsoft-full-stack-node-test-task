import { NextResponse } from 'next/server';

const API_URL = process.env.NEXT_API_URL || 'http://localhost:3001/api';

export async function POST(_: Request, { params }: { params: { id: string } }) {
  const res = await fetch(`${API_URL}/recipes/toggle-star/${params.id}`, {
    method: 'POST',
  });

  const data = await res.json();
  return NextResponse.json(data, { status: res.status });
}
