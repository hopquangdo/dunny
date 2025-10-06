"use client"

interface ParagraphDisplayProps {
  sentences: string[]
  currentSentenceIndex: number
  submittedTranslations: { [key: number]: string }
  showOriginal: boolean
  onToggleOriginal: () => void
}

export function ParagraphDisplay({
  sentences,
  currentSentenceIndex,
  submittedTranslations,
  showOriginal,
  onToggleOriginal,
}: ParagraphDisplayProps) {
  return (
    <div className="bg-card border border-border rounded-xl p-6 lg:p-8 transition-all hover:border-primary/50">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
              />
            </svg>
          </div>
          <h2 className="text-lg lg:text-xl font-semibold">Paragraph</h2>
        </div>
        {Object.keys(submittedTranslations).length > 0 && (
          <button
            onClick={onToggleOriginal}
            className="text-sm px-4 py-2 rounded-lg bg-muted hover:bg-muted/80 text-foreground transition-all border border-border hover:border-primary/50 font-medium"
          >
            {showOriginal ? "Show Translations" : "Show Original"}
          </button>
        )}
      </div>
      <div className="text-base lg:text-lg leading-relaxed">
        {sentences.map((sentence, index) => {
          const displayText = !showOriginal && submittedTranslations[index] ? submittedTranslations[index] : sentence
          const isTranslated = submittedTranslations[index] !== undefined

          return (
            <span
              key={index}
              className={`transition-all duration-300 ${index === currentSentenceIndex
                  ? "text-primary font-medium"
                  : isTranslated && !showOriginal
                    ? "text-success"
                    : index < currentSentenceIndex
                      ? "text-muted-foreground/50"
                      : "text-muted-foreground"
                }`}
            >
              {displayText}{" "}
            </span>
          )
        })}
      </div>
    </div>
  )
}
