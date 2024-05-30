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

export async function GET(request: Request) {

  const parsedUrl = new URL(request.url);
  const email = parsedUrl.searchParams.get('email');

  try {
    const {rows: user} = await sql`SELECT * FROM users WHERE email = ${email} LIMIT 1`
    let { id } = user[0];
    let experience;
    if (user) {
      const {rows: experienceRow } = await sql`SELECT * FROM users_experience WHERE user_id = ${id}`
      experience = experienceRow;
    }
    // console.log('api.profile experience from rows', experience)
    return NextResponse.json({user: user, experience: experience}, { status: 200 }); // 
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  const requestBody = await request.json();
  const { name, id } = requestBody;

  try {
    await sql`UPDATE users SET name = ${name} WHERE id =${id}`;
    return NextResponse.json({}, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
