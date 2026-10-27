// ========================================
// GET ELEMENTS
// ========================================

const notificationList =
    document.getElementById("notificationList");

const notificationEmpty =
    document.getElementById("notificationEmpty");

const markAllBtn =
    document.getElementById("markAllBtn");


// ========================================
// GET TOKEN
// ========================================

const token =
    localStorage.getItem("token");


if (!token) {

    alert("Please login first.");

    window.location.href =
        "login.html";

}


// ========================================
// STORE COMPLETED NOTIFICATIONS
// ========================================

let completed =
    JSON.parse(
        localStorage.getItem(
            "completedNotifications"
        )
    ) || [];


// ========================================
// LOAD REMINDERS FROM BACKEND
// ========================================

async function loadNotifications() {

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


        const reminders =
            await response.json();


        if (!response.ok) {

            console.error(
                "Notification API Error:",
                reminders
            );

            notificationEmpty.style.display =
                "block";

            return;
        }


        displayNotifications(reminders);


    } catch (error) {

        console.error(
            "Load Notifications Error:",
            error
        );

        notificationEmpty.style.display =
            "block";

    }

}


// ========================================
// DISPLAY NOTIFICATIONS
// ========================================

function displayNotifications(reminders) {

    notificationList.innerHTML = "";


    if (!reminders ||
        reminders.length === 0) {

        notificationEmpty.style.display =
            "block";

        return;
    }


    notificationEmpty.style.display =
        "none";


    reminders.forEach(function(reminder) {

        const isDone =
            completed.includes(
                reminder._id
            );


        const notification =
            document.createElement("div");


        notification.className =
            "notification-item";


        if (isDone) {

            notification.classList.add(
                "notification-done"
            );

        }


        notification.innerHTML = `

            <div class="notification-icon">

                ${reminder.icon || "🔔"}

            </div>


            <div class="notification-content">

                <strong>

                    ${reminder.type}
                    Reminder

                </strong>


                <small>

                    Scheduled at
                    ${reminder.time}

                </small>

            </div>


            <button
                class="btn ${
                    isDone
                    ? "btn-success"
                    : "btn-outline-success"
                } btn-sm"
                onclick="toggleNotification('${reminder._id}')">

                <i class="bi ${
                    isDone
                    ? "bi-check-lg"
                    : "bi-check2"
                }"></i>

                ${
                    isDone
                    ? "Done"
                    : "Mark Done"
                }

            </button>

        `;


        notificationList.appendChild(
            notification
        );

    });

}


// ========================================
// MARK NOTIFICATION DONE / UNDONE
// ========================================

function toggleNotification(id) {

    const position =
        completed.indexOf(id);


    if (position === -1) {

        completed.push(id);

    } else {

        completed.splice(
            position,
            1
        );

    }


    localStorage.setItem(
        "completedNotifications",
        JSON.stringify(completed)
    );


    loadNotifications();

}


// ========================================
// MARK ALL DONE
// ========================================

markAllBtn.addEventListener(
    "click",
    async function () {

        try {

            const response =
                await fetch(
                    "http://localhost:5000/api/reminders",
                    {
                        method: "GET",

                        headers: {
                            "Authorization":
                                `Bearer ${token}`
                        }
                    }
                );


            const reminders =
                await response.json();


            if (!response.ok) {

                return;

            }


            completed =
                reminders.map(
                    reminder =>
                        reminder._id
                );


            localStorage.setItem(
                "completedNotifications",
                JSON.stringify(
                    completed
                )
            );


            displayNotifications(
                reminders
            );


            alert(
                "All notifications marked as done!"
            );


        } catch (error) {

            console.error(
                "Mark All Error:",
                error
            );

        }

    }
);


// ========================================
// INITIAL LOAD
// ========================================

loadNotifications();