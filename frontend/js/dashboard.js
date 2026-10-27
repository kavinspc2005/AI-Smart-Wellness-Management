// Get saved profile

const savedProfile =
    localStorage.getItem("wellnessProfile");


// Check profile

if (!savedProfile) {

    alert("Please complete your health profile first.");

    window.location.href = "profile.html";

} else {


    // Convert JSON to object

    const profile =
        JSON.parse(savedProfile);


    // Display user details

    document.getElementById("userName").textContent =
        profile.name;

    document.getElementById("dashboardBMI").textContent =
        profile.bmi;

    document.getElementById("dashboardCategory").textContent =
        profile.category;

    document.getElementById("dashboardWeight").textContent =
        profile.weight;

    document.getElementById("dashboardHeight").textContent =
        profile.height;

    document.getElementById("dashboardGoal").textContent =
        profile.healthGoal;



    // BMI Chart

    const bmi = Number(profile.bmi);


    const ctx =
        document.getElementById("bmiChart");


    new Chart(ctx, {

        type: "bar",

        data: {

            labels: [
                "Underweight",
                "Normal",
                "Overweight",
                "Obese",
                "Your BMI"
            ],

            datasets: [

                {

                    label: "BMI",

                    data: [
                        18.5,
                        24.9,
                        29.9,
                        35,
                        bmi
                    ]

                }

            ]

        },

        options: {

            responsive: true,

            scales: {

                y: {

                    beginAtZero: true,

                    suggestedMax: 40

                }

            }

        }

    });


    // =========================
// AI WELLNESS RECOMMENDATION
// =========================

const generateAI =
    document.getElementById("generateAI");

const aiResult =
    document.getElementById("aiResult");


if (generateAI) {

    generateAI.addEventListener(
        "click",
        function () {


            const goal =
                document.getElementById("aiGoal").value;

            const food =
                document.getElementById("aiFood").value;

            const activity =
                document.getElementById("aiActivity").value;


            if (!goal || !food || !activity) {

                alert(
                    "Please select your health goal, food preference and activity level."
                );

                return;

            }


            let dietRecommendation = "";

            let workoutRecommendation = "";

            let wellnessTip = "";



            // =========================
            // SAMPLE RECOMMENDATIONS
            // =========================

            if (goal === "Weight Loss") {

                dietRecommendation =
                    "Choose vegetables, whole grains, fruits and protein-rich foods. Prefer balanced meals with controlled portions.";

                workoutRecommendation =
                    "30–45 minutes of brisk walking or light cardio, 5 days a week.";

                wellnessTip =
                    "Maintain regular meal timings and stay hydrated throughout the day.";

            }


            else if (goal === "Weight Gain") {

                dietRecommendation =
                    "Include calorie-dense nutritious foods such as nuts, milk, eggs, whole grains and healthy proteins.";

                workoutRecommendation =
                    "Focus on strength training 3–4 days a week with adequate rest.";

                wellnessTip =
                    "Eat regular balanced meals and maintain sufficient sleep.";

            }


            else if (goal === "Muscle Gain") {

                dietRecommendation =
                    "Include protein-rich foods, whole grains, vegetables and healthy fats in balanced meals.";

                workoutRecommendation =
                    "Follow strength training exercises with progressive resistance and proper recovery.";

                wellnessTip =
                    "Maintain adequate protein intake, hydration and consistent sleep.";

            }


            else {

                dietRecommendation =
                    "Follow a balanced diet containing vegetables, fruits, whole grains, protein and healthy fats.";

                workoutRecommendation =
                    "Aim for regular walking, stretching and moderate physical activity.";

                wellnessTip =
                    "Maintain a balanced lifestyle with healthy food, exercise, hydration and good sleep.";

            }



            // =========================
            // DISPLAY RESULT
            // =========================

            document.getElementById("aiDiet")
                .textContent =
                dietRecommendation;


            document.getElementById("aiWorkout")
                .textContent =
                workoutRecommendation;


            document.getElementById("aiTip")
                .textContent =
                wellnessTip;


            aiResult.style.display = "block";


            // Scroll to result

            aiResult.scrollIntoView({
                behavior: "smooth"
            });

        }
    );

}
}

// ========================================
// LOAD PROFILE DATA TO DASHBOARD
// ========================================

async function loadDashboardProfile() {

    // Weight
const dashboardWeight =
    document.getElementById("dashboardWeight");

if (dashboardWeight) {
    dashboardWeight.textContent =
        profile.weight || "--";
}

// Height
const dashboardHeight =
    document.getElementById("dashboardHeight");

if (dashboardHeight) {
    dashboardHeight.textContent =
        profile.height || "--";
}





    const token = localStorage.getItem("token");

    if (!token) {
        window.location.href = "login.html";
        return;
    }

    try {

        const response = await fetch(
            "http://localhost:5000/api/profile",
            {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }
        );

        const profile = await response.json();

        if (!response.ok) {
            console.log("Profile not found");
            return;
        }

        // BMI
        const dashboardBMI =
            document.getElementById("dashboardBMI");

        if (dashboardBMI) {
            dashboardBMI.textContent =
                profile.bmi || "--";
        }

        // Weight
        const dashboardWeight =
            document.getElementById("dashboardWeight");

        if (dashboardWeight) {
            dashboardWeight.textContent =
                profile.weight
                ? profile.weight + " kg"
                : "--";
        }

        // Health Category
        const dashboardCategory =
            document.getElementById("dashboardCategory");

        if (dashboardCategory) {
            dashboardCategory.textContent =
                profile.healthCategory || "--";
        }

        // Goal
        const dashboardGoal =
            document.getElementById("dashboardGoal");

        if (dashboardGoal) {
            dashboardGoal.textContent =
                profile.healthGoal || "--";
        }

        console.log(
            "Dashboard profile loaded:",
            profile
        );

    } catch (error) {

        console.error(
            "Dashboard profile error:",
            error
        );
    }
}


// Load when dashboard opens
loadDashboardProfile();


