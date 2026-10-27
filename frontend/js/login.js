const loginForm = document.getElementById("loginForm");

const togglePassword = document.getElementById("togglePassword");

const passwordInput =
    document.getElementById("loginPassword");


// Show / Hide Password

togglePassword.addEventListener("click", function () {

    if (passwordInput.type === "password") {

        passwordInput.type = "text";

        togglePassword.innerHTML =
            '<i class="bi bi-eye-slash"></i>';

    } else {

        passwordInput.type = "password";

        togglePassword.innerHTML =
            '<i class="bi bi-eye"></i>';
    }

});


// Login Form

loginForm.addEventListener("submit", async function (event) {

    event.preventDefault();

    const email =
        document.getElementById("loginEmail").value.trim();

    const password =
        document.getElementById("loginPassword").value;


    if (email === "" || password === "") {

        alert("Please enter email and password.");

        return;
    }


    try {

        const response = await fetch(
            "http://localhost:5000/api/auth/login",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    email: email,
                    password: password
                })
            }
        );


        const data = await response.json();


        if (!response.ok) {

            alert(data.message || "Login failed.");

            return;
        }


        // Save JWT token

        localStorage.setItem(
            "token",
            data.token
        );

        localStorage.setItem(
            "userId",
            data.userId
        );

        localStorage.setItem(
            "userName",
            data.name
        );


     alert("Login successful! Role: " + data.role);

if (data.role === "admin") {
    window.location.href = "admin.html";
} else if (data.role === "user") {
    window.location.href = "profile.html";
} else {
    alert("Role missing. Please check backend.");
}

    } catch (error) {

        console.error(error);

        alert(
            "Cannot connect to backend."
        );
    }

});