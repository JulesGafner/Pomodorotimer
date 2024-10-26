let timerInterval;
let remainingTime;
let isRunning = false;

document.getElementById('start-timer').addEventListener('click', () => {
    if (!isRunning) {
        isRunning = true;
        let time = remainingTime || parseInt(document.getElementById('timer-input').value) * 60;
        const ringtonePath = document.getElementById('ringtone-select').value;
        const ringtone = new Audio(`audio/${ringtonePath}`);

        timerInterval = setInterval(() => {
            if (time <= 0) {
                clearInterval(timerInterval);
                ringtone.play();
                alert('Zeit ist abgelaufen!');
                showNotification('Timer abgelaufen!', 'Die Zeit ist abgelaufen.');
                isRunning = false;
                remainingTime = null;
                displayTime(0);
            } else {
                time--;
                displayTime(time);
                remainingTime = time;
            }
        }, 1000);
    }
});

document.getElementById('stop-timer').addEventListener('click', () => {
    if (isRunning) {
        clearInterval(timerInterval);
        isRunning = false;
    }
});

document.getElementById('reset-timer').addEventListener('click', () => {
    clearInterval(timerInterval);
    isRunning = false;
    remainingTime = null;
    displayTime(0);
});

function displayTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    document.getElementById('timer-display').textContent = `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
}

function showNotification(title, body) {
    if (Notification.permission === 'granted') {
        new Notification(title, { body });
    }
}

if ('Notification' in window && Notification.permission !== 'granted') {
    Notification.requestPermission();
}

// To-do-Liste-Funktionalität
document.getElementById('add-todo').addEventListener('click', () => {
    const todoText = document.getElementById('todo-input').value;
    const color = document.getElementById('todo-color').value;

    if (todoText) {
        const todoItem = document.createElement('li');
        todoItem.textContent = todoText;
        todoItem.style.backgroundColor = color;
        
        todoItem.addEventListener('click', () => {
            todoItem.classList.toggle('completed');
            if (todoItem.classList.contains('completed')) {
                todoItem.parentNode.appendChild(todoItem);
            }
        });

        document.getElementById('todo-list').appendChild(todoItem);
        document.getElementById('todo-input').value = '';
    }
});

document.getElementById('clear-todos').addEventListener('click', () => {
    document.getElementById('todo-list').innerHTML = '';
});
