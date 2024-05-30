import {sql} from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const requestBody = await request.json();
  const {
    user_id,
    dateStart,
    dateEnd,
    company,
    achiev,
    stack,
  } = requestBody

  console.log('request', requestBody)

  try {
    const res = await sql`
        INSERT INTO users_experience (User_id, Date_start, Date_end, Company, Achiev, Stack) VALUES (
            ${user_id},
            ${dateStart},
            ${dateEnd},
            ${company},
            ${achiev},
            ${stack}
        ) RETURNING id;`
  
    return NextResponse.json({data: res}, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  const requestBody = await request.json();
  const { id } = requestBody
  try {
    await sql`DELETE FROM users_experience WHERE id = ${id};`
    return NextResponse.json({}, { status: 200 });
  } catch (error) {
    console.log(error)
    return NextResponse.json({ error }, { status: 500 });
  }
}
