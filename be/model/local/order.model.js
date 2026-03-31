const { readFile, writeFile } = require("../../utils/fileStore");
const { v4: uuidv4 } = require("uuid");

class Order {
    constructor(data) {
        this.id = data.orderId || uuidv4();
        this.products = data.products;
		this.quantity = data.quantity,
		this.address = data.address;
		this.name = data.name || "";
		this.phone = data.phone || "";
        this.email = data.email || "";
        this.status = data.status || "new"; // new, read, replied
        this.createdAt = data.createdAt || new Date().toISOString();
    }

    static saveOrder(data) {
        const orders = readFile("orders.json") || [];
        const newOrder = new Order(data);
        orders.push(newOrder);
        writeFile("orders.json", orders);
        return newOrder;
    }

    static getOrders() {
        return readFile("orders.json") || [];
    }

    static updateOrderStatus(id, status) {
        const orders = readFile("orders.json") || [];
        const idx = orders.findIndex(o => o.id === id);
        if (idx !== -1) {
            orders[idx].status = status;
            writeFile("orders.json", orders);
            return orders[idx];
        }
        return null;
    }

    static deleteOrder(id) {
        const orders = readFile("orders.json") || [];
        const filtered = orders.filter(o => o.id !== id);
        writeFile("orders.json", filtered);
    }
}

module.exports = Order;
