// மொபைல் மெனு டாகிள்
function toggleMenu(){
    document.getElementById("navMenu").classList.toggle("show");
} 

// டார்க் மோட் டாகிள்
function toggleDark(){
    document.body.classList.toggle("dark");
} 

// சாட் பாக்ஸ் ஓபன்/குளோஸ்
function toggleChat(){
    let box = document.getElementById("chatBox");
    box.style.display = (box.style.display === "block") ? "none" : "block";
} 

// Enter பிரஸ் செய்தால் மெசேஜ் செல்லும் வசதி
function checkEnter(event) {
    if (event.key === "Enter") {
        sendMsg();
    }
} 

// சாட் அசிஸ்டண்ட் மெசேஜ் அனுப்பும் பகுதி
function sendMsg(){
    let input = document.getElementById("userInput");
    let chat = document.getElementById("chatBody"); 

    if(input.value.trim() === "") return; 

    chat.innerHTML += `<div class="user">${input.value}</div>`; 
    let userText = input.value;
    input.value = "";
    chat.scrollTop = chat.scrollHeight;

    setTimeout(() => {
        let reply = getAIReply(userText); 
        chat.innerHTML += `<div class="bot">${reply}</div>`;
        chat.scrollTop = chat.scrollHeight;
    }, 300); 
} 

// AI தானியங்கி பதில்கள்
function getAIReply(msg){
    msg = msg.toLowerCase().trim(); 

    if(msg.includes("hi") || msg.includes("hello") || msg.includes("வணக்கம்")){
        return "👋 வணக்கம்! லைஃப் மீடியா தமிழ் உங்களை வரவேற்கிறது!";
    }
    else if(msg.includes("youtube") || msg.includes("வீடியோ") || msg.includes("video")){
        return "▶ எங்கள் யூடியூப் சேனலைக் காண மேலே உள்ள 'YouTube' பட்டனை அழுத்தவும் அல்லது <a href='https://youtube.com/@lifemediatamil' target='_blank'>இங்கே கிளிக் செய்யவும்</a>.";
    }
    else if(msg.includes("ai") || msg.includes("ஏஐ")){
        return "🤖 நான் உங்களுக்காக உருவாக்கப்பட்ட ஒரு எளிய AI சாட் அசிஸ்டண்ட்! தொழில்நுட்பம் பற்றி அறிய எங்களை பின்தொடருங்கள்.";
    }
    else if(msg.includes("app") || msg.includes("ஆப்")){
        return "📱 எங்களது பிரத்யேக ஆண்ட்ராய்டு ஆப் விரைவில் வெளியாகவுள்ளது. காத்திருங்கள்!";
    }
    else if(msg.includes("நன்றி") || msg.includes("thanks")){
        return "💖 மிக்க நன்றி! உங்களுக்கு வேறு ஏதேனும் விபரங்கள் வேண்டுமா?";
    }
    else{
        return "🙂 தங்களின் கேள்வி எனக்குப் புரிகிறது, நான் இன்னும் புதிய விஷயங்களைக் கற்றுக் கொண்டு வருகிறேன்!";
    }
}

// அக்கார்டியன் கன்டென்ட் (விபரங்கள் காண் பாக்ஸ்)
function toggleContent(id) {
    var x = document.getElementById(id);
    if (!x) return;
    
    var currentDisplay = window.getComputedStyle(x).display;

    if (currentDisplay === "block") {
        x.style.display = "none";
    } else {
        var boxes = document.getElementsByClassName("content-box");
        for (var i = 0; i < boxes.length; i++) {
            boxes[i].style.display = "none";
        }
        x.style.display = "block";
        
        setTimeout(function() {
            x.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }, 50);
    }
}

// லைவ் சர்ச் வசதி
function searchWebsite() {
    let input = document.getElementById('siteSearch').value.toLowerCase().trim(); 
    if (input.includes('www.') || input.includes('.com') || input.includes('.in') || input.includes('http')) return; 

    let items = document.getElementsByClassName('search-item');
    for (let i = 0; i < items.length; i++) {
        let text = items[i].innerText.toLowerCase();
        items[i].style.display = text.includes(input) ? "block" : "none";
    }
} 

function checkSearchEnter(event) { 
    if (event.key === "Enter") handleMegaSearch(); 
} 

function handleMegaSearch() {
    let query = document.getElementById('siteSearch').value.trim();
    if (query === "") return; 
    if (query.toLowerCase().includes('www.') || query.toLowerCase().includes('.com') || query.toLowerCase().includes('.in') || query.startsWith('http')) {
        let url = query;
        if (!/^https?:\/\//i.test(url)) url = 'https://' + url;
        window.open(url, '_blank'); 
    } else {
        window.open('https://www.google.com/search?q=' + encodeURIComponent(query), '_blank');
    }
} 

// JSON ஃபைலில் இருந்து செய்திகளை இழுத்து வரும் பகுதி
async function fetchLatestNews() {
    const newsDiv = document.getElementById("news");
    const breakingNewsDiv = document.getElementById("breakingNews");

    try {
        const response = await fetch('news.json');
        if (!response.ok) throw new Error("News file missing");
        
        const newsData = await response.json();

        if (newsDiv && newsData.length > 0) {
            newsDiv.innerHTML = "";
            newsData.forEach(item => {
                newsDiv.innerHTML += `
                    <div class="card" style="border-top-color: #e74c3c; text-align: left; padding: 15px;">
                        <img src="${item.image}" alt="News Image" style="width: 100%; height: auto; border-radius: 8px; margin-bottom: 10px;">
                        <h3 style="font-size: 18px; margin-bottom: 8px; color: #2c3e50;">${item.title}</h3>
                        <p style="font-size: 14px; color: #57606f; font-weight: normal; line-height: 1.4;">${item.content}</p>
                    </div>
                `;
            });
            
            if (breakingNewsDiv) {
                breakingNewsDiv.innerHTML = `📢 ${newsData[0].title}`;
            }
        }
    } catch (error) {
        console.error("Error loading news:", error);
        if (breakingNewsDiv) {
            breakingNewsDiv.innerHTML = "🔔 புதிய செய்திகளுக்கு பக்கத்தை Refresh செய்யவும்.";
        }
    }
}

// பக்கம் லோட் ஆனவுடன் செய்திகளைத் திரட்டவும்
window.addEventListener("DOMContentLoaded", () => {
    fetchLatestNews();
});
