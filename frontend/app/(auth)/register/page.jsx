'use client'

import Link from 'next/link'
import { useState } from 'react'
import { BookOpen, User, Mail, Lock, Eye, EyeOff, Upload, ArrowRight } from 'lucide-react'

export default function RegisterPage() {
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [preview, setPreview] = useState(null)

    const handleImageChange = (e) => {
        const file = e.target.files?.[0]
        if (!file) return

        const reader = new FileReader()
        reader.onloadend = () => {
            setPreview(reader.result)
        }
        reader.readAsDataURL(file)
    }

    return (
        <div className="relative min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100">
            {/* Decorative background blobs */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-40 -right-40 w-96 h-96 bg-amber-200/20 rounded-full blur-3xl" />
                <div className="absolute -bottom-32 -left-40 w-80 h-80 bg-orange-200/20 rounded-full blur-3xl" />
            </div>

            <div className="relative flex min-h-screen items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
                <div className="w-full max-w-md space-y-10">
                    {/* Header */}
                    <div className="text-center">
                        <div className="inline-block relative mb-6">
                            <div className="absolute inset-0 bg-gradient-to-r from-amber-400/30 to-orange-400/30 blur-xl rounded-full" />
                            <div className="relative bg-white p-5 rounded-2xl shadow-xl">
                                <BookOpen className="h-14 w-14 text-amber-700" strokeWidth={1.6} />
                            </div>
                        </div>

                        <h1 className="text-4xl sm:text-5xl font-serif font-bold tracking-tight text-gray-900">
                            Book<span className="text-amber-700">Worm</span>
                        </h1>
                        <p className="mt-3 text-lg text-gray-600 font-light">
                            Join the community of passionate readers
                        </p>
                    </div>

                    {/* Form Card */}
                    <div className="bg-white/75 backdrop-blur-md px-8 sm:px-10 py-10 shadow-2xl rounded-2xl border border-amber-100/60">
                        <form className="space-y-6">
                            {/* Profile Picture */}
                            <div className="flex flex-col items-center pb-3">
                                <div className="relative group">
                                    <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-amber-200/70 bg-amber-50 shadow-inner">
                                        {preview ? (
                                            <img
                                                src={preview}
                                                alt="Profile preview"
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center bg-amber-50/60">
                                                <User className="w-14 h-14 text-amber-700/40" />
                                            </div>
                                        )}
                                    </div>

                                    <label
                                        htmlFor="photo"
                                        className="absolute bottom-1 right-1 bg-amber-700 text-white p-2.5 rounded-full shadow-lg cursor-pointer hover:bg-amber-800 transition-colors duration-200"
                                    >
                                        <Upload size={20} />
                                        <input
                                            type="file"
                                            id="photo"
                                            name="photo"
                                            accept="image/*"
                                            onChange={handleImageChange}
                                            className="hidden"
                                        />
                                    </label>
                                </div>
                                <p className="mt-2.5 text-sm text-gray-600/80">
                                    Profile picture (optional)
                                </p>
                            </div>

                            {/* Full Name */}
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1.5">
                                    Full Name
                                </label>
                                <div className="relative">
                                    <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-amber-700/60 pointer-events-none" />
                                    <input
                                        id="name"
                                        type="text"
                                        placeholder="Your name"
                                        className="w-full pl-11 pr-4 py-3.5 bg-white/65 border border-amber-200 rounded-xl focus:ring-2 focus:ring-amber-500/40 focus:border-amber-500 outline-none transition-all placeholder:text-gray-400 text-gray-900"
                                    />
                                </div>
                            </div>

                            {/* Email */}
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1.5">
                                    Email
                                </label>
                                <div className="relative">
                                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-amber-700/60 pointer-events-none" />
                                    <input
                                        id="email"
                                        type="email"
                                        placeholder="you@bookworm.com"
                                        className="w-full pl-11 pr-4 py-3.5 bg-white/65 border border-amber-200 rounded-xl focus:ring-2 focus:ring-amber-500/40 focus:border-amber-500 outline-none transition-all placeholder:text-gray-400 text-gray-900"
                                    />
                                </div>
                            </div>

                            {/* Password */}
                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1.5">
                                    Password
                                </label>
                                <div className="relative">
                                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-amber-700/60 pointer-events-none" />
                                    <input
                                        id="password"
                                        type={showPassword ? 'text' : 'password'}
                                        placeholder="••••••••"
                                        className="w-full pl-11 pr-12 py-3.5 bg-white/65 border border-amber-200 rounded-xl focus:ring-2 focus:ring-amber-500/40 focus:border-amber-500 outline-none transition-all placeholder:text-gray-400 text-gray-900"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-500 hover:text-amber-700 transition-colors"
                                    >
                                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                    </button>
                                </div>
                            </div>

                            {/* Confirm Password */}
                            <div>
                                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1.5">
                                    Confirm Password
                                </label>
                                <div className="relative">
                                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-amber-700/60 pointer-events-none" />
                                    <input
                                        id="confirmPassword"
                                        type={showConfirmPassword ? 'text' : 'password'}
                                        placeholder="••••••••"
                                        className="w-full pl-11 pr-12 py-3.5 bg-white/65 border border-amber-200 rounded-xl focus:ring-2 focus:ring-amber-500/40 focus:border-amber-500 outline-none transition-all placeholder:text-gray-400 text-gray-900"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-500 hover:text-amber-700 transition-colors"
                                    >
                                        {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                    </button>
                                </div>
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                className="mt-6 w-full py-3.5 px-6 bg-gradient-to-r from-amber-700 to-amber-800 hover:from-amber-800 hover:to-amber-900 text-white font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.015] flex items-center justify-center gap-2 group"
                            >
                                Create Account
                                <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
                            </button>
                        </form>

                        {/* Sign in link */}
                        <div className="mt-10 text-center">
                            <p className="text-gray-600">
                                Already have an account?{' '}
                                <Link href="/login" className="text-amber-800 hover:text-amber-900 font-medium hover:underline">
                                    Sign in
                                </Link>
                            </p>
                        </div>
                    </div>

                    <p className="text-center text-sm text-gray-500/80">
                        © {new Date().getFullYear()} BookWorm • Made with love for book lovers
                    </p>
                </div>
            </div>
        </div>
    )
}