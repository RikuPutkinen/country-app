'use client'

import Link from "next/link";
import { useTheme } from "next-themes";
import { useState, useEffect } from 'react';

export default function Navbar() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, [])

  if (!mounted) {
    return null;
  }

  function toggleTheme(theme: string | undefined) {
    return theme === 'dark' ? setTheme('light') : setTheme('dark');
  }

  return (
    <nav className="text-xl flex justify-between px-2 py-3 bg-gray-100 dark:bg-gray-900 shadow-md">
      <div className="flex gap-8">
        <Link href={'/'} className="hover:underline">Country App</Link>
        <Link href={'/compare'} className="underline">Compare countries</Link>
      </div>
      <button onClick={() => toggleTheme(theme)}>{theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}</button>
    </nav>
  )
}