if (window.location.hash) {
    history.replaceState(null, null, window.location.pathname);
}

window.scrollTo(0, 0);
document.addEventListener("DOMContentLoaded", () => {

    // ================================
    // MOBILE MENU
    // ================================

    const menuToggle = document.querySelector(".menu-toggle");
    const navLinks = document.querySelector(".nav-links");

    if (menuToggle && navLinks) {
        menuToggle.addEventListener("click", () => {
            navLinks.classList.toggle("active");
            menuToggle.classList.toggle("active");
        });

        document.querySelectorAll(".nav-links a").forEach(link => {
            link.addEventListener("click", () => {
                navLinks.classList.remove("active");
                menuToggle.classList.remove("active");
            });
        });
    }


    // ================================
    // NAVBAR SCROLL EFFECT
    // ================================

    const navbar = document.querySelector(".navbar");

    window.addEventListener("scroll", () => {
        if (!navbar) return;

        if (window.scrollY > 50) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }
    });


    // ================================
    // ACTIVE NAVIGATION
    // ================================

    const sections = document.querySelectorAll("section[id]");
    const navItems = document.querySelectorAll(".nav-links a");

    function updateActiveNav() {
        let currentSection = "";

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 150;
            const sectionHeight = section.offsetHeight;

            if (
                window.scrollY >= sectionTop &&
                window.scrollY < sectionTop + sectionHeight
            ) {
                currentSection = section.getAttribute("id");
            }
        });

        navItems.forEach(link => {
            link.classList.remove("active");

            const href = link.getAttribute("href");

            if (href === "#" + currentSection) {
                link.classList.add("active");
            }
        });
    }

    window.addEventListener("scroll", updateActiveNav);


    // ================================
    // SCROLL REVEAL
    // ================================

    const revealElements = document.querySelectorAll(
        ".section-title, .about-content, .stat-card, .skill-card, .timeline-item, .project-card, .education-card, .cert-card, .contact-card"
    );

    revealElements.forEach(element => {
        element.classList.add("reveal");
    });

    const observer = new IntersectionObserver(
        entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                }
            });
        },
        {
            threshold: 0.15
        }
    );

    revealElements.forEach(element => {
        observer.observe(element);
    });


    // ================================
    // SMOOTH SCROLL
    // ================================

    document.querySelectorAll('a[href^="#"]').forEach(link => {

        link.addEventListener("click", event => {

            const targetId = link.getAttribute("href");

            if (!targetId || targetId === "#") {
                return;
            }

            const target = document.querySelector(targetId);

            if (target) {
                event.preventDefault();

                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }
        });

    });


    // ================================
    // PROJECT CARD TILT
    // ================================

    const projectCards = document.querySelectorAll(".project-card");

    projectCards.forEach(card => {

        card.addEventListener("mousemove", event => {

            if (window.innerWidth < 900) return;

            const rect = card.getBoundingClientRect();

            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;

            card.style.transform =
                `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
        });

        card.addEventListener("mouseleave", () => {
            card.style.transform = "";
        });

    });


    // ================================
    // SKILL CARD EFFECT
    // ================================

    const skillCards = document.querySelectorAll(".skill-card");

    skillCards.forEach(card => {

        card.addEventListener("mousemove", event => {

            const rect = card.getBoundingClientRect();

            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;

            card.style.setProperty("--mouse-x", `${x}px`);
            card.style.setProperty("--mouse-y", `${y}px`);
        });

    });


    // ================================
    // HERO PARALLAX
    // ================================

    const heroCard = document.querySelector(".hero-card");

    if (heroCard) {

        heroCard.addEventListener("mousemove", event => {

            if (window.innerWidth < 900) return;

            const rect = heroCard.getBoundingClientRect();

            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;

            const moveX = (x - rect.width / 2) / 25;
            const moveY = (y - rect.height / 2) / 25;

            heroCard.style.transform =
                `translateY(-40%) translate(${moveX}px, ${moveY}px)`;
        });

        heroCard.addEventListener("mouseleave", () => {
            heroCard.style.transform = "translateY(-40%)";
        });

    }


    // ================================
    // TYPING EFFECT
    // ================================

    const typingElement = document.querySelector(".typing-text");

    if (typingElement) {

        const words = [
            "Developer",
            "AI Enthusiast",
            "Problem Solver",
            "Tech Explorer"
        ];

        let wordIndex = 0;
        let charIndex = 0;
        let deleting = false;

        function typeEffect() {

            const currentWord = words[wordIndex];

            if (!deleting) {

                typingElement.textContent =
                    currentWord.substring(0, charIndex + 1);

                charIndex++;

                if (charIndex === currentWord.length) {
                    deleting = true;

                    setTimeout(typeEffect, 1500);
                    return;
                }

            } else {

                typingElement.textContent =
                    currentWord.substring(0, charIndex - 1);

                charIndex--;

                if (charIndex === 0) {
                    deleting = false;
                    wordIndex = (wordIndex + 1) % words.length;
                }
            }

            setTimeout(
                typeEffect,
                deleting ? 60 : 100
            );
        }

        typeEffect();
    }


    // ================================
    // EMAIL BUTTON
    // ================================

    const emailLinks = document.querySelectorAll(
        'a[href^="mailto:"]'
    );

    emailLinks.forEach(link => {

        link.addEventListener("click", () => {

            const originalText = link.textContent;

            link.textContent = "Opening email...";

            setTimeout(() => {
                link.textContent = originalText;
            }, 1500);

        });

    });


    // ================================
    // FOOTER YEAR
    // ================================

    const yearElement = document.querySelector("#year");

    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }


    // ================================
    // PAGE LOADED
    // ================================

    document.body.classList.add("loaded");

});