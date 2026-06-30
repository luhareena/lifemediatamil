// 1. பக்கங்களை மாற்றும் செயல்பாடு (Navigation Logic)
function switchPage(pageId) {
    try {
        // அனைத்து பக்கங்களையும் மறைக்க
        let pages = document.querySelectorAll('.app-page');
        pages.forEach(p => p.classList.remove('active'));
        
        // அனைத்து மெனு ஹைலைட்களையும் நீக்க
        let navs = document.querySelectorAll('.nav-item');
        navs.forEach(n => n.classList.remove('active'));

        // தேர்ந்தெடுத்த பக்கம் மற்றும் மெனுவை மட்டும் காட்ட
        let targetPage = document.getElementById('page-' + pageId);
        let targetNav = document.getElementById('nav-' + pageId);
        
        if(targetPage) targetPage.classList.add('active');
        if(targetNav) targetNav.classList.add('active');
        
        // பக்கத்தின் மேல் பகுதிக்குச் செல்ல
        window.scrollTo({top: 0, behavior: 'smooth'});
    } catch(e) {
        console.error("பக்கம் மாறுவதில் பிழை:", e);
    }
}

// 2. ஏஐ சாட் அசிஸ்டண்ட் செயல்பாடு (AI Chat Assistant Logic)
function triggerChatResponse() {
    let input = document.getElementById('chatInputField');
    let screen = document.getElementById('chatScreen');
    if (!input || !screen) return;

    let query = input.value.trim();
    if(query === "") return;

    // பயனர் அனுப்பிய மெசேஜ் திரையில் தோன்றும்
    screen.innerHTML += `<div class="msg sent">${query}</div>`;
    input.value = "";
    screen.scrollTop = screen.scrollHeight;

    setTimeout(() => {
        // இயல்பான பொதுப் பதில் (Fallback Message)
        let reply = "🙂 உங்கள் கேள்வி எனக்குப் புரிந்தது! லைஃப் மீடியா தமிழின் அடுத்தடுத்த டெக்னாலஜி மற்றும் கல்வி அப்டேட்களை கவனியுங்கள்.";
        let text = query.toLowerCase();

        // 1. வாழ்த்துக்கள் (Greetings)
        if(text.includes('வணக்கம்') || text.includes('hi') || text.includes('hello') || text.includes('வணக்கம்ப்பா')) {
            reply = "👋 வணக்கம்! உங்களுக்கு என்ன விபரங்கள் அல்லது ஆன்லைன் உதவிகள் தேவை? (உதாரணம்: வேலை நேரம், குவிஸ், சேவைகள்)";
        } 
        // 2. வினாடி-வினா / குவிஸ் (Quiz)
        else if(text.includes('exam') || text.includes('தேர்வு') || text.includes('tnpsc') || text.includes('upsc') || text.includes('quiz') || text.includes('குவிஸ்') || text.includes('கேள்வி')) {
            reply = "🎓 போட்டித் தேர்வுகள், புதிய பாடத்திட்டங்கள் மற்றும் உடனுக்குடன் விடையளித்துப் பழகும் 'நேரடி குவிஸ்' பயிற்சிகளுக்கு கீழே உள்ள மெனுவில் **'மாணவர்கள்' (Students Corner)** பக்கத்திற்குச் செல்லவும்.";
        } 
        // 3. டிஜிட்டல் சென்டர் சேவைகள் (Services)
        else if(text.includes('services') || text.includes('சேவை') || text.includes('கார்டு') || text.includes('பிரிண்ட்') || text.includes('லேமினேஷன்') || text.includes('ஆதார்')) {
            reply = "💻 ஸ்மார்ட் கார்டு திருத்தங்கள், புதிய சான்றிதழ்கள், பான் கார்டு விண்ணப்பங்கள், கலர் பிரிண்டிங் மற்றும் அதற்கான கட்டண விபரங்களுக்குக் கீழே உள்ள **'சேவைகள்'** பக்கத்தைப் பார்க்கவும்.";
        } 
        // 4. வேலை நேரம் (Timings)
        else if(text.includes('நேரம்') || text.includes('time') || text.includes('எப்போது திறக்கும்') || text.includes('working hours')) {
            reply = "🕒 நமது டிஜிட்டல் மையம் திங்கள் முதல் சனிக்கிழமை வரை காலை 9:00 மணி முதல் இரவு 9:00 மணி வரை செயல்படும். ஞாயிற்றுக்கிழமை மட்டும் விடுமுறை.";
        } 
        // 5. வேறு ஏதேனும் / மற்றவை (Veru)
        else if(text.includes('veru') || text.includes('வேறு') || text.includes('மற்றவை') || text.includes('அடுத்து')) {
            reply = "💡 வேறு என்ன உதவி வேண்டும்? போட்டித் தேர்வுகள், பள்ளி மாணவர்களுக்கான கதைகள் அல்லது ஆன்லைன் சான்றிதழ் சேவைகள் பற்றி கேட்கலாம்!";
        }
        // 6. நன்றி (Thanks)
        else if(text.includes('நன்றி') || text.includes('thanks') || text.includes('நன்றிப்பா')) {
            reply = "💖 மிக்க மகிழ்ச்சி! நமது லைஃப் மீடியா தமிழ் ஆப்பை தொடர்ந்து பயன்படுத்துங்கள். உங்களுக்குத் தேவையான சேவைகளை உடனுக்குடன் வழங்கிடக் காத்திருக்கிறோம்!";
        }

        // ஏஐ சாட் பதில் திரையில் தோன்றும்
        screen.innerHTML += `<div class="msg received">${reply}</div>`;
        screen.scrollTop = screen.scrollHeight;
    }, 400);
}
