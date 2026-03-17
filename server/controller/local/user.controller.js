// const { Referral } = require("../../model/local/referral.model.js");
// const Review = require("../../model/local/review.model.js");
// const Question = require("../../model/local/question.model.js");
// const User = require("../../model/local/user.model");
// const { readFile, writeFile, genId } = require("../../utils/fileStore.js");
// // const { savePrograms, loadPrograms } = require("./program.controller.js");
// // const { saveReferrals, loadReferrals } = require("./referral.controller.js");
// const jwt = require("jsonwebtoken");
// const FILE_NAME = "users.json";

// /* =========================
//    UTILS
// ========================= */

// function stripHtml(html = "") {
//   return html
//     .replace(/<style[^>]*>.*?<\/style>/gi, "")
//     .replace(/<script[^>]*>.*?<\/script>/gi, "")
//     .replace(/<\/?(?!br|p)[^>]+>/gi, "")
//     .replace(/<br\s*\/?>/gi, "\n")
//     .replace(/<\/p>/gi, "\n")
//     .replace(/&nbsp;/gi, " ")
//     .replace(/\n\s*\n/g, "\n")
//     .trim();
// }
// function extractListItemsFromHtml(html = "") {
//   if (typeof html !== "string" || !html.trim()) return [];

//   const liRegex = /<li[^>]*>(.*?)<\/li>/gis;
//   const items = [];

//   let match;
//   while ((match = liRegex.exec(html)) !== null) {
//     const text = stripHtml(match[1]);
//     if (text) items.push(text);
//   }

//   return items;
// }

// function getStepsFromProgramModel(program) {
//   if (!program) return [];

//   const { roadmaps } = program;
//   if (!roadmaps) return [];

//   if (typeof roadmaps === "string") {
//     const items = extractListItemsFromHtml(roadmaps);

//     return items.map((text, index) => ({
//       step: index + 1,
//       name: text,
//       description: text, // hoặc "" nếu không cần
//       status: "pending",
//     }));
//   }

//   return [];
// }

// function loadUsers() {
//   return readFile(FILE_NAME) || [];
// }

// function saveUsers(users) {
//   writeFile(FILE_NAME, users);
// }

// exports.loadUsers = loadUsers;
// exports.saveUsers = saveUsers;

// exports.updateProfile = async (req, res) => {
//   try {
//     const {userId} = req.params;
//     const { name, email, password, bankInfo } = req.body;

//     const users = loadUsers();
//     const userIndex = users.findIndex(u => u._id === userId);

//     if (userIndex === -1) {
//       return res.status(404).json({
//         success: false,
//         message: "User not found",
//       });
//     }

//     if (name !== undefined) users[userIndex].name = name;
//     if (email !== undefined) users[userIndex].email = email;
//     if (bankInfo !== undefined) users[userIndex].bankInfo = bankInfo;
//     if (password) users[userIndex].password = password;

//     users[userIndex].updatedAt = new Date().toISOString();

//     saveUsers(users);

//     const updatedUser = { ...users[userIndex] };
//     delete updatedUser.password;

//     const token = jwt.sign(
//       { id: updatedUser._id, role: updatedUser.role },
//       process.env.JWT_SECRET,
//       { expiresIn: "7d" }
//     );

//     return res.json({
//       success: true,
//       data: {
//         user: updatedUser,
//         token,
//       },
//     });

//   } catch (err) {
//     console.error("updateProfile error:", err);
//     res.status(500).json({
//       success: false,
//       message: "Failed update profile",
//       error: err.message,
//     });
//   }
// };

// // GET ALL USERS
// exports.getUsers = async (req, res) => {
//   try {
//     const users = await readFile(FILE_NAME);
//     res.json(users);
//   } catch (err) {
//     res.status(500).json({ message: "Failed to get users", error: err.message });
//   }
// };

// exports.sendReview = (req, res) => {
//   const {progId} = req.params;
//   let {userId,rate,content}= req.body;
//   console.log(req.body);


//   const programs = loadPrograms();
//   const progIndex = programs.findIndex(p=>p.id === progId);

