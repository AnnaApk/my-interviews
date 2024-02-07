import {sql} from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const requestBody = await request.json();
  const {
    title,
    time,
    date,
  } = requestBody

  try {
    await sql`
        INSERT INTO vacancy_skills (Vacancy_id, Skill_id, Skill_required_level) VALUES (
            ${title},
            ${time},
            ${date}
        );`

    return NextResponse.json({}, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}