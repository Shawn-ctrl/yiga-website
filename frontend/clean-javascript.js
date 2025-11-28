<script>
    // Base API URL - dynamic for development/production
    const API_BASE = window.location.hostname === 'localhost'
        ? 'http://localhost:5000/api'
        : 'https://yiga-backend-99s1bb3kh-shawns-projects-3c3454ff.vercel.app/api';

    // Current admin token
    let currentAuthToken = null;
    let currentAdmin = null;

    // Admin Management Functions
    function showAddAdminModal() {
        document.getElementById('addAdminModal').classList.add('active');
    }

    function closeAddAdminModal() {
        document.getElementById('addAdminModal').classList.remove('active');
        document.getElementById('addAdminForm').reset();
    }

    async function loadAdmins() {
        try {
            const response = await fetch(`${API_BASE}/admins`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${currentAuthToken}`,
                    'Content-Type': 'application/json'
                }
            });

            if (response.ok) {
                const admins = await response.json();
                displayAdmins(admins);
            } else {
                document.getElementById('adminList').innerHTML = '<p style="text-align: center; color: red;">Error loading admins</p>';
            }
        } catch (error) {
            console.error('Error loading admins:', error);
            document.getElementById('adminList').innerHTML = '<p style="text-align: center; color: red;">Failed to load admins</p>';
        }
    }

    function displayAdmins(admins) {
        const adminList = document.getElementById('adminList');

        if (admins.length === 0) {
            adminList.innerHTML = '<p style="text-align: center;">No admins found.</p>';
            return;
        }

        adminList.innerHTML = `
            <table class="applications-table">
                <thead>
                    <tr>
                        <th>Username</th>
                        <th>Role</th>
                        <th>Created By</th>
                        <th>Created At</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    ${admins.map(admin => `
                        <tr>
                            <td>${admin.username}</td>
                            <td><span class="status-${admin.role}">${admin.role}</span></td>
                            <td>${admin.created_by || 'system'}</td>
                            <td>${new Date(admin.created_at).toLocaleDateString()}</td>
                            <td>
                                ${admin.username !== 'superadmin' && admin.id !== currentAdmin.id ?
                                    `<button class="btn btn-small btn-danger" onclick="deleteAdmin(${admin.id})">Delete</button>` :
                                    `<span style="color: #666;">Protected</span>`
                                }
                            </td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        `;
    }

    async function deleteAdmin(adminId) {
        if (!confirm('Are you sure you want to delete this admin?')) return;

        try {
            const response = await fetch(`${API_BASE}/admins/${adminId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${currentAuthToken}`,
                    'Content-Type': 'application/json'
                }
            });

            if (response.ok) {
                await loadAdmins();
                alert('Admin deleted successfully!');
            } else {
                const error = await response.json();
                alert('Error: ' + (error.error || 'Failed to delete admin'));
            }
        } catch (error) {
            console.error('Error deleting admin:', error);
            alert('Failed to delete admin');
        }
    }

    document.getElementById('addAdminForm').addEventListener('submit', async function(e) {
        e.preventDefault();

        const formData = {
            username: document.getElementById('newAdminUsername').value,
            password: document.getElementById('newAdminPassword').value,
            role: document.getElementById('newAdminRole').value
        };

        try {
            const response = await fetch(`${API_BASE}/admins`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${currentAuthToken}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                closeAddAdminModal();
                await loadAdmins();
                alert('Admin created successfully!');
            } else {
                const error = await response.json();
                alert('Error: ' + (error.error || 'Failed to create admin'));
            }
        } catch (error) {
            console.error('Error creating admin:', error);
            alert('Failed to create admin');
        }
    });

    // Page Navigation
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();

            const targetPage = this.getAttribute('data-page');

            // Hide all pages
            document.querySelectorAll('.page-content').forEach(page => {
                page.classList.remove('active');
            });

            // Show the target page
            document.getElementById(targetPage).classList.add('active');

            // Update active navigation link
            document.querySelectorAll('.nav-link').forEach(navLink => {
                navLink.classList.remove('active');
            });
            this.classList.add('active');

            // Scroll to top
            window.scrollTo(0, 0);

            // Close mobile menu if open
            if (document.querySelector('nav').classList.contains('active')) {
                document.querySelector('nav').classList.remove('active');
            }
        });
    });

    // Mobile Menu Toggle
    const mobileMenu = document.querySelector('.mobile-menu');
    const nav = document.querySelector('nav');

    mobileMenu.addEventListener('click', () => {
        nav.classList.toggle('active');
    });

    // Membership Form Submission
    document.getElementById('membershipForm').addEventListener('submit', async function(e) {
        e.preventDefault();

        try {
            const formData = {
                fullName: document.getElementById('fullName').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value,
                country: document.getElementById('country').value,
                program: document.getElementById('program').value,
                motivation: document.getElementById('motivation').value
            };

            const response = await fetch(`${API_BASE}/applications`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });

            const result = await response.json();

            if (response.ok) {
                alert('Application submitted successfully! We will review it and get back to you soon.');
                this.reset();
            } else {
                alert('Error: ' + (result.error || 'Failed to submit application'));
            }
        } catch (error) {
            console.error('Submission error:', error);
            alert('Network error. Please check if the backend server is running.');
        }
    });

    // Admin Login Functions
    function showLoginModal() {
        document.getElementById('loginModal').classList.add('active');
    }

    function closeLoginModal() {
        document.getElementById('loginModal').classList.remove('active');
    }

    document.getElementById('loginForm').addEventListener('submit', async function(e) {
        e.preventDefault();

        try {
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;

            const response = await fetch(`${API_BASE}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password })
            });

            const result = await response.json();

            if (response.ok) {
                // Login successful
                currentAuthToken = result.token;
                currentAdmin = {
                    username: result.username,
                    role: result.role,
                    name: result.username
                };

                document.getElementById('adminPanel').classList.add('active');
                document.getElementById('adminLoginLink').style.display = 'none';
                document.getElementById('adminName').textContent = currentAdmin.name;
                document.getElementById('adminRole').textContent = currentAdmin.role;

                closeLoginModal();

                alert(`Welcome, ${currentAdmin.name} (${currentAdmin.role})!`);
            } else {
                alert('Login failed: ' + (result.error || 'Invalid credentials'));
            }
        } catch (error) {
            console.error('Login error:', error);
            alert('Network error. Please check if the backend server is running.');
        }
    });

    function logoutAdmin() {
        currentAuthToken = null;
        currentAdmin = null;
        document.getElementById('adminPanel').classList.remove('active');
        document.getElementById('adminLoginLink').style.display = 'block';

        // Redirect to home if on admin dashboard
        if (document.getElementById('admin-dashboard').classList.contains('active')) {
            document.querySelectorAll('.page-content').forEach(page => {
                page.classList.remove('active');
            });
            document.getElementById('home').classList.add('active');

            document.querySelectorAll('.nav-link').forEach(navLink => {
                navLink.classList.remove('active');
            });
            document.querySelector('.nav-link[data-page="home"]').classList.add('active');
        }
    }

    async function viewDashboard() {
        try {
            if (!currentAuthToken) {
                alert("Please log in first");
                showLoginModal();
                return;
            }

            // Show admin dashboard
            document.querySelectorAll('.page-content').forEach(page => {
                page.classList.remove('active');
            });
            document.getElementById('admin-dashboard').classList.add('active');

            document.querySelectorAll('.nav-link').forEach(navLink => {
                navLink.classList.remove('active');
            });

            // Show super admin features if applicable
            if (currentAdmin.role === "superadmin") {
                document.getElementById('adminManagementSection').style.display = 'block';
                await loadAdmins();
            }

            // Load applications from backend
            await refreshApplications();

        } catch (error) {
            console.error('Dashboard error:', error);
            alert('Error loading dashboard');
        }
    }

    async function refreshApplications() {
        try {
            if (!currentAuthToken) return;

            const response = await fetch(`${API_BASE}/applications`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${currentAuthToken}`,
                    'Content-Type': 'application/json'
                }
            });

            if (response.ok) {
                const applications = await response.json();
                displayApplications(applications);
                updateDashboardStats(applications);
            } else {
                console.error('Failed to fetch applications');
            }
        } catch (error) {
            console.error('Error refreshing applications:', error);
        }
    }

    function displayApplications(applications) {
        const tableBody = document.getElementById('applicationsTableBody');

        if (applications.length === 0) {
            tableBody.innerHTML = '<tr><td colspan="7" style="text-align: center; padding: 40px;">No applications found.</td></tr>';
            return;
        }

        tableBody.innerHTML = applications.map(app => `
            <tr>
                <td>${app.full_name}</td>
                <td>${app.email}</td>
                <td>${app.country}</td>
                <td>${app.program}</td>
                <td>${new Date(app.submitted_at).toLocaleDateString()}</td>
                <td><span class="status-${app.status}">${app.status}</span></td>
                <td class="action-buttons">
                    <button class="btn btn-small btn-success" onclick="updateApplicationStatus(${app.id}, 'approved')">Approve</button>
                    <button class="btn btn-small btn-warning" onclick="updateApplicationStatus(${app.id}, 'rejected')">Reject</button>
                </td>
            </tr>
        `).join('');
    }

    function updateDashboardStats(applications) {
        const total = applications.length;
        const pending = applications.filter(app => app.status === 'pending').length;
        const approved = applications.filter(app => app.status === 'approved').length;
        const rejected = applications.filter(app => app.status === 'rejected').length;

        document.getElementById('totalApplications').textContent = total;
        document.getElementById('pendingApplications').textContent = pending;
        document.getElementById('approvedApplications').textContent = approved;
        document.getElementById('rejectedApplications').textContent = rejected;
        document.getElementById('pendingCount').textContent = pending;
    }

    async function updateApplicationStatus(applicationId, status) {
        try {
            if (!currentAuthToken) return;

            const response = await fetch(`${API_BASE}/applications/${applicationId}/status`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${currentAuthToken}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ status })
            });

            if (response.ok) {
                await refreshApplications();
                alert(`Application ${status} successfully!`);
            } else {
                alert('Failed to update application status');
            }
        } catch (error) {
            console.error('Error updating application:', error);
            alert('Error updating application status');
        }
    }

    // Test backend connection on page load
    async function testBackendConnection() {
        try {
            const response = await fetch(`${API_BASE}/health`);
            const data = await response.json();
            console.log('Backend connection successful:', data);
        } catch (error) {
            console.warn('Backend connection failed. Make sure the server is running.');
        }
    }

    // Initialize
    testBackendConnection();

    // Show home page by default
    document.getElementById('home').classList.add('active');
    document.querySelector('.nav-link[data-page="home"]').classList.add('active');
</script>
