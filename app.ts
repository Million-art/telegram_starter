import { Telegraf, Markup } from 'telegraf';

// Create a new Telegraf instance with your Telegram Bot token
const bot = new Telegraf('6468336174:AAHsQ_0Zht2D_s7rJ2jfO-mvk3gayZ5nRAQ');

// Define your custom commands
const commands = [
    { command: 'help', description: 'Get help' },
    { command: 'about', description: 'About the bot' },
    // Add more custom commands as needed
];

// Command handler for /start command
bot.command('start', async (ctx) => {
    // Create an inline keyboard with buttons for each command
    const keyboard = Markup.inlineKeyboard(
        commands.map(command => Markup.button.callback(command.description, command.command))
    );

    // Reply to the user with the inline keyboard
    await ctx.reply('Here are the available commands:', keyboard);
});

// Handle callback queries from the inline keyboard
commands.forEach(command => {
    bot.action(command.command, async (ctx) => {
        // Execute the corresponding command logic
        await ctx.reply(`You clicked on the "${command.description}" command.`);
    });
});

// Start the bot
bot.launch().then(() => {
    console.log('Bot started');
}).catch((err) => {
    console.error('Error starting bot', err);
});