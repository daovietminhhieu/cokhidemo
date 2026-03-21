const { readFile, writeFile } = require("../../utils/fileStore");

class User {
    constructor(data) {
        this._id = data._id || Date.now().toString();
        this.name = data.name || "";
        this.price = data.price || 0;
        this.quantity = data.quantity || 0;
        this.image = data.image || "";
        this.category = data.category || "";
        this.description = data.description || "";

        this.createdAt = data.createdAt || new Date().toISOString();
    }



    static addNewItem(data) {
        const items = readFile("items.json") || [];

        if (items.find(item => item.name === data.name)) {
            throw new Error("Sản phẩm đã tồn tại");
        }

        items.push(data);
        writeFile("items.json", items);

        return data;
    }

    static getItems() {
        return readFile("items.json") || [];
    }

    static getItemById(id) {
        return this.getItems().find(item => item.id === id);
    }

    static updateItemById(id, data) {
        const items = readFile("items.json") || [];
        const idx = items.findIndex(item => item.id === id);
        if (idx === -1) {
            throw new Error("Không tìm thấy sản phẩm");
        }
        items[idx] = {
            ...items[idx],
            ...data
        };
        writeFile("items.json", items);
        console.log("Đã cập nhật sản phẩm");
    }

    static deleteItemById(id) {
        const items = readFile("items.json") || [];
        const idx = items.findIndex(item => item.id === id);
        if (idx === -1) {
            console.log("Không tìm thấy sản phẩm");
            return;
        }
        items.splice(idx, 1);
        writeFile("items.json", items);
        console.log("Đã xóa sản phẩm");
    }

    static _all() {
        return readFile("users.json") || [];
    }

    static find() {
        return this._all().map(u => new User(u));
    }

    static findById(id) {
        const u = this._all().find((u) => u._id === id);
        return u ? new User(u) : null;
    }

    static findByEmail(email) {
        const u = this._all().find(
            (u) => u.email === email.toLowerCase()
        );
        return u ? new User(u) : null;
    }

    save() {
        const users = User._all();
        users.push(this);
        writeFile("users.json", users);
        return this;
    }
}

module.exports = User;