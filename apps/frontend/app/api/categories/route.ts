export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
const API_URL = process.env.NEXT_API_URL || 'http://localhost:3001/api';

export async function GET() {
  const res = await fetch(`${API_URL}/categories`);
  const data = await res.json();
  return NextResponse.json(data);
}
