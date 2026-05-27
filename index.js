const {
default: makeWASocket,
useMultiFileAuthState
} = require("@whiskeysockets/baileys")

const P = require("pino")

async function startBot() {

const { state, saveCreds } =
await useMultiFileAuthState("sessions")

const sock = makeWASocket({
logger: P({ level: "silent" }),
auth: state
})

sock.ev.on("creds.update", saveCreds)

sock.ev.on("messages.upsert", async ({ messages }) => {

const msg = messages[0]

if (!msg.message) return

const from = msg.key.remoteJid

const text =
msg.message.conversation || ""

if (text === ".ping") {

await sock.sendMessage(from, {
text: "🏓 Pong"
})

}

})

}

startBot()