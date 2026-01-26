// Classic Theme JavaScript - Elegant Interactions

document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('.nav-link');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
    const mobileMenuLinks = document.querySelectorAll('.mobile-menu-link');
    const faqItems = document.querySelectorAll('.faq-item');
    const contactForm = document.getElementById('contactForm');

    // Mobile menu elements
    const hamburgerBtn = document.getElementById('hamburgerBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileMenuOverlay = document.getElementById('mobileMenuOverlay');
    const mobileMenuClose = document.getElementById('mobileMenuClose');

    // Initialize
    sections[0].classList.add('active', 'visible');

    // Mobile menu functionality
    function openMobileMenu() {
        mobileMenu.classList.add('active');
        mobileMenuOverlay.classList.add('active');
        hamburgerBtn.classList.add('active');
        hamburgerBtn.setAttribute('aria-expanded', 'true');
        document.body.style.overflow = 'hidden';
    }

    function closeMobileMenu() {
        mobileMenu.classList.remove('active');
        mobileMenuOverlay.classList.remove('active');
        hamburgerBtn.classList.remove('active');
        hamburgerBtn.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
    }

    if (hamburgerBtn) {
        hamburgerBtn.addEventListener('click', function() {
            if (mobileMenu.classList.contains('active')) {
                closeMobileMenu();
            } else {
                openMobileMenu();
            }
        });
    }

    if (mobileMenuClose) {
        mobileMenuClose.addEventListener('click', closeMobileMenu);
    }

    if (mobileMenuOverlay) {
        mobileMenuOverlay.addEventListener('click', closeMobileMenu);
    }

    // Close menu on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && mobileMenu && mobileMenu.classList.contains('active')) {
            closeMobileMenu();
        }
    });

    // Mobile menu links navigation
    mobileMenuLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const sectionId = this.dataset.section;
            closeMobileMenu();
            setTimeout(() => {
                scrollToSection(sectionId);
                updateActiveNav(sectionId);
            }, 300);
        });
    });

    // Smooth scroll
    function scrollToSection(sectionId) {
        const section = document.getElementById(sectionId);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    }

    // Update active navigation
    function updateActiveNav(sectionId) {
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.dataset.section === sectionId) {
                link.classList.add('active');
            }
        });

        mobileNavLinks.forEach(link => {
            link.classList.remove('active');
            if (link.dataset.section === sectionId) {
                link.classList.add('active');
            }
        });

        mobileMenuLinks.forEach(link => {
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

    // FAQ Accordion
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
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

            alert('Спасибо за заявку! Я свяжусь с вами в ближайшее время.');
            this.reset();
        });
    }

    // Smooth scroll for all internal links
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

    // Animate elements on scroll
    const animateElements = document.querySelectorAll('.expertise-card, .service-card, .testimonial-card, .principle-item, .process-step');

    const elementObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('animate-in');
                }, index * 80);
                elementObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.2
    });

    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(15px)';
        el.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
        elementObserver.observe(el);
    });

    // Add animation styles
    const style = document.createElement('style');
    style.textContent = `
        .animate-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);

    // Service card hover effects
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            if (!this.classList.contains('featured')) {
                this.style.transform = 'translateY(-6px)';
            }
        });
        card.addEventListener('mouseleave', function() {
            if (!this.classList.contains('featured')) {
                this.style.transform = 'translateY(0)';
            }
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

    // Back to top button
    const backToTopBtn = document.getElementById('backToTop');

    if (backToTopBtn) {
        // Show/hide button based on scroll position
        window.addEventListener('scroll', function() {
            if (window.scrollY > 500) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        });

        // Scroll to top on click
        backToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Lazy-loaded images - add loaded class when complete
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    lazyImages.forEach(img => {
        if (img.complete) {
            img.classList.add('loaded');
        } else {
            img.addEventListener('load', function() {
                this.classList.add('loaded');
            });
        }
    });

    // Handle non-lazy images
    const allImages = document.querySelectorAll('img:not([loading="lazy"])');
    allImages.forEach(img => {
        img.classList.add('loaded');
    });

    // Text Reviews Slider
    const slider = document.querySelector('.text-reviews-slider');
    const prevBtn = document.querySelector('.slider-prev');
    const nextBtn = document.querySelector('.slider-next');
    const dotsContainer = document.querySelector('.slider-dots');

    if (slider && prevBtn && nextBtn && dotsContainer) {
        const cards = slider.querySelectorAll('.text-review-card');
        let currentIndex = 0;

        // Create dots
        cards.forEach((_, index) => {
            const dot = document.createElement('button');
            dot.classList.add('slider-dot');
            dot.setAttribute('aria-label', `Перейти к отзыву ${index + 1}`);
            if (index === 0) dot.classList.add('active');
            dot.addEventListener('click', () => goToSlide(index));
            dotsContainer.appendChild(dot);
        });

        const dots = dotsContainer.querySelectorAll('.slider-dot');

        function updateDots() {
            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === currentIndex);
            });
        }

        function goToSlide(index) {
            currentIndex = index;
            const card = cards[index];
            if (card) {
                card.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
            }
            updateDots();
        }

        function getVisibleCards() {
            const sliderRect = slider.getBoundingClientRect();
            let count = 1;
            if (window.innerWidth >= 992) count = 3;
            else if (window.innerWidth >= 768) count = 2;
            return count;
        }

        prevBtn.addEventListener('click', () => {
            currentIndex = Math.max(0, currentIndex - 1);
            goToSlide(currentIndex);
        });

        nextBtn.addEventListener('click', () => {
            const maxIndex = cards.length - 1;
            currentIndex = Math.min(maxIndex, currentIndex + 1);
            goToSlide(currentIndex);
        });

        // Update active dot on scroll
        let scrollTimeout;
        slider.addEventListener('scroll', () => {
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
                const sliderRect = slider.getBoundingClientRect();
                cards.forEach((card, index) => {
                    const cardRect = card.getBoundingClientRect();
                    if (cardRect.left >= sliderRect.left - 50 && cardRect.left <= sliderRect.left + 50) {
                        currentIndex = index;
                        updateDots();
                    }
                });
            }, 100);
        });
    }

    // Re-process Instagram embeds when they load
    if (window.instgrm) {
        window.instgrm.Embeds.process();
    }

    console.log('Classic theme loaded successfully!');
});
