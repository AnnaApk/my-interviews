import {sql} from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const requestBody = await request.json();
  const {
    email,
    name,
    role,
  } = requestBody

  try {
    const res = await sql`
        INSERT INTO users (Email, Name, Role) VALUES (
            ${email},
            ${name},
            ${role}
        ) RETURNING id;`
  
    return NextResponse.json({data: res}, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
