import { GoogleGenAI } from "@google/genai";

export const handleChat = async (req, res) => {
  try {
    const { history, message } = req.body;

    if (
      !process.env.GEMINI_API_KEY ||
      process.env.GEMINI_API_KEY.trim() === ""
    ) {
      return res.status(500).json({
        error:
          "GEMINI_API_KEY is not configured in the backend. Please add it to your .env file.",
      });
    }

    if (!message) {
      return res.status(400).json({ error: "Message is required." });
    }

    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

    // Format history for Gemini API
    const formattedHistory = (history || []).map((msg) => ({
      role: msg.role === "user" ? "user" : "model",
      parts: [{ text: msg.text }],
    }));

    // Append current message
    const contents = [
      ...formattedHistory,
      { role: "user", parts: [{ text: message }] },
    ];

    const SYSTEM_INSTRUCTION = `You are the Arogyam Assistant, a highly helpful, empathetic, and professional healthcare chatbot designed specifically for the Arogyam platform.
Your purpose is to:
1. Guide users and help them understand general symptoms.
2. Provide health awareness and suggest relevant lifestyle improvements.
3. Clarify government health schemes when asked.
4. Maintain a polite, caring, and professional tone at all times.

IMPORTANT CONSTRAINTS:
- You are NOT a licensed medical doctor.
- You MUST NOT provide definitive medical diagnoses.
- For severe, critical, or life-threatening symptoms, you MUST strongly advise the user to seek immediate professional medical help or visit a hospital immediately.
- If asked about non-healthcare topics outside the scope of Arogyam, politely redirect the conversation back to health and wellness.`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: contents,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
      },
    });

    res.status(200).json({ reply: response.text });
  } catch (error) {
    console.error("Chatbot API Error:", error);
    res.status(500).json({ error: "Failed to generate response from the AI." });
  }
};
