import { NextResponse } from 'next/server';

export async function GET() {
  const res = await fetch('http://localhost:3001/api/categories');
  const data = await res.json();
  return NextResponse.json(data);
}
