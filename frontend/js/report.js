// =========================
// GET PROFILE
// =========================

const savedProfile =
    localStorage.getItem("wellnessProfile");


if (!savedProfile) {

    alert("Please complete your health profile first.");

    window.location.href = "profile.html";

} else {

    const profile =
        JSON.parse(savedProfile);


    // Personal information

    document.getElementById("reportName")
        .textContent = profile.name || "--";

    document.getElementById("reportAge")
        .textContent = profile.age || "--";

    document.getElementById("reportGender")
        .textContent = profile.gender || "--";


    // Health information

    document.getElementById("reportHeight")
        .textContent =
        profile.height
        ? profile.height + " cm"
        : "--";


    document.getElementById("reportWeight")
        .textContent =
        profile.weight
        ? profile.weight + " kg"
        : "--";


    document.getElementById("reportBMI")
        .textContent = profile.bmi || "--";


    document.getElementById("reportCategory")
        .textContent = profile.category || "--";


    // Preferences

    document.getElementById("reportActivity")
        .textContent =
        profile.activityLevel || "--";


    document.getElementById("reportFood")
        .textContent =
        profile.foodPreference || "--";


    document.getElementById("reportGoal")
        .textContent =
        profile.healthGoal || "--";


    // Date

    document.getElementById("reportDate")
        .textContent =
        "Generated on " +
        new Date().toLocaleDateString();



    // =========================
    // DIET PLAN
    // =========================

    const savedDiet =
        localStorage.getItem("latestDietPlan");


    if (savedDiet) {

        const diet =
            JSON.parse(savedDiet);


        document.getElementById("reportBreakfast")
            .textContent =
            diet.breakfast || "--";


        document.getElementById("reportLunch")
            .textContent =
            diet.lunch || "--";


        document.getElementById("reportSnack")
            .textContent =
            diet.snack || "--";


        document.getElementById("reportDinner")
            .textContent =
            diet.dinner || "--";

    }



    // =========================
    // DOWNLOAD PDF
    // =========================

    document
        .getElementById("downloadReport")
        .addEventListener(
            "click",
            function () {


                const report =
                    document.getElementById(
                        "healthReport"
                    );


                const options = {

                    margin: 10,

                    filename:
                        "AI-Smart-Wellness-Health-Report.pdf",

                    image: {

                        type: "jpeg",

                        quality: 0.98

                    },

                    html2canvas: {

                        scale: 2,

                        useCORS: true

                    },

                    jsPDF: {

                        unit: "mm",

                        format: "a4",

                        orientation: "portrait"

                    }

                };


                html2pdf()
                    .set(options)
                    .from(report)
                    .save();

            }
        );

}