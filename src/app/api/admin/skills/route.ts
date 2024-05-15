import {sql} from '@vercel/postgres';
import { NextResponse } from 'next/server';

// Follow the REST url pattern /api/vacancies
// example:
// POST /api/vacancies - create a new vacancy
// GET /api/vacancies - get all vacancies
// GET /api/vacancies/:id - get a single vacancy by id
// PATCH /api/vacancies/:id - update a single vacancy by id
// DELETE /api/vacancies/:id - delete a single vacancy by id

export async function POST(request: Request) {
  const requestBody = await request.json();
  const {
    skill,
    grade_1,
    grade_2,
    grade_3,
    grade_4,
    grade_5,
  } = requestBody

  try {
    await sql`
        INSERT INTO skills (Skill, Grade_1, Grade_2, Grade_3, Grade_4, Grade_5) VALUES (
            ${skill},
            ${grade_1},
            ${grade_2},
            ${grade_3},
            ${grade_4},
            ${grade_5}
        );`
    return NextResponse.json({}, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}

export async function GET() {
  try {
    const { rows } = await sql`SELECT * FROM skills;`
    return NextResponse.json({ data: rows }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  const requestBody = await request.json();
  const { id } = requestBody
  try {
    await sql`DELETE FROM skills WHERE id = ${id};`
    return NextResponse.json({}, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  const requestBody = await request.json();
  const {
    id,
    skill,
    grade_1,
    grade_2,
    grade_3,
    grade_4,
    grade_5,
  } = requestBody

  try {
    await sql`
      UPDATE skills
      SET Skill = ${skill},
          Grade_1 = ${grade_1},
          Grade_2 = ${grade_2},
          Grade_3 = ${grade_3},
          Grade_4 = ${grade_4},
          Grade_5 = ${grade_5}
      WHERE id = ${id};`
    return NextResponse.json({}, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
