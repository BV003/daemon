# Swapping the model

`brain.js` is the only file that talks to a model. The default uses Anthropic. To use another provider, rewrite `brain.js` and touch nothing else.

## Contract

```js
export async function reply(system, messages) // => Promise<string | null>
```

- `system`: string, the system prompt
- `messages`: `[{ role: "user" | "assistant", content: string }]`, alternating, starting and ending with `user`
- Return the model's reply as plain text, or `null` if the model refused
- Throw on errors; the server logs them and shows the visitor a generic message

## Rules

- Use the provider's official SDK and add it to `package.json`
- Read keys and the model name from environment variables, and add them to `.env.example`
- Keep the reply short-form chat: no streaming, no tools
- Remove `@anthropic-ai/sdk` from `package.json` if it is no longer used
- Test: `npm start`, open http://localhost:3000, send a message
