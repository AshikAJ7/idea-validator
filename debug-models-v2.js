
// Testing multiple text generation models
import { HfInference } from "@huggingface/inference";
import dotenv from 'dotenv';
dotenv.config();

const hf = new HfInference(process.env.HF_API_KEY);
const models = ['gpt2', 'google/flan-t5-base'];

async function checkModels() {
    for (const m of models) {
        try {
            console.log(`Checking ${m}...`);
            await hf.textGeneration({
                model: m,
                inputs: 'Hello'
            });
            console.log(`${m} OK`);
        } catch (e) {
            console.log(`${m} Failed:`, e.message);
        }
    }
}

checkModels();
