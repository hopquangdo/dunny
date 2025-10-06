export default function Loading() {
    return (
        <div className="fixed inset-0 flex flex-col items-center justify-center bg-background z-50">
            {/* Pulse circle */}
            <div className="w-12 h-12 rounded-full bg-primary animate-pulse mb-4" />

            {/* Text */}
            <p className="text-lg font-semibold text-primary">Loading, please wait...</p>

            {/* Optional: animated dots */}
            <div className="flex space-x-1 mt-2">
                <span className="w-2 h-2 bg-primary rounded-full animate-bounce delay-75"></span>
                <span className="w-2 h-2 bg-primary rounded-full animate-bounce delay-150"></span>
                <span className="w-2 h-2 bg-primary rounded-full animate-bounce delay-300"></span>
            </div>
        </div>
    )
}
