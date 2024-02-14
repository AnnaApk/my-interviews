import {sql} from '@vercel/postgres';
import { NextResponse } from 'next/server';

interface IEL {
  skillID: number;
  skillLevel: number;
}

export async function POST(request: Request) {
  const requestBody = await request.json();
  const {
    vacancyID,
    reqBody
  } = requestBody

  const values = reqBody.reduce((prev: string, el:IEL, index: number):string => {
    const {skillID, skillLevel} = el;
    let value = '';
    if (index === reqBody.length - 1) {
      value = `(${vacancyID}, ${skillID}, ${skillLevel})`
    } else {
      value = `(${vacancyID}, ${skillID}, ${skillLevel}),\n`
    }
    return (prev + value)
  }, '')
  // console.log(typeof vacancyID, typeof skillID, typeof skillLevel)
  //  console.log(`
  //  INSERT INTO vacancy_skills VALUES
  //  ${values};`)

  try {
    await sql`
        INSERT INTO vacancy_skills VALUES
        ${values};`

    return NextResponse.json({}, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
