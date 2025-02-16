require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');
const { GeminiAI } = require('./gemini');

// Initialize Telegram bot
const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN, { polling: true });

// Initialize Gemini AI
const gemini = new GeminiAI(process.env.GEMINI_API_KEY);

// Handle /start command
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, 'Welcome! I\'m your AI assistant powered by Gemini. Send me any message and I\'ll respond.');
});

// Handle all messages
bot.on('message', async (msg) => {
  const chatId = msg.chat.id;
  const userMessage = msg.text;

  try {
    const response = await gemini.generateResponse(userMessage);
    bot.sendMessage(chatId, response);
  } catch (error) {
    console.error('Error:', error);
    bot.sendMessage(chatId, 'Sorry, I\'m having trouble processing your request. Please try again later.');
  }
});
