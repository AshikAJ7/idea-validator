
import { HfInference } from "@huggingface/inference";
import dotenv from 'dotenv';
dotenv.config();

const apiKey = process.env.HF_API_KEY;
const hf = new HfInference(apiKey);

const candidates = [
    'HuggingFaceH4/zephyr-7b-beta',
    'meta-llama/Llama-3.2-3B-Instruct',
    'microsoft/Phi-3-mini-4k-instruct',
    'Qwen/Qwen2.5-7B-Instruct'
];

async function test() {
    console.log("Testing HfInference SDK with multiple models...");

    for (const model of candidates) {
        console.log(`\nTrying ${model}...`);
        try {
            const result = await hf.chatCompletion({
                model: model,
                messages: [{ role: "user", content: "Hello!" }],
                max_tokens: 10
            });
            console.log(`Success with ${model}!`);
            console.log(JSON.stringify(result, null, 2));
            return;
        } catch (err) {
            const msg = err.body?.error?.message || err.message || JSON.stringify(err);
            console.log(`Failed: ${msg}`);
        }
    }
}

test();
