//Appear to open the apps
document.querySelector('.small-box').addEventListener('click', () => {
    document.querySelector('.about-page').style.display = 'block';
});
document.querySelector('.small-box2').addEventListener('click',() => {
    document.querySelector('.welcome-page').style.display = 'block';
});
document.querySelector('.small-box3').addEventListener('click',() => {
    document.querySelector('.contact-page').style.display = 'block';
});

//Button functionality
function update_time() {
    currentTime = new Date().toLocaleString();
    document.querySelector('.topnav h2').textContent = currentTime;
}

function close_about() {
    document.querySelector('.about-page').style.display = 'none';
}
function close_welcome() {
    document.querySelector('.welcome-page').style.display = 'none';
}
function close_contact() {
    document.querySelector('.contact-page').style.display = 'none';
}
function go_back() {
    window.history.back();
}

//Run the clock every 500ms
setInterval(update_time, 500);