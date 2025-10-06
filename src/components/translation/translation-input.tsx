"use client"

import type React from "react"

interface TranslationInputProps {
  userTranslation: string
  isLoading: boolean
  currentSentenceIndex: number
  totalSentences: number
  onTranslationChange: (value: string) => void
  onSubmit: (e: React.FormEvent) => void
  onPrevious: () => void
  onNext: () => void
  canGoPrevious: boolean
  canGoNext: boolean
}

export function TranslationInput({
  userTranslation,
  isLoading,
  currentSentenceIndex,
  totalSentences,
  onTranslationChange,
  onSubmit,
  onPrevious,
  onNext,
  canGoPrevious,
  canGoNext,
}: TranslationInputProps) {
  return (
    <div className="bg-card border border-border rounded-xl p-6 lg:p-8 transition-all hover:border-primary/50">
      <h2 className="text-lg lg:text-xl font-semibold mb-6">Your Translation</h2>
      <form onSubmit={onSubmit} className="space-y-6">
        <div>
          <textarea
            value={userTranslation}
            onChange={(e) => onTranslationChange(e.target.value)}
            placeholder="Translate the highlighted sentence in your own words..."
            className="w-full min-h-[180px] lg:min-h-[200px] p-4 bg-muted border border-border rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all resize-none placeholder:text-muted-foreground text-base"
            disabled={isLoading}
          />
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span>
              Sentence {currentSentenceIndex + 1} of {totalSentences}
            </span>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            {canGoPrevious && !isLoading && (
              <button
                type="button"
                onClick={onPrevious}
                className="px-5 py-2.5 rounded-lg font-medium bg-muted hover:bg-muted/80 transition-all border border-border hover:border-primary/50 flex items-center justify-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Previous
              </button>
            )}

            {canGoNext && (
              <button
                type="button"
                onClick={onNext}
                className="px-5 py-2.5 rounded-lg font-medium bg-muted hover:bg-muted/80 transition-all border border-border hover:border-primary/50 flex items-center justify-center gap-2"
              >
                Next
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            )}

            <button
              type="submit"
              disabled={isLoading || !userTranslation.trim()}
              className="px-6 py-2.5 rounded-lg font-medium bg-primary hover:bg-primary/90 text-primary-foreground disabled:bg-muted disabled:text-muted-foreground disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2 shadow-lg shadow-primary/20 hover:shadow-primary/30"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                    />
                  </svg>
                  Get Feedback
                </>
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}
