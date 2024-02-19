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
    title,
    time,
    date,
    description,
    company,
    recruiter,
    contact,
  } = requestBody

  try {
    const res = await sql`
        INSERT INTO vacancies (Title, Time, Date, Description, Company, Recruiter, Contact) VALUES (
            ${title},
            ${time},
            ${date},
            ${description},
            ${company},
            ${recruiter},
            ${contact}
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
    await sql`DELETE FROM vacancy_skills WHERE Vacancy_id = ${id};`
    await sql`DELETE FROM vacancies WHERE id = ${id};`
    return NextResponse.json({}, { status: 200 });
  } catch (error) {
    console.log(error)
    return NextResponse.json({ error }, { status: 500 });
  }
}

export async function GET() {
  try {
    const { rows: vac } = await sql`SELECT * FROM vacancies;`
    const { rows: skills } = await sql`SELECT * FROM skills;`
    const { rows: vacancySkills } = await sql`SELECT * FROM vacancy_skills;`
    return NextResponse.json({ data: vac , sk: skills, vacancySkills: vacancySkills }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
