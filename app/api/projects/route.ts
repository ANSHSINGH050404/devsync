import { db } from '@/lib/db';
import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth'
import { projects } from '@/app/drizzle/schema';

export async function GET() {
  const user = await auth();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const data = await db.select().from(projects).where(projects.ownerId.eq(user.user.id));
  return NextResponse.json(data);
}

export async function POST(req: Request) {
  const user = await auth();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { name, description } = await req.json();
  const created = await db.insert(projects).values({
    name,
    description,
    ownerId: user.user.id,
  }).returning();

  return NextResponse.json(created[0]);
}
