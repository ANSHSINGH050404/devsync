// app/api/collaborators/route.ts

import { db } from '@/lib/db';
import { projectCollaborators, users } from '@/app/drizzle/schema';
import { eq } from 'drizzle-orm';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const projectId = searchParams.get('projectId');

  if (!projectId) {
    return NextResponse.json({ error: 'Missing projectId' }, { status: 400 });
  }

  const collaborators = await db
    .select({
      userId: projectCollaborators.userId,
      name: users.name,
    })
    .from(projectCollaborators)
    .leftJoin(users, eq(users.id, projectCollaborators.userId))
    .where(eq(projectCollaborators.projectId, Number(projectId)));

  return NextResponse.json(collaborators);
}
