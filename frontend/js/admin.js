
const token = localStorage.getItem("token");

if (!token) {
    alert("Please login as admin first.");
    window.location.href = "login.html";
}

async function loadAdminDashboard() {
    try {
        const headers = {
            Authorization: `Bearer ${token}`
        };

        const [usersResponse, profilesResponse] = await Promise.all([
            fetch("http://localhost:5000/api/admin/users", { headers }),
            fetch("http://localhost:5000/api/admin/profiles", { headers })
        ]);

        if (usersResponse.status === 401 || usersResponse.status === 403 ||
            profilesResponse.status === 401 || profilesResponse.status === 403) {
            alert("Admin access denied. Please login again.");
            return;
        }

        if (!usersResponse.ok || !profilesResponse.ok) {
            throw new Error("Failed to load admin data.");
        }

        const usersData = await usersResponse.json();
        const profilesData = await profilesResponse.json();

        const users = usersData.users || [];
        const profiles = Array.isArray(profilesData) ? profilesData : [];

        document.getElementById("totalUsers").textContent =
            usersData.totalUsers ?? users.length;

        document.getElementById("totalProfiles").textContent =
            profiles.length;

        document.getElementById("usersTable").innerHTML = users.length
            ? users.map(user => `
                <tr>
                    <td>${escapeHTML(user.name || "-")}</td>
                    <td>${escapeHTML(user.email || "-")}</td>
                    <td>${escapeHTML(user.role || "user")}</td>
                </tr>
            `).join("")
            : '<tr><td colspan="3">No users found</td></tr>';

        document.getElementById("profilesTable").innerHTML = profiles.length
            ? profiles.map(profile => `
                <tr>
                    <td>${escapeHTML(profile.userId?.name || "-")}</td>
                    <td>${escapeHTML(profile.age ?? "-")}</td>
                    <td>${escapeHTML(profile.bmi ?? "-")}</td>
                    <td>${escapeHTML(profile.healthCategory || "-")}</td>
                </tr>
            `).join("")
            : '<tr><td colspan="4">No health profiles found</td></tr>';

    } catch (error) {
        console.error(error);
        alert("Unable to load dashboard. Check whether backend is running.");
    }
}

function escapeHTML(value) {
    return String(value).replace(/[&<>"']/g, char => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
    })[char]);
}

function logout() {
    localStorage.removeItem("token");
    window.location.href = "login.html";
}

if (token) {
    loadAdminDashboard();
}
