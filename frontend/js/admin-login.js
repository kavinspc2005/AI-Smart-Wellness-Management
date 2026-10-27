const adminLoginForm = document.getElementById("adminLoginForm");

adminLoginForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;
    const errorMessage = document.getElementById("errorMessage");

    errorMessage.textContent = "";

    try {
        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        if (!response.ok) {
            errorMessage.textContent = data.message || "Login failed.";
            return;
        }

        if (data.role !== "admin") {
            errorMessage.textContent = "Access denied. Admin account only.";
            return;
        }

        localStorage.setItem("token", data.token);
        localStorage.setItem("userId", data.userId);
        localStorage.setItem("userName", data.name);
        localStorage.setItem("userRole", data.role);

        window.location.href = "admin.html";

    } catch (error) {
        console.error("Admin login error:", error);
        errorMessage.textContent =
            "Backend connection failed. Please check the server.";
    }
});