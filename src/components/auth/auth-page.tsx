"use client"

import Link from "next/link"
import AuthButton from "@/components/auth/auth-button"

interface AuthPageProps {
    type: "Login" | "Sign Up"
}

export default function AuthPage({ type }: AuthPageProps) {
    return (
        <div className="min-h-screen bg-background flex flex-col items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/10 pointer-events-none" />
            <div className="relative z-10 w-full max-w-md mx-auto p-8 bg-card border border-border rounded-2xl shadow-xl">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                        {type} to Dunny
                    </h1>
                    <p className="text-muted-foreground text-sm">
                        Continue your English learning journey with AI feedback.
                    </p>
                </div>

                <AuthButton type={type} />

                <p className="text-center text-muted-foreground text-sm mt-6">
                    By {type.toLowerCase()}ing, you agree to our{" "}
                    <Link href="#" className="text-primary hover:underline underline-offset-2">
                        Terms
                    </Link>{" "}
                    and{" "}
                    <Link href="#" className="text-primary hover:underline underline-offset-2">
                        Privacy Policy
                    </Link>.
                </p>
            </div>
            <div className="absolute -bottom-40 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-primary/20 rounded-full blur-3xl pointer-events-none" />
        </div>
    )
}
