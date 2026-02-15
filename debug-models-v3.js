
// Testing embedding models
import { HfInference } from "@huggingface/inference";
import dotenv from 'dotenv';
dotenv.config();

const hf = new HfInference(process.env.HF_API_KEY);

async function checkEmbeddings() {
    try {
        console.log("Checking feature extraction...");
        const res = await hf.featureExtraction({
            model: 'sentence-transformers/all-MiniLM-L6-v2',
            inputs: 'Hello world'
        });
        console.log("Embedding generated, length:", res.length);
    } catch (e) {
        console.log("Embedding failed:", e.message);
    }
}

checkEmbeddings();
