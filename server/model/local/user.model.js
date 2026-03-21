const { readFile, writeFile } = require("../../utils/fileStore");

class User {
  constructor(data) {
    this._id = data._id || Date.now().toString();
    this.name = data.name || "";
    this.email = (data.email || "").toLowerCase();
    this.password = data.password || "";
    this.role = data.role || "candidate";
    this.status = data.status || "Pending";
    this.credit = data.credit || 0;
    this.phone = data.phone || "";
    this.cv = data.cv || "";
    this.avatar = data.avatar || "";

    this.bankInfo = {
      accountHolderName: data.bankInfo?.accountHolderName || "",
      bankName: data.bankInfo?.bankName || "",
      branchName: data.bankInfo?.branchName || "",
      accountNumber: data.bankInfo?.accountNumber || "",
      ibanSwiftCode: data.bankInfo?.ibanSwiftCode || "",
      currency: data.bankInfo?.currency || "VNĐ",
    };

    this.createdAt = data.createdAt || new Date().toISOString();
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

  static updateById(id, data) {
    const users = this._all();
    const idx = users.findIndex(u => u._id === id);
    if (idx === -1) throw new Error("Không tìm thấy người dùng");

    users[idx] = {
      ...users[idx],
      ...data,
      updatedAt: new Date().toISOString()
    };
    writeFile("users.json", users);
    return users[idx];
  }
}

module.exports = User;