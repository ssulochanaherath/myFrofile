document.addEventListener('DOMContentLoaded', () => {
    // --- Typewriter Effect ---
    const typewriter = document.getElementById('typewriter');
    const text = typewriter.textContent;
    typewriter.textContent = '';
    let i = 0;

    function typeEffect() {
        if (i < text.length) {
            typewriter.textContent += text.charAt(i);
            i++;
            setTimeout(typeEffect, 100);
        }
    }
    typeEffect();

    // --- Floating Navbar Visibility ---
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            navbar.classList.add('show');
        } else {
            navbar.classList.remove('show');
        }
    });

    // --- Intersection Observer for Fade-In ---
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const fadeInObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in').forEach(section => {
        fadeInObserver.observe(section);
    });

    // --- Project Image Slider ---
    const projectItems = document.querySelectorAll('.project-item');
    
    projectItems.forEach(item => {
        const images = item.querySelectorAll('.image-slider img');
        if (images.length <= 1) return;

        let currentIndex = 0;
        let interval;

        const nextImage = () => {
            images[currentIndex].style.opacity = '0';
            currentIndex = (currentIndex + 1) % images.length;
            images[currentIndex].style.opacity = '1';
        };

        const startSlider = () => {
            interval = setInterval(nextImage, 3000);
        };

        const stopSlider = () => {
            clearInterval(interval);
        };

        // Automatic slider on scroll visibility or hover
        item.addEventListener('mouseenter', startSlider);
        item.addEventListener('mouseleave', stopSlider);
        
        // Initial setup for the first image
        images.forEach((img, idx) => {
            img.style.opacity = idx === 0 ? '1' : '0';
        });
    });

    // --- Smooth Scrolling for Navigation Links ---
    document.querySelectorAll('#navbar a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 50,
                    behavior: 'smooth'
                });
            }
        });
    });
});
