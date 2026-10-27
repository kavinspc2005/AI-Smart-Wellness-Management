// ========================================
// GET ELEMENTS
// ========================================

const reminderForm =
    document.getElementById("reminderForm");

const reminderList =
    document.getElementById("reminderList");

const emptyMessage =
    document.getElementById("emptyMessage");


// ========================================
// GET TOKEN
// ========================================

const token =
    localStorage.getItem("token");


// ========================================
// LOGIN CHECK
// ========================================

if (!token) {

    alert("Please login first.");

    window.location.href =
        "login.html";

}


// ========================================
// DISPLAY REMINDERS
// ========================================

function displayReminders(reminders) {

    reminderList.innerHTML = "";


    if (!reminders || reminders.length === 0) {

        emptyMessage.style.display =
            "block";

        return;
    }


    emptyMessage.style.display =
        "none";


    reminders.forEach(function (reminder) {

        const reminderItem =
            document.createElement("div");


        reminderItem.className =
            "reminder-item";


        reminderItem.innerHTML = `

            <div class="reminder-icon">

                ${reminder.icon || "🔔"}

            </div>


            <div class="reminder-info">

                <strong>
                    ${reminder.type}
                </strong>

                <small>
                    Reminder at ${reminder.time}
                </small>

            </div>


            <button
                class="btn btn-outline-danger btn-sm"
                onclick="deleteReminder('${reminder._id}')">

                <i class="bi bi-trash"></i>

            </button>

        `;


        reminderList.appendChild(
            reminderItem
        );

    });

}


// ========================================
// LOAD REMINDERS FROM MONGODB
// ========================================

async function loadReminders() {

    try {

        const response = await fetch(
            "http://localhost:5000/api/reminders",
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
                "Load Reminder Error:",
                data
            );

            alert(
                data.message ||
                "Unable to load reminders"
            );

            return;
        }


        displayReminders(data);
        checkReminderTimes(data);


    } catch (error) {

        console.error(
            "Load Reminder Error:",
            error
        );

        alert(
            "Cannot connect to backend."
        );

    }

}


// ========================================
// ADD REMINDER
// ========================================

reminderForm.addEventListener(
    "submit",
    async function (event) {

        event.preventDefault();


        const type =
            document.getElementById(
                "reminderType"
            ).value;


        const time =
            document.getElementById(
                "reminderTime"
            ).value;


        if (!type || !time) {

            alert(
                "Please select reminder and time."
            );

            return;
        }


        // Reminder icon

        let icon;


        if (type === "Breakfast") {

            icon = "🍳";

        }
        else if (type === "Lunch") {

            icon = "🍛";

        }
        else if (type === "Evening Snack") {

            icon = "🍎";

        }
        else if (type === "Dinner") {

            icon = "🍽️";

        }
        else {

            icon = "💧";

        }


        const reminderData = {

            type: type,

            time: time,

            icon: icon

        };


        try {

            const response =
                await fetch(
                    "http://localhost:5000/api/reminders",
                    {
                        method: "POST",

                        headers: {

                            "Content-Type":
                                "application/json",

                            "Authorization":
                                `Bearer ${token}`

                        },

                        body:
                            JSON.stringify(
                                reminderData
                            )

                    }
                );


            const data =
                await response.json();


            if (!response.ok) {

                alert(
                    data.message ||
                    "Unable to add reminder"
                );

                return;
            }


            reminderForm.reset();


            alert(
                "Reminder added successfully!"
            );


            loadReminders();


        } catch (error) {

            console.error(
                "Add Reminder Error:",
                error
            );

            alert(
                "Cannot connect to backend."
            );

        }

    }
);


// ========================================
// DELETE REMINDER
// ========================================

async function deleteReminder(id) {

    const confirmDelete =
        confirm(
            "Delete this reminder?"
        );


    if (!confirmDelete) {

        return;

    }


    try {

        const response =
            await fetch(
                `http://localhost:5000/api/reminders/${id}`,
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
                "Unable to delete reminder"
            );

            return;
        }


        alert(
            "Reminder deleted successfully!"
        );


        loadReminders();


    } catch (error) {

        console.error(
            "Delete Reminder Error:",
            error
        );

        alert(
            "Cannot connect to backend."
        );

    }

}

// ========================================
// BROWSER NOTIFICATION
// ========================================

function requestNotificationPermission() {

    if (!("Notification" in window)) {

        alert(
            "This browser does not support notifications."
        );

        return;
    }


    if (Notification.permission === "default") {

        Notification.requestPermission()
            .then(function (permission) {

                console.log(
                    "Notification permission:",
                    permission
                );

            });

    }

}


// ========================================
// SHOW NOTIFICATION
// ========================================

function showReminderNotification(reminder) {

    if (
        !("Notification" in window) ||
        Notification.permission !== "granted"
    ) {
        return;
    }


    new Notification(
        `${reminder.type} Reminder 🔔`,
        {
            body:
                `It's time for your ${reminder.type.toLowerCase()}!`,
            icon:
                "https://cdn-icons-png.flaticon.com/512/1827/1827392.png"
        }
    );

}


// ========================================
// CHECK REMINDER TIME
// ========================================

function checkReminderTimes(reminders) {

    const now =
        new Date();


    const currentHours =
        String(
            now.getHours()
        ).padStart(2, "0");


    const currentMinutes =
        String(
            now.getMinutes()
        ).padStart(2, "0");


    const currentTime =
        `${currentHours}:${currentMinutes}`;


    reminders.forEach(function (reminder) {

        if (reminder.time === currentTime) {

            const notificationKey =
                `notified_${reminder._id}_${currentTime}`;


            if (
                !sessionStorage.getItem(
                    notificationKey
                )
            ) {

                showReminderNotification(
                    reminder
                );


                sessionStorage.setItem(
                    notificationKey,
                    "true"
                );

            }

        }

    });

}


// ========================================
// REQUEST NOTIFICATION PERMISSION
// ========================================

requestNotificationPermission();



// ========================================
// INITIAL LOAD
// ========================================

loadReminders();


// ========================================
// CHECK EVERY 30 SECONDS
// ========================================

setInterval(function () {

    loadReminders();

}, 30000);