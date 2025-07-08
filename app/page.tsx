'use client';

import { useSession, signIn, signOut } from 'next-auth/react';
import './page.css';

export default function Home() {
  const { data: session } = useSession();

  return (
    <main className="homepage">
      <header className="header">
        <h1>DevSync</h1>
        <p className="tagline">AI-Powered Developer Collaboration</p>
      </header>

      <section className="auth-section">
        {session ? (
          <>
            <p className="welcome">Welcome, {session.user?.name}!</p>
            <button className="btn signout" onClick={() => signOut()}>
              Sign out
            </button>
          </>
        ) : (
          <>
            <p className="welcome">You are not signed in</p>
            <button className="btn signin" onClick={() => signIn('github')}>
              Sign in with GitHub
            </button>
          </>
        )}
      </section>
    </main>
  );
}
