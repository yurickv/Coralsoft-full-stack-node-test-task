import { NextResponse } from 'next/server';

const API_URL = 'http://localhost:3001/api/recipes';

export async function POST(_: Request, { params }: { params: { id: string } }) {
  const res = await fetch(`${API_URL}/${params.id}/toggle-star`, { method: 'POST' });
  const data = await res.json();
  return NextResponse.json(data, { status: res.status });
}
