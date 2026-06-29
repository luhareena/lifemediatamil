
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
