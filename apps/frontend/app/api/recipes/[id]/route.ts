import { NextResponse } from 'next/server';
import { UpdateRecipeInput } from '../../../../types/recipe';

const API_URL = process.env.NEXT_API_URL || 'http://localhost:3001';

export async function GET(_: Request, { params }: { params: { id: string } }) {
  const res = await fetch(`${API_URL}/api/recipes/${params.id}`, { cache: 'no-store' });

  if (!res.ok) {
    console.error(`Failed to fetch recipe: ${res.status} ${res.statusText}`);
    return NextResponse.json({ error: 'Failed to fetch recipe' }, { status: res.status });
  }

  const data = await res.json();
  return NextResponse.json(data);
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const body: UpdateRecipeInput = await req.json();
  const res = await fetch(`${API_URL}/recipes/${params.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  const data = await res.json();
  return NextResponse.json(data, { status: res.status });
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  const res = await fetch(`${API_URL}/recipes/${params.id}`, {
    method: 'DELETE',
  });

  if (!res.ok) {
    return NextResponse.json({ error: 'Failed to delete recipe' }, { status: res.status });
  }

  return new NextResponse(null, { status: res.status });
}
