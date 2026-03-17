require("dotenv").config();

const http = require("http");
// const db = require("./configs/db");
const express = require("express");
const cors = require("cors");
const hostname = "0.0.0.0";
const port = process.env.PORT || 3000;

const app = express();
const corsOptions = {
  origin: true, // reflect request origin to support multiple domains & production
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};
app.use(cors(corsOptions));

// ✅ FIX lỗi PayloadTooLargeError
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use("/local", require("./route/local"));
const server = http.createServer(app);

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

module.exports = app;