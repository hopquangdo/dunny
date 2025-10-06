"use client"

interface FeedbackData {
  overallScore: number
  semantics: { score: number; comment: string }
  grammar: { score: number; comment: string }
  vocabulary: { score: number; comment: string }
  suggestions: string[]
}

interface FeedbackPanelProps {
  feedback: FeedbackData | null
  isLoading: boolean
  onRetry: () => void
}

export function FeedbackPanel({ feedback, isLoading, onRetry }: FeedbackPanelProps) {
  console.log(feedback)
  return (
    <div className="bg-card border border-border rounded-xl p-6 lg:p-8 xl:sticky xl:top-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center">
          <svg className="w-5 h-5 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
            />
          </svg>
        </div>
        <h2 className="text-lg lg:text-xl font-semibold">AI Feedback</h2>
      </div>

      {!feedback && !isLoading && (
        <div className="text-center py-12 lg:py-16">
          <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-muted flex items-center justify-center">
            <svg className="w-8 h-8 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
              />
            </svg>
          </div>
          <p className="text-foreground font-medium mb-2">No feedback yet</p>
          <p className="text-muted-foreground text-sm">Submit your translation to receive AI-powered feedback</p>
        </div>
      )}

      {isLoading && (
        <div className="text-center py-12 lg:py-16">
          <div className="inline-block relative mb-4">
            <div className="w-16 h-16 border-4 border-muted rounded-full" />
            <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin absolute top-0 left-0" />
          </div>
          <p className="text-muted-foreground">Analyzing your translation...</p>
        </div>
      )}

      {feedback && (
        <div className="space-y-4">
          <div className="bg-gradient-to-br from-primary/10 to-secondary/10 border border-primary/20 rounded-xl p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-muted-foreground">Overall Score</span>
              <span className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                {feedback.overallScore}/10
              </span>
            </div>
            <div className="w-full bg-muted rounded-full h-2.5 overflow-hidden">
              <div
                className="bg-gradient-to-r from-primary to-secondary h-2.5 rounded-full transition-all duration-700 ease-out"
                style={{ width: `${feedback.overallScore * 10}%` }}
              />
            </div>
          </div>

          <div className="space-y-3">
            <div className="bg-muted/50 border border-border rounded-xl p-4 hover:border-success/50 transition-all">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-success" />
                  <span className="text-sm font-semibold">Semantics</span>
                </div>
                <span className="text-lg font-bold text-success">{feedback.semantics.score}/10</span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">{feedback.semantics.comment}</p>
            </div>

            <div className="bg-muted/50 border border-border rounded-xl p-4 hover:border-success/50 transition-all">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-success" />
                  <span className="text-sm font-semibold">Grammar</span>
                </div>
                <span className="text-lg font-bold text-primary">{feedback.grammar.score}/10</span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">{feedback.grammar.comment}</p>
            </div>


            <div className="bg-muted/50 border border-border rounded-xl p-4 hover:border-secondary/50 transition-all">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-secondary" />
                  <span className="text-sm font-semibold">Vocabulary</span>
                </div>
                <span className="text-lg font-bold text-secondary">{feedback.vocabulary.score}/10</span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">{feedback.vocabulary.comment}</p>
            </div>
          </div>

          <div className="bg-muted/50 border border-border rounded-xl p-4">
            <div className="flex items-center gap-2 mb-3">
              <svg className="w-4 h-4 text-warning" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span className="text-sm font-semibold">Suggestions</span>
            </div>
            <ul className="space-y-2">
              {feedback.suggestions.map((suggestion, index) => (
                <li key={index} className="flex gap-2 text-sm text-muted-foreground">
                  <span className="text-warning mt-0.5 flex-shrink-0">•</span>
                  <span className="leading-relaxed">{suggestion}</span>
                </li>
              ))}
            </ul>
          </div>

          {feedback.overallScore < 7 && (
            <button
              onClick={onRetry}
              className="w-full px-4 py-2.5 rounded-lg font-medium bg-muted hover:bg-muted/80 transition-all border border-border hover:border-primary/50 flex items-center justify-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
              Try Again
            </button>
          )}
        </div>
      )}
    </div>
  )
}
