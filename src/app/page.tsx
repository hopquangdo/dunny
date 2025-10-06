"use client"

import type React from "react"

import { useState } from "react"
import { cleanSentence } from "@/helps/clean-sentence"

const sampleParagraphText = `The importance of learning English cannot be overstated in today's globalized world. English serves as a bridge connecting people from different cultures and backgrounds. It opens doors to countless opportunities in education, career advancement, and personal growth. By mastering English, individuals gain access to a vast repository of knowledge, literature, and scientific research. Moreover, English proficiency enhances one's ability to communicate effectively in international settings, making it an invaluable skill in the modern era.`

const sampleParagraph = sampleParagraphText.split(". ").map((s) => s.trim() + (s.endsWith(".") ? "" : "."))

interface FeedbackData {
  overallScore: number
  semantics: { score: number; comment: string }
  grammar: { score: number; comment: string }
  vocabulary: { score: number; comment: string }
  suggestions: string[]
}


export default function TranslationPracticePage() {
  const [currentSentenceIndex, setCurrentSentenceIndex] = useState(0)
  const [userTranslation, setUserTranslation] = useState("")
  const [feedback, setFeedback] = useState<FeedbackData | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [submittedTranslations, setSubmittedTranslations] = useState<{ [key: number]: string }>({})
  const [showOriginal, setShowOriginal] = useState(false)


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
          originalSentence: sampleParagraph[currentSentenceIndex],
          userTranslation: cleanedTranslation,
          context: sampleParagraph
            .slice(0, currentSentenceIndex)
            .map((s, i) => submittedTranslations[i] || "")
            .join(" "),
        }),
      })

      const data = await response.json()
      const feedbackData: FeedbackData = data.feedback;
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
    if (currentSentenceIndex < sampleParagraph.length - 1) {
      setCurrentSentenceIndex(currentSentenceIndex + 1)
      setUserTranslation(submittedTranslations[currentSentenceIndex + 1] || "")
      setFeedback(null)
    }
  }

  const handleRetry = () => {
    setUserTranslation("")
    setFeedback(null)
  }


  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 text-center">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-500 via-purple-500 to-blue-600 bg-clip-text text-transparent mb-3">
            English Writing Practice
          </h1>
          <p className="text-gray-400 text-lg">Practice English writing with AI assistance</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                    />
                  </svg>
                  <h2 className="text-lg font-semibold text-white">Sample Paragraph</h2>
                </div>
                {Object.keys(submittedTranslations).length > 0 && (
                  <button
                    onClick={() => setShowOriginal(!showOriginal)}
                    className="text-sm px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-gray-300 transition-colors border border-zinc-700"
                  >
                    {showOriginal ? "Show Translations" : "Show Original"}
                  </button>
                )}
              </div>
              <div className="text-base leading-relaxed">
                {sampleParagraph.map((sentence, index) => {
                  const displayText =
                    !showOriginal && submittedTranslations[index] ? submittedTranslations[index] : sentence
                  const isTranslated = submittedTranslations[index] !== undefined

                  return (
                    <span
                      key={index}
                      className={`transition-all duration-300 ${index === currentSentenceIndex
                        ? "text-red-400 font-medium"
                        : isTranslated && !showOriginal
                          ? "text-green-400"
                          : index < currentSentenceIndex
                            ? "text-gray-600"
                            : "text-gray-400"
                        }`}
                    >
                      {displayText}{" "}
                    </span>
                  )
                })}
              </div>
            </div>

            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
              <h2 className="text-lg font-semibold text-white mb-4">Translate the paragraph (sentence by sentence)</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <textarea
                    value={userTranslation}
                    onChange={(e) => setUserTranslation(e.target.value)}
                    placeholder="Translate each sentence in your own words..."
                    className="w-full min-h-[200px] p-4 bg-zinc-950 border border-zinc-800 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all resize-none text-white placeholder:text-gray-600"
                    disabled={isLoading}
                  />
                </div>
                <div className="flex flex-col space-y-2 sm:flex-row items-center justify-between">
                  <span className="text-sm text-gray-500">
                    Sentence {currentSentenceIndex + 1}/{sampleParagraph.length}
                  </span>
                  <div className="flex gap-3">
                    {currentSentenceIndex > 0 && !isLoading && (
                      <button
                        type="button"
                        onClick={handlePreviousSentence}
                        className="px-5 py-2.5 rounded-lg font-medium bg-zinc-800 text-white hover:bg-zinc-700 transition-colors border border-zinc-700"
                      >
                        Previous Sentence
                      </button>
                    )}

                    {currentSentenceIndex < sampleParagraph.length - 1 && (
                      <button
                        type="button"
                        onClick={handleNextSentence}
                        className="px-5 py-2.5 rounded-lg font-medium bg-zinc-800 text-white hover:bg-zinc-700 transition-colors border border-zinc-700"
                      >
                        Next Sentence
                      </button>
                    )}


                    <button
                      type="submit"
                      disabled={isLoading || !userTranslation.trim()}
                      className="flex items-center gap-2 px-5 py-2.5 rounded-lg font-medium bg-blue-600 text-white hover:bg-blue-700 disabled:bg-zinc-800 disabled:text-gray-600 disabled:cursor-not-allowed transition-colors"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                        />
                      </svg>
                      {isLoading ? "Processing..." : "Get Feedback"}
                    </button>

                  </div>
                </div>
              </form>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 sticky top-6">
              <div className="flex items-center gap-2 mb-6">
                <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                  />
                </svg>
                <h2 className="text-lg font-semibold text-white">AI Feedback</h2>
              </div>
              {!feedback && !isLoading && (
                <div className="text-center py-16">
                  <svg
                    className="w-16 h-16 mx-auto mb-4 text-gray-700"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                    />
                  </svg>
                  <p className="text-gray-500 font-medium mb-2">No feedback yet</p>
                  <p className="text-gray-600 text-sm">
                    Write your translation and click "Get Feedback" to see AI response
                  </p>
                </div>
              )}
              {isLoading && (
                <div className="text-center py-16">
                  <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-gray-700 border-t-blue-500 mb-4"></div>
                  <p className="text-gray-500">Analyzing your translation...</p>
                </div>
              )}
              {feedback && (
                <div className="space-y-4">
                  {/* Overall Score */}
                  <div className="bg-gradient-to-br from-blue-950 to-purple-950 border border-blue-800 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-blue-300">Overall Score</span>
                      <span className="text-2xl font-bold text-white">{feedback.overallScore}/10</span>
                    </div>
                    <div className="w-full bg-zinc-800 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${feedback.overallScore * 10}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Semantics */}
                  <div className="bg-zinc-950 border border-zinc-800 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-green-500"></div>
                        <span className="text-sm font-semibold text-white">Semantics</span>
                      </div>
                      <span className="text-lg font-bold text-green-400">{feedback.semantics.score}/10</span>
                    </div>
                    <p className="text-sm text-gray-400 leading-relaxed">{feedback.semantics.comment}</p>
                  </div>

                  {/* Grammar */}
                  <div className="bg-zinc-950 border border-zinc-800 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                        <span className="text-sm font-semibold text-white">Grammar</span>
                      </div>
                      <span className="text-lg font-bold text-blue-400">{feedback.grammar.score}/10</span>
                    </div>
                    <p className="text-sm text-gray-400 leading-relaxed">{feedback.grammar.comment}</p>
                  </div>

                  {/* Vocabulary */}
                  <div className="bg-zinc-950 border border-zinc-800 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                        <span className="text-sm font-semibold text-white">Vocabulary</span>
                      </div>
                      <span className="text-lg font-bold text-purple-400">{feedback.vocabulary.score}/10</span>
                    </div>
                    <p className="text-sm text-gray-400 leading-relaxed">{feedback.vocabulary.comment}</p>
                  </div>

                  {/* Suggestions */}
                  <div className="bg-zinc-950 border border-zinc-800 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <svg className="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span className="text-sm font-semibold text-white">Suggestions</span>
                    </div>
                    <ul className="space-y-2">
                      {feedback.suggestions.map((suggestion, index) => (
                        <li key={index} className="flex gap-2 text-sm text-gray-400">
                          <span className="text-yellow-500 mt-0.5">•</span>
                          <span className="leading-relaxed">{suggestion}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
