const nameElement = document.querySelector('header h1');
const text = nameElement.textContent;
nameElement.textContent = '';
let i = 0;

function typeEffect() {
    if (i < text.length) {
        nameElement.textContent += text.charAt(i);
        i++;
        setTimeout(typeEffect, 80);
    }
}
typeEffect();

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        }
    });
});

const sections = document.querySelectorAll('section');
sections.forEach(section => {
    section.classList.add('hidden');
    observer.observe(section);
});
