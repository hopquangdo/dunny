"use client"

import { signIn } from "next-auth/react"

interface AuthButtonProps {
    type?: "Login" | "Sign Up"
}

export default function AuthButton({ type = "Login" }: AuthButtonProps) {
    return (
        <button
            onClick={() => signIn("google")}
            className="w-full flex items-center justify-center gap-3 py-3 rounded-xl font-semibold bg-primary hover:bg-primary/90 text-primary-foreground transition-all shadow-lg shadow-primary/20 hover:shadow-primary/30 hover:scale-[1.02]"
        >
            <svg
                className="w-5 h-5"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
            >
                <path d="M12 2a10 10 0 0 0-9.93 9H12v3H2.07A10 10 0 1 0 12 2z" />
            </svg>
            Continue with Google
        </button>
    )
}
