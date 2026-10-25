// daemon 的大脑：唯一调用模型的地方。想换模型，只改这个文件，接口说明见 AGENTS.md
import Anthropic from "@anthropic-ai/sdk";

const MODEL = process.env.DAEMON_MODEL || "claude-opus-5-5";
const client = new Anthropic();

export async function reply(system, messages) {
  const response = await client.beta.messages.create({
    model: MODEL,
    max_tokens: 16000,
    output_config: { effort: "low" },
    betas: ["server-side-fallback-2026-07-01"],
    fallbacks: "default",
    cache_control: { type: "ephemeral" },
    system,
    messages,
  });
  if (response.stop_reason === "refusal") return null;
  return response.content
    .filter((b) => b.type === "text")
    .map((b) => b.text)
    .join("")
    .trim();
}
