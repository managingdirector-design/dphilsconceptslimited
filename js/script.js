// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Show loading animation
    showLoadingScreen();
    
    // Initialize all components
    initDarkMode();
    initMobileMenu();
    initServiceCards();
    initScrollEffects();
    initCustomCursor();
    initAccordion();
    initCounters();
    initStickyNavbar();
    initBackToTop();

    // Hide loading screen after initialization
    window.addEventListener('load', () => {
        hideLoadingScreen();
    });
});

// Dark mode toggle
function initDarkMode() {
    const darkModeToggle = document.querySelector('.dark-mode-toggle');
    const body = document.body;
    
    // Check for saved preference
    const darkMode = localStorage.getItem('darkMode');
    if (darkMode === 'enabled') {
        body.classList.add('dark-mode');
    }
    
    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', () => {
            body.classList.toggle('dark-mode');
            
            // Save preference
            if (body.classList.contains('dark-mode')) {
                localStorage.setItem('darkMode', 'enabled');
            } else {
                localStorage.setItem('darkMode', null);
            }
        });
    }
}

// Mobile menu toggle
function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger-menu');
    const nav = document.querySelector('.vertical-nav');
    
    if (hamburger && nav) {
        hamburger.addEventListener('click', () => {
            nav.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }
}

// Service card toggle
function initServiceCards() {
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        card.addEventListener('click', () => {
            // Close other cards
            serviceCards.forEach(c => {
                if (c !== card) c.classList.remove('active');
            });
            
            // Toggle current card
            card.classList.toggle('active');
        });
    });
}

// Scroll effects
function initScrollEffects() {
    // Active section highlight
    const sections = document.querySelectorAll('section[id]');
    const navItems = document.querySelectorAll('.vertical-nav li');
    
    if (sections.length && navItems.length) {
        window.addEventListener('scroll', () => {
            let current = '';
            const scrollY = window.pageYOffset;
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop - 100;
                const sectionHeight = section.offsetHeight;
                
                if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                    current = section.getAttribute('id');
                }
            });
            
            navItems.forEach(item => {
                item.classList.remove('active');
                if (item.querySelector('a').getAttribute('href') === `#${current}`) {
                    item.classList.add('active');
                    
                    // Update nav indicator
                    const navIndicator = document.querySelector('.nav-indicator');
                    if (navIndicator) {
                        const index = Array.from(navItems).indexOf(item);
                        navIndicator.style.setProperty('--index', index);
                    }
                }
            });
        });
    }
    
    // Fade-in on scroll
    const fadeElements = document.querySelectorAll('.fade-on-scroll');
    
    if (fadeElements.length) {
        const fadeInObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in');
                    fadeInObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        
        fadeElements.forEach(element => {
            fadeInObserver.observe(element);
        });
    }
    
    // Slide-in content
    const slideElements = document.querySelectorAll('.slide-on-scroll');
    
    if (slideElements.length) {
        const slideInObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('slide-in');
                    slideInObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        
        slideElements.forEach(element => {
            slideInObserver.observe(element);
        });
    }
}

// Back to top button
function initBackToTop() {
    const backToTopButton = document.getElementById('back-to-top');
    
    if (backToTopButton) {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                backToTopButton.classList.add('visible');
            } else {
                backToTopButton.classList.remove('visible');
            }
        });
        
        backToTopButton.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
}

// Loading Screen Functions
function showLoadingScreen() {
    const loading = document.createElement('div');
    loading.className = 'loading-screen';
    loading.innerHTML = '<div class="loading-spinner"></div>';
    document.body.appendChild(loading);
}

function hideLoadingScreen() {
    const loading = document.querySelector('.loading-screen');
    if (loading) {
        loading.style.opacity = '0';
        setTimeout(() => loading.remove(), 500);
    }
}

// Custom Cursor
function initCustomCursor() {
    const cursor = document.createElement('div');
    cursor.className = 'cursor-dot';
    document.body.appendChild(cursor);
    
    let cursorInterval;
    
    document.addEventListener('mousemove', e => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        
        clearInterval(cursorInterval);
        cursorInterval = setInterval(() => {
            const trail = cursor.cloneNode();
            trail.className = 'cursor-trail';
            trail.style.left = e.clientX + 'px';
            trail.style.top = e.clientY + 'px';
            document.body.appendChild(trail);
            setTimeout(() => trail.remove(), 500);
        }, 50);
    });
    
    document.addEventListener('mouseleave', () => {
        cursor.style.opacity = '0';
        clearInterval(cursorInterval);
    });
    
    document.addEventListener('mouseenter', () => {
        cursor.style.opacity = '1';
    });
}

// Sticky Navbar
function initStickyNavbar() {
    const sidebar = document.querySelector('.sidebar');
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > lastScroll && currentScroll > 100) {
            sidebar.classList.add('sticky');
        } else {
            sidebar.classList.remove('sticky');
        }
        
        lastScroll = currentScroll;
    });
}

// Accordion
function initAccordion() {
    const accordionItems = document.querySelectorAll('.accordion-item');
    
    accordionItems.forEach(item => {
        const header = item.querySelector('.accordion-header');
        
        header.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            accordionItems.forEach(i => i.classList.remove('active'));
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
}

// Counters
function initCounters() {
    const counters = document.querySelectorAll('.counter-number');
    const options = {
        threshold: 1,
        rootMargin: '0px'
    };
    
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-target'));
                let count = 0;
                
                const updateCount = () => {
                    const increment = target / 100;
                    
                    if (count < target) {
                        count += increment;
                        counter.textContent = Math.ceil(count);
                        setTimeout(updateCount, 10);
                    } else {
                        counter.textContent = target;
                    }
                };
                
                counter.classList.add('visible');
                updateCount();
                observer.unobserve(counter);
            }
        });
    }, options);
    
    counters.forEach(counter => observer.observe(counter));
}

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        if (targetId !== '#') {
            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth' });
            }
        }
    });
});