/* =========================================
   1. UPDATE COPYRIGHT YEAR
========================================= */

const currentYear = document.getElementById("currentYear");

if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
}


/* =========================================
   2. MOBILE NAVIGATION
========================================= */

const navbarMenu = document.getElementById("navbarMenu");
const navLinks = document.querySelectorAll(".navbar-nav .nav-link");

navLinks.forEach(function (link) {
    link.addEventListener("click", function () {
        if (
            navbarMenu &&
            navbarMenu.classList.contains("show") &&
            window.bootstrap
        ) {
            const collapse =
                bootstrap.Collapse.getOrCreateInstance(navbarMenu);

            collapse.hide();
        }
    });
});


/* =========================================
   3. NAVBAR SCROLL EFFECT
========================================= */

const navbar = document.querySelector(".custom-navbar");

function updateNavbar() {
    if (!navbar) return;

    if (window.scrollY > 40) {
        navbar.classList.add("navbar-scrolled");
    } else {
        navbar.classList.remove("navbar-scrolled");
    }
}

window.addEventListener("scroll", updateNavbar, { passive: true });

updateNavbar();


/* =========================================
   4. ACTIVE NAVIGATION LINK
========================================= */

const sections = document.querySelectorAll("section[id]");

function updateActiveLink() {
    let currentSection = "home";

    sections.forEach(function (section) {
        const sectionTop = section.offsetTop - 150;

        if (window.scrollY >= sectionTop) {
            currentSection = section.id;
        }
    });

    navLinks.forEach(function (link) {
        link.classList.remove("active");

        if (link.getAttribute("href") === "#" + currentSection) {
            link.classList.add("active");
        }
    });
}

window.addEventListener("scroll", updateActiveLink, { passive: true });

updateActiveLink();


/* =========================================
   5. SCROLL REVEAL ANIMATIONS
========================================= */

const revealElements = document.querySelectorAll(
    ".section-heading, .about-highlight-card, .about-content, " +
    ".skill-card, .project-card, .timeline-item, " +
    ".contact-info-card, .contact-form"
);

const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
).matches;

if ("IntersectionObserver" in window && !prefersReducedMotion) {

    revealElements.forEach(function (element) {
        element.classList.add("reveal");
    });

    const observer = new IntersectionObserver(
        function (entries, observerInstance) {

            entries.forEach(function (entry) {

                if (entry.isIntersecting) {
                    entry.target.classList.add("revealed");
                    observerInstance.unobserve(entry.target);
                }

            });

        },
        {
            threshold: 0.12
        }
    );

    revealElements.forEach(function (element) {
        observer.observe(element);
    });
}


/* =========================================
   6. PROFILE IMAGE FALLBACK
========================================= */

const profileImage = document.querySelector(".profile-image");

if (profileImage) {
    profileImage.addEventListener("error", function () {
        console.warn(
            "Profile image not found. Check assets/pavan-profile.jpg."
        );
    });
}