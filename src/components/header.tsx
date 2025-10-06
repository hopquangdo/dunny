"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

export default function Header() {
    const pathname = usePathname()

    const navItems = [
        { href: "/", label: "Home" },
        { href: "/paragraphs", label: "Practice" },
        // { href: "/about", label: "About" },
    ]

    return (
        <header className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-lg border-b border-border">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2 font-bold text-xl">
                    <div className="w-3 h-3 rounded-full bg-primary animate-pulse" />
                    <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                        Dunny
                    </span>
                </Link>

                {/* Navigation */}
                <nav className="hidden sm:flex items-center gap-6">
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`text-sm font-medium transition-colors hover:text-primary ${pathname === item.href ? "text-primary" : "text-muted-foreground"
                                }`}
                        >
                            {item.label}
                        </Link>
                    ))}
                </nav>

                {/* Actions */}
                <div className="flex items-center gap-3">
                    <Link
                        href="/login"
                        className="text-sm font-medium px-4 py-2 rounded-lg border border-border hover:border-primary/50 transition-all"
                    >
                        Login
                    </Link>
                    <Link
                        href="/signup"
                        className="text-sm font-semibold px-4 py-2 rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground transition-all shadow-sm"
                    >
                        Sign Up
                    </Link>
                </div>
            </div>
        </header>
    )
}
