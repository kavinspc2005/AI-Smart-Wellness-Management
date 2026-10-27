// ========================================
// PROGRESS ELEMENTS
// ========================================

const progressForm =
    document.getElementById("progressForm");

const progressList =
    document.getElementById("progressList");

const emptyProgress =
    document.getElementById("emptyProgress");

const currentBMI =
    document.getElementById("currentBMI");

const currentWeight =
    document.getElementById("currentWeight");


// ========================================
// JWT TOKEN
// ========================================

const token = localStorage.getItem("token");

if (!token) {

    alert("Please login first.");

    window.location.href = "login.html";

}


// ========================================
// CHARTS
// ========================================

let weightChart;
let bmiChart;


// ========================================
// LOAD PROGRESS FROM DATABASE
// ========================================

async function loadProgress() {

    try {

        const response = await fetch(
            "http://localhost:5000/api/progress",
            {
                method: "GET",

                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }
        );


        const data = await response.json();


        if (!response.ok) {

            console.error(
                "Progress API Error:",
                data
            );

            if (response.status === 401) {

                alert("Session expired. Please login again.");

                localStorage.removeItem("token");

                window.location.href = "login.html";

                return;

            }

            return;
        }


        displayProgress(data);


    } catch (error) {

        console.error(
            "Load Progress Error:",
            error
        );

    }

}


// ========================================
// DISPLAY PROGRESS
// ========================================

function displayProgress(progressRecords) {

    progressList.innerHTML = "";


    if (
        !progressRecords ||
        progressRecords.length === 0
    ) {

        emptyProgress.style.display = "block";

        currentBMI.textContent = "--";

        currentWeight.textContent = "--";

        updateCharts([]);

        return;

    }


    emptyProgress.style.display = "none";


    progressRecords.forEach(
        function (record) {

            const item =
                document.createElement("div");


            item.className =
                "progress-record";


            item.innerHTML = `

                <div class="progress-record-icon">

                    <i class="bi bi-graph-up"></i>

                </div>


                <div class="progress-record-info">

                    <strong>

                        Weight: ${record.weight} kg

                        &nbsp; | &nbsp;

                        BMI: ${record.bmi}

                    </strong>


                    <small>

                        ${record.date}

                    </small>

                </div>


                <button
                    class="btn btn-outline-danger btn-sm"
                    onclick="deleteProgress('${record._id}')">

                    <i class="bi bi-trash"></i>

                </button>

            `;


            progressList.appendChild(item);

        }
    );


    updateCurrentStats(progressRecords);

    updateCharts(progressRecords);

}


// ========================================
// CURRENT STATS
// ========================================

function updateCurrentStats(progressRecords) {

    if (
        !progressRecords ||
        progressRecords.length === 0
    ) {

        currentBMI.textContent = "--";

        currentWeight.textContent = "--";

        return;

    }


    const latest =
        progressRecords[
            progressRecords.length - 1
        ];


    currentBMI.textContent =
        latest.bmi;


    currentWeight.textContent =
        latest.weight;

}


// ========================================
// UPDATE CHARTS
// ========================================

function updateCharts(progressRecords) {

    const labels =
        progressRecords.map(
            record => record.date
        );


    const weights =
        progressRecords.map(
            record => record.weight
        );


    const bmis =
        progressRecords.map(
            record => record.bmi
        );


    // Destroy old charts

    if (weightChart) {

        weightChart.destroy();

    }


    if (bmiChart) {

        bmiChart.destroy();

    }


    // ========================================
    // WEIGHT CHART
    // ========================================

    weightChart = new Chart(
        document.getElementById("weightChart"),
        {
            type: "line",

            data: {

                labels: labels,

                datasets: [

                    {
                        label: "Weight (kg)",

                        data: weights,

                        borderWidth: 2,

                        tension: 0.3
                    }

                ]

            },

            options: {

                responsive: true

            }

        }
    );


    // ========================================
    // BMI CHART
    // ========================================

    bmiChart = new Chart(
        document.getElementById("bmiChart"),
        {
            type: "line",

            data: {

                labels: labels,

                datasets: [

                    {
                        label: "BMI",

                        data: bmis,

                        borderWidth: 2,

                        tension: 0.3
                    }

                ]

            },

            options: {

                responsive: true

            }

        }
    );

}


// ========================================
// ADD PROGRESS
// ========================================

progressForm.addEventListener(
    "submit",
    async function (event) {

        event.preventDefault();


        const weight =
            Number(
                document.getElementById(
                    "progressWeight"
                ).value
            );


        const bmi =
            Number(
                document.getElementById(
                    "progressBMI"
                ).value
            );


        if (
            weight <= 0 ||
            bmi <= 0
        ) {

            alert(
                "Please enter valid weight and BMI."
            );

            return;

        }


        try {

            const response = await fetch(
                "http://localhost:5000/api/progress",
                {
                    method: "POST",

                    headers: {

                        "Content-Type":
                            "application/json",

                        "Authorization":
                            `Bearer ${token}`

                    },

                    body: JSON.stringify({

                        weight: weight,

                        bmi: bmi,

                        date:
                            new Date()
                                .toLocaleDateString()

                    })

                }
            );


            const data =
                await response.json();


            if (!response.ok) {

                alert(
                    data.message ||
                    "Unable to add progress."
                );

                return;

            }


            alert(
                "Progress record added successfully!"
            );


            progressForm.reset();


            // Reload database records

            loadProgress();


        } catch (error) {

            console.error(
                "Add Progress Error:",
                error
            );

            alert(
                "Cannot connect to backend."
            );

        }

    }
);


// ========================================
// DELETE PROGRESS
// ========================================

async function deleteProgress(id) {

    const confirmDelete =
        confirm(
            "Delete this progress record?"
        );


    if (!confirmDelete) {

        return;

    }


    try {

        const response = await fetch(
            `http://localhost:5000/api/progress/${id}`,
            {
                method: "DELETE",

                headers: {

                    "Authorization":
                        `Bearer ${token}`

                }

            }
        );


        const data =
            await response.json();


        if (!response.ok) {

            alert(
                data.message ||
                "Unable to delete progress."
            );

            return;

        }


        alert(
            "Progress record deleted successfully!"
        );


        // Reload records

        loadProgress();


    } catch (error) {

        console.error(
            "Delete Progress Error:",
            error
        );

        alert(
            "Cannot connect to backend."
        );

    }

}


// ========================================
// INITIAL LOAD
// ========================================

loadProgress();