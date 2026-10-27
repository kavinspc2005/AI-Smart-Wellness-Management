// ========================================
// GET SAVED PROFILE
// ========================================

const savedProfile = localStorage.getItem("wellnessProfile");


// ========================================
// CHECK PROFILE
// ========================================

if (!savedProfile) {

    alert("Please complete your health profile first.");

    window.location.href = "profile.html";

} else {

    // Convert saved JSON into object
    const profile = JSON.parse(savedProfile);


    // ========================================
    // DISPLAY USER INFORMATION
    // ========================================

    document.getElementById("dietUser").textContent =
        profile.name;

    document.getElementById("dietBMI").textContent =
        profile.bmi;

    document.getElementById("dietCategory").textContent =
        profile.category;

    document.getElementById("dietGoal").textContent =
        profile.healthGoal;


    // ========================================
    // USER PREFERENCES
    // ========================================

    const foodPreference = profile.foodPreference;
    const healthGoal = profile.healthGoal;


    // ========================================
    // MEAL VARIABLES
    // ========================================

    let breakfast;
    let lunch;
    let snack;
    let dinner;


    // ========================================
    // VEGETARIAN
    // ========================================

    if (foodPreference === "Vegetarian") {

        breakfast =
            "Oats with milk, banana and almonds";

        lunch =
            "Brown rice, vegetable curry, dal and salad";

        snack =
            "Apple with a handful of nuts";

        dinner =
            "Chapati with mixed vegetables and curd";
    }


    // ========================================
    // VEGAN
    // ========================================

    else if (foodPreference === "Vegan") {

        breakfast =
            "Oatmeal with banana, berries and chia seeds";

        lunch =
            "Brown rice, tofu, vegetables and salad";

        snack =
            "Fresh fruits with mixed nuts";

        dinner =
            "Whole wheat chapati with tofu and vegetables";
    }


    // ========================================
    // NON-VEGETARIAN
    // ========================================

    else if (foodPreference === "Non-Vegetarian") {

        breakfast =
            "Boiled eggs, whole wheat toast and fruit";

        lunch =
            "Brown rice, grilled chicken, vegetables and salad";

        snack =
            "Greek yogurt with fruit";

        dinner =
            "Grilled fish or chicken with vegetables";
    }


    // ========================================
    // EGGETARIAN
    // ========================================

    else if (foodPreference === "Eggetarian") {

        breakfast =
            "Boiled eggs, oats and banana";

        lunch =
            "Brown rice, dal, vegetables and boiled eggs";

        snack =
            "Fruit with almonds";

        dinner =
            "Chapati, vegetable curry and egg omelette";
    }


    // ========================================
    // DISPLAY MEALS
    // ========================================

    document.getElementById("breakfastMeal").textContent =
        breakfast;

    document.getElementById("lunchMeal").textContent =
        lunch;

    document.getElementById("snackMeal").textContent =
        snack;

    document.getElementById("dinnerMeal").textContent =
        dinner;


    // ========================================
    // SAVE DIET PLAN
    // ========================================

    const saveDietBtn =
        document.getElementById("saveDietBtn");


    if (saveDietBtn) {

        saveDietBtn.addEventListener(
            "click",
            async function () {


                // Create diet object
                const dietPlan = {

                    userName: profile.name,

                    bmi: profile.bmi,

                    category: profile.category,

                    healthGoal: healthGoal,

                    foodPreference: foodPreference,

                    breakfast: breakfast,

                    lunch: lunch,

                    snacks: snack,

                    dinner: dinner,

                    calories: 2000,

                    date: new Date().toLocaleDateString()

                };


                // ========================================
                // SAVE TO LOCAL STORAGE
                // ========================================

                localStorage.setItem(
                    "latestDietPlan",
                    JSON.stringify(dietPlan)
                );


                // ========================================
                // SAVE TO BACKEND
                // ========================================

                await saveDietToBackend(dietPlan);

            }
        );
    }

}


// ========================================
// SAVE DIET TO BACKEND
// ========================================

async function saveDietToBackend(dietData) {

    // Get JWT token
    const token = localStorage.getItem("token");


    // Check login
    if (!token) {

        alert("Please login first.");

        window.location.href = "login.html";

        return;
    }


    try {

        // Send diet to backend
        const response = await fetch(
            "http://localhost:5000/api/diet",
            {

                method: "POST",

                headers: {

                    "Content-Type": "application/json",

                    "Authorization":
                        `Bearer ${token}`

                },

                body: JSON.stringify(dietData)

            }
        );


        // Convert response to JSON
        const data = await response.json();


        // Check response
        if (!response.ok) {

            alert(
                data.message ||
                "Diet save failed"
            );

            console.error(
                "Diet Save Error:",
                data
            );

            return;
        }


        // Success
        alert(
            "Diet plan saved successfully!"
        );

        console.log(
            "Backend Response:",
            data
        );


    } catch (error) {

        console.error(
            "Backend Connection Error:",
            error
        );

        alert(
            "Cannot connect to backend."
        );
    }
}