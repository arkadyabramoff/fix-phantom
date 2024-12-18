// api/send-telegram-message.js

export default async function handler(req, res) {
    if (req.method === 'POST') {
      const { message } = req.body;
  
      // Get bot token and chat ID from environment variables
      const botToken = process.env.BOT_TOKEN;  // The bot token
      const chatId = process.env.CHAT_ID;      // The chat ID
  
      // Check if environment variables are set
      if (!botToken || !chatId) {
        return res.status(500).json({ success: false, message: 'Bot token or chat ID is missing' });
      }
  
      // Telegram API URL
      const telegramUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;
  
      // Payload to send to the Telegram bot
      const payload = {
        chat_id: chatId,
        text: message,
      };
  
      try {
        const response = await fetch(telegramUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        });
  
        const data = await response.json();
  
        if (data.ok) {
          // Respond with success if message is sent
          return res.status(200).json({ success: true });
        } else {
          // Respond with error message from Telegram API
          return res.status(500).json({ success: false, message: data.description });
        }
      } catch (error) {
        // Catch and respond with an error if the API request fails
        return res.status(500).json({ success: false, message: 'Failed to send message' });
      }
    } else {
      // Method Not Allowed for anything other than POST
      return res.status(405).json({ success: false, message: 'Method not allowed' });
    }
  }
  