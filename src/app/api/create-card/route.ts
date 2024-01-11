import {sql} from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {

  console.log('cached')

  const { searchParams } = new URL(request.url);
  const date = searchParams.get('date');
  const time = searchParams.get('time');
  const vacancy = searchParams.get('vacancy');
  const description = searchParams.get('description');
  const company = searchParams.get('company');
  const recruiter = searchParams.get('recruiter');
  const contact = searchParams.get('contact');

  try {
    await sql`INSERT INTO cards (Vacancy, Time, Date, Description, Company, Recruiter, Contact) VALUES (${vacancy}, ${time}, ${date}, ${description}, ${company}, ${recruiter}, ${contact});`
    return NextResponse.json({}, { status: 200 });
  } catch (error) {
    console.log('error',error)
    return NextResponse.json({ error }, { status: 500 });
  }
}
