const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const sqlite3 = require("sqlite3").verbose();

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || "yiga-secret-key";

// Enhanced CORS for production - allow all Vercel domains
app.use(cors({
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);
        
        // Allow all Vercel app domains and local development
        const allowedPatterns = [
            /\.vercel\.app$/,
            /localhost/,
            /127\.0\.0\.1/
        ];
        
        if (allowedPatterns.some(pattern => pattern.test(origin))) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true
}));

app.use(express.json());

const db = new sqlite3.Database(":memory:");

// Initialize database
db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS admins (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        role TEXT DEFAULT "admin"
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS applications (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        full_name TEXT NOT NULL,
        email TEXT NOT NULL,
        phone TEXT NOT NULL,
        country TEXT NOT NULL,
        program TEXT NOT NULL,
        motivation TEXT NOT NULL,
        status TEXT DEFAULT "pending",
        submitted_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);

    // Create default admins
    const superAdminPassword = bcrypt.hashSync("superadmin123", 10);
    const adminPassword = bcrypt.hashSync("admin123", 10);
    
    db.run(`INSERT OR IGNORE INTO admins (username, password, role) VALUES (?, ?, ?)`, 
        ["superadmin", superAdminPassword, "superadmin"]);
    db.run(`INSERT OR IGNORE INTO admins (username, password, role) VALUES (?, ?, ?)`, 
        ["admin", adminPassword, "admin"]);
});

// Health check
app.get("/api/health", (req, res) => {
    res.json({ status: "ok", message: "YIGA Backend is running" });
});

// Application submission
app.post("/api/applications", (req, res) => {
    const { fullName, email, phone, country, program, motivation } = req.body;
    
    if (!fullName || !email || !phone || !country || !program || !motivation) {
        return res.status(400).json({ error: "All fields are required" });
    }

    db.run(
        `INSERT INTO applications (full_name, email, phone, country, program, motivation) VALUES (?, ?, ?, ?, ?, ?)`,
        [fullName, email, phone, country, program, motivation],
        function(err) {
            if (err) {
                return res.status(500).json({ error: "Failed to submit application" });
            }
            res.json({ message: "Application submitted successfully!", applicationId: this.lastID });
        }
    );
});

// Root endpoint
app.get("/", (req, res) => {
    res.json({ message: "YIGA Backend API", version: "1.0.0" });
});

app.listen(PORT, () => {
    console.log(`YIGA Backend running on port ${PORT}`);
});
