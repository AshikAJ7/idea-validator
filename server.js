
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { HfInference } from "@huggingface/inference";

dotenv.config();

const app = express();
const port = 3000;

// Enable CORS for frontend
app.use(cors());
app.use(express.json());

const apiKey = process.env.HF_API_KEY;

if (!apiKey) {
    console.error("CRITICAL: HF_API_KEY is missing in .env");
    process.exit(1);
}

const hf = new HfInference(apiKey);

// Webhook Endpoint
app.post('/api/webhook', async (req, res) => {
    try {
        const { idea } = req.body;

        if (!idea) {
            return res.status(400).json({ error: "Missing 'idea' field in request body" });
        }

        console.log(`[Webhook] Received idea: ${idea.substring(0, 50)}...`);

        const response = await hf.chatCompletion({
            model: "Qwen/Qwen2.5-7B-Instruct",
            messages: [
                {
                    role: "user",
                    content: `You are an expert startup advisor. Analyze the following startup idea and provide feedback in a structured format, focusing on its Strengths, Weaknesses, and Improvement Suggestions. Be concise.

Idea: "${idea}"

Return ONLY a JSON object (no markdown, no other text) with these exact keys:
{
  "strengths": ["list of strengths"],
  "weaknesses": ["list of weaknesses"],
  "improvement_suggestions": ["list of improvement suggestions"]
}`
                }
            ],
            max_tokens: 1000,
            temperature: 0.7
        });

        const content = response.choices[0].message.content;

        // Clean the response text to ensure it's valid JSON
        const cleanedText = content
            .replace(/```json/g, '')
            .replace(/```/g, '')
            .trim();

        // Find the first '{' and last '}' to extract JSON
        const jsonStartIndex = cleanedText.indexOf('{');
        const jsonEndIndex = cleanedText.lastIndexOf('}');

        if (jsonStartIndex === -1 || jsonEndIndex === -1) {
            throw new Error("Failed to parse JSON from AI response");
        }

        const jsonString = cleanedText.substring(jsonStartIndex, jsonEndIndex + 1);
        const result = JSON.parse(jsonString);

        console.log("[Webhook] Analysis successful");
        res.status(200).json(result);

    } catch (error) {
        console.error("[Webhook] Error:", error);
        res.status(500).json({ error: "Internal Server Error", details: error.message });
    }
});

app.listen(port, () => {
    console.log(`Webhook server running at http://localhost:${port}`);
    console.log(`Endpoint: POST http://localhost:${port}/api/webhook`);
});
