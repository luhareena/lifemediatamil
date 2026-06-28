// ஆன்லைனில் இருக்கும் news.json ஃபைலில் இருந்து டேட்டாவை எடுக்கும் பங்க்ஷன்
async function loadNews() {
  const newsDiv = document.getElementById("news");
  const breakingNewsDiv = document.getElementById("breakingNews");

  try {
    // news.json ஃபைலை ரீட் செய்கிறது
    const response = await fetch('news.json');
    if (!response.ok) {
      throw new Error("News file லோட் ஆகவில்லை!");
    }
    
    const news = await response.json();

    if (newsDiv) {
      newsDiv.innerHTML = "";
      news.forEach(item => {
        newsDiv.innerHTML += `
          <div class="card">
            <img src="${item.image}" alt="">
            <h3>${item.title}</h3>
            <p>${item.content}</p>
          </div>
        `;
      });
    }

    if (breakingNewsDiv) {
      breakingNewsDiv.innerHTML = "🔥 புதிய அப்டேட்களுக்கு Refresh அழுத்துங்கள்.";
    }

  } catch (error) {
    console.error("Error loading news:", error);
    if (breakingNewsDiv) {
      breakingNewsDiv.innerHTML = "❌ செய்திகளை லோடு செய்வதில் பிரச்சனை!";
    }
  }
}

// பக்கம் லோட் ஆனவுடன் செய்திகளை லோடு செய்ய
loadNews();

// Refresh பட்டன் வேலை செய்ய
const refreshBtn = document.getElementById("refreshBtn");
if (refreshBtn) {
  refreshBtn.addEventListener("click", loadNews);
}

// Service Worker Registration
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./sw.js");
  });
}
