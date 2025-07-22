import 'dotenv/config';
import TelegramBot from 'node-telegram-bot-api';
import { GeminiAI } from './gemini.js';

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
    // Telegram message max length is 4096 characters
    const maxLength = 4096;
    if (response.length <= maxLength) {
      await bot.sendMessage(chatId, response);
    } else {
      // More robust splitting with a smaller chunk size to avoid Telegram limits
      const safeChunkSize = 4000; // slightly less than maxLength to be safe
      for (let i = 0; i < response.length; i += safeChunkSize) {
        const chunk = response.substring(i, i + safeChunkSize);
        try {
          await bot.sendMessage(chatId, chunk);
        } catch (error) {
          if (error.response && error.response.statusCode === 400 && error.response.body && error.response.body.description && error.response.body.description.includes('message is too long')) {
            // Truncate chunk and send again
            const truncatedChunk = chunk.substring(0, safeChunkSize - 100);
            await bot.sendMessage(chatId, truncatedChunk);
          } else {
            throw error;
          }
        }
      }
    }
  } catch (error) {
    console.error('Error:', error);
    bot.sendMessage(chatId, 'Sorry, I\'m having trouble processing your request. Please try again later.');
  }
});
