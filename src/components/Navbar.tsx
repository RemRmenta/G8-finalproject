'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { href: '/users', label: 'Users' },
    { href: '/dashboard', label: 'Dashboard' },
    { href: '/login', label: 'Login' },
    { href: '/posts', label: 'Posts' },
    { href: '/register', label: 'Register' },
    { href: '/about-us', label: 'About' },
  ];

  return (
    <nav className="bg-gradient-to-r from-[#EE7879] to-[#2b1010] shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo / Brand */}
        <div className="text-2xl md:text-3xl font-extrabold text-white tracking-wider drop-shadow-sm">
          Group 8
        </div>

        {/* Mobile menu toggle */}
        <div className="md:hidden">
          <button
            className="text-white p-2 rounded-md hover:bg-[#FFD6D5] hover:text-black transition-all duration-300"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Desktop navigation links */}
        <div className="hidden md:flex space-x-6">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href}>
              <Button
                className={`uppercase tracking-wide text-sm font-semibold transition-all duration-300 transform hover:scale-105 ${
                  pathname === link.href
                    ? 'bg-white text-black'
                    : 'text-white hover:bg-[#FFD6D5] hover:text-black'
                } rounded-full px-4 py-2`}
              >
                {link.label}
              </Button>
            </Link>
          ))}
        </div>
      </div>

      {/* Mobile dropdown menu */}
      {menuOpen && (
        <div className="md:hidden px-4 pb-4 flex flex-col space-y-2 bg-gradient-to-r from-[#EE7879] to-[#2b1010] rounded-b-3xl shadow-lg">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} onClick={() => setMenuOpen(false)}>
              <Button
                className={`w-full uppercase tracking-wide text-sm font-semibold transition-all duration-300 transform hover:scale-105 ${
                  pathname === link.href
                    ? 'bg-white text-black'
                    : 'text-white hover:bg-[#FFD6D5] hover:text-black'
                } rounded-full py-2`}
              >
                {link.label}
              </Button>
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
