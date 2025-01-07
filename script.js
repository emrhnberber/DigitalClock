// Navigasyon fonksiyonları
const navButtons = document.querySelectorAll('.nav-btn');
const sections = document.querySelectorAll('.section');

navButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Aktif buton sınıfını güncelle
        navButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        // Aktif bölümü göster
        const targetId = `${button.dataset.target}Section`;
        sections.forEach(section => {
            section.classList.remove('active');
            if (section.id === targetId) {
                section.classList.add('active');
            }
        });
    });
});

// Saat ve tarih fonksiyonları
function updateClock() {
    const now = new Date();
    
    // Saat güncelleme
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    document.getElementById('clock').textContent = `${hours}:${minutes}:${seconds}`;
    
    // Tarih güncelleme
    const days = ['Pazar', 'Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi'];
    const months = ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran', 'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'];
    
    const day = days[now.getDay()];
    const date = now.getDate();
    const month = months[now.getMonth()];
    const year = now.getFullYear();
    
    document.getElementById('date').textContent = `${day}, ${date} ${month} ${year}`;
}

// Kronometre değişkenleri
let stopwatchInterval;
let stopwatchTime = 0;
let stopwatchRunning = false;

// Geri sayım değişkenleri
let timerInterval;
let timerTime = 0;
let timerRunning = false;
let savedTimerTime = 0; // Durdurulan zamanı saklamak için

// Saat güncelleme
setInterval(updateClock, 1000);
updateClock();

// Kronometre fonksiyonları
function updateStopwatch() {
    const hours = Math.floor(stopwatchTime / 3600);
    const minutes = Math.floor((stopwatchTime % 3600) / 60);
    const seconds = stopwatchTime % 60;
    
    document.getElementById('stopwatch').textContent = 
        `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

function startStopwatch() {
    if (!stopwatchRunning) {
        stopwatchRunning = true;
        document.getElementById('startStopwatch').classList.add('active');
        document.getElementById('stopStopwatch').classList.remove('active');
        stopwatchInterval = setInterval(() => {
            stopwatchTime++;
            updateStopwatch();
        }, 1000);
    }
}

function stopStopwatch() {
    if (stopwatchRunning) {
        stopwatchRunning = false;
        document.getElementById('startStopwatch').classList.remove('active');
        document.getElementById('stopStopwatch').classList.add('active');
        clearInterval(stopwatchInterval);
    }
}

function resetStopwatch() {
    stopStopwatch();
    document.getElementById('stopStopwatch').classList.remove('active');
    stopwatchTime = 0;
    updateStopwatch();
}

// Geri sayım fonksiyonları
function updateTimer() {
    if (timerTime <= 0) {
        stopTimer();
        alert('Süre doldu!');
        return;
    }
    
    const hours = Math.floor(timerTime / 3600);
    const minutes = Math.floor((timerTime % 3600) / 60);
    const seconds = timerTime % 60;
    
    document.getElementById('timer').textContent = 
        `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

function startTimer() {
    if (!timerRunning) {
        // Eğer kaydedilmiş bir süre yoksa yeni süreyi al
        if (savedTimerTime === 0) {
            const hours = parseInt(document.getElementById('hours').value) || 0;
            const minutes = parseInt(document.getElementById('minutes').value) || 0;
            const seconds = parseInt(document.getElementById('seconds').value) || 0;
            
            if (hours === 0 && minutes === 0 && seconds === 0) {
                alert('Lütfen bir süre belirleyin!');
                return;
            }
            
            timerTime = hours * 3600 + minutes * 60 + seconds;
        } else {
            // Kaydedilmiş süreden devam et
            timerTime = savedTimerTime;
        }
        
        timerRunning = true;
        document.getElementById('startTimer').classList.add('active');
        document.getElementById('stopTimer').classList.remove('active');
        
        timerInterval = setInterval(() => {
            timerTime--;
            updateTimer();
        }, 1000);
        
        updateTimer();
    }
}

function stopTimer() {
    if (timerRunning) {
        timerRunning = false;
        document.getElementById('startTimer').classList.remove('active');
        document.getElementById('stopTimer').classList.add('active');
        clearInterval(timerInterval);
        savedTimerTime = timerTime; // Kalan süreyi kaydet
    }
}

function resetTimer() {
    stopTimer();
    document.getElementById('stopTimer').classList.remove('active');
    savedTimerTime = 0; // Kaydedilmiş süreyi sıfırla
    document.getElementById('hours').value = '';
    document.getElementById('minutes').value = '';
    document.getElementById('seconds').value = '';
    document.getElementById('timer').textContent = '00:00:00';
}

// Event Listeners
document.getElementById('startStopwatch').addEventListener('click', startStopwatch);
document.getElementById('stopStopwatch').addEventListener('click', stopStopwatch);
document.getElementById('resetStopwatch').addEventListener('click', resetStopwatch);

document.getElementById('startTimer').addEventListener('click', startTimer);
document.getElementById('stopTimer').addEventListener('click', stopTimer);
document.getElementById('resetTimer').addEventListener('click', resetTimer); 