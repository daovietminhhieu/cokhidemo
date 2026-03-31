const Contact = require("../../model/local/contact.model");
const Order = require("../../model/local/order.model");
// import {
//     contactUserTemplate,
//     contactAdminTemplate,
// } from '../../utils/template.js';

const { sendEmail  } = require("../../configs/resend");
const { sendEmailWithSMTP } = require("../../configs/mail");
const { newProductTemplate, orderUserTemplate, contactUserTemplate} = require("../../utils/template");

const sendContact = async (req, res) => {
    try {
        const { name, phone, email, message } = req.body;
        console.log(name, phone, email, message);
        if (!name || !email || !phone || !message) {
            return res.status(400).json({
                success: false,
                message: "Vui lòng điền đầy đủ thông tin"
            });
        }
        console.log("send contact");
        const newContact = Contact.saveContact({ name, phone, email, message });

        // send email
/*         await sendEmail({
            to: email,
            subject: "We received your message",
            html: contactUserTemplate(name),
        }); */
		
		
		await sendEmailWithSMTP({
		  to: email,
		  subject: "Chúng tôi đã nhận được thông báo của bạn",
		  html: contactUserTemplate(name)
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

const submitOrder = async (req, res) => {
	try {
		const { name, orderId, products, quantity, address, phone, email } = req.body;
        console.log("Body submit order", req.body);
		if (!name || !email || !phone) {
            return res.status(400).json({
                success: false,
                message: "Vui lòng điền đầy đủ thông tin"
            });
        }
		if (!orderId || !products || !quantity) {
            return res.status(400).json({
                success: false,
                message: "Client gui thieu thong tin order"
            });
        }
		const newOrder = Order.saveOrder({name, orderId, products, quantity, address, phone, email});
		if(!newOrder) {
			console.log("Tao don hang moi that bai");
			return;
		}
		// send email
		await sendEmailWithSMTP({
		  to: email,
		  subject: "Chúng tôi đã nhận được thông báo của bạn",
			html: orderUserTemplate({
				name,
				orderId,
				products,
				quantity,
				address,
				phone,
				email
			}),
		});
		return res.json({
            success: true,
            message: "Them don hang thanh cong"
        });
		
	} catch(err) {
		console.error(err);
		return res.status(500).json({
            success: false,
            message: "Lỗi khi them don hang moi",
            error: err.message
        });
	}
	
}

module.exports = {
    sendContact,
    getContacts,
    updateStatus,
    deleteContact, submitOrder
};
