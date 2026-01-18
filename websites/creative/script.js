// Creative Theme JavaScript - Playful Interactions

document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('.nav-link');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
    const faqItems = document.querySelectorAll('.faq-item');
    const contactForm = document.getElementById('contactForm');
    const problemCards = document.querySelectorAll('.problem-card');
    const packageCards = document.querySelectorAll('.package-card');

    // Initialize
    sections[0].classList.add('active', 'visible');

    // Smooth scroll
    function scrollToSection(sectionId) {
        const section = document.getElementById(sectionId);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    }

    // Update active navigation with bounce effect
    function updateActiveNav(sectionId) {
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.dataset.section === sectionId) {
                link.classList.add('active');
                // Add bounce animation
                const icon = link.querySelector('.nav-icon');
                icon.classList.add('animate-bounce');
                setTimeout(() => icon.classList.remove('animate-bounce'), 500);
            }
        });

        mobileNavLinks.forEach(link => {
            link.classList.remove('active');
            if (link.dataset.section === sectionId) {
                link.classList.add('active');
            }
        });
    }

    // Navigation handlers
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

    // Intersection Observer
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

    // FAQ Accordion with fun toggle
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-q');
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            faqItems.forEach(faq => faq.classList.remove('active'));
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });

    // Contact Form
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const formData = new FormData(this);
            const data = {};
            formData.forEach((value, key) => data[key] = value);

            // Fun success message
            const submitBtn = this.querySelector('.form-submit');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Отправлено! ✅';
            submitBtn.style.background = '#4ECDC4';

            setTimeout(() => {
                submitBtn.textContent = originalText;
                submitBtn.style.background = '';
                this.reset();
            }, 2000);

            alert('Ура! Заявка отправлена! Я свяжусь с вами в ближайшее время 🎉');
        });
    }

    // Smooth scroll for internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            if (this.classList.contains('nav-link') || this.classList.contains('mobile-nav-link')) {
                return;
            }
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            scrollToSection(targetId);
        });
    });

    // Fun hover effects for problem cards
    problemCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            // Random slight rotation
            const rotation = (Math.random() - 0.5) * 6;
            this.style.transform = `translateY(-8px) rotate(${rotation}deg)`;
        });
        card.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });

    // Package cards hover
    packageCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            if (!this.classList.contains('popular')) {
                this.style.transform = 'translateY(-10px) scale(1.02)';
            }
        });
        card.addEventListener('mouseleave', function() {
            if (!this.classList.contains('popular')) {
                this.style.transform = '';
            }
        });
    });

    // Animate elements on scroll
    const animateElements = document.querySelectorAll('.problem-card, .package-card, .magic-item, .journey-step, .win-card, .mini-card');

    const elementObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
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

    // Floating elements random movement
    const floatingElements = document.querySelectorAll('.floating-element');
    floatingElements.forEach((el, i) => {
        setInterval(() => {
            const x = Math.sin(Date.now() / 1000 + i) * 10;
            const y = Math.cos(Date.now() / 1000 + i) * 10;
            el.style.transform = `translate(${x}px, ${y}px)`;
        }, 50);
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

    // Easter egg: Konami code
    let konamiCode = [];
    const konamiPattern = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

    document.addEventListener('keydown', function(e) {
        konamiCode.push(e.key);
        konamiCode = konamiCode.slice(-10);

        if (konamiCode.join('') === konamiPattern.join('')) {
            // Fun confetti effect placeholder
            document.body.style.animation = 'rainbow 1s ease';
            setTimeout(() => {
                document.body.style.animation = '';
            }, 1000);
        }
    });

    // Add rainbow animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes rainbow {
            0% { filter: hue-rotate(0deg); }
            100% { filter: hue-rotate(360deg); }
        }
    `;
    document.head.appendChild(style);

    console.log('Creative theme loaded successfully! 🎨');
});
