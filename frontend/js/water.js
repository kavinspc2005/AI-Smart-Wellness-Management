// ========================================
// GET ELEMENTS
// ========================================

const waterCount =
    document.getElementById("waterCount");

const waterProgress =
    document.getElementById("waterProgress");

const addWaterBtn =
    document.getElementById("addWaterBtn");

const resetWaterBtn =
    document.getElementById("resetWaterBtn");

const waterMessage =
    document.getElementById("waterMessage");


// ========================================
// DAILY GOAL
// ========================================

const waterGoal = 8;


// ========================================
// JWT TOKEN
// ========================================

const token =
    localStorage.getItem("token");


if (!token) {

    alert("Please login first.");

    window.location.href = "login.html";

}


// ========================================
// WATER RECORDS
// ========================================

let waterRecords = [];


// ========================================
// LOAD TODAY'S WATER
// ========================================

async function loadWater() {

    try {

        const response = await fetch(
            "http://localhost:5000/api/water",
            {
                method: "GET",

                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }
        );


        const data =
            await response.json();


        if (!response.ok) {

            console.error(
                "Water API Error:",
                data
            );


            if (response.status === 401) {

                alert(
                    "Session expired. Please login again."
                );

                localStorage.removeItem("token");

                window.location.href =
                    "login.html";

                return;

            }

            return;

        }


        waterRecords = data;


        updateWater();


    } catch (error) {

        console.error(
            "Load Water Error:",
            error
        );

    }

}


// ========================================
// GET TODAY'S DATE
// ========================================

function getTodayDate() {

    return new Date()
        .toLocaleDateString();

}


// ========================================
// UPDATE WATER DISPLAY
// ========================================

function updateWater() {

    const today =
        getTodayDate();


    const todayRecords =
        waterRecords.filter(
            record => record.date === today
        );


    const todayCount =
        todayRecords.length;


    waterCount.textContent =
        todayCount;


    let percentage =
        (todayCount / waterGoal) * 100;


    if (percentage > 100) {

        percentage = 100;

    }


    waterProgress.style.width =
        percentage + "%";


    waterProgress.textContent =
        Math.round(percentage) + "%";


    // ========================================
    // GOAL REACHED
    // ========================================

    if (todayCount >= waterGoal) {

        waterMessage.innerHTML = `

            <div class="alert alert-success">

                🎉 Great job!

                You reached your daily water goal.

            </div>

        `;

    } else {

        waterMessage.innerHTML = `

            <p class="text-muted">

                ${waterGoal - todayCount}

                more glass(es) to reach your goal.

            </p>

        `;

    }

}


// ========================================
// ADD WATER
// ========================================

addWaterBtn.addEventListener(
    "click",
    async function () {

        const today =
            getTodayDate();


        const todayRecords =
            waterRecords.filter(
                record => record.date === today
            );


        if (todayRecords.length >= waterGoal) {

            alert(
                "Daily water goal already reached!"
            );

            return;

        }


        try {

            const response =
                await fetch(
                    "http://localhost:5000/api/water",
                    {
                        method: "POST",

                        headers: {

                            "Content-Type":
                                "application/json",

                            "Authorization":
                                `Bearer ${token}`

                        },

                        body: JSON.stringify({

                            amount: 1,

                            date: today

                        })

                    }
                );


            const data =
                await response.json();


            if (!response.ok) {

                alert(
                    data.message ||
                    "Unable to add water."
                );

                return;

            }


            // Add returned record

            waterRecords.push(
                data.water
            );


            updateWater();


        } catch (error) {

            console.error(
                "Add Water Error:",
                error
            );

            alert(
                "Cannot connect to backend."
            );

        }

    }
);


// ========================================
// RESET TODAY'S WATER
// ========================================

resetWaterBtn.addEventListener(
    "click",
    async function () {

        const confirmReset =
            confirm(
                "Reset today's water intake?"
            );


        if (!confirmReset) {

            return;

        }


        const today =
            getTodayDate();


        const todayRecords =
            waterRecords.filter(
                record => record.date === today
            );


        try {

            for (
                const record
                of todayRecords
            ) {

                await fetch(
                    `http://localhost:5000/api/water/${record._id}`,
                    {
                        method: "DELETE",

                        headers: {

                            "Authorization":
                                `Bearer ${token}`

                        }

                    }
                );

            }


            // Remove today's records locally

            waterRecords =
                waterRecords.filter(
                    record =>
                        record.date !== today
                );


            updateWater();


        } catch (error) {

            console.error(
                "Reset Water Error:",
                error
            );

            alert(
                "Cannot reset water intake."
            );

        }

    }
);


// ========================================
// INITIAL LOAD
// ========================================

loadWater();