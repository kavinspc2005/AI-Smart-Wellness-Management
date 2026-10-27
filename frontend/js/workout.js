// ========================================
// WORKOUT TRACKING
// ========================================

// Get elements

const workoutForm =
    document.getElementById("workoutForm");

const workoutList =
    document.getElementById("workoutList");

const emptyWorkout =
    document.getElementById("emptyWorkout");

const totalMinutes =
    document.getElementById("totalMinutes");

const totalCalories =
    document.getElementById("totalCalories");

const totalWorkouts =
    document.getElementById("totalWorkouts");


// ========================================
// JWT TOKEN
// ========================================

const token =
    localStorage.getItem("token");


if (!token) {

    alert("Please login first.");

    window.location.href =
        "login.html";

}


// ========================================
// WORKOUT DATA
// ========================================

let workouts = [];


// ========================================
// WORKOUT ICON
// ========================================

function getWorkoutIcon(type) {

    if (type === "Walking") {
        return "🚶";
    }

    if (type === "Running") {
        return "🏃";
    }

    if (type === "Cycling") {
        return "🚴";
    }

    if (type === "Strength Training") {
        return "🏋️";
    }

    if (type === "Yoga") {
        return "🧘";
    }

    if (type === "Swimming") {
        return "🏊";
    }

    return "🏃";
}


// ========================================
// LOAD WORKOUTS
// ========================================

async function loadWorkouts() {

    try {

        const response =
            await fetch(
                "http://localhost:5000/api/workout",
                {
                    method: "GET",

                    headers: {
                        "Authorization":
                            `Bearer ${token}`
                    }
                }
            );


        const data =
            await response.json();


        if (!response.ok) {

            console.error(
                "Workout API Error:",
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


        workouts = data;

        displayWorkouts();


    } catch (error) {

        console.error(
            "Load Workout Error:",
            error
        );

    }

}


// ========================================
// DISPLAY WORKOUTS
// ========================================

function displayWorkouts() {

    workoutList.innerHTML = "";


    if (workouts.length === 0) {

        emptyWorkout.style.display =
            "block";

    } else {

        emptyWorkout.style.display =
            "none";


        workouts.forEach(
            function (workout) {

                const workoutItem =
                    document.createElement("div");


                workoutItem.className =
                    "workout-item";


                workoutItem.innerHTML = `

                    <div class="workout-item-icon">

                        ${getWorkoutIcon(workout.type)}

                    </div>


                    <div class="workout-item-info">

                        <strong>

                            ${workout.type}

                        </strong>


                        <small>

                            ${workout.duration}
                            minutes
                            •
                            ${workout.calories}
                            kcal

                        </small>

                    </div>


                    <button
                        class="btn btn-outline-danger btn-sm"
                        onclick="deleteWorkout('${workout._id}')">

                        <i class="bi bi-trash"></i>

                    </button>

                `;


                workoutList.appendChild(
                    workoutItem
                );

            }
        );

    }


    updateStats();

}


// ========================================
// UPDATE STATISTICS
// ========================================

function updateStats() {

    let minutes = 0;

    let calories = 0;


    workouts.forEach(
        function (workout) {

            minutes +=
                Number(workout.duration);

            calories +=
                Number(workout.calories);

        }
    );


    totalMinutes.textContent =
        minutes;

    totalCalories.textContent =
        calories;

    totalWorkouts.textContent =
        workouts.length;

}


// ========================================
// ADD WORKOUT
// ========================================

if (workoutForm) {

    workoutForm.addEventListener(
        "submit",
        async function (event) {

            event.preventDefault();


            const type =
                document.getElementById(
                    "workoutType"
                ).value;


            const duration =
                Number(
                    document.getElementById(
                        "workoutDuration"
                    ).value
                );


            const calories =
                Number(
                    document.getElementById(
                        "workoutCalories"
                    ).value
                );


            if (!type) {

                alert(
                    "Please select a workout type."
                );

                return;
            }


            if (
                duration <= 0 ||
                calories <= 0
            ) {

                alert(
                    "Please enter valid workout details."
                );

                return;
            }


            try {

                const response =
                    await fetch(
                        "http://localhost:5000/api/workout",
                        {
                            method: "POST",

                            headers: {

                                "Content-Type":
                                    "application/json",

                                "Authorization":
                                    `Bearer ${token}`

                            },

                            body: JSON.stringify({

                                type: type,

                                duration: duration,

                                calories: calories,

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
                        "Unable to add workout."
                    );

                    return;
                }


                workouts.push(
                    data.workout
                );


                workoutForm.reset();


                displayWorkouts();


                alert(
                    "Workout added successfully!"
                );


            } catch (error) {

                console.error(
                    "Add Workout Error:",
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
// DELETE WORKOUT
// ========================================

async function deleteWorkout(id) {

    const confirmDelete =
        confirm(
            "Delete this workout?"
        );


    if (!confirmDelete) {

        return;
    }


    try {

        const response =
            await fetch(
                `http://localhost:5000/api/workout/${id}`,
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
                "Unable to delete workout."
            );

            return;
        }


        workouts =
            workouts.filter(
                function (workout) {

                    return workout._id !== id;

                }
            );


        displayWorkouts();


    } catch (error) {

        console.error(
            "Delete Workout Error:",
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

loadWorkouts();