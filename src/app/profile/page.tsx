"use client"

import { useState, ReactNode } from "react"

// ==== Card Components ====
function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
    return (
        <div
            className={`rounded-xl bg-card border border-border shadow-sm transition-all ${className}`}
        >
            {children}
        </div>
    )
}

function CardContent({ children, className = "" }: { children: ReactNode; className?: string }) {
    return <div className={`p-4 sm:p-6 ${className}`}>{children}</div>
}

// ==== Mock Data ====
const mockActivity = Array.from({ length: 30 }, (_, i) => ({
    day: i + 1,
    score: Math.floor(Math.random() * 100),
    practiced: Math.random() > 0.3,
}))

// ==== Main Page ====
export default function ProfilePage() {
    const [username] = useState("Hợp Bóp")
    const totalDays = mockActivity.filter((a) => a.practiced).length
    const avgScore = Math.round(
        mockActivity.filter((a) => a.practiced).reduce((acc, cur) => acc + cur.score, 0) / totalDays
    )

    return (
        <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                        {username}
                    </h1>
                    <p className="text-muted-foreground">Your English learning progress overview</p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
                    <Card className="hover:border-primary/40">
                        <CardContent className="text-center">
                            <h3 className="text-sm text-muted-foreground mb-1">Days Practiced</h3>
                            <p className="text-3xl font-bold text-primary">{totalDays}</p>
                        </CardContent>
                    </Card>

                    <Card className="hover:border-primary/40">
                        <CardContent className="text-center">
                            <h3 className="text-sm text-muted-foreground mb-1">Average Score</h3>
                            <p className="text-3xl font-bold text-secondary">{avgScore}%</p>
                        </CardContent>
                    </Card>

                    <Card className="hover:border-primary/40">
                        <CardContent className="text-center">
                            <h3 className="text-sm text-muted-foreground mb-1">Total Translations</h3>
                            <p className="text-3xl font-bold text-success">{mockActivity.length}</p>
                        </CardContent>
                    </Card>
                </div>

                {/* Activity Heatmap */}
                <Card className="p-6">
                    <h2 className="text-xl font-semibold mb-4">Activity Overview</h2>

                    <div className="grid grid-cols-7 gap-2">
                        {mockActivity.map((day) => (
                            <div
                                key={day.day}
                                title={`Day ${day.day}: ${day.practiced ? day.score + "%" : "No practice"}`}
                                className={`w-8 h-8 rounded-md transition-all ${day.practiced
                                    ? day.score > 80
                                        ? "bg-primary"
                                        : day.score > 60
                                            ? "bg-primary/80"
                                            : "bg-primary/40"
                                    : "bg-muted"
                                    } hover:scale-110 hover:shadow-md`}
                            />
                        ))}
                    </div>

                    <p className="text-xs text-muted-foreground mt-4 text-center">
                        Each square represents a day of practice this month
                    </p>
                </Card>

                {/* Recent Activities */}
                <div className="mt-12">
                    <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
                    <div className="space-y-3">
                        {mockActivity
                            .slice(-5)
                            .reverse()
                            .map((day) => (
                                <Card key={day.day} className="hover:border-primary/40">
                                    <CardContent className="flex items-center justify-between">
                                        <p className="text-sm text-muted-foreground">Day {day.day}</p>
                                        {day.practiced ? (
                                            <p className="font-medium text-primary">Score: {day.score}%</p>
                                        ) : (
                                            <p className="text-muted-foreground">No practice</p>
                                        )}
                                    </CardContent>
                                </Card>
                            ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
