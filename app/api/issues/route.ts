import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { z } from "zod";
import { createIssueSchema } from "@/app/validationSchemas";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const validation = createIssueSchema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.format(), { status: 400 });

  const newIssue = await prisma.issue.create({
    data: { title: body.title, description: body.description },
  });
  return NextResponse.json(newIssue, { status: 201 });
}


// export async function GET(request:NextRequest){
//   const result = await prisma.issue.findMany()
//  return NextResponse.json(result, { status: 201 })
// }
