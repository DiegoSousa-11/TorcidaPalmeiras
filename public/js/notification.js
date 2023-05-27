var interval;
var progress = 0;

function notification(text) {
    document.body.innerHTML += `
        <div id='notification' class='notification'>
            <div class='content'>
                <span class="iconify" data-icon="fe:check"></span>
                <strong>${text}</strong>
            </div>

            <div class='progressBar'>
                <div id='notificationProgressBar'></div>
            </div>
        </div>
    `;

    interval = setInterval(() => increaseProgress(), 60);
}

function increaseProgress() {
    if(progress === 100) {
        document.body.querySelector('#notification').remove();
        clearInterval(interval);
        return;
    }

    const notificationProgressBar = document.getElementById('notificationProgressBar');
    
    progress++;

    notificationProgressBar.style.width = progress + '%';
}
