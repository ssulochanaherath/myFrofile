let lastScrollY = window.scrollY;

document.addEventListener('DOMContentLoaded', () => {
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
                entry.target.classList.add('visible');  
            } else {
                entry.target.classList.remove('visible');
            }
        });
    }, {
        threshold: 0.2,
    });

    const fadeSections = document.querySelectorAll('.fade-in');
    fadeSections.forEach(section => {
        observer.observe(section);
    });

    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.classList.add('show');
        } else {
            navbar.classList.remove('show');
        }
        lastScrollY = window.scrollY; 
    });

    const projectItems = document.querySelectorAll('.project-item');
    projectItems.forEach(item => {
        const images = item.querySelectorAll('.slider-image');
        images[0].classList.add("active");

        item.addEventListener('mouseenter', () => {
            let currentIndex = 0;
            const changeImages = () => {
                images.forEach((img, index) => {
                    if (img.classList.contains("active")) {
                        currentIndex = index;
                        img.classList.remove("active");
                    }
                });

                const nextIndex = (currentIndex + 1) % images.length;
                images[nextIndex].classList.add("active");
            };

            const intervalId = setInterval(changeImages, 800);

            item.addEventListener('mouseleave', () => {
                clearInterval(intervalId);
            });
        });
    });
});
