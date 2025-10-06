import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

// Khởi tạo client
const ai = new GoogleGenAI({});

export async function POST(req: NextRequest) {
    try {
        const { originalSentence, userTranslation, context, direction } = await req.json();

        const isEnToVi = direction === "en-to-vi";
        const langFrom = isEnToVi ? "English" : "Vietnamese";
        const langTo = isEnToVi ? "Vietnamese" : "English";

        const prompt = `
You are a professional ${langTo} teacher. Evaluate the student's translation from ${langFrom} to ${langTo}.

Original sentence (${langFrom}): "${originalSentence}"
Context (previous sentences): "${context}"
Student's translation (${langTo}): "${userTranslation}"

You must respond with strictly valid JSON only. No extra text or markdown.
Be very strict: the translation must fully capture the meaning of the original sentence to score above 5 in overallScore. Grammar and vocabulary must be natural and correct to score above 5 in their categories.

Check the following for each sentence:
1. Semantics (meaning accuracy): award points only if the full meaning is preserved.
2. Grammar: check ${langTo} sentence structure, word order, and verb tenses if applicable.
3. Vocabulary: check choice of words; penalize word-for-word translation or unnatural words.
4. Tenses: explicitly mention if verb tenses in ${langTo} match or reflect the meaning of ${langFrom}.
5. Suggestions: give 2–3 actionable suggestions in ${langTo} for improvement.

Output JSON strictly in this format:

{
  "overallScore": <number 0-10>,
  "semantics": { "score": <number 0-10>, "comment": "<evaluation of meaning accuracy in ${langTo}>" },
  "grammar": { "score": <number 0-10>, "comment": "<evaluation of grammar correctness in ${langTo}>" },
  "vocabulary": { "score": <number 0-10>, "comment": "<evaluation of word choice in ${langTo}>" },
  "tenses": { "score": <number 0-10>, "comment": "<evaluation of tense usage in ${langTo}>" },
  "suggestions": ["<suggestion 1 in ${langTo}>", "<suggestion 2 in ${langTo}>"]
}

All comments and suggestions must be written in Vietnamese. Be strict in scoring. No extra text or markdown.
`;

        const result = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt
        });

        let feedback;
        try {
            const cleanedText = (result.text ?? "")
                .trim()
                .replace(/^```json\s*/, "")
                .replace(/```$/, "")
                .trim();
            feedback = JSON.parse(cleanedText);
        } catch (err) {
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
        return NextResponse.json({ error: "Unable to evaluate translation" }, { status: 500 });
    }
}
