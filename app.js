let clickCount = 0;

document.getElementById("logo").onclick = () => {
    clickCount++;
    if (clickCount >= 5) {
        window.location.href = "admin.html";
    }
};
