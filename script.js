// Portfolio Website JavaScript
// Implementing gentle slide animations and smooth interactions

document.addEventListener('DOMContentLoaded', function() {

    // Initialize all functionality
    initScrollAnimations();
    initSmoothScrolling();
    initNavigationEffects();
    initParallaxEffects();
    initMobileNavigation();
    initPerformanceOptimizations();

    // Scroll Animation System
    function initScrollAnimations() {
        const animateElements = [
            '.card',
            '.project-card',
            '.contact-item',
            '.skill-category'
        ];

        // Add animate-in class to elements that should animate
        animateElements.forEach(selector => {
            const elements = document.querySelectorAll(selector);
            elements.forEach(element => {
                element.classList.add('animate-in');
            });
        });

        // Intersection Observer for scroll animations
        const observerOptions = {
            threshold: 0.15,
            rootMargin: '0px 0px -50px 0px'
        };

        const scrollObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Add staggered delay for multiple elements
                    const index = Array.from(entry.target.parentNode.children).indexOf(entry.target);
                    const delay = index * 100; // 100ms delay between elements

                    setTimeout(() => {
                        entry.target.classList.add('visible');
                    }, delay);

                    scrollObserver.unobserve(entry.target);
                }
            });
        }, observerOptions);

        // Observe all elements with animate-in class
        document.querySelectorAll('.animate-in').forEach(element => {
            scrollObserver.observe(element);
        });
    }

    // Smooth Scrolling for Navigation Links
    function initSmoothScrolling() {
        const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');

        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();

                const targetId = this.getAttribute('href');
                const targetSection = document.querySelector(targetId);

                if (targetSection) {
                    const navHeight = document.querySelector('.nav').offsetHeight;
                    const targetPosition = targetSection.offsetTop - navHeight - 20;

                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });

                    // Add active state animation
                    this.style.transform = 'translateY(-2px)';
                    setTimeout(() => {
                        this.style.transform = '';
                    }, 200);
                }
            });
        });

        // Smooth scrolling for hero buttons
        const heroButtons = document.querySelectorAll('.hero-buttons a[href^="#"]');
        heroButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault();

                const targetId = this.getAttribute('href');
                const targetSection = document.querySelector(targetId);

                if (targetSection) {
                    const navHeight = document.querySelector('.nav').offsetHeight;
                    const targetPosition = targetSection.offsetTop - navHeight - 20;

                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    // Navigation Effects
    function initNavigationEffects() {
        const nav = document.querySelector('.nav');
        let lastScrollY = window.scrollY;
        let ticking = false;

        function updateNavigation() {
            const scrollY = window.scrollY;

            // Add/remove scrolled class based on scroll position
            if (scrollY > 50) {
                nav.classList.add('scrolled');
                nav.style.background = 'rgba(248, 249, 248, 0.98)';
                nav.style.boxShadow = '0 2px 20px rgba(47, 79, 79, 0.1)';
            } else {
                nav.classList.remove('scrolled');
                nav.style.background = 'rgba(248, 249, 248, 0.95)';
                nav.style.boxShadow = 'none';
            }

            // Update active navigation link based on scroll position
            updateActiveNavLink();

            lastScrollY = scrollY;
            ticking = false;
        }

        function requestNavUpdate() {
            if (!ticking) {
                requestAnimationFrame(updateNavigation);
                ticking = true;
            }
        }

        window.addEventListener('scroll', requestNavUpdate, { passive: true });

        // Update active navigation link
        function updateActiveNavLink() {
            const sections = document.querySelectorAll('section[id]');
            const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');

            let current = '';

            sections.forEach(section => {
                const sectionTop = section.offsetTop - 100;
                const sectionHeight = section.offsetHeight;

                if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                    current = section.getAttribute('id');
                }
            });

            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.add('active');
                }
            });
        }
    }

    // Subtle Parallax Effects
    function initParallaxEffects() {
        const parallaxElements = document.querySelectorAll('.geometric-bg');
        let ticking = false;

        function updateParallax() {
            const scrollY = window.scrollY;

            parallaxElements.forEach(element => {
                const speed = 0.5;
                const yPos = -(scrollY * speed);
                element.style.transform = `translateY(${yPos}px)`;
            });

            ticking = false;
        }

        function requestParallaxUpdate() {
            if (!ticking) {
                requestAnimationFrame(updateParallax);
                ticking = true;
            }
        }

        window.addEventListener('scroll', requestParallaxUpdate, { passive: true });
    }

    // Mobile Navigation
    function initMobileNavigation() {
        // Create mobile menu button for very small screens
        if (window.innerWidth <= 480) {
            const nav = document.querySelector('.nav-container');
            const navLinks = document.querySelector('.nav-links');

            // Create mobile menu button
            const mobileMenuButton = document.createElement('button');
            mobileMenuButton.innerHTML = '☰';
            mobileMenuButton.classList.add('mobile-menu-btn');
            mobileMenuButton.style.cssText = `
                display: block;
                background: none;
                border: none;
                font-size: 1.5rem;
                color: var(--sage-green-dark);
                cursor: pointer;
            `;

            nav.appendChild(mobileMenuButton);

            // Toggle mobile menu
            mobileMenuButton.addEventListener('click', function() {
                navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
                navLinks.style.flexDirection = 'column';
                navLinks.style.position = 'absolute';
                navLinks.style.top = '70px';
                navLinks.style.left = '0';
                navLinks.style.width = '100%';
                navLinks.style.background = 'var(--white)';
                navLinks.style.padding = 'var(--spacing-md)';
                navLinks.style.boxShadow = 'var(--shadow-md)';
            });
        }
    }

    // Enhanced Hover Effects
    function initEnhancedHoverEffects() {
        // Project cards hover effect
        const projectCards = document.querySelectorAll('.project-card');
        projectCards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-8px) scale(1.02)';
                this.style.transition = 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
            });

            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
            });
        });

        // Skill tags hover effect
        const skillTags = document.querySelectorAll('.skill-tag');
        skillTags.forEach(tag => {
            tag.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-2px) scale(1.05)';
                this.style.transition = 'all 0.2s ease';
            });

            tag.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
            });
        });

        // Button ripple effect
        const buttons = document.querySelectorAll('.btn-primary, .btn-secondary');
        buttons.forEach(button => {
            button.addEventListener('click', function(e) {
                const ripple = document.createElement('span');
                const rect = this.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;

                ripple.style.cssText = `
                    position: absolute;
                    width: ${size}px;
                    height: ${size}px;
                    left: ${x}px;
                    top: ${y}px;
                    background: rgba(255, 255, 255, 0.3);
                    border-radius: 50%;
                    transform: scale(0);
                    animation: ripple 0.6s linear;
                    pointer-events: none;
                `;

                this.style.position = 'relative';
                this.style.overflow = 'hidden';
                this.appendChild(ripple);

                setTimeout(() => {
                    ripple.remove();
                }, 600);
            });
        });
    }

    // Performance Optimizations
    function initPerformanceOptimizations() {
        // Debounce resize events
        let resizeTimeout;
        window.addEventListener('resize', function() {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(function() {
                // Handle responsive adjustments
                if (window.innerWidth > 480) {
                    const navLinks = document.querySelector('.nav-links');
                    const mobileBtn = document.querySelector('.mobile-menu-btn');
                    if (mobileBtn) mobileBtn.remove();
                    if (navLinks) {
                        navLinks.style.display = 'flex';
                        navLinks.style.position = 'static';
                        navLinks.style.flexDirection = 'row';
                        navLinks.style.background = 'none';
                        navLinks.style.padding = '0';
                        navLinks.style.boxShadow = 'none';
                    }
                }
            }, 250);
        });

        // Lazy load optimization for images (if any are added later)
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        if (img.dataset.src) {
                            img.src = img.dataset.src;
                            img.classList.remove('lazy');
                            imageObserver.unobserve(img);
                        }
                    }
                });
            });

            document.querySelectorAll('img[data-src]').forEach(img => {
                imageObserver.observe(img);
            });
        }
    }

    // Initialize enhanced hover effects
    initEnhancedHoverEffects();

    // Add CSS for ripple animation
    const rippleStyles = document.createElement('style');
    rippleStyles.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }

        .nav-links a.active {
            color: var(--sage-green-dark);
            font-weight: 600;
        }
    `;
    document.head.appendChild(rippleStyles);

    // Typing effect for hero subtitle (optional enhancement)
    function initTypingEffect() {
        const subtitle = document.querySelector('.hero-subtitle');
        if (subtitle) {
            const originalText = subtitle.textContent;
            subtitle.textContent = '';
            let i = 0;

            const typeTimer = setInterval(() => {
                subtitle.textContent += originalText.charAt(i);
                i++;
                if (i > originalText.length) {
                    clearInterval(typeTimer);
                }
            }, 50);
        }
    }

    // Initialize typing effect with delay
    setTimeout(initTypingEffect, 1000);

    // Smooth reveal animation for hero content
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        setTimeout(() => {
            heroContent.style.opacity = '1';
            heroContent.style.transform = 'translateY(0)';
        }, 300);
    }

    // Add scroll progress indicator
    function initScrollProgress() {
        const progressBar = document.createElement('div');
        progressBar.style.cssText = `
            position: fixed;
            top: 70px;
            left: 0;
            width: 0%;
            height: 3px;
            background: linear-gradient(90deg, var(--sage-green), var(--sage-green-light));
            z-index: 1000;
            transition: width 0.1s ease;
        `;
        document.body.appendChild(progressBar);

        window.addEventListener('scroll', () => {
            const scrollPercent = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
            progressBar.style.width = `${Math.min(scrollPercent, 100)}%`;
        }, { passive: true });
    }

    initScrollProgress();

    console.log('Portfolio website initialized with gentle slide animations! 🚀');
});

// Handle reduced motion preference
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.documentElement.style.setProperty('--animation-duration', '0.01ms');
}