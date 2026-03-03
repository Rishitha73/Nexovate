const GEMINI_MODEL = process.env.GEMINI_MODEL || 'gemini-1.5-flash';

const buildPrompt = (message, history = []) => {
  const formattedHistory = history
    .slice(-8)
    .map((entry) => `${entry.role === 'assistant' ? 'Assistant' : 'User'}: ${entry.content}`)
    .join('\n');

  return [
    'You are Nexovate AI Assistant. Be concise, practical, and helpful for job/career guidance, dashboard usage, and profile help.',
    'If user asks outside product context, still help briefly in a friendly tone.',
    formattedHistory ? `Conversation so far:\n${formattedHistory}` : '',
    `User: ${message}`,
    'Assistant:'
  ]
    .filter(Boolean)
    .join('\n\n');
};

const sendMessage = async (req, res, next) => {
  try {
    const { message, history } = req.body;

    if (!message || typeof message !== 'string') {
      return res.status(400).json({ message: 'Message is required.' });
    }

    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({ message: 'Missing GEMINI_API_KEY in backend environment.' });
    }

    const prompt = buildPrompt(message.trim(), Array.isArray(history) ? history : []);
    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${process.env.GEMINI_API_KEY}`;

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        contents: [
          {
            role: 'user',
            parts: [{ text: prompt }]
          }
        ],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 600
        }
      })
    });

    const data = await response.json();

    if (!response.ok) {
      const errorText = data?.error?.message || 'Failed to get response from Gemini.';
      return res.status(response.status).json({ message: errorText });
    }

    const text =
      data?.candidates?.[0]?.content?.parts
        ?.map((part) => part.text)
        .filter(Boolean)
        .join('\n') || 'I could not generate a response right now.';

    return res.status(200).json({ reply: text });
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  sendMessage
};
