import {sql} from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const result =
    await sql`CREATE TABLE IF NOT EXISTS cards (
      Vacancy varchar(90),
      Time varchar(90),
      Date varchar(90),
      Description varchar,
      Company varchar(90),
      Recruiter varchar(90),
      Contact varchar(11)
      );`
    return NextResponse.json({ result }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
