// utils/templates.js
export function contactUserTemplate(name) {
    return `<h2>Hello ${name}</h2><p>We received your contact.</p>`;
}

export function contactAdminTemplate(name, email, message) {
    return `
    <h2>New Contact</h2>
    <p><b>Name:</b> ${name}</p>
    <p><b>Email:</b> ${email}</p>
    <p><b>Message:</b> ${message}</p>
  `;
}