//   if(progIndex === -1) {
//     return res.status(404).json({
//       success: false,
//       message: "Program not found"
//     });
//   }

//   programs[progIndex].reviews = Array.isArray(programs[progIndex].reviews) ? programs[progIndex].reviews : [];
//   if(!userId) userId=genId();
//   const newReview = new Review({user: userId,rate,content});
//   programs[progIndex].reviews.push(newReview);
//   programs[progIndex].updatedAt = new Date().toISOString();
//   savePrograms(programs);
//   return res.json({
//     success:true, data: newReview
//   })

// }

// exports.sendQuestion = (req, res) => {
//   console.log(req.body);
//   const {progId} = req.params;
//   let {question,userId,userName} = req.body;

//   // Luu du lieu tu body vao programs data
//   const programs= loadPrograms();
//   const progIndex= programs.findIndex(p=>p.id===progId);

//   if(progIndex === -1) {
//     return res.status(404).json({
//       success: false,
//       message: "Program not found"
//     });
//   }

//   programs[progIndex].questions = Array.isArray(programs[progIndex].questions) ? programs[progIndex].questions : [];
//   if(!userId) userId=genId();
//   const newQuestion = new Question({question,user:userId,userName})
//   programs[progIndex].questions.push(newQuestion);
//   savePrograms(programs);
//   return res.json({
//     success:true, data:newQuestion
//   })
// }

// exports.sendAnswer = (req, res) => {
//   try {
//     const { progId } = req.params;
//     const { questionId, answer, userId, userName } = req.body;

//     if (!questionId || !answer?.trim()) {
//       return res.status(400).json({
//         success: false,
//         message: "questionId and answer are required",
//       });
//     }

//     const programs = loadPrograms();
//     const progIndex = programs.findIndex(p => p.id === progId);

//     if (progIndex === -1) {
//       return res.status(404).json({
//         success: false,
//         message: "Program not found",
//       });
//     }

//     const questions = programs[progIndex].questions || [];
//     const qIndex = questions.findIndex(q => q.id === questionId);

//     if (qIndex === -1) {
//       return res.status(404).json({
//         success: false,
//         message: "Question not found",
//       });
//     }

//     const question = questions[qIndex];

//     question.answer = answer.trim();
//     question.answeredAt = new Date().toISOString();
//     question.answeredBy = userId || null;
//     question.answeredByName = userName || "Admin";

//     programs[progIndex].updatedAt = new Date().toISOString();
//     savePrograms(programs);

//     return res.json({
//       success: true,
//       data: question,
//     });
//   } catch (err) {
//     console.error("sendAnswer error:", err);
//     return res.status(400).json({
//       success: false,
//       message: err.message,
//     });
//   }
// };

// exports.updateReferralByFindingProgram = (req, res) => {
//   try {
//     // const { progId } = req.params;
//     // const { candidateId, referralId, name, email, phone, cv } = req.body;

//     // console.log("", req.body);

//     // if (!progId || !name || !email) {
//     //   return res.status(400).json({
//     //     success: false,
//     //     message: "progId, name, email are required",
//     //   });
//     // }

//     // /* ===== LOAD PROGRAM ===== */
//     // const programs = loadPrograms();
//     // const progIndex = programs.findIndex(p => p.id === progId);

//     // if (progIndex === -1) {
//     //   return res.status(404).json({
//     //     success: false,
//     //     message: "Program not found",
//     //   });
//     // }

//     // const program = programs[progIndex];
//     // program.referrals = Array.isArray(program.referrals) ? program.referrals : [];

//     // /* ===== FIND OR CREATE USER ===== */
//     // const users = loadUsers();
//     // let user = users.find(
//     //   u => u._id === candidateId || u.email === email
//     // );

//     // if (!user) {
//     //   user = new User({
//     //     _id: candidateId || genId(),
//     //     name,
//     //     email,
//     //     phone,
//     //     cv,
//     //     status: "applied",
//     //     createdAt: new Date().toISOString(),
//     //   });

