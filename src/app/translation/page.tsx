"use client"

import type React from "react"
import { useState, useEffect, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { cleanSentence } from "@/libs/clean-sentence"
import { getParagraphById, paragraphs } from "@/libs/paragraphs-data"
import { ProgressHeader } from "@/components/translation/progress-header"
import { ParagraphDisplay } from "@/components/translation/paragraph-display"
import { TranslationInput } from "@/components/translation/translation-input"
import { FeedbackPanel } from "@/components/translation/feedback-panel"

interface FeedbackData {
  overallScore: number
  semantics: { score: number; comment: string }
  grammar: { score: number; comment: string }
  vocabulary: { score: number; comment: string }
  suggestions: string[]
}

function TranslationPracticeContent() {
  const searchParams = useSearchParams()
  const paragraphId = searchParams.get("id")

  const selectedParagraph = paragraphId ? getParagraphById(paragraphId) : paragraphs[0]
  const sentences = selectedParagraph
    ? selectedParagraph.text.split(". ").map((s) => s.trim() + (s.endsWith(".") ? "" : "."))
    : []

  const [currentSentenceIndex, setCurrentSentenceIndex] = useState(0)
  const [userTranslation, setUserTranslation] = useState("")
  const [feedback, setFeedback] = useState<FeedbackData | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [submittedTranslations, setSubmittedTranslations] = useState<{ [key: number]: string }>({})
  const [showOriginal, setShowOriginal] = useState(false)

  useEffect(() => {
    setCurrentSentenceIndex(0)
    setUserTranslation("")
    setFeedback(null)
    setSubmittedTranslations({})
    setShowOriginal(false)
  }, [paragraphId])

  if (!selectedParagraph) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-destructive/10 flex items-center justify-center">
            <svg className="w-8 h-8 text-destructive" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold mb-2">Paragraph Not Found</h2>
          <p className="text-muted-foreground mb-6">The paragraph you're looking for doesn't exist.</p>
          <Link
            href="/paragraphs"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-medium bg-primary hover:bg-primary/90 text-primary-foreground transition-all"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Browse Paragraphs
          </Link>
        </div>
      </div>
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!userTranslation.trim()) return

    const cleanedTranslation = cleanSentence(userTranslation)

    setIsLoading(true)
    setFeedback(null)

    try {
      const response = await fetch("/api/feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          originalSentence: sentences[currentSentenceIndex],
          userTranslation: cleanedTranslation,
          context: sentences
            .slice(0, currentSentenceIndex)
            .map((s, i) => submittedTranslations[i] || "")
            .join(" "),
          direction: selectedParagraph.language,
        }),
      })

      const data = await response.json()
      const feedbackData: FeedbackData = data.feedback
      setFeedback(feedbackData)
      if (feedbackData.overallScore >= 5) {
        setSubmittedTranslations((prev) => ({
          ...prev,
          [currentSentenceIndex]: cleanedTranslation,
        }))
      }
    } catch (error) {
      setSubmittedTranslations((prev) => ({
        ...prev,
        [currentSentenceIndex]: cleanedTranslation,
      }))
    } finally {
      setIsLoading(false)
    }
  }

  const handlePreviousSentence = () => {
    if (currentSentenceIndex > 0) {
      setCurrentSentenceIndex(currentSentenceIndex - 1)
      setUserTranslation(submittedTranslations[currentSentenceIndex - 1] || "")
      setFeedback(null)
    }
  }

  const handleNextSentence = () => {
    if (currentSentenceIndex < sentences.length - 1) {
      setCurrentSentenceIndex(currentSentenceIndex + 1)
      setUserTranslation(submittedTranslations[currentSentenceIndex + 1] || "")
      setFeedback(null)
    }
  }

  const handleRetry = () => {
    setUserTranslation("")
    setFeedback(null)
  }

  const progress = ((Object.keys(submittedTranslations).length / sentences.length) * 100).toFixed(0)

  const currentIndex = paragraphs.findIndex((p) => p.id === selectedParagraph.id)
  const previousParagraph = currentIndex > 0 ? paragraphs[currentIndex - 1] : null
  const nextParagraph = currentIndex < paragraphs.length - 1 ? paragraphs[currentIndex + 1] : null
  const hasSubmitted = submittedTranslations && Object.keys(submittedTranslations).length > 0;

  return (
    <div className="min-h-screen bg-background">
      <div className="fixed inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 pointer-events-none" />

      <div className="relative">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
          <ProgressHeader
            progress={progress}
            paragraphTitle={selectedParagraph.title}
            paragraphTopic={selectedParagraph.topic}
          />

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 lg:gap-8">
            <div className="xl:col-span-2 space-y-6">
              {(previousParagraph || nextParagraph) && (
                <div className="bg-card border border-border rounded-xl p-6">
                  {/* <h3 className="text-sm font-semibold text-muted-foreground mb-4">Switch Paragraph</h3> */}
                  <div className="flex flex-col sm:flex-row gap-3">
                    {previousParagraph && (
                      <Link
                        href={`/translation?id=${previousParagraph.id}`}
                        className="flex-1 group bg-muted hover:bg-muted/80 border border-border hover:border-primary/50 rounded-lg p-4 transition-all"
                      >
                        <div className="flex items-center gap-3">
                          <svg
                            className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                          </svg>
                          <div className="flex-1 min-w-0">
                            <p className="text-xs text-muted-foreground mb-1">Previous</p>
                            <p className="text-sm font-medium truncate group-hover:text-primary transition-colors">
                              {previousParagraph.title}
                            </p>
                          </div>
                        </div>
                      </Link>
                    )}
                    {nextParagraph && (
                      <Link
                        href={`/translation?id=${nextParagraph.id}`}
                        className="flex-1 group bg-muted hover:bg-muted/80 border border-border hover:border-primary/50 rounded-lg p-4 transition-all"
                      >
                        <div className="flex items-center gap-3">
                          <div className="flex-1 min-w-0">
                            <p className="text-xs text-muted-foreground mb-1">Next</p>
                            <p className="text-sm font-medium truncate group-hover:text-primary transition-colors">
                              {nextParagraph.title}
                            </p>
                          </div>
                          <svg
                            className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      </Link>
                    )}
                  </div>
                </div>
              )}
              <ParagraphDisplay
                sentences={sentences}
                currentSentenceIndex={currentSentenceIndex}
                submittedTranslations={submittedTranslations}
                showOriginal={showOriginal}
                onToggleOriginal={() => setShowOriginal(!showOriginal)}
              />

              <TranslationInput
                userTranslation={userTranslation}
                isLoading={isLoading}
                currentSentenceIndex={currentSentenceIndex}
                totalSentences={sentences.length}
                onTranslationChange={setUserTranslation}
                onSubmit={handleSubmit}
                onPrevious={handlePreviousSentence}
                onNext={handleNextSentence}
                canGoPrevious={currentSentenceIndex > 0}
                canGoNext={hasSubmitted && currentSentenceIndex < sentences.length - 1}
              />
            </div>

            <div className="xl:col-span-1">
              <FeedbackPanel feedback={feedback} isLoading={isLoading} onRetry={handleRetry} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function TranslationPracticePage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-background flex items-center justify-center">
          <div className="inline-block relative">
            <div className="w-16 h-16 border-4 border-muted rounded-full" />
            <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin absolute top-0 left-0" />
          </div>
        </div>
      }
    >
      <TranslationPracticeContent />
    </Suspense>
  )
}
