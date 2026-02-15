
import { HfInference } from "@huggingface/inference";
import dotenv from 'dotenv';
dotenv.config();

const apiKey = process.env.HF_API_KEY;
const hf = new HfInference(apiKey);

async function test() {
    console.log("Testing HfInference SDK...");
    try {
        const result = await hf.chatCompletion({
            model: 'mistralai/Mistral-7B-Instruct-v0.3',
            messages: [{ role: "user", content: "Hello, world!" }],
            max_tokens: 20
        });
        console.log("Success:", result);
    } catch (err) {
        console.error("Error:", err);
    }
}

test();
