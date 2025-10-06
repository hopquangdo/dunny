import type { Paragraph } from "./paragraphs-data"

const STORAGE_KEY = "custom-paragraphs"

export function getCustomParagraphs(): Paragraph[] {
    if (typeof window === "undefined") return []

    try {
        const stored = localStorage.getItem(STORAGE_KEY)
        return stored ? JSON.parse(stored) : []
    } catch (error) {
        return []
    }
}

export function saveCustomParagraph(paragraph: Paragraph): void {
    const customParagraphs = getCustomParagraphs()
    customParagraphs.push(paragraph)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(customParagraphs))
}

export function deleteCustomParagraph(id: string): void {
    const customParagraphs = getCustomParagraphs()
    const filtered = customParagraphs.filter((p) => p.id !== id)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered))
}

export function generateCustomParagraphId(): string {
    return `custom-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
}
