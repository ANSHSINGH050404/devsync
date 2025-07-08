'use client';

import Link from 'next/link';
import './Navbar.css';

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">DevSync</div>
      <div className="nav-links">
        <Link href="/">Home</Link>
        <Link href="/dashboard">Dashboard</Link>
        <Link href="/projects">Projects</Link>
      </div>
    </nav>
  );
}
