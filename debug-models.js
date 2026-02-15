
// Testing simple model availability check
import { HfInference } from "@huggingface/inference";
import dotenv from 'dotenv';
dotenv.config();

const hf = new HfInference(process.env.HF_API_KEY);

async function checkModel() {
    try {
        // Just a simple generation task to see if model is alive
        await hf.textGeneration({
            model: 'google/flan-t5-small',
            inputs: 'Hello'
        });
        console.log("Flan T5 is alive");
    } catch (e) {
        console.log("Flan T5 failed", e.message);
    }
}

checkModel();
