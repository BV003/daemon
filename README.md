# Daemon

**Your address in the agent era. Always reachable, never interrupted.**

Too many messages to keep up with? Put a daemon in front of you. When someone wants to reach you, they talk to your daemon first: it answers from the profile you wrote, finds out who they are and what they want, and sends you a summary when the conversation ends. Anything that needs you personally stands out at a glance.

> In Unix, a daemon is a program that quietly handles requests in the background. In Greek mythology, it is the guardian spirit that walks beside every person.

## What it does

- **Greets visitors for you**: a public page you can link from GitHub, your homepage or your résumé, where anyone can chat with your daemon
- **Only says what you allow**: your daemon knows only what is in `profile.md`, and never accepts or declines anything on your behalf
- **Sends you a summary**: who the visitor is, what they want, whether you need to act, and how urgent it is, pushed to Telegram or printed in your terminal
- **Rate limited**: daily message caps per visitor and site-wide keep API costs under control

## Quick start

You need Node.js 22.9+ and an [Anthropic API key](https://console.anthropic.com/).

```bash
git clone https://github.com/BV003/daemon.git
cd daemon
npm install

cp .env.example .env              # add your ANTHROPIC_API_KEY
cp profile.example.md profile.md  # replace with your own profile

npm start
```

Open http://localhost:3000 and chat with your daemon.

## Writing your profile

`profile.md` is your daemon's entire memory. The first line, `# Name`, is the name your daemon uses for you. Suggested sections:

- **About me**: a sentence or two
- **Public info**: links, what you're working on, what you're good at
- **FAQ**: questions people keep asking you, with the answers
- **When to reach me directly**: your daemon marks these as needing your attention
- **Never share**: information it must not reveal

Changes take effect as soon as you save; no restart needed.

## Summaries on Telegram

1. Create a bot with [@BotFather](https://t.me/BotFather) on Telegram and copy its token
2. Send your bot a message, then open `https://api.telegram.org/bot<token>/getUpdates` and find `chat.id`
3. Set `TELEGRAM_BOT_TOKEN` and `TELEGRAM_CHAT_ID` in `.env`

When a visitor clicks "End" or closes the page, the summary lands on your phone.

## Configuration

| Variable | Default | Description |
| --- | --- | --- |
| `ANTHROPIC_API_KEY` | none | Required |
| `DAEMON_MODEL` | `claude-opus-5-5` | Switch to `claude-haiku-5-5` to cut costs |
| `DAEMON_PER_IP_DAILY` | `30` | Max messages per visitor per day |
| `DAEMON_GLOBAL_DAILY` | `500` | Max messages site-wide per day |
| `TELEGRAM_BOT_TOKEN` / `TELEGRAM_CHAT_ID` | none | Without them, summaries are only printed in the terminal |
| `TRUST_PROXY` | none | Set to `1` when running behind a reverse proxy |
| `PORT` | `3000` | |

It's also a good idea to set a monthly spend limit on your API key in the Anthropic Console.

## Deploying

Daemon is a plain Node server with no database, so it runs anywhere Node does: Railway, Render, Fly.io or your own server. Set the environment variables and upload `profile.md` (it is git-ignored by default).

## Not yet

The first version is deliberately small. These come once people are using it:

- Let other people's agents reach your daemon directly over MCP / API
- A hosted version: sign up and go, no deployment
- More channels, such as email and Telegram
- Conversation history and an admin dashboard

## Privacy

- Conversation history lives only in the visitor's browser tab; the server stores nothing
- Summaries and transcripts go only to you (Telegram or terminal)
- Conversations are sent to the Anthropic API for processing

## License

[AGPL-3.0](LICENSE). Free to use, modify and self-host. If you offer a modified version as an online service, you must publish your changes.
