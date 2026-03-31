const express = require("express");
const router = express.Router();
const multer = require("multer");

const upload = multer({
    dest: "uploads/",
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB file size limit
});


// System Routes
const supabaseCtrl = require("../controller/local/system.controller.js");
router.post("/system/upload", upload.single("file"), require("../controller/local/system.controller.js").uploadFile);
router.post("/system/login", require("../controller/local/system.controller.js").login);
router.post("/system/register", require("../controller/local/system.controller.js").register);
router.get("/system/users", require("../controller/local/system.controller.js").getUsers);
router.put("/system/update-profile/:id", require("../controller/local/system.controller.js").updateProfile);

// const userCtrl = require("../controller/local/user.controller.js");
// router.get("/users", userCtrl.getUsers);
// router.get("/user/:id", userCtrl.getUserById);
// router.post("/user", userCtrl.createUser);
// router.put("/user/:id", userCtrl.updateUser);
// router.delete("/user/:id", userCtrl.deleteUser);
// router.put("/user/apply-form/:progId", upload.single("cv"), userCtrl.updateReferralByFindingProgram);
// router.post("/user/send-review/:progId", userCtrl.sendReview);
// router.post("/user/send-question/:progId", userCtrl.sendQuestion);
// router.post("/user/send-answer/:progId", userCtrl.sendAnswer);
// router.put("/user/update-profile/:userId", userCtrl.updateProfile);

router.post("/user/create-new-item", require("../controller/local/user.controller.js").createNewItem);
router.put("/user/update-item-by-id/:id", require("../controller/local/user.controller.js").updateItemById);
router.delete("/user/delete-item-by-id/:id", require("../controller/local/user.controller.js").deleteItemById);
router.get("/user/get-item-by-id/:id", require("../controller/local/user.controller.js").getItemById);
router.get("/user/get-items", require("../controller/local/user.controller.js").getItems);

// Contact Routes
const contactCtrl = require("../controller/local/contact.controller.js");
router.post("/user/send-contact", contactCtrl.sendContact);
router.get("/user/get-contacts", contactCtrl.getContacts);
router.put("/user/update-contact-status/:id", contactCtrl.updateStatus);
router.delete("/user/delete-contact/:id", contactCtrl.deleteContact);
router.post("/user/submit-order", contactCtrl.submitOrder);

module.exports = router;