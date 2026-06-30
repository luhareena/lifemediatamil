/* 1. ஆப் தொடக்கம் மற்றும் லோக்கல் ஸ்டோரேஜ் (LOCAL STORAGE INIT) */
document.addEventListener("DOMContentLoaded", function() {
    // பயனர் ஏற்கனவே டார்க் மோட் தேர்ந்தெடுத்திருந்தால் அதை நினைவில் கொள்ளும்
    if (localStorage.getItem("theme") === "dark") {
        document.body.classList.add("dark");
        let themeBtn = document.getElementById('themeBtn');
        if(themeBtn) themeBtn.innerText = "☀️ Light";
    }
    loadQuestion(); // வினாடி-வினா கேள்விகளைத் தொடங்குகிறது
});

/* 2. பக்கங்களை மாற்றுதல் (APP NAVIGATION) */
function switchPage(pageId) {
    let pages = document.getElementsByClassName('app-page');
    for(let p of pages) { p.classList.remove('active'); }
    
    let navs = document.getElementsByClassName('nav-item');
    for(let n of navs) { n.classList.remove('active'); }

    // நாம் கிளிக் செய்யும் பக்கத்தையும் மெனுவையும் ஆக்டிவ் ஆக்குகிறது
    let targetPage = document.getElementById('page-' + pageId);
    let targetNav = document.getElementById('nav-' + pageId);
    
    if(targetPage) targetPage.classList.add('active');
    if(targetNav) targetNav.classList.add('active');
    
    // பக்கம் மாறும்போது ஸ்கிரீன் தானாக மேலே (Top) செல்லும்
    window.scrollTo({top: 0, behavior: 'smooth'});
}

/* 3. டார்க் மோட் மாற்றி (THEME SWITCHER) */
function toggleTheme() {
    let body = document.body;
    let btn = document.getElementById('themeBtn');
    body.classList.toggle('dark');
    
    if(body.classList.contains('dark')) {
        if(btn) btn.innerText = "☀️ Light";
        localStorage.setItem("theme", "dark");
    } else {
        if(btn) btn.innerText = "🌙 Dark";
        localStorage.setItem("theme", "light");
    }
}

/* 4. ஆப் உள் தேடல் வசதி (DYNAMIC INTERNAL SEARCH) */
function dynamicSearch() {
    let val = document.getElementById('appSearch').value.toLowerCase().trim();
    // இணையதள முகவரியாக இருந்தால் உள் தேடலைத் தவிர்க்கும்
    if(val.includes('www.') || val.includes('.com') || val.includes('http')) return;

    let elements = document.getElementsByClassName('search-item');
    for(let el of elements) {
        let text = el.innerText.toLowerCase();
        el.style.display = text.includes(val) ? "block" : "none";
    }
}

// தேடல் கட்டத்தில் Enter அழுத்தினால் கூகிளில் தேடும்
function handleSearchEnter(e) { if(e.key === "Enter") triggerMegaSearch(); }


