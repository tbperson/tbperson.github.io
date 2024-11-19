function update_time() {
    let currentTime = new Date().toLocaleString();
    document.querySelector('#topnav h2').textContent = currentTime;
    console.log(currentTime);
}



//Run the clock every 500ms
setInterval(update_time, 500);