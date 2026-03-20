// services/contact.service.js

import * as repo from "../repositories/contact.repository.js";
import { sendEmail } from "../config/resend.js";
import {
    contactUserTemplate,
    contactAdminTemplate,
} from "../utils/templates.js";

export async function handleNewContact(data) {
    const { name, email, message } = data;

    // 1. Save DB
    const contactId = await repo.createContact(data);

    // 2. Send email to user
    await sendEmail({
        to: email,
        subject: "We received your message",
        html: contactUserTemplate(name),
    });

    // 3. Send email to admin
    await sendEmail({
        to: "immhisme1@gmail.com",
        subject: "New contact",
        html: contactAdminTemplate(name, email, message),
    });

    return contactId;
}

export async function changeStatus(id, status, email, name) {
    await repo.updateStatus(id, status);

    // gửi mail khi đổi trạng thái
    await sendEmail({
        to: email,
        subject: "Status updated",
        html: `<p>Hello ${name}, status: ${status}</p>`,
    });
}