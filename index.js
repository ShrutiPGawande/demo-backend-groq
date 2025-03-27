import express from "express";
import Groq from "groq-sdk";


// Directly define the API key here (NOT RECOMMENDED for security reasons)
const API_KEY = "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";

const app = express();
const PORT = 3000;

const client = new Groq({
  apiKey: API_KEY, // Directly using the API key
});

app.use(express.json());

app.get("/hello", (req, res) => {
  res.status(200).json({ msg: "Hello World" });
});

app.post("/prompt", async (req, res) => {
  try {
    const userPrompt = req.body.prompt;
    if (!userPrompt) {
      return res
        .status(400)
        .json({ error: "Missing 'prompt' in request body" });
    }

    const chatCompletion = await client.chat.completions.create({
      model: "llama3-8b-8192",
      messages: [{ role: "user", content: userPrompt }],
    });

    res
      .status(200)
      .json({ response: chatCompletion.choices[0].message.content });
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});