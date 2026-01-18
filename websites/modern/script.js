// Modern Theme JavaScript - Smooth Animations and Interactions

document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('.nav-link');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
    const faqItems = document.querySelectorAll('.faq-item');
    const contactForm = document.getElementById('contactForm');

    // Initialize first section
    sections[0].classList.add('active', 'visible');

    // Smooth scroll to section
    function scrollToSection(sectionId) {
        const section = document.getElementById(sectionId);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    }

    // Update active navigation
    function updateActiveNav(sectionId) {
        // Desktop nav
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.dataset.section === sectionId) {
                link.classList.add('active');
            }
        });

        // Mobile nav
        mobileNavLinks.forEach(link => {
            link.classList.remove('active');
            if (link.dataset.section === sectionId) {
                link.classList.add('active');
            }
        });
    }

    // Navigation click handlers
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const sectionId = this.dataset.section;
            scrollToSection(sectionId);
            updateActiveNav(sectionId);
        });
    });

    mobileNavLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const sectionId = this.dataset.section;
            scrollToSection(sectionId);
            updateActiveNav(sectionId);
        });
    });

    // Intersection Observer for section visibility
    const observerOptions = {
        root: null,
        rootMargin: '-20% 0px -20% 0px',
        threshold: 0.1
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                updateActiveNav(entry.target.id);
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        sectionObserver.observe(section);
    });

    // FAQ Accordion
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');

            // Close all items
            faqItems.forEach(faq => faq.classList.remove('active'));

            // Open clicked item if it wasn't active
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });

    // Contact Form Handler
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const formData = new FormData(this);
            const data = {};
            formData.forEach((value, key) => data[key] = value);

            // Create message for WhatsApp/Telegram
            const message = `Новая заявка с сайта!\n\nИмя: ${data.name}\nКонтакт: ${data.phone}\nУслуга: ${data.service}\nЦель: ${data.message || 'Не указана'}`;

            // Show success message
            alert('Спасибо за заявку! Я свяжусь с вами в ближайшее время.');

            // Reset form
            this.reset();

            // Optionally open WhatsApp
            // window.open(`https://wa.me/375295185154?text=${encodeURIComponent(message)}`, '_blank');
        });
    }

    // Smooth scroll for CTA buttons
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            if (this.classList.contains('nav-link') || this.classList.contains('mobile-nav-link')) {
                return; // Already handled
            }
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            scrollToSection(targetId);
        });
    });

    // Parallax effect for hero section (subtle)
    const heroSection = document.querySelector('.hero-section');
    const heroImage = document.querySelector('.hero-image');

    if (heroSection && heroImage) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const heroRect = heroSection.getBoundingClientRect();

            if (heroRect.bottom > 0 && heroRect.top < window.innerHeight) {
                const parallaxValue = scrolled * 0.2;
                heroImage.style.transform = `translateY(${parallaxValue}px)`;
            }
        });
    }

    // Add loading animation class removal
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 100);

    // Animate elements on scroll
    const animateElements = document.querySelectorAll('.target-card, .approach-item, .service-card, .result-card, .process-step');

    const elementObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('animate-on-scroll');
                }, index * 100);
                elementObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.2
    });

    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        elementObserver.observe(el);
    });

    // Add animation styles
    const style = document.createElement('style');
    style.textContent = `
        .animate-on-scroll {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);

    // Hover effects enhancement
    const cards = document.querySelectorAll('.target-card, .service-card, .result-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
        });
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Navigation hover sound effect (optional visual feedback)
    navLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.2s ease';
        });
    });

    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        const currentSection = document.querySelector('.section.visible');
        const sectionIds = Array.from(sections).map(s => s.id);
        const currentIndex = sectionIds.indexOf(currentSection?.id);

        if (e.key === 'ArrowDown' && currentIndex < sectionIds.length - 1) {
            e.preventDefault();
            scrollToSection(sectionIds[currentIndex + 1]);
        } else if (e.key === 'ArrowUp' && currentIndex > 0) {
            e.preventDefault();
            scrollToSection(sectionIds[currentIndex - 1]);
        }
    });

    console.log('Modern theme loaded successfully!');
});
