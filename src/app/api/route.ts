// import {sql} from '@vercel/postgres';
import { NextResponse } from 'next/server';

// Health check
export async function GET() {
  NextResponse.json({ status: 'ok' }, { status: 200 });
}
