import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

// Khởi tạo client
const ai = new GoogleGenAI({});

export async function POST(req: NextRequest) {
    try {
        const { originalSentence, userTranslation, context } = await req.json();

        const prompt = `
You are a professional English teacher. Evaluate the student's Vietnamese translation of an English sentence.

Original sentence (English): "${originalSentence}"
Context các câu trước: "${context}"
Student's translation (Vietnamese): "${userTranslation}"

You **must respond with strictly valid JSON only**. No extra text or markdown. The JSON format must be:

{
  "overallScore": <number 0-10>,
  "semantics": { "score": <number 0-10>, "comment": "<evaluation of meaning accuracy>" },
  "grammar": { "score": <number 0-10>, "comment": "<evaluation of grammar correctness>" },
  "vocabulary": { "score": <number 0-10>, "comment": "<evaluation of word choice>" },
  "suggestions": ["<suggestion 1>", "<suggestion 2>"]
}

NOTE: The "comment" and "suggestions" fields **must be written in Vietnamese**. No extra text or markdown.
`;

        const result = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt
        });

        // Parse JSON an toàn
        let feedback;
        try {
            const cleanedText = (result.text ?? "")
                .trim()
                .replace(/^```json\s*/, "")
                .replace(/```$/, "")
                .trim();
            feedback = JSON.parse(cleanedText);
        } catch (err) {
            console.error("LLM response parsing error:", err, result.text);
            feedback = {
                overallScore: 0,
                semantics: { score: 0, comment: "Invalid response" },
                grammar: { score: 0, comment: "Invalid response" },
                vocabulary: { score: 0, comment: "Invalid response" },
                suggestions: [],
            };
        }

        return NextResponse.json({ feedback });
    } catch (error) {
        console.error("Error evaluating translation:", error);
        return NextResponse.json({ error: "Unable to evaluate translation" }, { status: 500 });
    }
}
