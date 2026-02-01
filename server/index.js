import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DB_PATH = path.join(__dirname, "db.json");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(bodyParser.json());

// Helper to read DB
async function readDb() {
  try {
    const data = await fs.readFile(DB_PATH, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Error reading DB:", error);
    return { users: [], products: [] };
  }
}

// Helper to write DB
async function writeDb(data) {
  await fs.writeFile(DB_PATH, JSON.stringify(data, null, 2));
}

// --- Auth API ---

app.post("/api/login", async (req, res) => {
  const { username, password } = req.body;
  const db = await readDb();

  const user = db.users.find(
    (u) => u.username === username && u.password === password,
  );

  if (user) {
    // In a real app, send a token. Here, just send user info.
    const { password, ...userWithoutPassword } = user;
    res.json({ success: true, user: userWithoutPassword });
  } else {
    res.status(401).json({ success: false, message: "Invalid credentials" });
  }
});

// --- Product API ---

// Public: Get all products (could filter sensitive info if needed)
app.get("/api/products", async (req, res) => {
  const db = await readDb();
  res.json(db.products);
});

// Admin: Add product
app.post("/api/products", async (req, res) => {
  const newProduct = req.body;
  // Basic validation
  if (!newProduct.name || !newProduct.price) {
    return res.status(400).json({ message: "Name and price are required" });
  }

  const db = await readDb();
  const id =
    db.products.length > 0 ? Math.max(...db.products.map((p) => p.id)) + 1 : 1;

  const productToAdd = { ...newProduct, id, stock: newProduct.stock || 0 };
  db.products.push(productToAdd);

  await writeDb(db);
  res.status(201).json(productToAdd);
});

// Admin: Update Stock (and other details)
app.put("/api/products/:id", async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  const db = await readDb();
  const index = db.products.findIndex((p) => p.id === parseInt(id));

  if (index !== -1) {
    db.products[index] = { ...db.products[index], ...updates };
    await writeDb(db);
    res.json(db.products[index]);
  } else {
    res.status(404).json({ message: "Product not found" });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
