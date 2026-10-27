const settingsForm =
    document.getElementById("settingsForm");


// Get saved profile

const savedProfile =
    localStorage.getItem("wellnessProfile");


// Check profile

if (!savedProfile) {

    alert("Please complete your health profile first.");

    window.location.href = "profile.html";

} else {

    const profile =
        JSON.parse(savedProfile);


    // Load existing data

    document.getElementById("settingsName").value =
        profile.name || "";

    document.getElementById("settingsAge").value =
        profile.age || "";

    document.getElementById("settingsGender").value =
        profile.gender || "";

    document.getElementById("settingsHeight").value =
        profile.height || "";

    document.getElementById("settingsWeight").value =
        profile.weight || "";

    document.getElementById("settingsActivity").value =
        profile.activityLevel || "";

    document.getElementById("settingsFood").value =
        profile.foodPreference || "";

    document.getElementById("settingsGoal").value =
        profile.healthGoal || "";


    // Calculate BMI

    function calculateSettingsBMI() {

        const height =
            Number(
                document.getElementById("settingsHeight").value
            );

        const weight =
            Number(
                document.getElementById("settingsWeight").value
            );


        if (height <= 0 || weight <= 0) {

            document.getElementById("settingsBMI")
                .textContent = "--";

            document.getElementById("settingsCategory")
                .textContent = "--";

            return;

        }


        const heightMeter =
            height / 100;


        const bmi =
            weight / (heightMeter * heightMeter);


        const roundedBMI =
            bmi.toFixed(1);


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


        document.getElementById("settingsBMI")
            .textContent = roundedBMI;

        document.getElementById("settingsCategory")
            .textContent = category;

    }


    // Update BMI while typing

    document.getElementById("settingsHeight")
        .addEventListener(
            "input",
            calculateSettingsBMI
        );


    document.getElementById("settingsWeight")
        .addEventListener(
            "input",
            calculateSettingsBMI
        );


    // Initial BMI

    calculateSettingsBMI();



    // Save changes

    settingsForm.addEventListener(
        "submit",
        function(event) {

            event.preventDefault();


            const height =
                Number(
                    document.getElementById("settingsHeight").value
                );

            const weight =
                Number(
                    document.getElementById("settingsWeight").value
                );


            if (height <= 0 || weight <= 0) {

                alert("Please enter valid height and weight.");

                return;

            }


            const heightMeter =
                height / 100;


            const bmi =
                weight / (heightMeter * heightMeter);


            const roundedBMI =
                bmi.toFixed(1);


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


            // Updated profile

            const updatedProfile = {

                name:
                    document.getElementById("settingsName").value.trim(),

                age:
                    Number(
                        document.getElementById("settingsAge").value
                    ),

                gender:
                    document.getElementById("settingsGender").value,

                height:
                    height,

                weight:
                    weight,

                activityLevel:
                    document.getElementById("settingsActivity").value,

                foodPreference:
                    document.getElementById("settingsFood").value,

                healthGoal:
                    document.getElementById("settingsGoal").value,

                bmi:
                    roundedBMI,

                category:
                    category

            };


            // Save updated profile

            localStorage.setItem(
                "wellnessProfile",
                JSON.stringify(updatedProfile)
            );


            alert("Profile updated successfully!");


            // Go to dashboard

            window.location.href =
                "dashboard.html";

        }

    );

}