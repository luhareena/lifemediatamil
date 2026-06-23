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

    // பயனர் மெசேஜ்
    chat.innerHTML += `<div class="user">${input.value}</div>`;

    // பாட் பதில்
    let reply = getAIReply(input.value);
    
    // லோடிங் டைமிங் ஃபீல் வரவைக்க 300ms தாமதம்
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
