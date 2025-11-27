const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const sqlite3 = require("sqlite3").verbose();

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || "yiga-secret-key";

app.use(cors({ origin: "*" }));
app.use(express.json());

const db = new sqlite3.Database(":memory:");

// Initialize database with super admin
db.serialize(() => {
    db.run(`CREATE TABLE admins (
        id INTEGER PRIMARY KEY, 
        username TEXT UNIQUE, 
        password TEXT, 
        role TEXT,
        created_by TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);
    
    db.run(`CREATE TABLE applications (
        id INTEGER PRIMARY KEY, 
        full_name TEXT, email TEXT, 
        phone TEXT, country TEXT, 
        program TEXT, motivation TEXT, 
        status TEXT DEFAULT "pending",
        submitted_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);
    
    // Create super admin and regular admin
    const superAdminPassword = bcrypt.hashSync("superadmin123", 10);
    const adminPassword = bcrypt.hashSync("admin123", 10);
    
    db.run(`INSERT OR IGNORE INTO admins (username, password, role, created_by) VALUES (?, ?, ?, ?)`, 
        ["superadmin", superAdminPassword, "superadmin", "system"]);
    db.run(`INSERT OR IGNORE INTO admins (username, password, role, created_by) VALUES (?, ?, ?, ?)`, 
        ["admin", adminPassword, "admin", "superadmin"]);
});

// Middleware to verify admin tokens and roles
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    
    if (!token) {
        return res.status(401).json({ error: "Access token required" });
    }
    
    jwt.verify(token, JWT_SECRET, (err, admin) => {
        if (err) return res.status(403).json({ error: "Invalid token" });
        req.admin = admin;
        next();
    });
}

function requireSuperAdmin(req, res, next) {
    if (req.admin.role !== "superadmin") {
        return res.status(403).json({ error: "Super admin access required" });
    }
    next();
}

// Health check
app.get("/api/health", (req, res) => {
    res.json({ status: "ok", message: "YIGA Backend is running" });
});

// Application endpoints
app.post("/api/applications", (req, res) => {
    const { fullName, email, phone, country, program, motivation } = req.body;
    if (!fullName || !email || !phone || !country || !program || !motivation) {
        return res.status(400).json({ error: "All fields are required" });
    }
    
    db.run(`INSERT INTO applications (full_name, email, phone, country, program, motivation) VALUES (?, ?, ?, ?, ?, ?)`,
        [fullName, email, phone, country, program, motivation],
        function(err) {
            if (err) return res.status(500).json({ error: "Failed to submit application" });
            res.json({ message: "Application submitted successfully!", applicationId: this.lastID });
        }
    );
});

// Get all applications (admin only)
app.get("/api/applications", authenticateToken, (req, res) => {
    db.all("SELECT * FROM applications ORDER BY submitted_at DESC", (err, rows) => {
        if (err) return res.status(500).json({ error: "Database error" });
        res.json(rows);
    });
});

// Auth endpoints
app.post("/api/auth/login", (req, res) => {
    const { username, password } = req.body;
    
    db.get("SELECT * FROM admins WHERE username = ?", [username], (err, admin) => {
        if (err || !admin) return res.status(401).json({ error: "Invalid credentials" });
        
        const validPassword = bcrypt.compareSync(password, admin.password);
        if (!validPassword) return res.status(401).json({ error: "Invalid credentials" });
        
        const token = jwt.sign(
            { id: admin.id, username: admin.username, role: admin.role },
            JWT_SECRET,
            { expiresIn: "24h" }
        );
        
        res.json({ 
            token, 
            username: admin.username, 
            role: admin.role, 
            message: "Login successful" 
        });
    });
});

// SUPER ADMIN ONLY ENDPOINTS

// Get all admins
app.get("/api/admins", authenticateToken, requireSuperAdmin, (req, res) => {
    db.all("SELECT id, username, role, created_by, created_at FROM admins", (err, rows) => {
        if (err) return res.status(500).json({ error: "Database error" });
        res.json(rows);
    });
});

// Create new admin
app.post("/api/admins", authenticateToken, requireSuperAdmin, (req, res) => {
    const { username, password, role } = req.body;
    
    if (!username || !password || !role) {
        return res.status(400).json({ error: "Username, password and role required" });
    }
    
    const hashedPassword = bcrypt.hashSync(password, 10);
    db.run(`INSERT INTO admins (username, password, role, created_by) VALUES (?, ?, ?, ?)`,
        [username, hashedPassword, role, req.admin.username],
        function(err) {
            if (err) return res.status(500).json({ error: "Failed to create admin" });
            res.json({ message: "Admin created successfully", adminId: this.lastID });
        }
    );
});

// Delete admin
app.delete("/api/admins/:id", authenticateToken, requireSuperAdmin, (req, res) => {
    const adminId = req.params.id;
    
    // Prevent superadmin from deleting themselves
    if (parseInt(adminId) === req.admin.id) {
        return res.status(400).json({ error: "Cannot delete your own account" });
    }
    
    db.run("DELETE FROM admins WHERE id = ?", [adminId], function(err) {
        if (err) return res.status(500).json({ error: "Failed to delete admin" });
        res.json({ message: "Admin deleted successfully" });
    });
});

app.get("/", (req, res) => {
    res.json({ message: "YIGA Backend API", version: "2.0.0" });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
