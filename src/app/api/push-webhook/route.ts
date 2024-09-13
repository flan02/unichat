import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json()
    console.log(JSON.stringify(body)) // ? need data as string to destructurize object nested in body
    return NextResponse.json({
      success: true,
      status: 200,
    })
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "There was an error" }, { status: 500 });
  }
}