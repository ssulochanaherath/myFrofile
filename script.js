const nameElement = document.querySelector('header h1');
const text = nameElement.textContent;
nameElement.textContent = '';
let i = 0;

function typeEffect() {
    if (i < text.length) {
        nameElement.textContent += text.charAt(i);
        i++;
        setTimeout(typeEffect, 60);
    }
}
typeEffect();

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        }
    });
}, {
    threshold: 0.2
});

const fadeSections = document.querySelectorAll('.fade-in');
fadeSections.forEach(section => {
    observer.observe(section);
});
