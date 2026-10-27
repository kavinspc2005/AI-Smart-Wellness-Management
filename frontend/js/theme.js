// =========================
// DARK MODE
// =========================

const savedTheme =
    localStorage.getItem("theme");


// Apply saved theme

if (savedTheme === "dark") {

    document.body.classList.add("dark-mode");

}


// Create toggle button

const themeButton =
    document.createElement("button");


themeButton.id = "themeToggle";

themeButton.className =
    "btn btn-outline-success theme-toggle";


themeButton.innerHTML =
    '<i class="bi bi-moon-stars"></i>';


// Add button to page

document.body.appendChild(themeButton);


// Change icon

function updateThemeIcon() {

    if (
        document.body.classList.contains("dark-mode")
    ) {

        themeButton.innerHTML =
            '<i class="bi bi-sun"></i>';

        themeButton.title =
            "Switch to Light Mode";

    } else {

        themeButton.innerHTML =
            '<i class="bi bi-moon-stars"></i>';

        themeButton.title =
            "Switch to Dark Mode";

    }

}


// Initial icon

updateThemeIcon();


// Toggle theme

themeButton.addEventListener(
    "click",
    function () {

        document.body.classList.toggle(
            "dark-mode"
        );


        const isDark =
            document.body.classList.contains(
                "dark-mode"
            );


        localStorage.setItem(
            "theme",
            isDark ? "dark" : "light"
        );


        updateThemeIcon();

    }



    
);

// =========================
// ACTIVE NAVIGATION
// =========================

const currentPage =
    window.location.pathname.split("/").pop();

const navLinks =
    document.querySelectorAll(".navbar .nav-link");


navLinks.forEach(function (link) {

    const linkPage =
        link.getAttribute("href");

    if (linkPage === currentPage) {

        link.classList.add("active");

    }

});