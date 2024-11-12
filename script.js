function update_time() {
    let currentTime = new Date().toLocaleString();
    document.querySelector('div.top_bar h2').textContent = currentTime;
}



//Run the clock every 500ms
setInterval(update_time, 500);