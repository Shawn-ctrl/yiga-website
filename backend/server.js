const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const PORT = 5000;
const JWT_SECRET = 'yiga-super-secret-key-change-in-production';

app.use(cors());
app.use(express.json());

const db = new sqlite3.Database('./yiga.db', (err) => {
    if (err) {
        console.error('Error opening database:', err);
    } else {
        console.log('Connected to SQLite database');
        initializeDatabase();
    }
});

function initializeDatabase() {
    db.serialize(() => {
        db.run(`CREATE TABLE IF NOT EXISTS admins (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT UNIQUE NOT NULL,
            password TEXT NOT NULL,
            role TEXT DEFAULT 'admin',
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )`);

        db.run(`CREATE TABLE IF NOT EXISTS applications (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            full_name TEXT NOT NULL,
            email TEXT NOT NULL,
            phone TEXT NOT NULL,
            country TEXT NOT NULL,
            program TEXT NOT NULL,
            motivation TEXT NOT NULL,
            status TEXT DEFAULT 'pending',
            submitted_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )`);

        const superAdminPassword = bcrypt.hashSync('superadmin123', 10);
        db.run(`INSERT OR IGNORE INTO admins (username, password, role) VALUES (?, ?, ?)`,
            ['superadmin', superAdminPassword, 'superadmin'],
            (err) => {
                if (err) {
                    console.error('Error creating super admin:', err);
                } else {
                    console.log('Super Admin created (username: superadmin, password: superadmin123)');
                }
            }
        );

        const adminPassword = bcrypt.hashSync('admin123', 10);
        db.run(`INSERT OR IGNORE INTO admins (username, password, role) VALUES (?, ?, ?)`,
            ['admin', adminPassword, 'admin'],
            (err) => {
                if (err) {
                    console.error('Error creating admin:', err);
                } else {
                    console.log('Admin created (username: admin, password: admin123)');
                }
            }
        );
    });
}

function requireSuperAdmin(req, res, next) {
    if (req.user.role !== 'superadmin') {
        return res.status(403).json({ error: 'Super admin access required' });
    }
    next();
}

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: 'Access denied' });
    }

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ error: 'Invalid token' });
        }
        req.user = user;
        next();
    });
}

app.post('/api/auth/login', (req, res) => {
    const { username, password } = req.body;

    db.get('SELECT * FROM admins WHERE username = ?', [username], async (err, admin) => {
        if (err) {
            return res.status(500).json({ error: 'Database error' });
        }

        if (!admin) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const validPassword = await bcrypt.compare(password, admin.password);
        if (!validPassword) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const token = jwt.sign({ 
            id: admin.id, 
            username: admin.username,
            role: admin.role 
        }, JWT_SECRET, {
            expiresIn: '24h'
        });

        res.json({ 
            token, 
            username: admin.username,
            role: admin.role 
        });
    });
});

app.post('/api/auth/register', authenticateToken, requireSuperAdmin, (req, res) => {
    const { username, password, role = 'admin' } = req.body;

    if (!username || !password) {
        return res.status(400).json({ error: 'Username and password are required' });
    }

    if (password.length < 6) {
        return res.status(400).json({ error: 'Password must be at least 6 characters long' });
    }

    if (!['admin', 'superadmin'].includes(role)) {
        return res.status(400).json({ error: 'Invalid role' });
    }

    const hashedPassword = bcrypt.hashSync(password, 10);
    
    db.run(
        'INSERT INTO admins (username, password, role) VALUES (?, ?, ?)',
        [username, hashedPassword, role],
        function(err) {
            if (err) {
                if (err.code === 'SQLITE_CONSTRAINT') {
                    return res.status(400).json({ error: 'Username already exists' });
                }
                console.error('Error creating admin:', err);
                return res.status(500).json({ error: 'Failed to create admin' });
            }
            res.json({ 
                message: 'Admin created successfully',
                adminId: this.lastID,
                username,
                role
            });
        }
    );
});