//     //   users.push(user);
//     //   // writeFile(USERS_FILE, users);
//     //   this.saveUsers(users);
//     // }


//     const { progId } = req.params;
//     const {candidateId, referralId, name, email, phone } = req.body;

//     const cvFile = req.file;

//     console.log("Received file:", cvFile);
//     console.log("Received body:", req.body);

//     if (!progId || !name || !email) {
//       return res.status(400).json({
//         success: false,
//         message: "progId, name, email are required",
//       });
//     }

//     const programs = loadPrograms();
//     const progIndex = programs.findIndex(p => p.id === progId);
//     if (progIndex === -1) {
//       return res.status(404).json({
//         success: false,
//         message: "Program not found",
//       });
//     }

//     const program = programs[progIndex];
//     program.referrals = Array.isArray(program.referrals) ? program.referrals : [];
//     const users = loadUsers();
//     let user = users.find(
//       u => u._id === candidateId || u.email === email
//     );
//     if (!user) {
//       user = new User({
//         _id: candidateId || genId(),
//         name,
//         email,
//         phone,
//         cv: cvFile ? cvFile.path : "",
//         status: "applied",
//         createdAt: new Date().toISOString(),
//       });
//       users.push(user);
//       saveUsers(users);
//     } else {
//       // Cập nhật thông tin user nếu đã tồn tại
//       user.cv = cvFile ? cvFile.path : "";
//       saveUsers(users);
//     }

//     /* ===== LOAD REFERRALS ===== */
//     // const referrals = readFile(REFERRALS_FILE) || [];
//       const referrals = loadReferrals();
//     let referral;

//     if (referralId) {
//       // UPDATE
//       const refIndex = referrals.findIndex(
//         r => r.id === referralId && r.progId === progId
//       );

//       if (refIndex === -1) {
//         return res.status(404).json({
//           success: false,
//           message: "Referral not found",
//         });
//       }
//       referral = referrals[refIndex];
//       console.log("Before update:",referral);
//       referral.candidateId = user._id;
//       referral.steps = getStepsFromProgramModel(program);
//       referral.status = "applied";
//       referral.updatedAt = new Date().toISOString();
//       console.log("After update:",referral);

//       referrals[refIndex] = referral;

//     } else {
//       // CREATE
//       referral = new Referral({
//         candidateId: user._id,
//         progId,
//         steps: getStepsFromProgramModel(program),
//         status: "applied",
//         createdAt: new Date().toISOString(),
//         updatedAt: new Date().toISOString(),
//       });

//       referrals.push(referral);
//       program.referrals.push(referral.id);
//     }

//     /* ===== UPDATE PROGRAM ===== */
//     program.appliedCount = (program.appliedCount || 0) + 1;
//     programs[progIndex] = program;

//     /* ===== SAVE ===== */
//     // writeFile(REFERRALS_FILE, referrals);
//     // writeFile(PROGRAMS_FILE, programs);
//     saveReferrals(referrals); savePrograms(programs);

//     return res.json({
//       success: true,
//       data: {
//         // referral,
//         user, cv: cvFile,
//       },
//     });

//   } catch (err) {
//     console.error("updateReferralByFindingProgram error:", err);
//     return res.status(500).json({
//       success: false,
//       message: err.message,
//     });
//   }
// };

// // GET USER BY ID
// exports.getUserById = async (req, res) => {
//     try {
//       const users = await readFile(FILE_NAME);

//       const user = users.find(u => u._id === req.params.id);

//       if (!user) {
//         return res.status(404).json({
//           success: false,
//           message: "User not found",
//         });
//       }

//       res.json({
//         success: true,
//         data: user,
//       });
//     } catch (err) {
//       res.status(500).json({
//         success: false,
//         message: "Failed to get user",
//         error: err.message,
//       });
//     }
//   };

// // CREATE USER
// exports.createUser = async (req, res) => {
//   try {
//     const users = await readFile(FILE_NAME);

//     const newUser = {
//       id: genId(),
//       name: req.body.name,
//       email: req.body.email,
//       role: req.body.role || "user",
//       createdAt: new Date().toISOString()
//     };

