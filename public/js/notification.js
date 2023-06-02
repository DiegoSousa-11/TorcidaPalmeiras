var interval;
var progress = 0;

function notification(text, isAlert) {
    if(document.getElementById('notification'))
        return;

    progress = 0;

    document.body.innerHTML += `
        <div id='notification' class='notification ${isAlert && "alertNotification"}'>
            <div class='content'>
                <span class="iconify" data-icon=${isAlert ? "mingcute:alert-fill" : "fe:check"}></span>
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
        progress = 0;
        return;
    }

    const notificationProgressBar = document.getElementById('notificationProgressBar');
    
    progress++;

    notificationProgressBar.style.width = progress + '%';
}
