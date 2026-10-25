# Daemon

**Agent 时代的联系地址。可被找到，不被打扰。**

消息太多回不过来？给自己挂一个 daemon。别人想找你时，先和你的 daemon 聊：它根据你写的资料回答问题，弄清楚对方是谁、想干什么，聊完给你发一份摘要。真正需要你本人处理的事，你一眼就能看到。

> daemon 在 Unix 里是在后台默默替你处理请求的程序，在古希腊神话里是每个人身边的守护精灵。

## 它能做什么

- **替你接待**：一个公开网页，挂在 GitHub、个人主页、简历上，访客打开就能和你的 daemon 聊
- **只说你允许的**：daemon 只知道 `profile.md` 里写的东西，不会替你答应或拒绝任何事
- **聊完给你摘要**：来访者是谁、想做什么、要不要你处理、有多急，推送到 Telegram 或打印在终端里
- **防刷**：按访客和全站限制每天的消息数，控制 API 花费

## 快速开始

需要 Node.js 22.9 以上和一个 [Anthropic API key](https://console.anthropic.com/)。

```bash
git clone <这个仓库>
cd daemon
npm install

cp .env.example .env              # 填入 ANTHROPIC_API_KEY
cp profile.example.md profile.md  # 改成你自己的资料

npm start
```

打开 http://localhost:3000 就能和你的 daemon 聊天了。

## 写你的资料

`profile.md` 就是 daemon 的全部记忆，第一行 `# 名字` 是 daemon 称呼你的名字。建议写这几块：

- **我是谁**：一两句话介绍
- **可以公开的信息**：链接、在做什么、擅长什么
- **常见问题**：别人老问你的问题，直接写好答案
- **什么时候要找我本人**：daemon 会把这些事标成“需要你处理”
- **不要说的**：明确列出不能透露的信息

改完保存就生效，不用重启。

## 摘要推送到 Telegram

1. 在 Telegram 里找 [@BotFather](https://t.me/BotFather) 创建一个机器人，拿到 token
2. 给你的机器人发一条消息，然后打开 `https://api.telegram.org/bot<token>/getUpdates`，找到 `chat.id`
3. 在 `.env` 里填上 `TELEGRAM_BOT_TOKEN` 和 `TELEGRAM_CHAT_ID`

访客点“结束”或者关掉页面时，摘要就会发到你手机上。

## 配置

| 变量 | 默认值 | 说明 |
| --- | --- | --- |
| `ANTHROPIC_API_KEY` | 无 | 必填 |
| `DAEMON_MODEL` | `claude-opus-5-5` | 想省钱可以换成 `claude-haiku-5-5` |
| `DAEMON_PER_IP_DAILY` | `30` | 每个访客每天最多几条消息 |
| `DAEMON_GLOBAL_DAILY` | `500` | 全站每天最多几条消息 |
| `TELEGRAM_BOT_TOKEN` / `TELEGRAM_CHAT_ID` | 无 | 不填就只在终端打印摘要 |
| `TRUST_PROXY` | 无 | 部署在反向代理后面时设为 `1` |
| `PORT` | `3000` | |

建议同时在 Anthropic 后台给 API key 设置每月花费上限。

## 部署

它就是一个普通的 Node 服务，没有数据库，任何能跑 Node 的地方都行，比如 Railway、Render、Fly.io 或者你自己的服务器。记得设置好环境变量，并上传 `profile.md`（它默认不进 git）。

## 现在还没有的

第一版故意做得很小，下面这些等有人用了再加：

- 让别人的 agent 通过 MCP / API 直接找你的 daemon
- 托管版：不用自己部署，注册就能用
- 邮件、Telegram 等更多来访渠道
- 聊天记录存档和管理后台

## 隐私

- 对话历史只保存在访客的浏览器页面里，服务器不存储
- 摘要和原始对话只发给你自己（Telegram 或终端）
- 对话内容会发送给 Anthropic API 处理

## 许可证

[AGPL-3.0](LICENSE)。可以免费使用、修改、自己部署；如果拿去做成在线服务提供给别人，需要公开你修改后的代码。
