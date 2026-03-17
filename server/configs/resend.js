// config/resend.js
import fetch from "node-fetch";

export async function sendEmail({ to, subject, html }) {
    const apiKey = process.env.RESEND_API_KEY;

    const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            from: "Ant-Tech <admin@mail.ant-tech.asia>",
            to: [to],
            subject,
            html,
        }),
    });

    return res.json();
}