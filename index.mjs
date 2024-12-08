import fetch from 'node-fetch';
import express from 'express'; // Import express to create a web service

const webhookURL = 'https://discord.com/api/webhooks/1315285372904931330/xSAadXlEcY81SuUVxoXxRABMEir6L3OXxEZLX60LqUjS0_GVB34lJ_umna3GEG_lz1ch';
const targetDate = new Date('July 18, 2025 00:00:00').getTime();

// Initialize express server
const app = express();

// Specify the port (Render assigns a port via process.env.PORT)
const PORT = process.env.PORT || 3000;

// Basic route for health check (optional)
app.get('/', (req, res) => {
  res.send('Countdown Timer API is running!');
});

// Function to calculate time remaining
function calculateTimeLeft() {
    const now = new Date().getTime();
    const timeLeft = targetDate - now;

    if (timeLeft < 0) return "The date has passed!";

    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

    return `${days} Days ${hours} Hours ${minutes} Minutes ${seconds} Seconds`;
}

// Function to send the countdown update to Discord
async function sendUpdate() {
    const message = calculateTimeLeft();

    try {
        await fetch(webhookURL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ content: `⏳ Countdown until SKZ Concert: ${message} \n check timer on https://timerskz.netlify.app` })
        });
        console.log("Message sent:", message);
    } catch (error) {
        console.error("Error sending webhook:", error);
    }
}

// Send updates every 12 hours (as per your original logic)
setInterval(sendUpdate, 12 * 60 * 60 * 1000);

// Initial update on start
sendUpdate();

// Start the express server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
