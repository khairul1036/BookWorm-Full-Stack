'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { BookOpen, Library, User, LogOut, Menu, X } from 'lucide-react'
import { usePathname } from 'next/navigation'

export default function Navbar() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false) // ← replace with real auth later
  const [isAdmin, setIsAdmin] = useState(false)      // ← replace with real role check

  // This is just for demo - in real app use your auth context/provider
  useEffect(() => {
    // Example simulation - replace with your actual auth logic
    setIsLoggedIn(true)
    setIsAdmin(true) // change to false to see normal user view
  }, [])

  const navLinks = isAdmin
    ? [
        { name: 'Dashboard', href: '/admin/dashboard' },
        { name: 'Manage Books', href: '/admin/books' },
        { name: 'Genres', href: '/admin/genres' },
        { name: 'Users', href: '/admin/users' },
        { name: 'Reviews', href: '/admin/reviews' },
        { name: 'Tutorials', href: '/admin/tutorials' },
      ]
    : [
        { name: 'Home', href: '/dashboard' },
        { name: 'Browse', href: '/books' },
        { name: 'My Library', href: '/library' },
        { name: 'Tutorials', href: '/tutorials' },
      ]

  return (
    <nav className="bg-linear-to-r from-amber-800 to-amber-950 text-amber-50 shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <Link href={isAdmin ? '/admin/dashboard' : '/dashboard'} className="flex items-center gap-2.5">
            <BookOpen className="h-8 w-8 text-amber-300" strokeWidth={1.5} />
            <span className="font-serif text-2xl font-bold tracking-tight">
              Book<span className="text-amber-300">Worm</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`font-medium transition-colors hover:text-amber-300 ${
                  pathname === link.href
                    ? 'text-amber-300 border-b-2 border-amber-300 pb-1'
                    : 'text-amber-100 hover:text-amber-300'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Auth Section - Desktop */}
          <div className="hidden md:flex items-center gap-4">
            {isLoggedIn ? (
              <>
                <Link
                  href="/profile"
                  className="flex items-center gap-2 hover:text-amber-300 transition-colors"
                >
                  <User className="h-5 w-5" />
                  <span>Profile</span>
                </Link>
                <button className="flex items-center gap-2 hover:text-amber-300 transition-colors">
                  <LogOut className="h-5 w-5" />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <Link
                href="/login"
                className="px-4 py-2 bg-amber-600 hover:bg-amber-700 rounded-lg transition-colors"
              >
                Sign In
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-amber-100 hover:text-white focus:outline-none"
            >
              {isOpen ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-amber-950 border-t border-amber-800/50">
          <div className="px-4 pt-2 pb-4 space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`block py-2 px-3 rounded-md font-medium ${
                  pathname === link.href
                    ? 'bg-amber-900/50 text-amber-300'
                    : 'text-amber-100 hover:bg-amber-900/40 hover:text-amber-300'
                }`}
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}

            <div className="pt-3 border-t border-amber-800/50 mt-3">
              {isLoggedIn ? (
                <>
                  <Link
                    href="/profile"
                    className="block py-2 px-3 text-amber-100 hover:bg-amber-900/40 hover:text-amber-300 rounded-md"
                    onClick={() => setIsOpen(false)}
                  >
                    Profile
                  </Link>
                  <button className="w-full text-left py-2 px-3 text-amber-100 hover:bg-amber-900/40 hover:text-amber-300 rounded-md">
                    Logout
                  </button>
                </>
              ) : (
                <Link
                  href="/login"
                  className="block py-2 px-3 bg-amber-600 hover:bg-amber-700 text-white rounded-md text-center"
                  onClick={() => setIsOpen(false)}
                >
                  Sign In
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}