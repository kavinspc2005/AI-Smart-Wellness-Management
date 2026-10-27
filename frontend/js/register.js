const registerForm = document.getElementById("registerForm");

registerForm.addEventListener("submit", async function (event) {
event.preventDefault();

const name = document.getElementById("name").value.trim();
const email = document.getElementById("email").value.trim();
const password = document.getElementById("password").value;
const confirmPassword = document.getElementById("confirmPassword").value;

if (password !== confirmPassword) {
    alert("Passwords do not match!");
    return;
}

if (password.length < 6) {
    alert("Password must contain at least 6 characters!");
    return;
}

try {
    const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ name, email, password })
    });

    const data = await response.json();

    if (response.ok) {
        alert("Registration successful!");
        registerForm.reset();
    } else {
        alert(data.message || "Registration failed!");
    }
} catch (error) {
    console.error("Registration error:", error);
    alert("Backend connection failed. Check whether the server is running.");
}

});