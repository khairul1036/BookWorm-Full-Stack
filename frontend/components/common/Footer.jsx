import Link from 'next/link'
import { BookOpen, Github, Twitter, Heart } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-linear-to-t from-amber-950 to-amber-900 text-amber-100/90">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand & Description */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <BookOpen className="h-8 w-8 text-amber-400" />
              <span className="font-serif text-2xl font-bold">
                Book<span className="text-amber-400">Worm</span>
              </span>
            </div>
            <p className="text-amber-200/80 mb-6 max-w-md">
              Your cozy personal library companion. Discover new books, track your reading journey, 
              write reviews, and grow your love for reading.
            </p>
            <p className="text-sm text-amber-300/70 flex items-center gap-1.5">
              Made with <Heart className="h-4 w-4 text-red-400 fill-red-400" /> by a book lover
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-amber-300 mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/books" className="hover:text-amber-300 transition-colors">Browse Books</Link></li>
              <li><Link href="/library" className="hover:text-amber-300 transition-colors">My Library</Link></li>
              <li><Link href="/tutorials" className="hover:text-amber-300 transition-colors">Reading Tutorials</Link></li>
              <li><Link href="/dashboard" className="hover:text-amber-300 transition-colors">Dashboard</Link></li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h3 className="text-lg font-semibold text-amber-300 mb-4">Connect</h3>
            <div className="flex gap-5">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-amber-300 transition-colors">
                <Github className="h-6 w-6" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-amber-300 transition-colors">
                <Twitter className="h-6 w-6" />
              </a>
            </div>
            <p className="mt-6 text-sm text-amber-200/70">
              © {new Date().getFullYear()} BookWorm<br/>
              All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}