import express from "express"; 
import OpenAI from "openai";
import cors from "cors"; // Add CORS
import dotenv from 'dotenv';

dotenv.config();

const apiKey = process.env.API_KEY;

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors()); // Use CORS middleware
app.use(express.json()); // Middleware to parse JSON

const openai = new OpenAI({
    apiKey: apiKey
});

// Uses OpenAi API to retrieve data from gpt-4 model
// Requries tokens (please dont spam im not rich)
async function fetchCompletion(prompt) {
    try {
        const completion = await openai.chat.completions.create({
            model: "gpt-4",
            messages: [
                { role: "user", content: prompt },
            ],
        });
        return completion.choices[0].message.content;
    } catch (error) {
        console.error("Error fetching completion:", error);
        return "Error fetching response.";
    }
}


// RESTful API
app.post("/ask", async (req, res) => {
    const question = req.body.question; 
    const answer = await fetchCompletion(question); 
    res.json({ answer });
});

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
