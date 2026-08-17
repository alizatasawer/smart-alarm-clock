/* =========================================
   GET HTML ELEMENTS
========================================= */

const clock = document.getElementById("clock");

const date = document.getElementById("date");

const hour = document.getElementById("hour");

const minute = document.getElementById("minute");

const ampm = document.getElementById("ampm");

const status = document.getElementById("status");

const statusIndicator =
    document.getElementById("statusIndicator");

const statusCard =
    document.getElementById("statusCard");

const alarmSound =
    document.getElementById("alarmSound");


/* =========================================
   VARIABLES
========================================= */

let alarmTime = null;

let alarmTriggered = false;


/* =========================================
   CREATE HOURS
========================================= */

for (let i = 1; i <= 12; i++) {

    const option = document.createElement("option");

    option.value =
        String(i).padStart(2, "0");

    option.textContent =
        String(i).padStart(2, "0");

    hour.appendChild(option);

}


/* =========================================
   CREATE MINUTES
========================================= */

for (let i = 0; i < 60; i++) {

    const option = document.createElement("option");

    option.value =
        String(i).padStart(2, "0");

    option.textContent =
        String(i).padStart(2, "0");

    minute.appendChild(option);

}


/* =========================================
   UPDATE CLOCK
========================================= */

function updateClock() {

    const now = new Date();


    /* -------------------------
       GET TIME
    ------------------------- */

    let currentHour =
        now.getHours();

    const currentMinute =
        now.getMinutes();

    const currentSecond =
        now.getSeconds();


    /* -------------------------
       AM / PM
    ------------------------- */

    const period =
        currentHour >= 12
            ? "PM"
            : "AM";


    /* -------------------------
       12 HOUR FORMAT
    ------------------------- */

    currentHour =
        currentHour % 12;

    if (currentHour === 0) {

        currentHour = 12;

    }


    /* -------------------------
       ADD ZERO
    ------------------------- */

    const formattedHour =
        String(currentHour).padStart(2, "0");

    const formattedMinute =
        String(currentMinute).padStart(2, "0");

    const formattedSecond =
        String(currentSecond).padStart(2, "0");


    /* -------------------------
       UPDATE CLOCK
    ------------------------- */

    clock.textContent =
        `${formattedHour}:${formattedMinute}:${formattedSecond} ${period}`;


    /* =========================================
       UPDATE DATE
    ========================================= */

    date.textContent =
        now.toLocaleDateString(
            "en-US",
            {
                weekday: "long",
                month: "long",
                day: "numeric",
                year: "numeric"
            }
        );


    /* =========================================
       CURRENT TIME FOR ALARM
    ========================================= */

    const currentTime =
        `${formattedHour}:${formattedMinute} ${period}`;


    /* =========================================
       CHECK ALARM
    ========================================= */

    if (
        alarmTime === currentTime &&
        !alarmTriggered
    ) {

        ringAlarm();

        alarmTriggered = true;

    }


    /* =========================================
       RESET TRIGGER
    ========================================= */

    if (
        alarmTime !== currentTime
    ) {

        alarmTriggered = false;

    }

}


/* =========================================
   SET ALARM
========================================= */

function setAlarm() {

    alarmTime =
        `${hour.value}:${minute.value} ${ampm.value}`;


    alarmTriggered = false;


    /* -------------------------
       UPDATE STATUS
    ------------------------- */

    status.textContent =
        `Alarm set for ${alarmTime}`;


    status.style.color =
        "#93c5fd";


    /* -------------------------
       ACTIVE INDICATOR
    ------------------------- */

    statusIndicator.classList.add(
        "active"
    );


    statusIndicator.classList.remove(
        "ringing"
    );


    /* -------------------------
       REMOVE RINGING MODE
    ------------------------- */

    document.body.classList.remove(
        "alarm-ringing"
    );


    /* -------------------------
       BROWSER TITLE
    ------------------------- */

    document.title =
        `Alarm Set • ${alarmTime}`;

}


/* =========================================
   RING ALARM
========================================= */

function ringAlarm() {

    /* -------------------------
       PLAY SOUND
    ------------------------- */

    alarmSound
        .play()
        .catch((error) => {

            console.log(
                "Audio playback blocked:",
                error
            );

        });


    /* -------------------------
       UPDATE STATUS
    ------------------------- */

    status.textContent =
        "Alarm Ringing... 🔔";


    status.style.color =
        "#fca5a5";


    /* -------------------------
       RINGING INDICATOR
    ------------------------- */

    statusIndicator.classList.remove(
        "active"
    );


    statusIndicator.classList.add(
        "ringing"
    );


    /* -------------------------
       RINGING UI
    ------------------------- */

    document.body.classList.add(
        "alarm-ringing"
    );


    /* -------------------------
       BROWSER TITLE
    ------------------------- */

    document.title =
        "🔔 Alarm Ringing!";


    /* -------------------------
       VIBRATION
    ------------------------- */

    if (
        navigator.vibrate
    ) {

        navigator.vibrate([
            500,
            300,
            500,
            300,
            500
        ]);

    }

}


/* =========================================
   STOP ALARM
========================================= */

function stopAlarm() {

    /* -------------------------
       STOP SOUND
    ------------------------- */

    alarmSound.pause();

    alarmSound.currentTime = 0;


    /* -------------------------
       RESET ALARM
    ------------------------- */

    alarmTime = null;

    alarmTriggered = false;


    /* -------------------------
       UPDATE STATUS
    ------------------------- */

    status.textContent =
        "Alarm Stopped";


    status.style.color =
        "#86efac";


    /* -------------------------
       RESET INDICATOR
    ------------------------- */

    statusIndicator.classList.remove(
        "active",
        "ringing"
    );


    /* -------------------------
       REMOVE RINGING MODE
    ------------------------- */

    document.body.classList.remove(
        "alarm-ringing"
    );


    /* -------------------------
       RESET TITLE
    ------------------------- */

    document.title =
        "Alarm Clock | Smart Time";


    /* -------------------------
       STOP VIBRATION
    ------------------------- */

    if (
        navigator.vibrate
    ) {

        navigator.vibrate(0);

    }

}


/* =========================================
   START APPLICATION
========================================= */

updateClock();


setInterval(
    updateClock,
    1000
);