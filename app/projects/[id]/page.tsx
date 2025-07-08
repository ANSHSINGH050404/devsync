// app/projects/[id]/page.tsx
import { auth } from '@/lib/auth';
import { db } from '@/lib/db';
import { projects, projectCollaborators, users } from '@/app/drizzle/schema
import { eq } from 'drizzle-orm';

export default async function ProjectPage({ params }: { params: { id: string } }) {
  const session = await auth();
  const projectId = Number(params.id);

  // Fetch collaborators
  const collaborators = await db
    .select({
      userId: projectCollaborators.userId,
      name: users.name,
    })
    .from(projectCollaborators)
    .leftJoin(users, eq(projectCollaborators.userId, users.id))
    .where(eq(projectCollaborators.projectId, projectId));

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Project #{projectId}</h1>

      {/* Collaborator Invite Form */}
      <form action="/api/collaborators" method="POST" className="my-4 space-y-2">
        <input type="hidden" name="projectId" value={projectId} />
        <input
          type="text"
          name="userId"
          placeholder="User ID or Email"
          className="border p-2 rounded w-full"
          required
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Invite Collaborator
        </button>
      </form>

      {/* Collaborators List */}
      <h2 className="text-xl font-semibold mt-6">Collaborators:</h2>
      <ul className="list-disc ml-6 mt-2">
        {collaborators.map((c) => (
          <li key={c.userId}>{c.name || c.userId}</li>
        ))}
      </ul>
    </div>
  );
}