//     users.push(newUser);
//     await writeFile(FILE_NAME, users);

//     res.status(201).json(newUser);
//   } catch (err) {
//     res.status(500).json({ message: "Failed to create user", error: err.message });
//   }
// };

// // UPDATE USER
// exports.updateUser = async (req, res) => {
//   try {
//     const users = await readFile(FILE_NAME);
//     const index = users.findIndex(u => u.id === req.params.id);

//     if (index === -1) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     users[index] = {
//       ...users[index],
//       ...req.body,
//       updatedAt: new Date().toISOString()
//     };

//     await writeFile(FILE_NAME, users);
//     res.json(users[index]);
//   } catch (err) {
//     res.status(500).json({ message: "Failed to update user", error: err.message });
//   }
// };

// // DELETE USER
// exports.deleteUser = async (req, res) => {
//   try {
//     const users = await readFile(FILE_NAME);
//     const filteredUsers = users.filter(u => u.id !== req.params.id);

//     if (users.length === filteredUsers.length) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     await writeFile(FILE_NAME, filteredUsers);
//     res.json({ message: "User deleted successfully" });
//   } catch (err) {
//     res.status(500).json({ message: "Failed to delete user", error: err.message });
//   }
// };

const Item = require('../../model/local/item.model');
const { v4: uuidv4 } = require("uuid");
const createNewItem = (req, res) => {
    try {
        const { name, price, quantity, image, description, category } = req.body;

        const newItem = {
            id: uuidv4(),
            name,
            price,
            quantity,
            image,
            description,
            category,
            createdAt: new Date().toISOString()
        };

        Item.addNewItem(newItem);

        return res.status(201).json({
            success: true,
            message: "Tạo sản phẩm thành công",
            data: newItem
        });

    } catch (err) {
        console.log(err);

        return res.status(500).json({
            success: false,
            message: "Failed to create item",
            error: err.message
        });
    }
};
const { deleteFileFromSupabase } = require('./system.controller');
const updateItemById = async (req, res) => {
    try {
        const { id } = req.params;
        const data = req.body;
        console.log("Update request body:", data);

        const updatedItem = {
            updatedAt: new Date().toISOString()
        };

        if (data.name !== undefined) updatedItem.name = data.name;
        if (data.price !== undefined) updatedItem.price = data.price;
        if (data.quantity !== undefined) updatedItem.quantity = data.quantity;
        if (data.image !== undefined) updatedItem.image = data.image;
        if (data.description !== undefined) updatedItem.description = data.description;
        if (data.category !== undefined) updatedItem.category = data.category;

        // const i = Item.getItemById(id);
        // console.log(i);
        // await deleteFileFromSupabase(i.image);

        Item.updateItemById(id, updatedItem);

        res.json({ success: true, message: "Item updated successfully", data: updatedItem });
    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, message: "Failed to update item", error: err.message });
    }
};


const deleteItemById = async (req, res) => {
    try {
        const { id } = req.params;

        const item = Item.getItemById(id);
        if (!item) {
            return res.status(404).json({ message: "Item not found" });
        }

        // 👉 lấy filename từ URL nếu cần
        let filename = item.image;

        if (filename && filename.includes("http")) {
            filename = filename.split("/").pop();
        }

        // 1. Xóa item
        Item.deleteItemById(id);

        // 2. Xóa file
        await deleteFileFromSupabase(filename);

        return res.json({
            success: true,
            message: "Item deleted successfully"
        });

    } catch (err) {
        console.log(err);
        return res.status(500).json({
            message: "Failed to delete item",
            error: err.message
        });
    }
};

const getItemById = (req, res) => {
    try {
        const { id } = req.params;
        const item = Item.getItemById(id);
        res.json(item);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Failed to get item", error: err.message });
    }
    return;
}

const getItems = (req, res) => {
    try {
        const items = Item.getItems();
        res.json(items);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Failed to get items", error: err.message });
    }
    return;
}

module.exports = {
    createNewItem,
    updateItemById,
    deleteItemById,
    getItemById,
    getItems
}