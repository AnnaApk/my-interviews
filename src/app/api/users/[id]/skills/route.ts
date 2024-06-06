import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

interface IEL {
  skillID: number;
  skillLevel: number;
}

export async function POST(request: Request) {
  const requestBody = await request.json();
  const {
    userID,
    reqBody
  } = requestBody

  const values:[number, number, number][] = reqBody.reduce((prev:[number, number, number][], el:IEL) => {
    const {skillID, skillLevel} = el;
    let value: [number, number, number] = [userID, skillID, skillLevel];
    prev.push(value);
    return prev;
  },[])

  try {
    for (const value of values) {
      await sql`INSERT INTO user_skills VALUES (${value[0]}, ${value[1]}, ${value[2]});`;
    }
    return NextResponse.json({}, { status: 200 });
  } catch (error) { 
    return NextResponse.json({ error }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  const requestBody = await request.json();
  const { userID, skillID } = requestBody
  try {
    await sql`DELETE FROM user_skills WHERE user_id = ${userID} and skill_id = ${skillID};`
    return NextResponse.json({}, { status: 200 });
  } catch (error) {
    console.log(error)
    return NextResponse.json({ error }, { status: 500 });
  }
}
