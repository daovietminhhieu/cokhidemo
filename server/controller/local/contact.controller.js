const Contact = require("../../model/local/contact.model");

const sendContact = (req, res) => {
    try {
        const { name, email, message } = req.body;
        if (!name || !email || !message) {
            return res.status(400).json({
                success: false,
                message: "Vui lòng điền đầy đủ thông tin"
            });
        }

        const newContact = Contact.saveContact({ name, email, message });

        return res.status(201).json({
            success: true,
            message: "Gửi liên hệ thành công",
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
