// config/resend.js
const axios = require("axios");

async function sendEmail({ to, subject, html }) {
    const apiKey = process.env.RESEND_API_KEY;

    try {
        const response = await axios.post("https://api.resend.com/emails", {
            from: "hieuhp132@gmail.com",
            to: [to],
            subject,
            html,
        }, {
            headers: {
                Authorization: `Bearer ${apiKey}`,
                "Content-Type": "application/json",
            }
        });

        return response.data;
    } catch (error) {
        console.error("Error sending email via Resend:", error.response?.data || error.message);
        throw error;
    }
}

module.exports = { sendEmail };