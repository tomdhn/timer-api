import fetch from 'node-fetch';

const webhookURL = 'https://discord.com/api/webhooks/1315285372904931330/xSAadXlEcY81SuUVxoXxRABMEir6L3OXxEZLX60LqUjS0_GVB34lJ_umna3GEG_lz1ch';
const targetDate = new Date('July 18, 2025 00:00:00').getTime();


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

async function sendUpdate() {
    const message = calculateTimeLeft();

    try {
        await fetch(webhookURL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ content: `⏳ Countdown untill SKZ Concert: ${message} \n check timer on https://timerskz.netlify.app` })
        });
        console.log("Message sent:", message);
    } catch (error) {
        console.error("Error sending webhook:", error);
    }
}

// Send updates every minute
setInterval(sendUpdate, 12 * 60 * 60 * 1000);

// Initial update
sendUpdate();
