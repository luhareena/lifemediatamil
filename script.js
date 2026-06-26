// ===============================
// Life Media Tamil - script.js
// ===============================

// Chat Open / Close
function toggleChat() {
    const chat = document.getElementById("chatBox");
    chat.style.display = (chat.style.display === "block") ? "none" : "block";
}

// Send Message
function sendMsg() {

    const input = document.getElementById("userInput");
    const body = document.getElementById("chatBody");

    if (input.value.trim() === "") return;

    body.innerHTML += `
        <div class="user">${input.value}</div>
    `;

    const msg = input.value.toLowerCase();

    let reply = "😊 உங்கள் கேள்விக்கு நன்றி. விரைவில் மேலும் AI பதில்கள் சேர்க்கப்படும்.";

    if (msg.includes("hello") || msg.includes("hi") || msg.includes("வணக்கம்")) {
        reply = "👋 வணக்கம்! Life Media Tamil-க்கு வரவேற்கிறோம்.";
    } else if (msg.includes("youtube")) {
        reply = "▶ YouTube Channel: Life Media Tamil";
    } else if (msg.includes("ai")) {
        reply = "🤖 AI Tools மற்றும் Prompts எங்கள் Website-ல் கிடைக்கும்.";
    }

    setTimeout(() => {
        body.innerHTML += `<div class="bot">${reply}</div>`;
        body.scrollTop = body.scrollHeight;
    }, 500);

    input.value = "";
}

// Scroll To Top
function scrollTopPage() {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}

window.onscroll = function () {
    const btn = document.getElementById("topBtn");
    if (btn) {
        btn.style.display =
            document.documentElement.scrollTop > 300 ? "block" : "none";
    }
};

// Dark Mode
function toggleDark() {
    document.body.classList.toggle("dark-mode");
}

// Mobile Menu
function toggleMenu() {
    const nav = document.getElementById("navMenu");

    if (nav.style.display === "flex") {
        nav.style.display = "none";
    } else {
        nav.style.display = "flex";
    }
}

// Search
function handleMegaSearch() {

    const search = document
        .getElementById("siteSearch")
        .value
        .toLowerCase();

    if (search.includes("youtube")) {
        window.open("https://youtube.com/@lifemediatamil", "_blank");
    }
    else if (search.includes("blog")) {
        window.open("https://niyascomputers.blogspot.com", "_blank");
    }
    else {
        window.open(
            "https://www.google.com/search?q=" +
            encodeURIComponent(search),
            "_blank"
        );
    }
}

// Loading Screen
window.addEventListener("load", () => {
    const loader = document.getElementById("loader");
    if (loader) {
        setTimeout(() => {
            loader.style.display = "none";
        }, 1200);
    }
});
