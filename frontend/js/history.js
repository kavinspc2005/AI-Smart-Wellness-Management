const historyContainer =
    document.getElementById("historyContainer");

const emptyHistory =
    document.getElementById("emptyHistory");


// ========================================
// TOKEN
// ========================================

const token =
    localStorage.getItem("token");


if (!token) {

    alert("Please login first.");

    window.location.href =
        "login.html";

}


// ========================================
// LOAD DIET HISTORY
// ========================================

async function loadDietHistory() {

    try {

        const response = await fetch(
            "http://localhost:5000/api/diet",
            {
                method: "GET",

                headers: {
                    "Authorization":
                        `Bearer ${token}`
                }
            }
        );


        const diets =
            await response.json();


        if (!response.ok) {

            console.error(
                "Diet History Error:",
                diets
            );

            return;
        }


        historyContainer.innerHTML = "";


        if (!diets || diets.length === 0) {

            emptyHistory.style.display =
                "block";

            return;
        }


        emptyHistory.style.display =
            "none";


        diets.forEach(function (diet) {

            createHistoryCard(diet);

        });


    } catch (error) {

        console.error(
            "Diet History Error:",
            error
        );

    }

}


// ========================================
// CREATE DIET HISTORY CARD
// ========================================

function createHistoryCard(diet) {

    const historyCard =
        document.createElement("div");


    historyCard.className =
        "dashboard-card mb-4";


    const savedDate =
        diet.createdAt
            ? new Date(diet.createdAt)
                .toLocaleDateString()
            : "Recently";


    historyCard.innerHTML = `

        <div class="d-flex justify-content-between
                    align-items-center mb-4">

            <div>

                <h5 class="fw-bold">

                    <i class="bi bi-calendar-check
                              text-success me-2"></i>

                    Diet Plan

                </h5>

                <small class="text-muted">

                    Saved on ${savedDate}

                </small>

            </div>

        </div>


        <div class="row g-3 mb-4">


            <div class="col-md-3">

                <div class="history-info">

                    <small>BMI</small>

                    <strong>
                        ${diet.bmi || "--"}
                    </strong>

                </div>

            </div>


            <div class="col-md-3">

                <div class="history-info">

                    <small>Category</small>

                    <strong>
                        ${diet.category || "--"}
                    </strong>

                </div>

            </div>


            <div class="col-md-3">

                <div class="history-info">

                    <small>Goal</small>

                    <strong>
                        ${diet.healthGoal || "--"}
                    </strong>

                </div>

            </div>


            <div class="col-md-3">

                <div class="history-info">

                    <small>Calories</small>

                    <strong>
                        ${diet.calories || "--"}
                    </strong>

                </div>

            </div>


        </div>


        <div class="mb-4">

            <span class="badge bg-success-subtle text-success">

                ${diet.foodPreference || "Not specified"}

            </span>

        </div>


        <div class="row g-3">


            <div class="col-md-6 col-lg-3">

                <div class="history-meal">

                    <i class="bi bi-sunrise"></i>

                    <strong>Breakfast</strong>

                    <p>
                        ${diet.breakfast || "--"}
                    </p>

                </div>

            </div>


            <div class="col-md-6 col-lg-3">

                <div class="history-meal">

                    <i class="bi bi-sun"></i>

                    <strong>Lunch</strong>

                    <p>
                        ${diet.lunch || "--"}
                    </p>

                </div>

            </div>


            <div class="col-md-6 col-lg-3">

                <div class="history-meal">

                    <i class="bi bi-apple"></i>

                    <strong>Snack</strong>

                    <p>
                        ${diet.snacks || "--"}
                    </p>

                </div>

            </div>


            <div class="col-md-6 col-lg-3">

                <div class="history-meal">

                    <i class="bi bi-moon-stars"></i>

                    <strong>Dinner</strong>

                    <p>
                        ${diet.dinner || "--"}
                    </p>

                </div>

            </div>


        </div>

    `;


    historyContainer.appendChild(
        historyCard
    );

}


// ========================================
// LOAD PROGRESS HISTORY
// ========================================

async function loadProgressHistory() {

    const container =
        document.getElementById(
            "progressHistory"
        );


    try {

        const response = await fetch(
            "http://localhost:5000/api/progress",
            {
                headers: {
                    "Authorization":
                        `Bearer ${token}`
                }
            }
        );


        const data =
            await response.json();


        if (!response.ok) {

            container.innerHTML =
                `<p class="text-danger">
                    Unable to load progress history.
                </p>`;

            return;
        }


        if (!data || data.length === 0) {

            container.innerHTML =
                `<p class="text-muted">
                    No progress records yet.
                </p>`;

            return;
        }


        container.innerHTML = "";


        data.forEach(function (record) {

            const item =
                document.createElement("div");


            item.className =
                "border-bottom py-3";


            item.innerHTML = `

                <strong>

                    Weight:
                    ${record.weight || "--"} kg

                    &nbsp; | &nbsp;

                    BMI:
                    ${record.bmi || "--"}

                </strong>

                <br>

                <small class="text-muted">

                    ${record.date || "Recently"}

                </small>

            `;


            container.appendChild(item);

        });


    } catch (error) {

        console.error(
            "Progress History Error:",
            error
        );

        container.innerHTML =
            `<p class="text-danger">
                Cannot connect to backend.
            </p>`;

    }

}


