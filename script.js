function showMessage() {
    alert("Life Media Tamil-க்கு வரவேற்கிறோம்!");
}

// Register Service Worker
if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
        navigator.serviceWorker
            .register("sw.js")
            .then(() => {
                console.log("Service Worker Registered");
            })
            .catch((error) => {
                console.log("Service Worker Registration Failed:", error);
            });
    });
}
