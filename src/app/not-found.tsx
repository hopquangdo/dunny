import Link from "next/link"

export default function NotFoundPage() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-background relative">
            {/* Gradient background */}
            <div className="fixed inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10 pointer-events-none" />

            {/* Content */}
            <div className="relative text-center px-4">
                <h1 className="text-7xl sm:text-8xl font-bold text-balance mb-4">
                    404
                </h1>
                <h2 className="text-3xl sm:text-4xl font-semibold mb-6 text-balance">
                    Page Not Found
                </h2>
                <p className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-xl mx-auto leading-relaxed">
                    Sorry, the page you are looking for does not exist or has been moved.
                </p>
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold bg-primary hover:bg-primary/90 text-primary-foreground transition-all shadow-lg shadow-primary/20 hover:shadow-primary/30 hover:scale-105"
                >
                    Go Home
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                </Link>
            </div>
        </div>
    )
}