function triggerMegaSearch() {
    let query = document.getElementById('appSearch').value.trim();
    if(query === "") return;

    // நேரடியாக லிங்க் டைப் செய்தால் அந்த வெப்சைட்டைத் திறக்கும்
    if(query.toLowerCase().includes('www.') || query.toLowerCase().includes('.com') || query.toLowerCase().includes('.in') || query.startsWith('http')) {
        let url = query;
        if (!/^https?:\/\//i.test(url)) url = 'https://' + url;
        window.open(url, '_blank');
    } else {
        // இல்லையெனில் கூகிள் தேடலுக்குக் கொண்டு செல்லும்
        window.open('https://www.google.com/search?q=' + encodeURIComponent(query), '_blank');
    }
}

/* 5. பொது அறிவு வினாடி-வினா (DYNAMIC QUIZ SYSTEM) */
const questions = [
    { q: "இந்தியாவின் விண்வெளி ஆராய்ச்சி நிறுவனம் எது?", options: ["ISRO (இஸ்ரோ)", "NASA (நாசா)", "DRDO (டி.ஆர்.டி.ஓ)"], ans: 0 },
    { q: "தமிழ்நாட்டின் மாநில மரம் எது?", options: ["ஆலமரம்", "பனை மரம்", "தென்னை மரம்"], ans: 1 },
    { q: "இந்தியாவின் தலைநகரம் எது?", options: ["मुंबई (மும்பை)", "சென்னை", "புது டெல்லி"], ans: 2 }
];

let currentQ = 0;

function loadQuestion() {
    let qData = questions[currentQ];
    let qQuestion = document.getElementById("quiz-question");
    let qOptions = document.getElementById("quiz-options");
    let qFeedback = document.getElementById("quiz-feedback");
    let nextBtn = document.getElementById("next-btn");

    if(!qQuestion || !qOptions) return;

    qQuestion.innerText = `கேள்வி ${currentQ + 1}: ${qData.q}`;
    let optionsHtml = "";
    qData.options.forEach((opt, index) => {
        optionsHtml += `<button class="quiz-option" onclick="checkAnswerNew(${index})">${opt}</button>`;
    });
    qOptions.innerHTML = optionsHtml;
    if(qFeedback) qFeedback.innerText = "";
    if(nextBtn) nextBtn.style.display = "none";
}

function checkAnswerNew(selectedIndex) {
    let qData = questions[currentQ];
    let feedback = document.getElementById("quiz-feedback");
    let opts = document.getElementsByClassName("quiz-option");

    // அனைத்து ஆப்ஷன்களின் பின்னணி நிறத்தையும் பழையபடி மாற்றுகிறது
    for(let o of opts) { o.style.background = ""; o.style.color = ""; }

    if(selectedIndex === qData.ans) {
        if(feedback) {
            feedback.innerText = "🎉 சரியான பதில்! வாழ்த்துகள்.";
            feedback.style.color = "var(--success)";
        }
        opts[selectedIndex].style.background = "var(--success)";
        opts[selectedIndex].style.color = "white";
        let nextBtn = document.getElementById("next-btn");
        if(nextBtn) nextBtn.style.display = "block";
    } else {
        if(feedback) {
            feedback.innerText = "❌ தவறான பதில்! மீண்டும் சரியான பதிலை முயற்சிக்கவும்.";
            feedback.style.color = "var(--accent)";
        }
        opts[selectedIndex].style.background = "var(--accent)";
        opts[selectedIndex].style.color = "white";
    }
}

function nextQuestion() {
    currentQ = (currentQ + 1) % questions.length;
    loadQuestion();
}

/* 6. ஏஐ சாட் அசிஸ்டண்ட் (SMART AI CHAT ASSISTANT) */
function handleChatEnter(e) { if(e.key === "Enter") triggerChatResponse(); }

function triggerChatResponse() {
    let input = document.getElementById('chatInputField');
    let screen = document.getElementById('chatScreen');
    if (!input || !screen) return;

    let query = input.value.trim();
    if(query === "") return;

    // பயனர் அனுப்பிய செய்தியைத் திரையில் காட்டும்
    screen.innerHTML += `<div class="msg sent">${query}</div>`;
    input.value = "";
    screen.scrollTop = screen.scrollHeight;

    // ஏஐ பதிலளிக்கும் சிறிய காலதாமதம் (Simulation Delay)
    setTimeout(() => {
        let reply = "🙂 உங்கள் கேள்வி எனக்குப் புரிந்தது! லைஃப் மீடியா தமிழின் புதிய அப்டேட்களை கவனியுங்கள்.";
        let text = query.toLowerCase().trim();

        // ஸ்மார்ட் பதில்கள் (Keywords Match)
        if(text.includes('நீ யார்') || text.includes('யார் நீ') || text.includes('பெயர் என்ன') || text.includes('who are you') || text.includes('உன் பெயர்') || text.includes('name')) {
            reply = "🤖 நான் **Life Media Tamil** ஆப்பின் அதிகாரப்பூர்வ ஏஐ சாட் அசிஸ்டண்ட்! உங்களுக்குத் தேவையான கல்வி, தேர்வுகள் மற்றும் ஆன்லைன் டிஜிட்டல் சென்டர் சேவைகளுக்கான வழிகாட்டல்களை வழங்குவதே என் வேலை.";
        }
        else if(text.includes('நியாஸ்') || text.includes('niyas') || text.includes('முதலாளி') || text.includes('owner')) {
            reply = "🚀 நியாஸ் (Niyas) அவர்கள் தான் நமது **Life Media Tamil** மற்றும் **Niyas Digital Center & Building Constructions** நிறுவனத்தின் நிறுவனர் ஆவார்!";
        }
        else if(text.includes('வணக்கம்') || text.includes('hi') || text.includes('hello')) {
            reply = "👋 வணக்கம்! உங்களுக்கு என்ன விபரங்கள் அல்லது ஆன்லைன் உதவிகள் தேவை? (உதாரணம்: வேலை நேரம், குவிஸ், சேவைகள்)";
        } 
        else if(text.includes('quiz') || text.includes('குவிஸ்') || text.includes('தேர்வு') || text.includes('exam') || text.includes('கேள்வி')) {
            reply = "🎓 போட்டித் தேர்வுகள் மற்றும் 'நேரடி குவிஸ்' பயிற்சிகளுக்கு கீழே உள்ள மெனுவில் **'மாணவர்கள்' (Students Corner)** பக்கத்திற்குச் செல்லவும்.";
        } 
        else if(text.includes('service') || text.includes('சேவை') || text.includes('கார்டு') || text.includes('பிரிண்ட்') || text.includes('லேமினேஷன்')) {
            reply = "💻 ஸ்மார்ட் கார்டு திருத்தங்கள், பான் கார்டு விண்ணப்பங்கள், கலர் பிரிண்டிங் மற்றும் அதன் கட்டண விபரங்களுக்குக் கீழே உள்ள **'சேவைகள்'** பக்கத்தைப் பார்க்கவும்.";
        } 
        else if(text.includes('youtube') || text.includes('வீдео') || text.includes('video')) {
            reply = "▶ எங்களது சிறந்த டெக்னாலஜி மற்றும் கல்வி சார்ந்த வீடியோக்களைக் காண 'Home' பக்கத்தில் உள்ள 'Our YouTube Channel' பட்டனை பயன்படுத்தலாம்.";
        }
        else if(text.includes('நேரம்') || text.includes('time') || text.includes('எப்போது திறக்கும்')) {
            reply = "🕒 நமது டிஜிட்டல் மையம் திங்கள் முதல் சனிக்கிழமை வரை காலை 9:00 மணி முதல் இரவு 9:00 மணி வரை செயல்படும். ஞாயிறு விடுமுறை.";
        } 
        else if(text.includes('contact') || text.includes('போன்') || text.includes('நெம்பர்') || text.includes('எண்')) {
            reply = "📞 எங்களைத் தொடர்பு கொள்ள அல்லது வாட்ஸ்அப் மூலம் விபரங்களை அனுப்ப 'சேவைகள்' பக்கத்தில் உள்ள வாட்ஸ்அப் பட்டனை பயன்படுத்தலாம்.";
        }
        else if(text.includes('veru') || text.includes('வேறு') || text.includes('மற்றவை')) {
            reply = "💡 வேறு என்ன உதவி வேண்டும் நியாஸ்? போட்டித் தேர்வுகள், குழந்தைகளுக்கான கதைகள் அல்லது ஆன்லைன் சான்றிதழ் சேவைகள் பற்றி கேட்கலாம்!";
        }
        else if(text.includes('நன்றி') || text.includes('thanks')) {
            reply = "💖 மிக்க மகிழ்ச்சி! நமது ஆப்பை தொடர்ந்து பயன்படுத்துங்கள்.";
        }

        // ஏஐ பதிலைத் திரையில் சேர்க்கிறது
        screen.innerHTML += `<div class="msg received">${reply}</div>`;
        screen.scrollTop = screen.scrollHeight;
    }, 400);
}
