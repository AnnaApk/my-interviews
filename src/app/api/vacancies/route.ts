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
  console.log('req', request)

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

  // console.log('POST', date, time, title, description, company, recruiter, contact)

  try {
    await sql`
        INSERT INTO vacancies (Title, Time, Date, Description, Company, Recruiter, Contact) VALUES (
            ${title},
            ${time},
            ${date},
            ${description},
            ${company},
            ${recruiter},
            ${contact}
        );`

    return NextResponse.json({}, { status: 200 });
  } catch (error) {
    console.log('error',error)
    return NextResponse.json({ error }, { status: 500 });
  }
}

export async function GET() {
  try {
    const { rows } = await sql`SELECT * FROM vacancies;`

    console.log("GET /Vacancies result: ", rows); // eslint-disable-line

    return NextResponse.json({ data: rows }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