app.get('/api/auth/admins', authenticateToken, requireSuperAdmin, (req, res) => {
    db.all('SELECT id, username, role, created_at FROM admins ORDER BY created_at DESC', [], (err, rows) => {
        if (err) {
            console.error('Error fetching admins:', err);
            return res.status(500).json({ error: 'Failed to fetch admins' });
        }
        res.json(rows);
    });
});

app.put('/api/auth/admins/:id', authenticateToken, requireSuperAdmin, (req, res) => {
    const { id } = req.params;
    const { role } = req.body;

    if (!['admin', 'superadmin'].includes(role)) {
        return res.status(400).json({ error: 'Invalid role' });
    }

    if (parseInt(id) === 1) {
        return res.status(400).json({ error: 'Cannot modify default super admin' });
    }

    db.run('UPDATE admins SET role = ? WHERE id = ?', [role, id], function(err) {
        if (err) {
            console.error('Error updating admin:', err);
            return res.status(500).json({ error: 'Failed to update admin' });
        }
        if (this.changes === 0) {
            return res.status(404).json({ error: 'Admin not found' });
        }
        res.json({ message: 'Admin updated successfully' });
    });
});

app.delete('/api/auth/admins/:id', authenticateToken, requireSuperAdmin, (req, res) => {
    const { id } = req.params;

    if (parseInt(id) === 1) {
        return res.status(400).json({ error: 'Cannot delete the default super admin' });
    }

    if (parseInt(id) === req.user.id) {
        return res.status(400).json({ error: 'Cannot delete your own account' });
    }

    db.run('DELETE FROM admins WHERE id = ?', [id], function(err) {
        if (err) {
            console.error('Error deleting admin:', err);
            return res.status(500).json({ error: 'Failed to delete admin' });
        }
        if (this.changes === 0) {
            return res.status(404).json({ error: 'Admin not found' });
        }
        res.json({ message: 'Admin deleted successfully' });
    });
});

app.get('/api/auth/me', authenticateToken, (req, res) => {
    res.json({
        id: req.user.id,
        username: req.user.username,
        role: req.user.role
    });
});

app.post('/api/applications', (req, res) => {
    const { fullName, email, phone, country, program, motivation } = req.body;

    if (!fullName || !email || !phone || !country || !program || !motivation) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    db.run(
        `INSERT INTO applications (full_name, email, phone, country, program, motivation)
         VALUES (?, ?, ?, ?, ?, ?)`,
        [fullName, email, phone, country, program, motivation],
        function(err) {
            if (err) {
                console.error('Error submitting application:', err);
                return res.status(500).json({ error: 'Failed to submit application' });
            }
            res.json({
                message: 'Application submitted successfully!',
                applicationId: this.lastID
            });
        }
    );
});

app.get('/api/applications', authenticateToken, (req, res) => {
    db.all('SELECT * FROM applications ORDER BY submitted_at DESC', [], (err, rows) => {
        if (err) {
            console.error('Error fetching applications:', err);
            return res.status(500).json({ error: 'Failed to fetch applications' });
        }
        res.json(rows);
    });
});

app.put('/api/applications/:id', authenticateToken, (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    if (!['pending', 'approved', 'rejected'].includes(status)) {
        return res.status(400).json({ error: 'Invalid status' });
    }

    db.run(
        'UPDATE applications SET status = ? WHERE id = ?',
        [status, id],
        function(err) {
            if (err) {
                console.error('Error updating application:', err);
                return res.status(500).json({ error: 'Failed to update application' });
            }
            if (this.changes === 0) {
                return res.status(404).json({ error: 'Application not found' });
            }
            res.json({ message: 'Application status updated successfully' });
        }
    );
});

app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', message: 'YIGA Backend is running' });
});

app.listen(PORT, () => {
    console.log(`\n========================================`);
    console.log(`  YIGA Backend Server`);
    console.log(`  Running on http://localhost:${PORT}`);
    console.log(`========================================\n`);
    console.log('Default Credentials:');
    console.log('  Super Admin: superadmin / superadmin123');
    console.log('  Admin: admin / admin123');
    console.log('========================================\n');
});
