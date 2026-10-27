const profileForm = document.getElementById("profileForm");

const bmiResult = document.getElementById("bmiResult");
const bmiValue = document.getElementById("bmiValue");
const healthCategory = document.getElementById("healthCategory");

if (profileForm) {

    profileForm.addEventListener("submit", async function (event) {

        event.preventDefault();

        // Get user details
        const name =
            document.getElementById("profileName").value.trim();

        const age =
            Number(document.getElementById("age").value);

        const gender =
            document.getElementById("gender").value;

        const height =
            Number(document.getElementById("height").value);

        const weight =
            Number(document.getElementById("weight").value);

        const activityLevel =
            document.getElementById("activityLevel").value;

        const foodPreference =
            document.getElementById("foodPreference").value;

        const healthGoal =
            document.getElementById("healthGoal").value;


        // Validate
        if (height <= 0 || weight <= 0) {

            alert("Please enter valid height and weight.");

            return;
        }


        // BMI calculation
        const heightMeter = height / 100;

        const bmi =
            weight / (heightMeter * heightMeter);

        const roundedBMI = bmi.toFixed(1);


        // Health category
        let category;

        if (bmi < 18.5) {

            category = "Underweight";

        } else if (bmi < 25) {

            category = "Normal";

        } else if (bmi < 30) {

            category = "Overweight";

        } else {

            category = "Obese";
        }


        // Display BMI
        bmiValue.textContent = roundedBMI;

        healthCategory.textContent = category;

        bmiResult.classList.remove("d-none");


        // Save locally
        const localProfile = {

            name: name,
            age: age,
            gender: gender,
            height: height,
            weight: weight,
            activityLevel: activityLevel,
            foodPreference: foodPreference,
            healthGoal: healthGoal,
            bmi: roundedBMI,
            category: category

        };

        localStorage.setItem(
            "wellnessProfile",
            JSON.stringify(localProfile)
        );


        // =========================
        // SAVE TO BACKEND
        // =========================

        const token = localStorage.getItem("token");

        if (!token) {

            alert("Please login first.");

            window.location.href = "login.html";

            return;
        }


        const profileData = {

            age: age,
            gender: gender,
            height: height,
            weight: weight,
            activityLevel: activityLevel,
            foodPreference: foodPreference,
            healthGoal: healthGoal,
            bmi: Number(roundedBMI),
            healthCategory: category

        };


        try {

            const response = await fetch(
                "http://localhost:5000/api/profile",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    },

                    body: JSON.stringify(profileData)
                }
            );


            const data = await response.json();


            if (!response.ok) {

                alert(
                    data.message ||
                    "Profile save failed"
                );

                return;
            }


            alert("Profile saved successfully!");

            console.log("Backend Response:", data);


        } catch (error) {

            console.error(
                "Backend Error:",
                error
            );

            alert(
                "Cannot connect to backend."
            );
        }

    });

}

// ========================================
// LOAD PROFILE FROM BACKEND
// ========================================

async function loadProfile() {

    const token = localStorage.getItem("token");

    if (!token) {
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

        // Fill profile form
        document.getElementById("age").value =
            profile.age || "";

        document.getElementById("gender").value =
            profile.gender || "";

        document.getElementById("height").value =
            profile.height || "";

        document.getElementById("weight").value =
            profile.weight || "";

        document.getElementById("activityLevel").value =
            profile.activityLevel || "";

        document.getElementById("foodPreference").value =
            profile.foodPreference || "";

        document.getElementById("healthGoal").value =
            profile.healthGoal || "";

        console.log("Profile loaded:", profile);

    } catch (error) {

        console.error(
            "Profile loading error:",
            error
        );

    }
}


// Load profile when page opens
loadProfile();