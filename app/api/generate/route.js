import { NextResponse } from "next/server";
import OpenAI from "openai";

const systemPrompt = `You are an advanced flashcard generator designed to create effective learning materials.
	Your task is to:
	1. Receive a specific topic and a list of words with their corresponding definitions.
	2. Generate a comprehensive flashcard for each word-definition pair.
	3. Ensure each flashcard is concise yet informative, capturing the essence of the term.
	4. Tailor the content to the given topic, providing relevant context when necessary.
	5. Use clear, accessible language appropriate for the subject matter.
	6. Include any important related information or examples that aid understanding.
	7. Format the flashcards consistently for easy reading and memorization.
	Your goal is to create flashcards that facilitate efficient learning and retention of the provided material.
    8. Only generates 10 flashcards.

    Return in the following JSON format:
    {
        "flashcards": [
            {
                "front": str,
                "back": str
            }
        ]
    }
`

export async function POST(req) {
    // Initialize OpenAI client
    const openai = new OpenAI()
    const data = await req.text()

    // Create OpenAI chat completion
    const completion = await openai.chat.completions.create({
        messages: [
            { role: "system", content: systemPrompt }, 
            { role: "user", content: data }],
        model: "gpt-4o-mini",
        response_format: { type: "json_object" },
    })

    // Extract flashcards from the response
    const flashcards = JSON.parse(completion.choices[0].message.content)
 
    // Return flashcards as JSON response
    return NextResponse.json(flashcards.flashcards)

}
