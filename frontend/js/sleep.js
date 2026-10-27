// ========================================
// SLEEP TRACKING
// ========================================

const sleepForm =
    document.getElementById("sleepForm");

const sleepHours =
    document.getElementById("sleepHours");

const sleepMessage =
    document.getElementById("sleepMessage");

const sleepHistory =
    document.getElementById("sleepHistory");


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
// SLEEP RECORDS
// ========================================

let sleepRecords = [];


// ========================================
// TODAY'S DATE
// ========================================

function getTodayDate() {

    return new Date().toLocaleDateString();

}


// ========================================
// LOAD SLEEP RECORDS
// ========================================

async function loadSleep() {

    try {

        const response = await fetch(
            "http://localhost:5000/api/sleep",
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
                "Sleep API Error:",
                data
            );


            if (response.status === 401) {

                localStorage.removeItem("token");

                alert(
                    "Session expired. Please login again."
                );

                window.location.href =
                    "login.html";

                return;

            }

            return;
        }


        sleepRecords = data;

        displaySleep();


    } catch (error) {

        console.error(
            "Load Sleep Error:",
            error
        );

    }

}


// ========================================
// DISPLAY SLEEP
// ========================================

function displaySleep() {

    if (!sleepHistory) {
        return;
    }


    sleepHistory.innerHTML = "";


    if (sleepRecords.length === 0) {

        sleepHistory.innerHTML = `

            <p class="text-muted text-center">

                No sleep records yet.

            </p>

        `;

        return;
    }


    sleepRecords.forEach(function(record) {

        const item =
            document.createElement("div");


        item.className =
            "sleep-record mb-3 p-3 border rounded";


        item.innerHTML = `

            <div class="d-flex
                        justify-content-between
                        align-items-center">

                <div>

                    <strong>

                        😴 ${record.hours} hours

                    </strong>

                    <br>

                    <small class="text-muted">

                        ${record.date}

                    </small>

                </div>


                <button
                    class="btn btn-outline-danger btn-sm"
                    onclick="deleteSleep('${record._id}')">

                    <i class="bi bi-trash"></i>

                </button>

            </div>

        `;


        sleepHistory.appendChild(item);

    });

}


// ========================================
// ADD SLEEP
// ========================================

if (sleepForm) {

    sleepForm.addEventListener(
        "submit",
        async function(event) {

            event.preventDefault();


            const hours =
                Number(sleepHours.value);


            if (
                !hours ||
                hours <= 0 ||
                hours > 24
            ) {

                alert(
                    "Please enter valid sleep hours."
                );

                return;
            }


            try {

                const response =
                    await fetch(
                        "http://localhost:5000/api/sleep",
                        {
                            method: "POST",

                            headers: {

                                "Content-Type":
                                    "application/json",

                                "Authorization":
                                    `Bearer ${token}`

                            },

                            body: JSON.stringify({

                                hours: hours,

                                date: getTodayDate()

                            })

                        }
                    );


                const data =
                    await response.json();


                if (!response.ok) {

                    alert(
                        data.message ||
                        "Unable to save sleep record."
                    );

                    return;
                }


                sleepRecords.push(
                    data.sleep
                );


                sleepForm.reset();


                displaySleep();


                sleepMessage.innerHTML = `

                    <div class="alert alert-success">

                        😴 Sleep record added successfully!

                    </div>

                `;


            } catch (error) {

                console.error(
                    "Add Sleep Error:",
                    error
                );

                alert(
                    "Cannot connect to backend."
                );

            }

        }
    );

}


// ========================================
// DELETE SLEEP
// ========================================

async function deleteSleep(id) {

    const confirmDelete =
        confirm(
            "Delete this sleep record?"
        );


    if (!confirmDelete) {
        return;
    }


    try {

        const response =
            await fetch(
                `http://localhost:5000/api/sleep/${id}`,
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
                "Unable to delete sleep record."
            );

            return;
        }


        sleepRecords =
            sleepRecords.filter(
                record =>
                    record._id !== id
            );


        displaySleep();


    } catch (error) {

        console.error(
            "Delete Sleep Error:",
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

loadSleep();