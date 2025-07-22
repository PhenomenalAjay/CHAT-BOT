## AI Chatbot using Gemini AI API in a Telegram Bot with Node.js

A Node.js Telegram bot powered by Google's Gemini AI for intelligent conversations.  
Note: This chatbot is designed for conversational purposes only and does not access real-time data or external requests.

### Features
* AI-powered responses using Gemini AI
* Easy setup and configuration
* Real-time message processing with Telegram polling
* Handles long responses by splitting messages to comply with Telegram limits
* Basic error handling for API and messaging issues

### Prerequisites
* Node.js (v18 or higher)
* npm (comes with Node.js)
* Telegram bot token from BotFather
* Gemini API key from Google AI Studio

### Install dependencies
```bash
npm install
```

### Usage
#### Start the bot:
```bash
npm start
```
* Interact with your bot on Telegram by sending any message.
* Use the `/start` command to receive a welcome message.

### Dependencies
Main packages used:
* `node-telegram-bot-api`: Telegram bot API wrapper
* `@google/genai`: Gemini AI SDK
* `dotenv`: Environment variables management

### Configuration
All configurations are done through the `.env` file:

* `TELEGRAM_BOT_TOKEN`: Your Telegram bot API token  
  (Get it by searching for "BotFather" in Telegram and creating a bot)
* `GEMINI_API_KEY`: Your Gemini API key  
  (Obtain it by logging into Gemini AI Studio)

### Notes
* Telegram messages have a maximum length of 4096 characters. The bot automatically splits longer responses into smaller chunks to comply with this limit.
* If the bot encounters an error while processing a request, it will notify the user with an error message.

### Where to get API keys
1. Search for "BotFather" in the Telegram app to create a bot and get your Telegram bot token.
2. Log in to Gemini AI Studio to get a free API key for Gemini AI.

### Contact
If you have any questions, feel free to reach out to me on Instagram.

## HAPPY CODING
