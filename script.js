// 3D Driving Logic
let isDriving = false;
let currentStop = 'home';

function driveTo(targetId) {
    const targetKey = targetId.startsWith('#') ? targetId.substring(1) : targetId;
    
    if (isDriving || targetKey === currentStop) return;
    
    const targetStopEl = document.getElementById(targetKey);
    if (!targetStopEl) return;

    isDriving = true;
    const road = document.querySelector('.road');
    const currentStopEl = document.getElementById(currentStop);
    const navLinks = document.querySelectorAll('.nav-link');

    // 1. Update Navigation UI
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${targetKey}`) {
            link.classList.add('active');
        }
    });

    // 2. Start "Driving" Animation
    road.classList.add('fast');

    // 3. Move Current Stop "Past" the viewer
    if (currentStopEl) {
        currentStopEl.classList.remove('active');
        currentStopEl.classList.add('past');
    }

    // 4. Bring Target Stop from horizon to foreground
    setTimeout(() => {
        targetStopEl.classList.add('active');
    }, 100);

    // 5. Cleanup and State Update
    setTimeout(() => {
        road.classList.remove('fast');
        if (currentStopEl) currentStopEl.classList.remove('past');
        currentStop = targetKey;
        isDriving = false;
    }, 1500); // Matches CSS transition time
}

// Explicitly expose to window for HTML onclick attributes
window.driveTo = driveTo;

// Event Listeners for Navigation Links
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = this.getAttribute('href');
            driveTo(target);
        });
    });

    // Ensure the home stop is active initially
    const home = document.getElementById('home');
    if (home) home.classList.add('active');
});
