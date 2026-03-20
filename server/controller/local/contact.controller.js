const Contact = require("../../model/local/contact.model");
// import {
//     contactUserTemplate,
//     contactAdminTemplate,
// } from '../../utils/template.js';

const { contactUserTemplate, contactAdminTemplate } = require("../../utils/template");
const { sendEmail } = require("../../configs/resend");

const sendContact = async (req, res) => {
    try {
        const { name, email, message } = req.body;
        console.log(name, email, message);
        if (!name || !email || !message) {
            return res.status(400).json({
                success: false,
                message: "Vui lòng điền đầy đủ thông tin"
            });
        }
        console.log("send contact");
        const newContact = Contact.saveContact({ name, email, message });

        // send email
        await sendEmail({
            to: email,
            subject: "We received your message",
            html: contactUserTemplate(name),
        });
        console.log('send email user');

        return res.status(201).json({
            success: true,
            message: "Gửi liên hệ thành côngggg",
            data: newContact
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            success: false,
            message: "Lỗi khi gửi liên hệ",
            error: err.message
        });
    }
};

const getContacts = (req, res) => {
    try {
        const contacts = Contact.getContacts();
        return res.json({
            success: true,
            data: contacts
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            success: false,
            message: "Lỗi khi tải danh sách liên hệ",
            error: err.message
        });
    }
};

const updateStatus = (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        const updated = Contact.updateContactStatus(id, status);
        if (!updated) {
            return res.status(404).json({
                success: false,
                message: "Không tìm thấy liên hệ"
            });
        }
        return res.json({
            success: true,
            data: updated
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            success: false,
            message: "Lỗi khi cập nhật trạng thái",
            error: err.message
        });
    }
};

const deleteContact = (req, res) => {
    try {
        const { id } = req.params;
        Contact.deleteContact(id);
        return res.json({
            success: true,
            message: "Xóa liên hệ thành công"
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            success: false,
            message: "Lỗi khi xóa liên hệ",
            error: err.message
        });
    }
};

module.exports = {
    sendContact,
    getContacts,
    updateStatus,
    deleteContact
};
