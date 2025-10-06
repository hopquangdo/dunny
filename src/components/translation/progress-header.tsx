import Link from "next/link"

interface ProgressHeaderProps {
  progress: string
  paragraphTitle?: string
  paragraphTopic?: string
}

export function ProgressHeader({ progress, paragraphTitle, paragraphTopic }: ProgressHeaderProps) {
  return (
    <div className="mb-8 lg:mb-12">
      <Link
        href="/paragraphs"
        className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back to Paragraphs
      </Link>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          {paragraphTitle ? (
            <>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-balance mb-2">{paragraphTitle}</h1>
              {paragraphTopic && (
                <div className="flex items-center gap-2 text-muted-foreground text-base sm:text-lg mb-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                    />
                  </svg>
                  {paragraphTopic}
                </div>
              )}
              <p className="text-muted-foreground text-base sm:text-lg">
                Practice English writing with AI-powered feedback
              </p>
            </>
          ) : (
            <>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-balance mb-2">English Writing Practice</h1>
              <p className="text-muted-foreground text-base sm:text-lg">
                Practice English writing with AI-powered feedback
              </p>
            </>
          )}
        </div>

        <div className="flex items-center gap-3 px-4 py-2 bg-card border border-border rounded-xl">
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span className="text-sm font-medium">{progress}% Complete</span>
          </div>
        </div>
      </div>

      <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  )
}
