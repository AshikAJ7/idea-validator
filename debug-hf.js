
import dotenv from 'dotenv';
dotenv.config();

const API_KEY = process.env.HF_API_KEY;

async function test() {
    console.log("Testing Direct HTTP Fetch...");
    try {
        const response = await fetch(
            "https://api-inference.huggingface.co/models/google/gemma-2-2b-it",
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
