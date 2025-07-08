'use client';
import Editor from '@/components/Editor';

export default function EditorPage() {
  return (
    <div className="flex flex-col h-screen">
      <header className="p-4 bg-gray-800 text-xl font-bold">DevSync</header>
      <main className="flex-grow">
        <Editor />
      </main>
    </div>
  );
}
 