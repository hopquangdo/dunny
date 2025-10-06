"use client"

import Link from "next/link"
import { useState, useMemo } from "react"
import { paragraphs, getUniqueTopics, getLanguageLabel } from "@/libs/paragraphs-data"

export default function ParagraphsPage() {
  const [selectedLanguage, setSelectedLanguage] = useState<"all" | "en-to-vi" | "vi-to-en">("all")
  const [selectedTopic, setSelectedTopic] = useState<string>("all")
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("all")

  const topics = useMemo(() => getUniqueTopics(), [])

  const filteredParagraphs = useMemo(() => {
    return paragraphs.filter((paragraph) => {
      const languageMatch = selectedLanguage === "all" || paragraph.language === selectedLanguage
      const topicMatch = selectedTopic === "all" || paragraph.topic === selectedTopic
      const difficultyMatch = selectedDifficulty === "all" || paragraph.difficulty === selectedDifficulty

      return languageMatch && topicMatch && difficultyMatch
    })
  }, [selectedLanguage, selectedTopic, selectedDifficulty])

  const difficultyColors = {
    A1: "bg-success/10 text-success border-success/20",       // dễ nhất
    A2: "bg-success/20 text-success/80 border-success/30",
    B1: "bg-warning/10 text-warning border-warning/20",       // trung bình
    B2: "bg-warning/20 text-warning/80 border-warning/30",
    C1: "bg-destructive/10 text-destructive border-destructive/20", // khó
    C2: "bg-destructive/20 text-destructive/80 border-destructive/30",
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="fixed inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 pointer-events-none" />

      <div className="relative">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
          {/* Header */}
          <div className="mb-8 lg:mb-12">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Home
            </Link>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-balance mb-4">Choose a Paragraph</h1>
            <p className="text-muted-foreground text-base sm:text-lg max-w-3xl">
              Select a paragraph to practice translating.
            </p>
          </div>

          <div className="mb-8 bg-card border border-border rounded-xl p-6">
            <div className="flex items-center gap-2 mb-4">
              <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                />
              </svg>
              <h2 className="text-lg font-semibold">Filter Paragraphs</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2 text-muted-foreground">Translation Direction</label>
                <select
                  value={selectedLanguage}
                  onChange={(e) => setSelectedLanguage(e.target.value as "all" | "en-to-vi" | "vi-to-en")}
                  className="w-full px-4 py-2.5 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                >
                  <option value="all">All Languages</option>
                  <option value="en-to-vi">English</option>
                  <option value="vi-to-en">Vietnamese</option>
                </select>
              </div>

              {/* Topic Filter */}
              <div>
                <label className="block text-sm font-medium mb-2 text-muted-foreground">Topic</label>
                <select
                  value={selectedTopic}
                  onChange={(e) => setSelectedTopic(e.target.value)}
                  className="w-full px-4 py-2.5 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                >
                  <option value="all">All Topics</option>
                  {topics.map((topic) => (
                    <option key={topic} value={topic}>
                      {topic}
                    </option>
                  ))}
                </select>
              </div>

              {/* Difficulty Filter */}
              <div>
                <label className="block text-sm font-medium mb-2 text-muted-foreground">Difficulty</label>
                <select
                  value={selectedDifficulty}
                  onChange={(e) => setSelectedDifficulty(e.target.value)}
                  className="w-full px-4 py-2.5 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                >
                  <option value="all">All Levels</option>
                  <option value="A1">A1</option>
                  <option value="A2">A2</option>
                  <option value="B1">B1</option>
                  <option value="B2">B2</option>
                  <option value="C1">C1</option>
                  <option value="C2">C2</option>
                </select>
              </div>
            </div>

            {/* Results Count */}
            <div className="mt-4 pt-4 border-t border-border">
              <p className="text-sm text-muted-foreground">
                Showing <span className="font-semibold text-foreground">{filteredParagraphs.length}</span> of{" "}
                <span className="font-semibold text-foreground">{paragraphs.length}</span> paragraphs
              </p>
            </div>
          </div>

          {/* Paragraphs Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredParagraphs.map((paragraph) => (
              <Link
                key={paragraph.id}
                href={`/translation?id=${paragraph.id}`}
                className="group bg-card border border-border rounded-xl p-6 hover:border-primary/50 transition-all hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-1"
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors line-clamp-2">
                      {paragraph.title}
                    </h3>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                        />
                      </svg>
                      {paragraph.topic}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"
                        />
                      </svg>
                      {getLanguageLabel(paragraph.language)}
                    </div>
                  </div>
                </div>

                {/* Preview Text */}
                <p className="text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-3">
                  {paragraph.text.substring(0, 150)}...
                </p>

                {/* Footer */}
                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <div className="flex space-x-5">
                    <div className="flex items-center gap-2">
                      <span
                        className={`text-xs font-medium px-3 py-1 rounded-full border ${difficultyColors[paragraph.difficulty]}`}
                      >
                        {paragraph.difficulty}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                      </svg>
                      {paragraph.sentenceCount} sentences
                    </div>
                  </div>

                  <div className="flex items-center justify-end text-primary transition-opacity">
                    <span className="text-sm font-medium">Start Practice</span>
                    <svg className="w-5 h-5 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Empty State (if no paragraphs match filters) */}
          {filteredParagraphs.length === 0 && (
            <div className="text-center py-16">
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-muted flex items-center justify-center">
                <svg className="w-8 h-8 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <p className="text-foreground font-medium mb-2">No paragraphs found</p>
              <p className="text-muted-foreground text-sm mb-4">Try adjusting your filters to see more results</p>
              <button
                onClick={() => {
                  setSelectedLanguage("all")
                  setSelectedTopic("all")
                  setSelectedDifficulty("all")
                }}
                className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
              >
                Clear All Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
