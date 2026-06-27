document.getElementById("refreshBtn").addEventListener("click", () => {

document.getElementById("news").innerHTML=`
<h2>Latest Update</h2>
<p>${new Date().toLocaleString()}</p>
`;

});

if("serviceWorker" in navigator){

window.addEventListener("load",()=>{

navigator.serviceWorker.register("./sw.js")
.then(()=>console.log("Service Worker Registered"))
.catch(err=>console.log(err));

});

}
