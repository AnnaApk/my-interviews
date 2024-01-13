import {sql} from '@vercel/postgres';
import { NextResponse } from 'next/server';

// Follow the REST url pattern /api/vacancies
// example:
// POST /api/vacancies - create a new vacancy
// GET /api/vacancies - get all vacancies
// GET /api/vacancies/:id - get a single vacancy by id
// PATCH /api/vacancies/:id - update a single vacancy by id
// DELETE /api/vacancies/:id - delete a single vacancy by id


const createTableIfNotExists = async () => {
  const result = await sql`
      CREATE TABLE IF NOT EXISTS vacancies
      (
          id          serial PRIMARY KEY,
          Title       text,
          Time        text,
          Date        text,
          Description text,
          Company     text,
          Recruiter   text,
          Contact     text
      );
`;
  // console.log("createTableIfNotExists: ", result); // eslint-disable-line
}

// Not sure if this is the best place to create a table
// Better is to use a migration tool
createTableIfNotExists();

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
    await createTableIfNotExists()

    await sql`
        INSERT INTO vacancies (Title, Time, Date, Description, Company, Recruiter, Contact)
        VALUES (
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

    console.log("GET /vacancies result: ", rows); // eslint-disable-line

    return NextResponse.json({ data: rows }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
