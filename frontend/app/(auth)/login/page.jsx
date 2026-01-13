'use client'
import Link from 'next/link';
import { useState } from 'react'
import { BookOpen, Library, Mail, Lock, ArrowRight, Eye, EyeOff } from 'lucide-react';

export default function LoginPage() {
    const [showPassword, setShowPassword] = useState(false)
    return (
        <div className="relative min-h-screen bg-linear-to-br from-amber-50 via-orange-50 to-amber-100">
            {/* Background decorative elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-40 -right-40 w-96 h-96 bg-amber-200/20 rounded-full blur-3xl" />
                <div className="absolute -bottom-32 -left-40 w-80 h-80 bg-orange-200/20 rounded-full blur-3xl" />
            </div>

            <div className="relative flex min-h-screen items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
                <div className="w-full max-w-md space-y-10">
                    {/* Logo & Header */}
                    <div className="flex flex-col items-center text-center">
                        <div className="relative mb-4">
                            <div className="absolute inset-0 bg-linear-to-r from-amber-400 to-orange-400 blur-xl opacity-40 rounded-full" />
                            <div className="relative bg-white p-4 rounded-2xl shadow-xl">
                                <Library className="h-12 w-12 text-amber-700" strokeWidth={1.8} />
                            </div>
                        </div>

                        <h1 className="text-4xl font-serif font-bold tracking-tight text-gray-900">
                            Book<span className="text-amber-700">Shelf</span>
                        </h1>
                        <p className="mt-3 text-lg text-gray-600 font-light">
                            Your personal reading sanctuary
                        </p>
                    </div>

                    {/* Login Card */}
                    <div className="bg-white/80 backdrop-blur-sm px-10 py-12 shadow-2xl ring-1 ring-gray-200/70 rounded-2xl border border-amber-100">
                        <form className="space-y-6">
                            {/* Email Field */}
                            <div>
                                <label
                                    htmlFor="email"
                                    className="block text-sm font-medium text-gray-700 mb-1.5"
                                >
                                    Email address
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                                        <Mail className="h-5 w-5 text-amber-700/70" />
                                    </div>
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        autoComplete="email"
                                        required
                                        className="block w-full pl-11 pr-4 py-3.5 border border-amber-200 
                             rounded-xl focus:ring-2 focus:ring-amber-500/40 
                             focus:border-amber-500 bg-white/60 transition-all duration-200
                             placeholder:text-gray-400 text-gray-900 shadow-sm"
                                        placeholder="you@library.com"
                                    />
                                </div>
                            </div>

                            {/* Password Field */}
                            <div>
                                <label
                                    htmlFor="password"
                                    className="block text-sm font-medium text-gray-700 mb-1.5"
                                >
                                    Password
                                </label>

                                <div className="relative">
                                    <Lock
                                        className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-amber-700/60 pointer-events-none"
                                    />

                                    <input
                                        id="password"
                                        type={showPassword ? "text" : "password"}
                                        placeholder="••••••••"
                                        className="w-full pl-11 pr-12 py-3.5 bg-white/65 border border-amber-200 rounded-xl focus:ring-2 focus:ring-amber-500/40 focus:border-amber-500 outline-none transition-all placeholder:text-gray-400 text-gray-900"
                                    />

                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-500 hover:text-amber-700 transition-colors"
                                    >
                                        {showPassword ? (
                                            <EyeOff size={20} />
                                        ) : (
                                            <Eye size={20} />
                                        )}
                                    </button>
                                </div>
                            </div>

                            {/* Submit Button */}
                            <div>
                                <button
                                    type="submit"
                                    className="cursor-pointer group relative w-full flex justify-center py-3.5 px-4 
                           border border-transparent rounded-xl text-white 
                           bg-linear-to-r from-amber-700 to-amber-800 
                           hover:from-amber-800 hover:to-amber-900
                           focus:outline-none focus:ring-2 focus:ring-offset-2 
                           focus:ring-amber-500 font-medium shadow-lg
                           transition-all duration-300 hover:shadow-xl
                           hover:scale-[1.02] active:scale-[0.98]"
                                >
                                    <span className="absolute flex items-center">
                                        Sign in
                                        <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                                    </span>
                                    <span className="opacity-0">Sign in</span>
                                </button>
                            </div>
                        </form>

                        {/* Social / Alternative */}
                        <div className="mt-10 text-center">
                            <p className="text-gray-600">
                                Don't have an account?{' '}
                                <Link href="/register" className="text-amber-800 hover:text-amber-900 font-medium hover:underline">
                                    Sign up
                                </Link>
                            </p>
                        </div>
                    </div>

                    {/* Footer note */}
                    <p className="text-center text-sm text-gray-500/80">
                        © {new Date().getFullYear()} BookWorm • Made with love for book lovers
                    </p>
                </div>
            </div>
        </div>
    );
}