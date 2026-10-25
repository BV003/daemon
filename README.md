# Daemon

An AI front desk for you. People chat with your daemon first; it answers from your profile, and sends you a summary of who came by and what they want.

## Usage

```bash
git clone https://github.com/BV003/daemon.git
cd daemon
npm install

cp .env.example .env              # add your ANTHROPIC_API_KEY
cp profile.example.md profile.md  # write your own profile

npm start                         # open http://localhost:3000
```

Summaries print in the terminal. To get them on Telegram, set `TELEGRAM_BOT_TOKEN` and `TELEGRAM_CHAT_ID` in `.env`.

Uses Claude by default. For another model, ask your coding agent: "Read AGENTS.md and rewrite brain.js to use OpenAI" (or Gemini, Ollama, …).
