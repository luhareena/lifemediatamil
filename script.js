
/* ===========================
   Life Media Tamil
   script.js
=========================== */

// Loading Screen
window.onload = function () {
    setTimeout(() => {
        document.getElementById("loader").style.display = "none";
    }, 1500);

    updateClock();
    setInterval(updateClock, 1000);
};

// Dark Mode
function toggleDark() {
    document.body.classList.toggle("dark");
}

// Mobile Menu
function toggleMenu() {
    const nav = document.getElementById("navMenu");
    nav.classList.toggle("show");
}

// Live Clock
function updateClock() {
    const clock = document.getElementById("liveClock");
    if (clock) {
        clock.innerHTML = new Date().toLocaleString();
    }
}

// Scroll Top
window.onscroll = function () {
    const btn = document.getElementById("topBtn");
    if (document.documentElement.scrollTop > 300) {
        btn.style.display = "block";
    } else {
        btn.style.display = "none";
    }
};

function scrollTopPage() {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}

// Search
function handleMegaSearch() {
    const input = document
        .getElementById("siteSearch")
        .value
        .trim();

    if (input === "") {
        alert("Search something...");
        return;
    }

    window.open(
        "https://www.google.com/search?q=" +
        encodeURIComponent(input),
        "_blank"
    );
}

// Voice Search
function startVoice() {

    if (!('webkitSpeechRecognition' in window)) {
        alert("Voice Search not supported.");
        return;
    }

    const recognition = new webkitSpeechRecognition();

    recognition.lang = "ta-IN";

    recognition.start();

    recognition.onresult = function (event) {

        const text =
            event.results[0][0].transcript;

        document.getElementById("siteSearch").value = text;

        handleMegaSearch();
    };

}

// AI Chat
function toggleChat() {

    const chat =
        document.getElementById("chatBox");

    if (chat.style.display === "flex") {
        chat.style.display = "none";
    } else {
        chat.style.display = "flex";
    }

}

function sendMsg() {

    const input =
        document.getElementById("userInput");

    const body =
        document.getElementById("chatBody");

    if (input.value.trim() === "") return;

    body.innerHTML +=
        `<div class="user">${input.value}</div>`;

    setTimeout(() => {

        body.innerHTML +=
            `<div class="bot">
🤖 நீங்கள் கேட்டது:
<b>${input.value}</b><br><br>
மேலும் தகவலுக்கு Google Search பயன்படுத்தலாம்.
</div>`;

        body.scrollTop = body.scrollHeight;

    }, 600);

    input.value = "";

}

// Weather (Demo)
const weather =
document.getElementById("weatherData");

if (weather) {
    weather.innerHTML =
        "🌤️ 31°C - Chennai";
}
