interface Message {
  name: string
  email: string
  message: string
}

export const postMessage = async (data: Message) => {
  return await fetch(`https://api.telegram.org/bot${process.env.TELEGRAM_BOT_API_KEY}/sendMessage`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      chat_id: process.env.TELEGRAM_GROUP_ID,
      text: `New form reply!\n\n<b>Name:</b> ${data.name}\n<b>Email:</b> ${data.email}\n<b>Message:</b> ${
        data.message
      }\n<b>Time:</b> ${new Date().toLocaleTimeString('en-EN')}`,
      parse_mode: 'HTML',
    }),
  })
}
