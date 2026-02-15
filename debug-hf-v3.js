
import dotenv from 'dotenv';
dotenv.config();

const API_KEY = process.env.HF_API_KEY;

// V3: Trying Chat Completion endpoint manually
async function test() {
    console.log("Testing Direct HTTP Fetch (V3)...");
    try {
        const response = await fetch(
            "https://api-inference.huggingface.co/models/meta-llama/Llama-3.2-3B-Instruct/v1/chat/completions",
            {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${API_KEY}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    model: "meta-llama/Llama-3.2-3B-Instruct",
                    messages: [{ role: "user", content: "Hello" }],
                    max_tokens: 10
                })
            }
        );

        console.log("Status:", response.status);
        const text = await response.text();
        console.log("Result:", text);
    } catch (e) {
        console.error("Error:", e);
    }
}

test();
