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
        const currentScrollY = window.scrollY;

        if (currentScrollY > 100) {
            navbar.classList.add('show');
        } else {
            navbar.classList.remove('show');
        }

        if (currentScrollY > lastScrollY) {
        } else {
            fadeSections.forEach(section => {
                section.classList.remove('visible');
            });
        }

        lastScrollY = currentScrollY;
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

document.addEventListener("DOMContentLoaded", function () {
    const projects = document.querySelectorAll(".project-item");
    let currentIndex = 0;

    function showProject(index) {
        projects.forEach((project, i) => {
            project.classList.remove("active");
            if (i === index) {
                project.classList.add("active");
            }
        });
    }

    document.querySelector(".right-btn").addEventListener("click", () => {
        currentIndex = (currentIndex + 1) % projects.length;
        showProject(currentIndex);
    });

    document.querySelector(".left-btn").addEventListener("click", () => {
        currentIndex = (currentIndex - 1 + projects.length) % projects.length;
        showProject(currentIndex);
    });

    // Show first project on page load
    showProject(currentIndex);

    // Image Slider inside Each Project
    function startImageSlider() {
        document.querySelectorAll(".image-slider").forEach(slider => {
            let images = slider.querySelectorAll("img");
            let imageIndex = 0;
            let sliderInterval;

            function showNextImage() {
                images.forEach(img => img.style.opacity = "0");
                images[imageIndex].style.opacity = "1";
                imageIndex = (imageIndex + 1) % images.length;
            }

            function startSlider() {
                sliderInterval = setInterval(showNextImage, 2000);
            }

            function stopSlider() {
                clearInterval(sliderInterval);
            }

            // Start the slider when the cursor enters
            slider.addEventListener("mouseenter", startSlider);

            // Stop the slider when the cursor leaves
            slider.addEventListener("mouseleave", stopSlider);

            // Start the slider immediately on page load
            startSlider();
        });
    }function startImageSlider() {
        document.querySelectorAll(".image-slider").forEach(slider => {
            let images = slider.querySelectorAll("img");
            let imageIndex = 0;
            let sliderInterval;

            function showNextImage() {
                images.forEach(img => img.style.opacity = "0");
                images[imageIndex].style.opacity = "1";
                imageIndex = (imageIndex + 1) % images.length;
            }

            function startSlider() {
                sliderInterval = setInterval(showNextImage, 2000);
            }

            function stopSlider() {
                clearInterval(sliderInterval);
            }

            // Start the slider when the cursor enters
            slider.addEventListener("mouseenter", startSlider);

            // Stop the slider when the cursor leaves
            slider.addEventListener("mouseleave", stopSlider);

            // Start the slider immediately on page load (this line is causing automatic sliding)
            startSlider();
        });
    }


    startImageSlider();
});

document.addEventListener("DOMContentLoaded", function () {
    const projects = document.querySelectorAll(".project-item");
    let currentIndex = 0;

    function showProject(index, direction) {
        projects.forEach((project, i) => {
            project.style.transition = "transform 0.5s ease, opacity 0.5s ease";
            project.style.transform = "scale(0.9) translateX(50%)";
            project.style.opacity = "0.5";
            project.style.zIndex = "1";
            project.classList.remove("active");
        });

        // Add transition and reset to normal position
        projects[index].style.transform = "scale(1) translateX(0)";
        projects[index].style.opacity = "1";
        projects[index].style.zIndex = "2";
        projects[index].classList.add("active");
    }

    document.querySelector(".right-btn").addEventListener("click", () => {
        currentIndex = (currentIndex + 1) % projects.length;
        showProject(currentIndex, "next");
    });

    document.querySelector(".left-btn").addEventListener("click", () => {
        currentIndex = (currentIndex - 1 + projects.length) % projects.length;
        showProject(currentIndex, "prev");
    });

    // Show first project on page load
    showProject(currentIndex, "prev");
});



