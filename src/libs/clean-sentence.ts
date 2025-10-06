export function cleanSentence(sentence: string): string {
    let cleaned = sentence.replace(/\s{2,}/g, " ");
    cleaned = cleaned.trim();
    if (!/[.!?]$/.test(cleaned)) cleaned += ".";
    return cleaned;
}
