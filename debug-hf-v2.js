
import dotenv from 'dotenv';
dotenv.config();

const API_KEY = process.env.HF_API_KEY;

// V2: Trying a different model endpoint
async function test() {
    console.log("Testing Direct HTTP Fetch (V2)...");
    try {
        const response = await fetch(
            "https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.3",
            {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${API_KEY}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ inputs: "Hello world" })
            }
        );

        console.log("Status:", response.status);
        const data = await response.json();
        console.log("Data:", data);
    } catch (e) {
        console.error("Error:", e);
    }
}

test();
