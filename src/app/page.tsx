import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="fixed inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 pointer-events-none" />

      <div className="relative">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
          <div className="text-center mb-16 lg:mb-24">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-balance mb-6 leading-tight">
              Master English Writing
              <br />
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                with AI Feedback
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-muted-foreground text-balance max-w-2xl mx-auto mb-10 leading-relaxed">
              Practice translating English paragraphs sentence by sentence and receive instant, detailed feedback on
              your semantics, grammar, and vocabulary.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/paragraphs"
                className="px-8 py-4 rounded-xl font-semibold bg-primary hover:bg-primary/90 text-primary-foreground transition-all flex items-center gap-2 shadow-lg shadow-primary/20 hover:shadow-primary/30 hover:scale-105"
              >
                Start Practicing
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>

              <Link
                href="#features"
                className="px-8 py-4 rounded-xl font-semibold bg-muted hover:bg-muted/80 text-foreground transition-all border border-border hover:border-primary/50"
              >
                Learn More
              </Link>
            </div>
          </div>

          {/* Features Section */}
          <div id="features" className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-16">
            {/* Feature 1 */}
            <div className="bg-card border border-border rounded-xl p-6 lg:p-8 hover:border-primary/50 transition-all group">
              <h3 className="text-xl font-semibold mb-3">AI-Powered Feedback</h3>
              <p className="text-muted-foreground leading-relaxed">
                Get instant, detailed analysis of your translations with scores for semantics, grammar, and vocabulary.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-card border border-border rounded-xl p-6 lg:p-8 hover:border-primary/50 transition-all group">
              <h3 className="text-xl font-semibold mb-3">Sentence-by-Sentence</h3>
              <p className="text-muted-foreground leading-relaxed">
                Practice translating one sentence at a time to build confidence and improve your writing skills
                gradually.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-card border border-border rounded-xl p-6 lg:p-8 hover:border-primary/50 transition-all group">
              <h3 className="text-xl font-semibold mb-3">Track Progress</h3>
              <p className="text-muted-foreground leading-relaxed">
                Monitor your improvement with visual progress indicators and completion tracking for each paragraph.
              </p>
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-gradient-to-br from-primary/10 to-secondary/10 border border-primary/20 rounded-2xl p-8 lg:p-12 text-center">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 text-balance">
              Ready to improve your English?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 text-balance max-w-2xl mx-auto">
              Choose from a variety of paragraphs and start practicing today. Get personalized feedback on every
              translation.
            </p>
            <Link
              href="/paragraphs"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold bg-primary hover:bg-primary/90 text-primary-foreground transition-all shadow-lg shadow-primary/20 hover:shadow-primary/30 hover:scale-105"
            >
              Browse Paragraphs
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
