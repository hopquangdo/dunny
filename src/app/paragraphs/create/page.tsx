"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { saveCustomParagraph, generateCustomParagraphId } from "@/libs/custom-paragraphs"
import type { Paragraph } from "@/libs/paragraphs-data"

export default function CreateParagraphPage() {
    const router = useRouter()
    const [formData, setFormData] = useState({
        title: "",
        topic: "",
        difficulty: "A1" as "A1" | "A2" | "B1" | "B2" | "C1" | "C2",
        language: "en-to-vi" as "en-to-vi" | "vi-to-en",
        text: "",
    })
    const [error, setError] = useState("")

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        setError("")

        // Validation
        if (!formData.title.trim()) {
            setError("Please enter a title")
            return
        }
        if (!formData.topic.trim()) {
            setError("Please enter a topic")
            return
        }
        if (!formData.text.trim()) {
            setError("Please enter the paragraph text")
            return
        }

        // Count sentences (simple split by . ! ?)
        const sentences = formData.text.split(/[.!?]+/).filter((s) => s.trim().length > 0)
        if (sentences.length < 3) {
            setError("Please enter at least 3 sentences")
            return
        }

        // Create paragraph object
        const newParagraph: Paragraph = {
            id: generateCustomParagraphId(),
            title: formData.title.trim(),
            topic: formData.topic.trim(),
            difficulty: formData.difficulty,
            language: formData.language,
            text: formData.text.trim(),
            sentenceCount: sentences.length,
        }

        // Save to localStorage
        saveCustomParagraph(newParagraph)

        // Redirect to paragraphs page
        router.push(`/translation?id=${newParagraph.id}`)
    }

    return (
        <div className="min-h-screen bg-background">
            <div className="fixed inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 pointer-events-none" />

            <div className="relative">
                <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
                    {/* Header */}
                    <div className="mb-8">
                        <Link
                            href="/paragraphs"
                            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                            Back to Paragraphs
                        </Link>

                        <h1 className="text-3xl sm:text-4xl font-bold text-balance mb-4">Create Custom Paragraph</h1>
                        <p className="text-muted-foreground text-base sm:text-lg">
                            Create your own paragraph to practice translating. Enter at least 3 sentences.
                        </p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="bg-card border border-border rounded-xl p-6 space-y-6">
                        {/* Error Message */}
                        {error && (
                            <div className="bg-destructive/10 border border-destructive/20 text-destructive px-4 py-3 rounded-lg flex items-start gap-3">
                                <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                    />
                                </svg>
                                <span className="text-sm">{error}</span>
                            </div>
                        )}

                        {/* Title */}
                        <div>
                            <label htmlFor="title" className="block text-sm font-medium mb-2">
                                Title
                            </label>
                            <input
                                type="text"
                                id="title"
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                placeholder="e.g., My Daily Routine"
                                className="w-full px-4 py-2.5 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                            />
                        </div>

                        {/* Topic */}
                        <div>
                            <label htmlFor="topic" className="block text-sm font-medium mb-2">
                                Topic
                            </label>
                            <input
                                type="text"
                                id="topic"
                                value={formData.topic}
                                onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                                placeholder="e.g., Lifestyle, Work, Hobbies"
                                className="w-full px-4 py-2.5 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                            />
                        </div>

                        {/* Language and Difficulty */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="language" className="block text-sm font-medium mb-2">
                                    Translation Direction
                                </label>
                                <select
                                    id="language"
                                    value={formData.language}
                                    onChange={(e) => setFormData({ ...formData, language: e.target.value as "en-to-vi" | "vi-to-en" })}
                                    className="w-full px-4 py-2.5 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                                >
                                    <option value="en-to-vi">English → Vietnamese</option>
                                    <option value="vi-to-en">Vietnamese → English</option>
                                </select>
                            </div>

                            <div>
                                <label htmlFor="difficulty" className="block text-sm font-medium mb-2">
                                    Difficulty
                                </label>
                                <select
                                    id="difficulty"
                                    value={formData.difficulty}
                                    onChange={(e) =>
                                        setFormData({ ...formData, difficulty: e.target.value as "A1" | "A2" | "B1" | "B2" | "C1" | "C2" })
                                    }
                                    className="w-full px-4 py-2.5 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                                >
                                    <option value="Beginner">Beginner</option>
                                    <option value="Intermediate">Intermediate</option>
                                    <option value="Advanced">Advanced</option>
                                </select>
                            </div>
                        </div>

                        {/* Paragraph Text */}
                        <div>
                            <label htmlFor="text" className="block text-sm font-medium mb-2">
                                Paragraph Text
                            </label>
                            <textarea
                                id="text"
                                value={formData.text}
                                onChange={(e) => setFormData({ ...formData, text: e.target.value })}
                                placeholder="Enter your paragraph here. Make sure to include at least 3 sentences separated by periods, exclamation marks, or question marks."
                                rows={8}
                                className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-none"
                            />
                            <p className="text-xs text-muted-foreground mt-2">
                                Sentences: {formData.text.split(/[.!?]+/).filter((s) => s.trim().length > 0).length}
                            </p>
                        </div>

                        {/* Submit Button */}
                        <div className="flex gap-3 pt-4">
                            <button
                                type="submit"
                                className="flex-1 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all font-medium"
                            >
                                Create Paragraph
                            </button>
                            <Link
                                href="/paragraphs"
                                className="px-6 py-3 bg-muted text-muted-foreground rounded-lg hover:bg-muted/80 transition-all font-medium"
                            >
                                Cancel
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