// ========================================
// LOAD WATER HISTORY
// ========================================

async function loadWaterHistory() {

    const container =
        document.getElementById(
            "waterHistory"
        );


    try {

        const response = await fetch(
            "http://localhost:5000/api/water",
            {
                headers: {
                    "Authorization":
                        `Bearer ${token}`
                }
            }
        );


        const data =
            await response.json();


        if (!response.ok) {

            container.innerHTML =
                `<p class="text-danger">
                    Unable to load water history.
                </p>`;

            return;
        }


        if (!data || data.length === 0) {

            container.innerHTML =
                `<p class="text-muted">
                    No water records yet.
                </p>`;

            return;
        }


        container.innerHTML = "";


        data.forEach(function (record) {

            const item =
                document.createElement("div");


            item.className =
                "border-bottom py-3";


            item.innerHTML = `

               <strong>

    💧
    ${record.amount || 0}
    glasses

</strong>

                <br>

                <small class="text-muted">

                    ${record.date || record.createdAt || "Recently"}

                </small>

            `;


            container.appendChild(item);

        });


    } catch (error) {

        console.error(
            "Water History Error:",
            error
        );

        container.innerHTML =
            `<p class="text-danger">
                Cannot connect to backend.
            </p>`;

    }

}


// ========================================
// LOAD SLEEP HISTORY
// ========================================

async function loadSleepHistory() {

    const container =
        document.getElementById(
            "sleepHistory"
        );


    try {

        const response = await fetch(
            "http://localhost:5000/api/sleep",
            {
                headers: {
                    "Authorization":
                        `Bearer ${token}`
                }
            }
        );


        const data =
            await response.json();


        if (!response.ok) {

            container.innerHTML =
                `<p class="text-danger">
                    Unable to load sleep history.
                </p>`;

            return;
        }


        if (!data || data.length === 0) {

            container.innerHTML =
                `<p class="text-muted">
                    No sleep records yet.
                </p>`;

            return;
        }


        container.innerHTML = "";


        data.forEach(function (record) {

            const item =
                document.createElement("div");


            item.className =
                "border-bottom py-3";


            item.innerHTML = `

                <strong>

                    😴
                    ${record.hours || record.sleepHours || 0}
                    hours

                </strong>

                <br>

                <small class="text-muted">

                    ${record.date || record.createdAt || "Recently"}

                </small>

            `;


            container.appendChild(item);

        });


    } catch (error) {

        console.error(
            "Sleep History Error:",
            error
        );

        container.innerHTML =
            `<p class="text-danger">
                Cannot connect to backend.
            </p>`;

    }

}


// ========================================
// LOAD WORKOUT HISTORY
// ========================================

async function loadWorkoutHistory() {

    const container =
        document.getElementById(
            "workoutHistory"
        );


    try {

        const response = await fetch(
            "http://localhost:5000/api/workout",
            {
                headers: {
                    "Authorization":
                        `Bearer ${token}`
                }
            }
        );


        const data =
            await response.json();


        if (!response.ok) {

            container.innerHTML =
                `<p class="text-danger">
                    Unable to load workout history.
                </p>`;

            return;
        }


        if (!data || data.length === 0) {

            container.innerHTML =
                `<p class="text-muted">
                    No workout records yet.
                </p>`;

            return;
        }


        container.innerHTML = "";


        data.forEach(function (record) {

            const item =
                document.createElement("div");


            item.className =
                "border-bottom py-3";


            item.innerHTML = `

                <strong>

                    🏋️
                    ${record.type || "Workout"}

                </strong>

                <br>

                <span>

                    ${record.duration || 0}
                    minutes

                    &nbsp; | &nbsp;

                    ${record.calories || 0}
                    kcal

                </span>

                <br>

                <small class="text-muted">

                    ${record.date || "Recently"}

                </small>

            `;


            container.appendChild(item);

        });


    } catch (error) {

        console.error(
            "Workout History Error:",
            error
        );

        container.innerHTML =
            `<p class="text-danger">
                Cannot connect to backend.
            </p>`;

    }

}


// ========================================
// LOAD ALL HISTORY
// ========================================

loadDietHistory();

loadProgressHistory();

loadWaterHistory();

loadSleepHistory();

loadWorkoutHistory();