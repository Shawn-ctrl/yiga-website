// Get all applications (admin only)
app.get("/api/applications", authenticateToken, (req, res) => {
    db.all("SELECT * FROM applications ORDER BY submitted_at DESC", (err, rows) => {
        if (err) return res.status(500).json({ error: "Database error" });
        res.json(rows);
    });
});

// Update application status
app.put("/api/applications/:id/status", authenticateToken, (req, res) => {
    const { status } = req.body;
    const applicationId = req.params.id;
    
    if (!['pending', 'approved', 'rejected'].includes(status)) {
        return res.status(400).json({ error: "Invalid status" });
    }
    
    db.run("UPDATE applications SET status = ? WHERE id = ?", [status, applicationId], function(err) {
        if (err) return res.status(500).json({ error: "Database error" });
        res.json({ message: "Application status updated" });
    });
});
