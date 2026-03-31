const { readFile, writeFile } = require("../../utils/fileStore");
const { v4: uuidv4 } = require("uuid");

class Contact {
    constructor(data) {
        this.id = data.id || uuidv4();
        this.name = data.name || "";
		this.phone = data.phone || "";
        this.email = data.email || "";
        this.message = data.message || "";
        this.status = data.status || "new"; // new, read, replied
        this.createdAt = data.createdAt || new Date().toISOString();
    }

    static saveContact(data) {
        const contacts = readFile("contacts.json") || [];
        const newContact = new Contact(data);
        contacts.push(newContact);
        writeFile("contacts.json", contacts);
        return newContact;
    }

    static getContacts() {
        return readFile("contacts.json") || [];
    }

    static updateContactStatus(id, status) {
        const contacts = readFile("contacts.json") || [];
        const idx = contacts.findIndex(c => c.id === id);
        if (idx !== -1) {
            contacts[idx].status = status;
            writeFile("contacts.json", contacts);
            return contacts[idx];
        }
        return null;
    }

    static deleteContact(id) {
        const contacts = readFile("contacts.json") || [];
        const filtered = contacts.filter(c => c.id !== id);
        writeFile("contacts.json", filtered);
    }
}

module.exports = Contact;
