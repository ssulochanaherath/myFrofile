document.addEventListener('DOMContentLoaded', () => {
    // 1. Cursor Glow Effect (Desktop Only)
    const cursorGlow = document.getElementById('cursor-glow');
    
    if (window.matchMedia('(pointer: fine)').matches) {
        document.addEventListener('mousemove', (e) => {
            cursorGlow.style.left = e.clientX + 'px';
            cursorGlow.style.top = e.clientY + 'px';
            cursorGlow.style.opacity = '0.5';
        });

        document.addEventListener('mouseleave', () => {
            cursorGlow.style.opacity = '0';
        });
    } else {
        cursorGlow.style.display = 'none';
    }

    // 2. Reveal Animations (Intersection Observer)
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: Stop observing after reveal
                // revealObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach(el => revealObserver.observe(el));

    // 3. Active Nav Link Highlighting
    const sections = document.querySelectorAll('section, .bento-grid > div[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // 4. Bento Card Interactions (Tilt & Image Switching)
    const cards = document.querySelectorAll('.card');
    
    if (window.matchMedia('(pointer: fine)').matches) {
        cards.forEach(card => {
            const isProjectCard = card.classList.contains('card-project');
            const projectImg = card.querySelector('.project-img');
            let images = [];
            
            if (isProjectCard && card.dataset.images) {
                images = JSON.parse(card.dataset.images);
            }

            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                // 4a. Magnetic Tilt
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                const rotateX = (y - centerY) / 20;
                const rotateY = (centerX - x) / 20;
                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;

                // 4b. Dynamic Image Switching
                if (isProjectCard && images.length > 1 && projectImg) {
                    const sectionWidth = rect.width / images.length;
                    const index = Math.floor(x / sectionWidth);
                    const safeIndex = Math.min(Math.max(index, 0), images.length - 1);
                    
                    if (projectImg.src !== window.location.origin + '/' + images[safeIndex] && 
                        !projectImg.src.endsWith(images[safeIndex])) {
                        projectImg.src = images[safeIndex];
                    }
                }
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)';
                // Reset to first image
                if (isProjectCard && images.length > 0 && projectImg) {
                    projectImg.src = images[0];
                }
            });
        });
    }

    // 5. Smooth Scroll for Nav Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });
});
