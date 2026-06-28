function toggleMenu(){
document.getElementById("navMenu").classList.toggle("show");
} 

function toggleDark(){
document.body.classList.toggle("dark");
} 

function toggleChat(){
let box = document.getElementById("chatBox");
box.style.display = (box.style.display === "block") ? "none" : "block";
} 

function checkEnter(event) {
if (event.key === "Enter") {
sendMsg();
}
} 

function sendMsg(){
let input = document.getElementById("userInput");
let chat = document.getElementById("chatBody"); 

if(input.value.trim() === "") return; 

chat.innerHTML += `<div class="user">${input.value}</div>`; 

let reply = getAIReply(input.value); 

setTimeout(() => {
chat.innerHTML += `<div class="bot">${reply}</div>`;
chat.scrollTop = chat.scrollHeight;
}, 300); 

input.value = "";
chat.scrollTop = chat.scrollHeight;
} 

function getAIReply(msg){
msg = msg.toLowerCase().trim(); 

if(msg.includes("hi") || msg.includes("hello") || msg.includes("வணக்கம்")){
return "👋 வணக்கம்! லைஃப் மீடியா தமிழ் உங்களை வரவேற்கிறது!";
}
else if(msg.includes("youtube") || msg.includes("வீடியோ") || msg.includes("video")){
return "▶ எங்கள் யூடியூப் சேனலைக் காண மேலே உள்ள 'Visit YouTube' பட்டனை அழுத்தவும் அல்லது <a href='https://youtube.com/@lifemediatamil' target='_blank'>இங்கே கிளிக் செய்யவும்</a>.";
}
else if(msg.includes("ai") || msg.includes("ஏஐ")){
return "🤖 நான் உங்களுக்காக உருவாக்கப்பட்ட ஒரு எளிய AI சாட் அசிஸ்டண்ட்!";
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

// ஆன்லைன் news.json ஃபைலில் இருந்து செய்திகளை இழுத்து வரும் புதிய பகுதி
async function fetchLatestNews() {
  const newsDiv = document.getElementById("news");
  const breakingNewsDiv = document.getElementById("breakingNews");

  try {
    // news.json ஃபைலைத் தேடுகிறது (ஃபைல் பெயரில் ஸ்பேஸ் இல்லாமல் இருக்க வேண்டும்)
    const response = await fetch('news.json');
    if (!response.ok) throw new Error("News file missing");
    
    const newsData = await response.json();

    if (newsDiv && newsData.length > 0) {
      newsDiv.innerHTML = "";
      newsData.forEach(item => {
        // உங்கள் அசல் கார்டு ஸ்டைலிலேயே செய்திகள் உருவாக்கப்படுகிறது
        newsDiv.innerHTML += `
          <div class="card" style="border-top-color: #e74c3c; text-align: left; padding: 15px;">
            <img src="${item.image}" alt="News Image" style="width: 100%; height: auto; border-radius: 8px; margin-bottom: 10px;">
            <h3 style="font-size: 18px; margin-bottom: 8px; color: #2c3e50;">${item.title}</h3>
            <p style="font-size: 14px; color: #57606f; font-weight: normal; line-height: 1.4;">${item.content}</p>
          </div>
        `;
      });
      
      // முதல் செய்தியை ப்ரேக்கிங் நியூஸ் ஆகக் காட்டுகிறது
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

// பக்கம் லோட் ஆனவுடன் ரன் ஆகும்
window.addEventListener("DOMContentLoaded", () => {
  fetchLatestNews();
});

// Service Worker ரிஜிஸ்ட்ரேஷன்
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./sw.js").catch(err => console.log("SW registration failed", err));
  });
}
